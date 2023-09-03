import { FileTypes, unknownDatabaseError } from "../utils";
import { addFile } from "../repos";
import { task } from "../core";

export const saveUploadedFile = (file: Express.Multer.File, type: FileTypes) =>
  task(async () => {
    const fileData = {
      key: file.filename,
      fileName: file.originalname,
      type,
      url: file.path,
      mimetype: file.mimetype,
    };

    const { data, error } = await addFile(fileData);

    if (error || !data) return { error: error ?? unknownDatabaseError };
    return { data };
  });
