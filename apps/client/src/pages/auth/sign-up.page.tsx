import { useState } from "react";
import {
  RiErrorWarningFill,
  RiEyeLine,
  RiEyeOffLine,
  RiInformationFill,
  RiLoaderLine,
  RiUserLine,
} from "@remixicon/react";
import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";

import * as Divider from "@repo/ui/components/ui/divider";
import * as FancyButton from "@repo/ui/components/ui/fancy-button";
import * as Input from "@repo/ui/components/ui/input";
import * as Label from "@repo/ui/components/ui/label";
import * as SocialButton from "@repo/ui/components/ui/social-button";
import * as Alert from "@repo/ui/components/ui/alert";
import * as Hint from "@repo/ui/components/ui/hint";
import * as Button from "@repo/ui/components/ui/button";
import { LevelBar } from "@repo/ui/components/blocks/level-bar";

import { signUp, AUTH_ERROR_MESSAGES, signIn } from "~/config/auth";
import IconGoogle from "~/assets/google.svg?react";
import IconLinkedin from "~/assets/linkedin.svg?react";
import IconGithub from "~/assets/github.svg?react";
import Logo from "~/assets/logo-two.svg?react";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const formSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z
      .string({ required_error: "Password is required" })
      .trim()
      .min(8, "Password must be at least 8 characters long")
      .max(50, "Password must be at most 50 characters long"),
    confirmPassword: z
      .string({ required_error: "Confirm password is required" })
      .trim()
      .min(8, "Confirm password must be at least 8 characters long"),
    name: z
      .string()
      .min(3, "Name must be at least 2 characters long")
      .max(50, "Name must be at most 50 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alertErrorMessage, setAlertErrorMessage] = useState<string>();

  const { control, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();

  const signUpWithGoogle = async () => {
    setIsLoading(true);

    const { error, data } = await signIn
      .social({
        provider: "google",
        callbackURL: `${BASE_URL}/onboarding`,
      })
      .finally(() => setIsLoading(false));

    if (error) {
      const errorMessage = error.code
        ? AUTH_ERROR_MESSAGES[error.code as keyof typeof AUTH_ERROR_MESSAGES]
        : "Sorry, something went wrong. Please try again later.";

      setAlertErrorMessage(errorMessage);

      return;
    }

    if (!data?.url) return;

    window.location.href = data.url;
  };

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    setIsLoading(true);
    setAlertErrorMessage(undefined);

    const url = new URL(BASE_URL + "/auth/sign-in");
    url.searchParams.set("state", "onboarding");

    const { error } = await signUp
      .email(
        {
          name: values.name,
          email: values.email,
          password: values.password,
          callbackURL: url.toString(),
        },
        { onSuccess: () => navigate("/auth/verify-email") }
      )
      .finally(() => setIsLoading(false));

    if (error) {
      const errorMessage =
        error.code &&
        AUTH_ERROR_MESSAGES[error.code as keyof typeof AUTH_ERROR_MESSAGES]
          ? AUTH_ERROR_MESSAGES[error.code as keyof typeof AUTH_ERROR_MESSAGES]
          : "Sorry, something went wrong. Please try again later.";

      setAlertErrorMessage(errorMessage);

      return;
    }
  };

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
          <div className="relative flex size-[68px] mx-auto shrink-0 items-center justify-center rounded-full backdrop-blur-xl lg:size-24 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-b before:from-neutral-500 before:to-transparent before:opacity-10 after:absolute after:inset-0 after:rounded-full after:bg-gradient-to-b after:from-neutral-500 after:to-transparent after:opacity-[.16] after:mask-exclude after:p-px">
            <div className="relative z-10 flex size-12 items-center justify-center rounded-full bg-bg-white-0 shadow-regular-xs ring-1 ring-inset ring-stroke-soft-200 lg:size-16">
              <RiUserLine className="size-6 text-text-sub-600 lg:size-8" />
            </div>
          </div>

          <div className="text-center">
            <div className="text-title-h6 text-text-strong-950">
              Create a new account
            </div>
            <div className="text-paragraph-sm text-text-sub-600">
              Enter your details to register.
            </div>
          </div>

          <div className="grid grid-flow-col auto-cols-fr gap-3 w-full">
            <SocialButton.Root
              mode="stroke"
              onClick={signUpWithGoogle}
              disabled={isLoading}
              brand="google"
            >
              {isLoading ? (
                <SocialButton.Icon as={RiLoaderLine} className="animate-spin" />
              ) : (
                <SocialButton.Icon as={IconGoogle} />
              )}
            </SocialButton.Root>

            <SocialButton.Root mode="stroke" brand="linkedin">
              <SocialButton.Icon as={IconLinkedin} />
            </SocialButton.Root>

            <SocialButton.Root mode="stroke">
              <SocialButton.Icon as={IconGithub} />
            </SocialButton.Root>
          </div>

          <Divider.Root variant="line-text">OR</Divider.Root>

          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col space-y-3">
              {!!alertErrorMessage && (
                <Alert.Root
                  className="w-full duration-300 animate-in fade-in"
                  status="error"
                >
                  <Alert.Icon as={RiErrorWarningFill} />
                  {alertErrorMessage}
                  <button
                    type="button"
                    onClick={() => setAlertErrorMessage(undefined)}
                  >
                    <Alert.CloseIcon />
                  </button>
                </Alert.Root>
              )}

              <Controller
                control={control}
                name="name"
                render={({ field, formState: { errors } }) => (
                  <div className="flex flex-col gap-1">
                    <Label.Root htmlFor="name">Name</Label.Root>
                    <Input.Root hasError={!!errors.name}>
                      <Input.Wrapper>
                        <Input.Input
                          id="name"
                          placeholder="Jhon  Doe"
                          {...field}
                        />
                      </Input.Wrapper>
                    </Input.Root>

                    {!!errors.name && (
                      <Hint.Root hasError>
                        <Hint.Icon as={RiInformationFill} />
                        {errors.name.message}
                      </Hint.Root>
                    )}
                  </div>
                )}
              />

              <Controller
                control={control}
                name="email"
                render={({ field, formState: { errors } }) => (
                  <div className="flex flex-col gap-1">
                    <Label.Root htmlFor="email">Email Address</Label.Root>
                    <Input.Root hasError={!!errors.email}>
                      <Input.Wrapper>
                        <Input.Input
                          id="email"
                          type="email"
                          placeholder="hello@alignui.com"
                          {...field}
                        />
                      </Input.Wrapper>
                    </Input.Root>

                    {!!errors.email && (
                      <Hint.Root hasError>
                        <Hint.Icon as={RiInformationFill} />
                        {errors.email.message}
                      </Hint.Root>
                    )}
                  </div>
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field, formState: { errors } }) => (
                  <div className="flex flex-col gap-1">
                    <Label.Root htmlFor="password">Password</Label.Root>

                    <Input.Root hasError={!!errors.password}>
                      <Input.Wrapper>
                        <Input.Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••••"
                          {...field}
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

                    {!!errors.password && (
                      <Hint.Root hasError>
                        <Hint.Icon as={RiInformationFill} />
                        {errors.password.message}
                      </Hint.Root>
                    )}

                    <div className="flex flex-col gap-2 pt-1.5">
                      <LevelBar levels={3} value={field.value} />
                    </div>
                  </div>
                )}
              />

              <Controller
                control={control}
                name="confirmPassword"
                render={({ field, formState: { errors } }) => (
                  <div className="flex flex-col gap-1">
                    <Label.Root htmlFor="confirm-password">
                      Confirm Password
                    </Label.Root>

                    <Input.Root hasError={!!errors.confirmPassword}>
                      <Input.Wrapper>
                        <Input.Input
                          id="confirm-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••••"
                          {...field}
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

                    {!!errors.confirmPassword && (
                      <Hint.Root hasError>
                        <Hint.Icon as={RiInformationFill} />
                        {errors.confirmPassword.message}
                      </Hint.Root>
                    )}
                  </div>
                )}
              />
            </div>

            <FancyButton.Root
              variant="primary"
              type="submit"
              disabled={isLoading}
            >
              Create Account
              {isLoading && (
                <FancyButton.Icon as={RiLoaderLine} className="animate-spin" />
              )}
            </FancyButton.Root>
          </form>
        </div>
      </div>
    </>
  );
}
