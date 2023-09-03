import { Router as expRouter } from "express";
import {
  registerUser,
  loginUser,
  UpdateProfile,
  getUserProfile,
} from "../controllers";
import { isAuthenticated } from "../middlewares";

const router = expRouter();

router.post("/login", loginUser);
router.post("/register", registerUser);

router.get("/profile", isAuthenticated, getUserProfile);

router.patch("/profile", isAuthenticated, UpdateProfile);

export default router;
