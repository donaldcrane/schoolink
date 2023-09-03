import {
  invalidUploadServer,
  MiddleWare,
  middlewareErrorLabel,
  unknownServerError,
  validationError,
} from "../utils";
import multer from "multer";
import { InitFileUploadSchema } from "../schemas";
import { v2 } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import config from "../config";

export const uploader: MiddleWare = (req, res, next) => {
  const { error, value } = InitFileUploadSchema.validate({
    type: req.params.type || "image",
  });

  if (error || !value)
    return res.status(400).send({ message: error?.message ?? validationError });

  v2.config({
    cloud_name: config.CLOUD_NAME,
    api_key: config.API_KEY,
    api_secret: config.API_SECRET,
  });
  const storage = new CloudinaryStorage({
    cloudinary: v2,
  });
  try {
    let multerUploader: multer.Multer | null = null;
    multerUploader = multer({
      storage,
      limits: {
        fileSize: 5120 * 1024 * 1024,
      },
    });
    if (multerUploader) return multerUploader.single("file")(req, res, next);
    else return res.status(400).send({ message: invalidUploadServer });
  } catch (e) {
    console.error(middlewareErrorLabel, e);
    return res.status(500).send({ message: unknownServerError });
  }
};
