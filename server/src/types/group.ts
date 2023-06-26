import { Document } from "mongoose";

export interface IGroup extends Document {
  name: string;
  hostname: string;
}
