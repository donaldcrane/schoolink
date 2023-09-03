import Joi from "joi";
import { postData, updatePostData } from "../utils";

export const createPostSchema = Joi.object<postData>({
  post: Joi.string().required(),
  photos: Joi.array().optional(),
});

export const updatePostSchema = Joi.object<updatePostData>({
  photos: Joi.array().optional().allow(""),
  post: Joi.string().optional().allow(""),
});

export const likeschema = Joi.object({
  type: Joi.string().required().valid("like", "unlike"),
});
