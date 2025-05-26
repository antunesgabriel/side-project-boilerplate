import { createAuthClient } from "better-auth/client";

export const getAuthClient = (baseURL: string) => {
  const authClient = createAuthClient({
    baseURL,
    basePath: "/auth",
  });

  return authClient;
};
