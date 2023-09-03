import { Prisma } from "@prisma/client";
import {
  databaseConnectionError,
  databaseError,
  unknownDatabaseError,
} from "../utils";

export const repo = async <T = unknown>(
  func: () => Promise<T | undefined>
): Promise<{ data?: T; error?: string }> => {
  try {
    return { data: await func() };
  } catch (e: unknown) {
    console.error("database error");

    let error = unknownDatabaseError;
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code.startsWith("P10")) error = databaseConnectionError;
      else if (e.code.startsWith("P20")) error = databaseError;
      console.error(e.message);
    } else console.error(e);
    return { error };
  }
};
