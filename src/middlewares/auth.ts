import {
  MiddleWare,
  unauthorizedError,
  unknownServerError,
  validateUserToken,
} from "../utils";
import { findUserByEmail } from "../repos";

export const isAuthenticated: MiddleWare = async (req, res, next) => {
  if (!req.get("Authorization"))
    if (req.authOptional) return next();
    else
      return res
        .status(401)
        .send({ success: false, message: unauthorizedError });
  try {
    const token = (req.header("Authorization") || "Bearer _").split(" ")[1];

    const verified = await validateUserToken(token);
    if (!verified)
      if (req.authOptional) return next();
      else
        return res
          .status(401)
          .send({ success: false, message: unauthorizedError });

    const { data: userData, error } = await findUserByEmail(verified.email);
    if (error || !userData)
      return res.status(500).send({
        success: false,
        message: error ?? "Account does not exist",
      });

    req.user = userData;
    req.token = token;
    return next();
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .send({ success: false, message: unknownServerError });
  }
};

export const authOptional: MiddleWare = (req, res, next) => {
  try {
    req.authOptional = true;
    return next();
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .send({ success: false, message: unknownServerError });
  }
};
