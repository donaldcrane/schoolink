import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { JwtGenerationPayload } from "./default";
import { jwtError } from "./error";
import config from "../config";

dotenv.config();
const secretKey = config.JWT_KEY;

export const generateToken = async (
  payload: JwtPayload,
  secret = secretKey
) => {
  const token = await jwt.sign(payload, secret as string, {
    expiresIn: "2d",
  });
  return token;
};

export const validateUserToken = async (token: string) => {
  try {
    const key = config.JWT_KEY || "secret";
    const data = jwt.verify(token, key) as JwtGenerationPayload;
    if (!data) return;

    return data;
  } catch (e) {
    console.error(jwtError, e);
  }
};
