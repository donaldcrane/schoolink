import { db } from "../models";
import { repo } from "../core";
import { InitCreateFileData } from "../utils";

export const addFile = (data: InitCreateFileData) =>
  repo(() => db.fileUploads.create({ data }));

export const addFiles = (data: InitCreateFileData[]) =>
  repo(() => db.fileUploads.createMany({ data }));

export const removeFile = (id: number) =>
  repo(() =>
    db.fileUploads.deleteMany({
      where: { id },
    })
  );

export const removePhoto = (id: number) =>
  repo(() =>
    db.postFiles.deleteMany({
      where: { fileId: id },
    })
  );

export const findFileByKey = (key: string) =>
  repo(() =>
    db.fileUploads.findFirst({
      where: { key },
    })
  );
