import { Resend } from "resend";

import { optionsWithDrizzleAdapter, getAuthInstance } from "@repo/auth/auth";

import { db } from "~/config/db";

const resend = new Resend(process.env.RESEND_API_KEY!);

const baseUrl = process.env.BASE_URL!;
const secret = process.env.BETTER_AUTH_SECRET!;
const baseClientUrl = process.env.BASE_CLIENT_URL!;

const options = optionsWithDrizzleAdapter(db, "sqlite", {}, baseUrl, secret, {
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    async sendResetPassword({ user, url }) {
      await resend.emails.send({
        from: process.env.RESEND_EMAIL_FROM!,
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
        from: process.env.RESEND_EMAIL_FROM!,
        to: user.email,
        subject: "Verify your email address",
        text: `Hey ${user.name}, verify your email address, please: ${url}`,
        html: `<p>Hey ${user.name},</p><p>Verify your email address, please: <a href="${url}">${url}</a></p>`,
      });
    },
  },
  trustedOrigins: [baseClientUrl],
});

export const auth = getAuthInstance(options);

export type AuthType = {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
};
