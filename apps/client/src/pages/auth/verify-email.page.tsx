import { Navigate } from "react-router";
import { RiUserLine } from "@remixicon/react";
import { Link } from "react-router";

import * as Button from "@repo/ui/components/ui/button";

import { useSession } from "~/config/auth";
import Logo from "~/assets/logo-two.svg?react";

export function VerifyEmailPage() {
  const { data: session } = useSession();

  if (session?.user?.emailVerified) return <Navigate to="/" replace />;

  return (
    <>
      <header className="flex gap-6 justify-between items-center pt-2.5 pb-3.5 mx-auto w-full lg:py-0">
        <Link to="/" className="shrink-0">
          <Logo className="size-10 fill-primary-base text-primary-base" />
        </Link>

        <nav className="flex gap-3 items-center">
          <span className="text-right text-paragraph-sm text-text-sub-600">
            Already have an account?
          </span>

          <Button.Root mode="stroke" asChild variant="neutral" size="xsmall">
            <Link to="/auth/sign-in">Login</Link>
          </Button.Root>
        </nav>
      </header>

      <div className="flex flex-1 flex-col py-6 lg:py-24 [@media_(min-height:901px)]:justify-center">
        <div className="flex flex-col gap-6 mx-auto w-full md:translate-x-1.5 max-w-[392px]">
          <div className="relative flex size-[68px] shrink-0 mx-auto items-center justify-center rounded-full backdrop-blur-xl lg:size-24 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-b before:from-neutral-500 before:to-transparent before:opacity-10 after:absolute after:inset-0 after:rounded-full after:bg-gradient-to-b after:from-neutral-500 after:to-transparent after:opacity-[.16] after:mask-exclude after:p-px">
            <div className="relative z-10 flex size-12 items-center justify-center rounded-full bg-bg-white-0 shadow-regular-xs ring-1 ring-inset ring-stroke-soft-200 lg:size-16">
              <RiUserLine className="size-6 text-text-sub-600 lg:size-8" />
            </div>
          </div>

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
      </div>
    </>
  );
}
