import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { Context } from "hono";
import { env } from "hono/adapter";

export const getDB = (context: Context) => {
  const { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } = env<Env>(context);

  const turso = createClient({
    url: TURSO_DATABASE_URL,
    authToken: TURSO_AUTH_TOKEN ?? undefined,
  });

  return drizzle(turso);
};
