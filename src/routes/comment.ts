import { Router as expRouter } from "express";
import { createComment, updateComment, deleteComment } from "../controllers";

const router = expRouter();

router.post("/", createComment);

router.patch("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;
