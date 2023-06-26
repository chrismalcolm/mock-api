import { Request, Response } from "express";
import { IEndpoint } from "../../types/endpoint";
import Endpoint from "../../models/endpoint";

const getEndpoints = async (req: Request, res: Response): Promise<void> => {
  try {
    const groupid = req.params.groupid;
    const allEndpoints: IEndpoint[] = await Endpoint.find({ groupID: groupid });
    res.status(200).json({
      endpoints: allEndpoints,
    });
  } catch (e) {
    const error = e as Error;
    try {
      res.status(400).json({
        errorMessage: error.message,
      });
    } catch (HTTPError) {
      console.log("HTTP error getEndpoints(): " + HTTPError);
    }
  }
};

const getAllEndpoints = async (req: Request, res: Response): Promise<void> => {
  try {
    const allEndpoints: IEndpoint[] = await Endpoint.find();
    res.status(200).json({
      endpoints: allEndpoints,
    });
  } catch (e) {
    const error = e as Error;
    try {
      res.status(400).json({
        errorMessage: error.message,
      });
    } catch (HTTPError) {
      console.log("HTTP error getAllEndpoints(): " + HTTPError);
    }
  }
};

const addEndpoint = async (req: Request, res: Response): Promise<void> => {
  try {
    const groupid = req.params.groupid;
    const body = req.body as Pick<
      IEndpoint,
      "path" | "httpMethod" | "responseCode" | "requestBody" | "responseBody"
    >;

    const endpoint: IEndpoint = new Endpoint({
      path: body.path,
      httpMethod: body.httpMethod,
      responseCode: body.responseCode,
      requestBody: body.requestBody,
      responseBody: body.responseBody,
      groupID: groupid,
    });
    if (endpoint.path.length > 0 && endpoint.path[0] !== "/") {
      endpoint.path = "/" + endpoint.path;
    }
    endpoint.requestBody = compactJSON(`${endpoint.requestBody}`);
    endpoint.responseBody = compactJSON(`${endpoint.responseBody}`);

    const validateErrMsg = validateEndpoint(endpoint);
    if (validateErrMsg !== "") {
      throw Error(validateErrMsg);
    }

    const endpoints: IEndpoint[] = await Endpoint.find({ groupID: groupid });
    const conflictErrMsg = checkEndpointConflicts("", endpoint, endpoints);
    if (conflictErrMsg !== "") {
      throw Error(conflictErrMsg);
    }

    const newEndpoint: IEndpoint = await endpoint.save();
    const allEndpoints: IEndpoint[] = await Endpoint.find({ groupID: groupid });

    res.status(201).json({
      message: `Endpoint '${describeEndpoint(endpoint)}' created`,
      endpoint: newEndpoint,
      endpoints: allEndpoints,
    });
  } catch (e) {
    const error = e as Error;
    try {
      res.status(400).json({
        errorMessage: error.message,
      });
    } catch (HTTPError) {
      console.log("HTTP error addEndpoint(): " + HTTPError);
    }
  }
};

const updateEndpoint = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id, groupid },
      body,
    } = req;

    const endpoint: IEndpoint = {
      ...body,
    };
    if (endpoint.path.length > 0 && endpoint.path[0] !== "/") {
      endpoint.path = "/" + endpoint.path;
    }
    endpoint.requestBody = compactJSON(`${endpoint.requestBody}`);
    endpoint.responseBody = compactJSON(`${endpoint.responseBody}`);

    const validateErrMsg = validateEndpoint(endpoint);
    if (validateErrMsg !== "") {
      throw Error(validateErrMsg);
    }

    const endpoints: IEndpoint[] = await Endpoint.find({ groupID: groupid });
    const conflictErrMsg = checkEndpointConflicts(id, endpoint, endpoints);
    if (conflictErrMsg !== "") {
      throw Error(conflictErrMsg);
    }

    const updateEndpoint: IEndpoint | null = await Endpoint.findOneAndUpdate(
      { _id: id, groupID: groupid },
      endpoint
    );
    const allEndpoints: IEndpoint[] = await Endpoint.find({ groupID: groupid });

    res.status(200).json({
      message: `Endpoint '${describeEndpoint(endpoint)}' updated`,
      endpoint: updateEndpoint,
      endpoints: allEndpoints,
    });
  } catch (e) {
    const error = e as Error;
    try {
      res.status(400).json({
        errorMessage: error.message,
      });
    } catch (HTTPError) {
      console.log("HTTP error updateEndpoint(): " + HTTPError);
    }
  }
};

const deleteEndpoint = async (req: Request, res: Response): Promise<void> => {
  try {
    const groupid = req.params.groupid;
    const endpoint: IEndpoint | null = await Endpoint.findOneAndRemove({
      _id: req.params.id,
      groupID: groupid,
    });
    const allEndpoints: IEndpoint[] = await Endpoint.find({ groupID: groupid });

    res.status(200).json({
      message: `Endpoint '${describeEndpoint(endpoint)}' deleted`,
      endpoint: endpoint,
      endpoints: allEndpoints,
    });
  } catch (e) {
    const error = e as Error;
    try {
      res.status(400).json({
        errorMessage: error.message,
      });
    } catch (HTTPError) {
      console.log("HTTP error deleteEndpoint(): " + HTTPError);
    }
  }
};

const describeEndpoint = (endpoint: IEndpoint | null): string => {
  const path = endpoint?.path || "";
  const httpMethod = endpoint?.httpMethod || "";
  const responseCode = endpoint?.responseCode || "";
  return `${path} [${httpMethod}] ${responseCode}`;
};

const validateEndpoint = (endpoint: IEndpoint): string => {
  if (endpoint.path === "") {
    return "Endpoint validation failed: path is an empty string";
  }
  if (endpoint.httpMethod === "") {
    return "Endpoint validation failed: httpMethod is an empty string";
  }
  if (endpoint.responseCode === "") {
    return "Endpoint validation failed: responseCode is an empty string";
  }
  if (/\s/.test(endpoint.path)) {
    return `Endpoint validation failed: path '${endpoint.path}' contains whitespace characters`;
  }
  return "";
};

const checkEndpointConflicts = (
  id: string,
  endpoint: IEndpoint,
  endpoints: IEndpoint[]
): string => {
  let errMsg = "";
  endpoints.forEach((e: IEndpoint) => {
    if (
      `${e._id}` !== id &&
      e.path === endpoint.path &&
      e.httpMethod === endpoint.httpMethod &&
      e.requestBody === endpoint.requestBody
    ) {
      errMsg = `Endpoint validation failed: conflict for path '${endpoint.path}', httpMethod [${endpoint.httpMethod}] and requestBody already exists`;
      return;
    }
  });
  return errMsg;
};

const compactJSON = (input: string): string => {
  try {
    const obj = JSON.parse(input);
    return JSON.stringify(obj);
  } catch {
    return input;
  }
};

export {
  getEndpoints,
  getAllEndpoints,
  addEndpoint,
  updateEndpoint,
  deleteEndpoint,
};
