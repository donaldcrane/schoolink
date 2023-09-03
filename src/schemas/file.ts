import Joi from "joi";
import { FileTypes, InitFileUploadData } from "../utils";

export const InitFileUploadSchema = Joi.object<InitFileUploadData>({
  type: Joi.string()
    .valid(...Object.values(FileTypes))
    .required(),
});
