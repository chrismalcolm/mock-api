"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const endpointSchema = new mongoose_1.Schema({
    path: {
        type: String,
        required: true,
    },
    httpMethod: {
        type: String,
        required: true,
    },
    responseCode: {
        type: String,
        required: true,
    },
    requestBody: {
        type: String,
        required: false,
    },
    responseBody: {
        type: String,
        required: false,
    },
    groupID: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Endpoint", endpointSchema);
