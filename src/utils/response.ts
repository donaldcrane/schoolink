import { ServiceResponse } from "./default";
import {
  noPermissionError,
  unauthorizedError,
  unknownServerError,
} from "./error";

export const build = <T = unknown>({
  status,
  success = false,
  message = "failed",
  data = "",
}: Partial<ServiceResponse<T>>): ServiceResponse<T> => {
  return { status: status ? status : 500, success, message, data };
};

export const success = <T = unknown>(data?: T | "", message = "successful") => {
  return build<T>({
    status: 200,
    success: true,
    message,
    data,
  });
};

export const created = <T = unknown>(data?: T | "", message = "successful") => {
  return build<T>({
    status: 201,
    success: true,
    message,
    data,
  });
};

export const failed = <T = unknown>(message: string, data?: T | "") => {
  return build<T>({
    status: 200,
    message,
    data,
  });
};

export const badRequest = <T = unknown>(message: string) => {
  return build<T>({
    status: 400,
    message,
  });
};

export const notFound = <T = unknown>(message: string) => {
  return build<T>({
    status: 404,
    message,
  });
};

export const conflict = <T = unknown>(message: string) => {
  return build<T>({
    status: 409,
    message,
  });
};

export const unauthorized = <T = unknown>(message = unauthorizedError) => {
  return build<T>({
    status: 401,
    message,
  });
};

export const forbidden = <T = unknown>(message = noPermissionError) => {
  return build<T>({
    status: 403,
    message,
  });
};

export const serverError = <T = unknown>(message = unknownServerError) => {
  return build<T>({
    status: 500,
    message,
  });
};
