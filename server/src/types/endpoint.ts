import { Document } from "mongoose";

export interface IEndpoint extends Document {
  path: string;
  httpMethod: string;
  responseCode: string;
  requestBody: string;
  responseBody: string;
  groupID: string;
}
