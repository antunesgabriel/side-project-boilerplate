import { Resend } from "resend";
import { Context } from "hono";
import { DB } from "better-auth/adapters/drizzle";
import { env } from "hono/adapter";

import { optionsWithDrizzleAdapter, getAuthInstance } from "@repo/auth/auth";
import * as schema from "~/db/schema";

let resend: Resend;

export const getAuth = (context: Context, db: DB) => {
  const {
    BASE_URL,
    BETTER_AUTH_SECRET,
    BASE_CLIENT_URL,
    RESEND_API_KEY,
    RESEND_EMAIL_FROM,
  } = env<Env>(context);

  if (
    !BASE_URL ||
    !BETTER_AUTH_SECRET ||
    !BASE_CLIENT_URL ||
    !RESEND_API_KEY ||
    !RESEND_EMAIL_FROM
  ) {
    throw new Error(
      "Missing environment variablesL: BASE_URL, BETTER_AUTH_SECRET, BASE_CLIENT_URL, RESEND_API_KEY, RESEND_EMAIL_FROM"
    );
  }

  if (!resend) {
    resend = new Resend(RESEND_API_KEY);
  }

  const options = optionsWithDrizzleAdapter(
    db,
    "sqlite",
    schema,
    BASE_URL,
    BETTER_AUTH_SECRET,
    {
      emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        async sendResetPassword({ user, url }) {
          await resend.emails.send({
            from: RESEND_EMAIL_FROM,
            to: user.email,
            subject: "Reset your password",
            text: `Hey ${user.name}, here is your password reset link: ${url}`,
            html: `<p>Hey ${user.name},</p><p>Here is your password reset link: <a href="${url}">${url}</a></p>`,
          });
        },
      },
      emailVerification: {
        async sendVerificationEmail({ user, url, token }) {
          await resend.emails.send({
            from: RESEND_EMAIL_FROM,
            to: user.email,
            subject: "Verify your email address",
            text: `Hey ${user.name}, verify your email address, please: ${url}`,
            html: `<p>Hey ${user.name},</p><p>Verify your email address, please: <a href="${url}">${url}</a></p>`,
          });
        },
      },
      trustedOrigins: [BASE_CLIENT_URL],
      basePath: "/auth",
    }
  );

  return getAuthInstance(options);
};
