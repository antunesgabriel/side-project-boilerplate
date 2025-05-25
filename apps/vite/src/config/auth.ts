import { getAuthClient } from "@repo/auth/client";

const authClient = getAuthClient(import.meta.env.VITE_SERVER_BASE_URL);
