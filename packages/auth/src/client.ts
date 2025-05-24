import { createAuthClient } from "better-auth/client";

export const getAuthClient = (baseURL: string) => {
  const authClient = createAuthClient({
    baseURL,
  });

  return authClient;
};
