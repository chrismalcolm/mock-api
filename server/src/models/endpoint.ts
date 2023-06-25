import {IEndpoint} from "../types/endpoint"
import { model, Schema } from "mongoose"

const endpointSchema: Schema = new Schema(
    {
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
    },
    {timestamps: true},
);

export default model<IEndpoint>("Endpoint", endpointSchema);
