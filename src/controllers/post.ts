import {
  savePost,
  fetchAllPosts,
  fetchAllUserPosts,
  fetchPostById,
  modifyPost,
  removePost,
  likeUnlikePost,
} from "../services";
import { controller } from "../core";
import { Controller } from "../utils";
import { createPostSchema, updatePostSchema, likeschema } from "../schemas";

export const createPost: Controller = (req, res) =>
  controller({
    req,
    res,
    service: savePost,
    validation: { schema: createPostSchema },
  });

export const getAllPosts: Controller = (req, res) =>
  controller({
    req,
    res,
    service: fetchAllPosts,
  });

export const getAllUserPosts: Controller = (req, res) =>
  controller({
    req,
    res,
    service: fetchAllUserPosts,
    params: { id: Number(req.params.id) },
  });

export const getPostsById: Controller = (req, res) =>
  controller({
    req,
    res,
    params: { id: Number(req.params.id) },
    service: fetchPostById,
  });

export const updatePost: Controller = (req, res) =>
  controller({
    req,
    res,
    service: modifyPost,
    params: { id: Number(req.params.id) },
    validation: { schema: updatePostSchema },
  });

export const deletePost: Controller = (req, res) =>
  controller({
    req,
    res,
    service: removePost,
    params: { id: Number(req.params.id) },
  });

export const modifyPostLikes: Controller = (req, res) =>
  controller({
    req,
    res,
    service: likeUnlikePost,
    params: { id: Number(req.params.id) },
    filterValidation: likeschema,
  });
