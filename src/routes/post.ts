import { Router as expRouter } from "express";
import {
  createPost,
  getAllPosts,
  getAllUserPosts,
  getPostsById,
  updatePost,
  deletePost,
  modifyPostLikes,
} from "../controllers";

const router = expRouter();

router.post("/", createPost);

router.get("/", getAllPosts);
router.get("/users/:id/", getAllUserPosts);
router.get("/:id", getPostsById);

router.patch("/:id", updatePost);
router.patch("/:id/likes", modifyPostLikes);
router.delete("/:id", deletePost);

export default router;
