import { getAuthClient } from "@repo/auth/client";

export const authClient = getAuthClient(import.meta.env.VITE_SERVER_BASE_URL);

type AuthErrorCode = Partial<keyof typeof authClient.$ERROR_CODES>;

export const AUTH_ERROR_MESSAGES: Record<AuthErrorCode, string> = {
  USER_ALREADY_EXISTS: "User already exists",
  INVALID_EMAIL: "Invalid email address",
  INVALID_PASSWORD: "Invalid password",
  USER_NOT_FOUND: "User not found",
  EMAIL_NOT_VERIFIED: "Email not verified",
  USER_EMAIL_NOT_FOUND: "User email not found",
  INVALID_EMAIL_OR_PASSWORD: "Invalid email or password",
  FAILED_TO_CREATE_USER: "Failed to create user",
  FAILED_TO_GET_SESSION: "Failed to get session",
  FAILED_TO_UPDATE_USER: "Failed to update user",
  CREDENTIAL_ACCOUNT_NOT_FOUND: "Credential account not found",
  FAILED_TO_CREATE_SESSION: "Failed to create session",
  SOCIAL_ACCOUNT_ALREADY_LINKED: "Social account already linked",
  SESSION_EXPIRED: "Session expired",
  PROVIDER_NOT_FOUND: "Provider not found",
  INVALID_TOKEN: "Invalid token",
  ID_TOKEN_NOT_SUPPORTED: "ID token not supported",
  FAILED_TO_GET_USER_INFO: "Failed to get user info",
  PASSWORD_TOO_SHORT: "Password too short",
  PASSWORD_TOO_LONG: "Password too long",
  EMAIL_CAN_NOT_BE_UPDATED: "Email can not be updated",
  FAILED_TO_UNLINK_LAST_ACCOUNT: "Failed to unlink last account",
  ACCOUNT_NOT_FOUND: "Account not found",
};
