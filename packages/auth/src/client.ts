import { createAuthClient } from "better-auth/react";

export const getAuthClient = (baseURL: string) => {
  const authClient = createAuthClient({
    baseURL,
    basePath: "/auth",
  });

  return authClient;
};
