/* eslint-disable @typescript-eslint/no-empty-interface */
import { Users } from "../../models";
declare global {
  namespace Express {
    interface User extends Users {}
    interface Request extends CustomRequest {}
  }
}

export interface CustomRequest {
  user: IUser | null;
  file: object;
  params: object;
  query: object;
  path: object;
  token?: string | null;
  authOptional?: boolean;
}
export interface IUser {
  id: number;
  email: string;
  name: string;
  password: string;
  phone: string;
  dob: string;
  gender: string;
  photo: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface JwtPayload {
  id: string;
  email: string;
  phone: string;
}

export interface Error {
  message: string;
}
