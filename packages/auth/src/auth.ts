import { betterAuth, BetterAuthOptions } from "better-auth";
import { drizzleAdapter, DB } from "better-auth/adapters/drizzle";

export const optionsWithDrizzleAdapter = (
  db: DB,
  provider: "sqlite" | "pg" | "mysql",
  schema: Record<string, any>,
  baseURL: string,
  secret: string,
  options?: Partial<BetterAuthOptions>
) => {
  const betterAuthOptions: BetterAuthOptions = {
    ...options,
    database: drizzleAdapter(db, {
      provider,
      schema,
    }),
    session: {
      expiresIn: 60 * 60 * 24 * 7,
      updateAge: 60 * 60 * 24,
    },
    advanced: {
      generateId: () => crypto.randomUUID(),
    },
    baseURL,
    secret,
  };

  return betterAuthOptions;
};

export const getAuthInstance = (options: BetterAuthOptions) => {
  return betterAuth(options);
};

// export type Session = typeof auth.$Infer.Session;
// export type User = typeof auth.$Infer.Session.user;
