import { serviceError, ServiceResponse, response } from "../utils";

export const service = async <T = unknown>(
  func: () => Promise<ServiceResponse<T>>
): Promise<ServiceResponse<T>> => {
  try {
    return await func();
  } catch (e) {
    console.error(serviceError, e);
    return response.serverError<T>();
  }
};
