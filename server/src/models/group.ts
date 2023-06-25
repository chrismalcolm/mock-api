import {IGroup} from "../types/group"
import { model, Schema } from "mongoose"

const groupSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        hostname: {
            type: String,
            required: true,
        },
        
    },
    {timestamps: true},
);

export default model<IGroup>("Group", groupSchema);
