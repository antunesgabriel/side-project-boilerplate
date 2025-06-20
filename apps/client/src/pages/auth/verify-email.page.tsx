import { Navigate } from "react-router";

import { useSession } from "~/config/auth";
import Logo from "~/assets/logo-two.svg?react";

export function VerifyEmailPage() {
  const { data: session } = useSession();

  if (session?.user?.emailVerified) return <Navigate to="/" replace />;

  return (
    <main className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col gap-5 p-7 w-full max-w-[400px] shrink-0 bg-bg-white-0">
        <Logo className="mx-auto size-14 fill-primary-base text-primary-base" />

        <div className="text-center">
          <div className="text-title-h6 text-text-strong-950">
            Please verify your email
          </div>
          <div className="text-paragraph-sm text-text-sub-600">
            We just sent you an email to your email address. <br />
            Please click the link in the email to verify your account.
          </div>
        </div>
      </div>
    </main>
  );
}
