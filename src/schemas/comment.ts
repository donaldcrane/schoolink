import Joi from "joi";
import { commentData, updateCommentData } from "../utils";

export const createCommentSchema = Joi.object<commentData>({
  comment: Joi.string().required(),
  postId: Joi.number().required(),
});

export const updateCommentSchema = Joi.object<updateCommentData>({
  comment: Joi.string().optional().allow(""),
});
