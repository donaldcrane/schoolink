import Joi from "joi";
import { LoginData, UserData } from "../utils";

export const loginSchema = Joi.object<LoginData>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const registerSchema = Joi.object<UserData>({
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  password: Joi.string().required().min(6).max(25),
  name: Joi.string().required(),
  dob: Joi.date().required(),
  photo: Joi.string().optional().allow(""),
  gender: Joi.string().valid("male", "female").required(),
});

export const profileSchema = Joi.object<UserData>({
  phone: Joi.string().optional(),
  name: Joi.string().optional(),
  dob: Joi.date().optional(),
  photo: Joi.string().optional().allow(""),
  gender: Joi.string().valid("male", "female").optional(),
});
