import { saveComment, modifyComment, removeComment } from "../services";
import { controller } from "../core";
import { Controller } from "../utils";
import { createCommentSchema, updateCommentSchema } from "../schemas";

export const createComment: Controller = (req, res) =>
  controller({
    req,
    res,
    service: saveComment,
    validation: { schema: createCommentSchema },
  });

export const updateComment: Controller = (req, res) =>
  controller({
    req,
    res,
    service: modifyComment,
    params: { id: Number(req.params.id) },
    validation: { schema: updateCommentSchema },
  });

export const deleteComment: Controller = (req, res) =>
  controller({
    req,
    res,
    service: removeComment,
    params: { id: Number(req.params.id) },
  });
