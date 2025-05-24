import { optionsWithDrizzleAdapter, getAuthInstance } from "@repo/auth/auth";

import { db } from "~/config/db";

const baseUrl = process.env.BASE_URL!;
const secret = process.env.BETTER_AUTH_SECRET!;
const baseClientUrl = process.env.BASE_CLIENT_URL!;

const options = optionsWithDrizzleAdapter(db, "sqlite", {}, baseUrl, secret, {
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    async sendResetPassword(data, request) {
      // TODO: implement with resend or other service
      /*
          await resend.emails.send({
                  from,
                  to: data.user.email,
                  subject: "Reset your password",
                  text: `Hey ${data.user.name}, here is your password reset link: ${url}`,
                  // Doesn't work with edge runtime atm.
                  // See https://github.com/resend/react-email/issues/1630
                  // react: reactResetPasswordEmail({
                  //     username: user.name,
                  //     resetLink: url,
                  // }),
              });
          */
    },
  },
  emailVerification: {
    async sendVerificationEmail({ user, url }) {
      // TODO: implement with resend or other service
      // await resend.emails.send({
      //   from,
      //   to: user.email,
      //   subject: "Verify your email address",
      //   text: `Hey ${user.name}, verify your email address, please: ${url}`,
      //   // Doesn't work with edge runtime atm.
      //   // See https://github.com/resend/react-email/issues/1630
      //   // react: reactVerifyEmailEmail({
      //   //     username: user.name,
      //   //     verificationLink: url,
      //   // }),
      // });
    },
  },
  trustedOrigins: [baseClientUrl],
});

export const auth = getAuthInstance(options);

export type AuthType = {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
};
