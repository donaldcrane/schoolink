import { Router as expRouter } from "express";
import { createFile } from "../controllers";
import { uploader } from "../middlewares";

const router = expRouter();

router.patch("/upload", uploader, createFile);

export default router;
