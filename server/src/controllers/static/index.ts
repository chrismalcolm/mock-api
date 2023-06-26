import { Request, Response } from "express";
import { IGroup } from "../../types/group";
import { IEndpoint } from "../../types/endpoint";
import Group from "../../models/group";
import Endpoint from "../../models/endpoint";
import { isEqual } from "lodash";

const getStatic = async (req: Request, res: Response): Promise<void> => {
  return doStatic("GET", req, res);
};

const postStatic = async (req: Request, res: Response): Promise<void> => {
  return doStatic("POST", req, res);
};

const putStatic = async (req: Request, res: Response): Promise<void> => {
  return doStatic("PUT", req, res);
};

const deleteStatic = async (req: Request, res: Response): Promise<void> => {
  return doStatic("DELETE", req, res);
};

const doStatic = async (
  httpMethod: string,
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const query = req.query;
    let path = req.path.substring("/static/".length, req.path.length);
    let groupID = "";
    let hostname = "";
    const groups: IGroup[] = await Group.find();
    groups.forEach((g) => {
      if (path.startsWith(`${g.hostname}/`)) {
        groupID = g._id;
        hostname = g.hostname;
        return;
      }
    });
    if (groupID === "") {
      throw new Error(`Unable to find matching hostname for '${path}'`);
    }

    path = path.substring(hostname.length, path.length);
    let urlparams = "";
    let endpointID = "";
    let responseCode = "";
    let responseBody = "";
    let foundPathMatch = true;
    const endpoints: IEndpoint[] = await Endpoint.find({ groupID: groupID });
    endpoints.forEach((e) => {
      if (e.httpMethod.toLowerCase() !== httpMethod.toLowerCase()) {
        return;
      }
      if (e.path !== path && !e.path.startsWith(`${path}?`)) {
        return;
      }
      foundPathMatch = true;
      if (
        httpMethod.toLowerCase() !== "get" &&
        e.requestBody !== "" &&
        !isEqual(req.body, JSON.parse(`${e.requestBody}`))
      ) {
        return;
      }
      if (path.length + 1 < e.path.length) {
        urlparams = e.path.substring(path.length + 1, e.path.length);
      }
      endpointID = e._id;
      responseCode = e.responseCode;
      responseBody = e.responseBody;
      return;
    });
    if (endpointID === "") {
      if (foundPathMatch) {
        throw new Error(
          `Unable to find matching request body for '${path}' for hostname ${hostname}`
        );
      }
      throw new Error(
        `Unable to find matching endpoint for '${path}' for hostname ${hostname}`
      );
    }

    if (urlparams !== "") {
      const urlparamsStr = urlparams as string;
      const pairs = urlparamsStr.split("&");
      pairs.forEach((pair) => {
        const s = pair.split("=");
        if (s.length === 1) {
          s[1] = "";
        } else if (s.length !== 2) {
          return;
        }
        if (query[s[0]] === undefined) {
          // ignore extra params
        } else if (query[s[0]] !== s[1]) {
          throw new Error(
            `Unable to to match query parameter '${s[0]}': got '${s[0]}=${
              query[s[0]]
            }' want '${pair}'`
          );
        }
      });
    }
    let body: string;
    try {
      body = JSON.parse(`${responseBody}`);
    } catch {
      body = `${responseBody}`;
    }
    res.status(parseInt(responseCode)).json(body);
  } catch (e) {
    try {
      const error = e as Error;
      res.status(400).json({ errorMessage: error.message });
    } catch (HTTPError) {
      console.log(`HTTP error [${httpMethod}] doStatic() ` + HTTPError);
    }
  }
};

export { getStatic, postStatic, putStatic, deleteStatic };
