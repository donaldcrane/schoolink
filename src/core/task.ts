import { moduleError } from "../utils";

export const task = async <T = unknown>(
  func: () => Promise<{ data?: T | null; error?: string }>
): Promise<{ data?: T; error?: string }> => {
  try {
    const { data, error } = await func();
    if (error) return { error };
    return data ? { data } : { error: moduleError };
  } catch (e: unknown) {
    const error = moduleError;
    console.error(error, e);
    return { error };
  }
};
