import {
  signInUser,
  signUpUser,
  fetchUserProfile,
  editUserProfile,
} from "../services";
import { controller } from "../core";
import { Controller } from "../utils";
import { loginSchema, registerSchema, profileSchema } from "../schemas";

export const loginUser: Controller = (req, res) =>
  controller({
    req,
    res,
    service: signInUser,
    validation: { schema: loginSchema },
  });

export const registerUser: Controller = (req, res) =>
  controller({
    req,
    res,
    service: signUpUser,
    validation: { schema: registerSchema },
  });

export const getUserProfile: Controller = (req, res) =>
  controller({
    req,
    res,
    service: fetchUserProfile,
  });

export const UpdateProfile: Controller = (req, res) =>
  controller({
    req,
    res,
    service: editUserProfile,
    validation: { schema: profileSchema },
  });
