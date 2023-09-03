import { Router as expRouter } from "express";
import userRoutes from "./user";
import postRoutes from "./post";
import commentRoutes from "./comment";
import fileRoutes from "./file";
const router = expRouter();
import { isAuthenticated } from "../middlewares";

router.use("/users", userRoutes);
router.use("/posts", isAuthenticated, postRoutes);
router.use("/comments", isAuthenticated, commentRoutes);
router.use("/files", fileRoutes);
export default router;
