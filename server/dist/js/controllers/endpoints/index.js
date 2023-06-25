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
exports.deleteEndpoint = exports.updateEndpoint = exports.addEndpoint = exports.getAllEndpoints = exports.getEndpoints = void 0;
const endpoint_1 = __importDefault(require("../../models/endpoint"));
const getEndpoints = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groupid = req.params.groupid;
        const allEndpoints = yield endpoint_1.default.find({ groupID: groupid });
        res
            .status(200)
            .json({
            endpoints: allEndpoints,
        });
    }
    catch (e) {
        const error = e;
        try {
            res
                .status(400)
                .json({
                errorMessage: error.message,
            });
        }
        catch (HTTPError) {
            console.log("HTTP error getEndpoints(): " + HTTPError);
        }
        ;
    }
    ;
});
exports.getEndpoints = getEndpoints;
const getAllEndpoints = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allEndpoints = yield endpoint_1.default.find();
        res
            .status(200)
            .json({
            endpoints: allEndpoints,
        });
    }
    catch (e) {
        const error = e;
        try {
            res
                .status(400)
                .json({
                errorMessage: error.message,
            });
        }
        catch (HTTPError) {
            console.log("HTTP error getAllEndpoints(): " + HTTPError);
        }
        ;
    }
    ;
});
exports.getAllEndpoints = getAllEndpoints;
const addEndpoint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groupid = req.params.groupid;
        const body = req.body;
        const endpoint = new endpoint_1.default({
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
        ;
        endpoint.requestBody = compactJSON(`${endpoint.requestBody}`);
        endpoint.responseBody = compactJSON(`${endpoint.responseBody}`);
        const validateErrMsg = validateEndpoint(endpoint);
        if (validateErrMsg !== "") {
            throw Error(validateErrMsg);
        }
        ;
        const endpoints = yield endpoint_1.default.find({ groupID: groupid });
        const conflictErrMsg = checkEndpointConflicts(endpoint, endpoints);
        if (conflictErrMsg !== "") {
            throw Error(conflictErrMsg);
        }
        ;
        const newEndpoint = yield endpoint.save();
        const allEndpoints = yield endpoint_1.default.find({ groupID: groupid });
        res
            .status(201)
            .json({
            message: `Endpoint '${describeEndpoint(endpoint)}' created`,
            endpoint: newEndpoint,
            endpoints: allEndpoints,
        });
    }
    catch (e) {
        const error = e;
        try {
            res
                .status(400)
                .json({
                errorMessage: error.message,
            });
        }
        catch (HTTPError) {
            console.log("HTTP error addEndpoint(): " + HTTPError);
        }
        ;
    }
    ;
});
exports.addEndpoint = addEndpoint;
const updateEndpoint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id, groupid }, body, } = req;
        const endpoint = Object.assign({}, body);
        if (endpoint.path.length > 0 && endpoint.path[0] !== "/") {
            endpoint.path = "/" + endpoint.path;
        }
        ;
        endpoint.requestBody = compactJSON(`${endpoint.requestBody}`);
        endpoint.responseBody = compactJSON(`${endpoint.responseBody}`);
        const validateErrMsg = validateEndpoint(endpoint);
        if (validateErrMsg !== "") {
            throw Error(validateErrMsg);
        }
        ;
        const updateEndpoint = yield endpoint_1.default.findOneAndUpdate({ _id: id, groupID: groupid }, endpoint);
        const allEndpoints = yield endpoint_1.default.find({ groupID: groupid });
        res
            .status(200)
            .json({
            message: `Endpoint '${describeEndpoint(endpoint)}' updated`,
            endpoint: updateEndpoint,
            endpoints: allEndpoints,
        });
    }
    catch (e) {
        const error = e;
        try {
            res
                .status(400)
                .json({
                errorMessage: error.message,
            });
        }
        catch (HTTPError) {
            console.log("HTTP error updateEndpoint(): " + HTTPError);
        }
        ;
    }
    ;
});
exports.updateEndpoint = updateEndpoint;
const deleteEndpoint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groupid = req.params.groupid;
        const endpoint = yield endpoint_1.default.findOneAndRemove({
            _id: req.params.id,
            groupID: groupid,
        });
        const allEndpoints = yield endpoint_1.default.find({ groupID: groupid });
        res
            .status(200)
            .json({
            message: `Endpoint '${describeEndpoint(endpoint)}' deleted`,
            endpoint: endpoint,
            endpoints: allEndpoints,
        });
    }
    catch (e) {
        const error = e;
        try {
            res
                .status(400)
                .json({
                errorMessage: error.message,
            });
        }
        catch (HTTPError) {
            console.log("HTTP error deleteEndpoint(): " + HTTPError);
        }
        ;
    }
    ;
});
exports.deleteEndpoint = deleteEndpoint;
const describeEndpoint = (endpoint) => {
    const path = (endpoint === null || endpoint === void 0 ? void 0 : endpoint.path) || "";
    const httpMethod = (endpoint === null || endpoint === void 0 ? void 0 : endpoint.httpMethod) || "";
    const responseCode = (endpoint === null || endpoint === void 0 ? void 0 : endpoint.responseCode) || "";
    return `${path} [${httpMethod}] ${responseCode}`;
};
const validateEndpoint = (endpoint) => {
    if (endpoint.path === "") {
        return "Endpoint validation failed: path is an empty string";
    }
    ;
    if (endpoint.httpMethod === "") {
        return "Endpoint validation failed: httpMethod is an empty string";
    }
    ;
    if (endpoint.responseCode === "") {
        return "Endpoint validation failed: responseCode is an empty string";
    }
    ;
    if (/\s/.test(endpoint.path)) {
        return `Endpoint validation failed: path '${endpoint.path}' contains whitespace characters`;
    }
    ;
    return "";
};
const checkEndpointConflicts = (endpoint, endpoints) => {
    var errMsg = "";
    endpoints.forEach((e) => {
        if (e.path === endpoint.path && e.httpMethod === endpoint.httpMethod && e.requestBody === endpoint.requestBody) {
            errMsg = `Endpoint validation failed: conflict for path '${endpoint.path}', httpMethod [${endpoint.httpMethod}] and requestBody already exists`;
            return;
        }
        ;
    });
    return errMsg;
};
const compactJSON = (input) => {
    try {
        const obj = JSON.parse(input);
        return JSON.stringify(obj);
    }
    catch (_a) {
        return input;
    }
};
