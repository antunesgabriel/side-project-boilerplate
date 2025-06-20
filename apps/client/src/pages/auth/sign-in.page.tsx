import { useState } from "react";
import {
  RiErrorWarningFill,
  RiEyeLine,
  RiEyeOffLine,
  RiInformationFill,
  RiLoaderLine,
} from "@remixicon/react";
import { Link, useLocation, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";

import * as Divider from "@repo/ui/components/ui/divider";
import * as FancyButton from "@repo/ui/components/ui/fancy-button";
import * as LinkButton from "@repo/ui/components/ui/link-button";
import * as Input from "@repo/ui/components/ui/input";
import * as Label from "@repo/ui/components/ui/label";
import * as SocialButton from "@repo/ui/components/ui/social-button";
import * as Hint from "@repo/ui/components/ui/hint";
import * as Alert from "@repo/ui/components/ui/alert";

import { AUTH_ERROR_MESSAGES, signIn } from "~/config/auth";
import IconGoogle from "~/assets/google.svg?react";
import Logo from "~/assets/logo-two.svg?react";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(3, "Password must be at least 3 characters long"),
});

type FormValues = z.infer<typeof formSchema>;

export function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [alertErrorMessage, setAlertErrorMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { control, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signInWithGoogle = async () => {
    setIsLoading(true);

    const { error } = await signIn
      .social({
        provider: "google",
        callbackURL: `${BASE_URL}/`,
      })
      .finally(() => setIsLoading(false));

    if (error) {
      const errorMessage = error.code
        ? AUTH_ERROR_MESSAGES[error.code as keyof typeof AUTH_ERROR_MESSAGES]
        : "Sorry, something went wrong. Please try again later.";

      setAlertErrorMessage(errorMessage);

      return;
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    setIsLoading(true);
    setAlertErrorMessage(undefined);

    const state = new URLSearchParams(location.search).get("state") ?? "";

    const { error } = await signIn
      .email(
        {
          email: values.email,
          password: values.password,
        },
        { onSuccess: () => navigate(`/${state}`) },
      )
      .finally(() => setIsLoading(false));

    if (error) {
      const errorMessage = error.code
        ? AUTH_ERROR_MESSAGES[error.code as keyof typeof AUTH_ERROR_MESSAGES]
        : "Sorry, something went wrong. Please try again later.";

      setAlertErrorMessage(errorMessage);

      return;
    }
  };

  return (
    <main className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col gap-5 p-7 w-full max-w-[400px] shrink-0 bg-bg-white-0">
        <Logo className="mx-auto size-14 fill-primary-base text-primary-base" />

        <div className="text-center">
          <div className="text-title-h6 text-text-strong-950">Welcome back</div>
          <div className="text-paragraph-sm text-text-sub-600">
            Please enter your details to login.
          </div>
        </div>

        <SocialButton.Root
          mode="stroke"
          onClick={signInWithGoogle}
          disabled={isLoading}
        >
          <SocialButton.Icon as={IconGoogle} />
          Login with Google
          {isLoading && (
            <SocialButton.Icon as={RiLoaderLine} className="animate-spin" />
          )}
        </SocialButton.Root>
        <Divider.Root variant="line-text">OR</Divider.Root>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
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
                  <div className="flex justify-between items-center">
                    <Label.Root htmlFor="password">Password</Label.Root>
                    <LinkButton.Root variant="gray" size="small">
                      <Link to="/auth/forget-password">Forgot?</Link>
                    </LinkButton.Root>
                  </div>

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
                </div>
              )}
            />
          </div>

          <FancyButton.Root
            variant="primary"
            type="submit"
            disabled={isLoading}
          >
            Login
            {isLoading && (
              <FancyButton.Icon as={RiLoaderLine} className="animate-spin" />
            )}
          </FancyButton.Root>
        </form>

        <div className="flex gap-1 justify-center text-paragraph-sm text-text-sub-600">
          Don’t have an account?
          <LinkButton.Root variant="black" size="medium" asChild>
            <Link to="/auth/sign-up">Register</Link>
          </LinkButton.Root>
        </div>
      </div>
    </main>
  );
}
