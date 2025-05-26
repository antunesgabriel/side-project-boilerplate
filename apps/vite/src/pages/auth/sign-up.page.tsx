import { useState } from "react";
import { RiEyeLine, RiEyeOffLine, RiLock2Line } from "@remixicon/react";
import { Link } from "react-router";

import * as Divider from "@repo/ui/components/ui/divider";
import * as FancyButton from "@repo/ui/components/ui/fancy-button";
import * as LinkButton from "@repo/ui/components/ui/link-button";
import * as Input from "@repo/ui/components/ui/input";
import * as Label from "@repo/ui/components/ui/label";
import * as SocialButton from "@repo/ui/components/ui/social-button";
import { cn } from "@ui/utils/cn";

import IconGoogle from "~/assets/google.svg?react";
import Logo from "~/assets/logo-two.svg?react";

const defaultLevelColors = {
  1: "text-error-base",
  2: "text-warning-base",
  3: "text-success-base",
};

function LevelBar({
  levels = 3,
  level = 1,
  levelColors = defaultLevelColors,
  className,
  ...rest
}: {
  level: number;
  levels?: number;
  levelColors?: { [key: number]: string };
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative flex gap-2 overflow-hidden rounded-full",
        levelColors[1],
        className,
        levelColors[level]
      )}
      {...rest}
    >
      {Array.from({ length: levels }, (_, i) => i).map((currentLevel) => (
        <LevelBarItem
          key={currentLevel}
          level={level}
          levels={levels}
          active={currentLevel < level}
        />
      ))}
    </div>
  );
}

function LevelBarItem({
  levels,
  level,
  ...rest
}: {
  active?: boolean;
  level: number;
  levels: number;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="h-1 w-full rounded-full bg-bg-soft-200"
      style={{
        clipPath: "inset(0 round 99px)",
      }}
      {...rest}
    >
      <div
        className="absolute left-0 top-0 h-full w-0 rounded-full bg-current duration-500 ease-out"
        style={{
          transitionProperty: "width",
          width: `calc((100% / ${levels}) * ${level})`,
        }}
      />
    </div>
  );
}

const countTrueCriteria = (criteria: { [key: string]: boolean }): number => {
  return Object.values(criteria).filter((value) => value).length;
};

export function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [criteria, setCriteria] = useState({
    length: false,
    uppercase: false,
    number: false,
  });

  /*
    setCriteria({
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      number: /[0-9]/.test(value),
    });
  */

  const trueCriteriaCount = countTrueCriteria(criteria);

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
            <Label.Root htmlFor="password">Password</Label.Root>

            <Input.Root>
              <Input.Wrapper>
                <Input.Icon as={RiLock2Line} />

                <Input.Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                >
                  {showPassword ? (
                    <RiEyeOffLine className="size-5 text-text-soft-400 group-has-[disabled]:text-text-disabled-300" />
                  ) : (
                    <RiEyeLine className="size-5 text-text-soft-400 group-has-[disabled]:text-text-disabled-300" />
                  )}
                </button>
              </Input.Wrapper>
            </Input.Root>

            <div className="flex flex-col gap-2 pt-1.5">
              <LevelBar levels={3} level={trueCriteriaCount} />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <Label.Root htmlFor="confirm-password">Confirm Password</Label.Root>
            <Input.Root>
              <Input.Wrapper>
                <Input.Icon as={RiLock2Line} />

                <Input.Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••••"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                >
                  {showPassword ? (
                    <RiEyeOffLine className="size-5 text-text-soft-400 group-has-[disabled]:text-text-disabled-300" />
                  ) : (
                    <RiEyeLine className="size-5 text-text-soft-400 group-has-[disabled]:text-text-disabled-300" />
                  )}
                </button>
              </Input.Wrapper>
            </Input.Root>
          </div>
        </div>

        <FancyButton.Root variant="primary">Create Account</FancyButton.Root>

        <div className="flex justify-center gap-1 text-paragraph-sm text-text-sub-600">
          Already have an account?
          <LinkButton.Root variant="black" size="medium" asChild>
            <Link to="/auth/sign-in">Login</Link>
          </LinkButton.Root>
        </div>
      </div>
    </main>
  );
}
