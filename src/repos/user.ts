import { repo } from "../core";
import { db } from "../models";
import { UserData } from "../utils";

export const createUser = (data: UserData) =>
  repo(() =>
    db.users.create({
      data,
    })
  );

export const findUser = (id: number) =>
  repo(() =>
    db.users.findUnique({
      where: { id },
    })
  );

export const updateUserProfile = (id: number, data: UserData) =>
  repo(() =>
    db.users.update({
      where: { id },
      data,
    })
  );

export const findUserById = (id: number) =>
  repo(() =>
    db.users.findUnique({
      where: {
        id,
      },
    })
  );

export const findUserByEmail = (email: string) =>
  repo(() =>
    db.users.findFirst({
      where: {
        email,
      },
    })
  );

export const findUserByEmailOrPhone = (email: string) =>
  repo(() =>
    db.users.findFirst({
      where: { OR: [{ phone: email }, { email }] },
    })
  );

export const findUserByEmailAndPhone = (email: string, phone: string) =>
  repo(() =>
    db.users.findFirst({
      where: { OR: [{ phone }, { email }] },
    })
  );
