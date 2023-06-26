"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStatic = exports.putStatic = exports.postStatic = exports.getStatic = void 0;
const group_1 = __importDefault(require("../../models/group"));
const endpoint_1 = __importDefault(require("../../models/endpoint"));
const lodash_1 = require("lodash");
const getStatic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return doStatic("GET", req, res);
});
exports.getStatic = getStatic;
const postStatic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return doStatic("POST", req, res);
});
exports.postStatic = postStatic;
const putStatic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return doStatic("PUT", req, res);
});
exports.putStatic = putStatic;
const deleteStatic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return doStatic("DELETE", req, res);
});
exports.deleteStatic = deleteStatic;
const doStatic = (httpMethod, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        let path = req.path.substring("/static/".length, req.path.length);
        let groupID = "";
        let hostname = "";
        const groups = yield group_1.default.find();
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
        const endpoints = yield endpoint_1.default.find({ groupID: groupID });
        endpoints.forEach((e) => {
            if (e.httpMethod.toLowerCase() !== httpMethod.toLowerCase()) {
                return;
            }
            if (e.path !== path && !e.path.startsWith(`${path}?`)) {
                return;
            }
            foundPathMatch = true;
            if (httpMethod.toLowerCase() !== "get" &&
                e.requestBody !== "" &&
                !(0, lodash_1.isEqual)(req.body, JSON.parse(`${e.requestBody}`))) {
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
                throw new Error(`Unable to find matching request body for '${path}' for hostname ${hostname}`);
            }
            throw new Error(`Unable to find matching endpoint for '${path}' for hostname ${hostname}`);
        }
        if (urlparams !== "") {
            const urlparamsStr = urlparams;
            const pairs = urlparamsStr.split("&");
            pairs.forEach((pair) => {
                const s = pair.split("=");
                if (s.length === 1) {
                    s[1] = "";
                }
                else if (s.length !== 2) {
                    return;
                }
                if (query[s[0]] === undefined) {
                    // ignore extra params
                }
                else if (query[s[0]] !== s[1]) {
                    throw new Error(`Unable to to match query parameter '${s[0]}': got '${s[0]}=${query[s[0]]}' want '${pair}'`);
                }
            });
        }
        let body;
        try {
            body = JSON.parse(`${responseBody}`);
        }
        catch (_a) {
            body = `${responseBody}`;
        }
        res.status(parseInt(responseCode)).json(body);
    }
    catch (e) {
        try {
            const error = e;
            res.status(400).json({ errorMessage: error.message });
        }
        catch (HTTPError) {
            console.log(`HTTP error [${httpMethod}] doStatic() ` + HTTPError);
        }
    }
});
