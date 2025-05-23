import { RiEyeLine } from "@remixicon/react";

import * as Divider from "@repo/ui/components/ui/divider";
import * as FancyButton from "@repo/ui/components/ui/fancy-button";
import * as LinkButton from "@repo/ui/components/ui/link-button";
import * as Input from "@repo/ui/components/ui/input";
import * as Label from "@repo/ui/components/ui/label";
import * as SocialButton from "@repo/ui/components/ui/social-button";
import IconGoogle from "~/assets/google.svg?react";
import Logo from "~/assets/logo-two.svg?react";

export function SignInPage() {
  return (
    <main className="h-screen w-full flex items-center justify-center">
      <div className="flex w-full max-w-[400px] shrink-0 flex-col gap-5 bg-bg-white-0 p-7">
        <Logo className="mx-auto size-14 fill-primary-base text-primary-base" />

        <div className="text-center">
          <div className="text-title-h6 text-text-strong-950">Welcome back</div>
          <div className="text-paragraph-sm text-text-sub-600">
            Please enter your details to login.
          </div>
        </div>

        <SocialButton.Root mode="stroke">
          <SocialButton.Icon as={IconGoogle} />
          Login with Google
        </SocialButton.Root>
        <Divider.Root variant="line-text">OR</Divider.Root>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <Label.Root htmlFor="email">Email Address</Label.Root>
            <Input.Root>
              <Input.Wrapper>
                <Input.Input
                  id="email"
                  type="email"
                  placeholder="hello@alignui.com"
                />
              </Input.Wrapper>
            </Input.Root>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <Label.Root htmlFor="password">Password</Label.Root>
              <LinkButton.Root variant="gray" size="small">
                Forgot?
              </LinkButton.Root>
            </div>
            <Input.Root>
              <Input.Wrapper>
                <Input.Input
                  id="password"
                  type="password"
                  placeholder="••••••••••"
                />
                <button type="button">
                  <RiEyeLine className="size-5 text-text-soft-400" />
                </button>
              </Input.Wrapper>
            </Input.Root>
          </div>
        </div>

        <FancyButton.Root variant="primary">Login</FancyButton.Root>

        <div className="flex justify-center gap-1 text-paragraph-sm text-text-sub-600">
          Don’t have an account?
          <LinkButton.Root variant="black" size="medium">
            Register
          </LinkButton.Root>
        </div>
      </div>
    </main>
  );
}
