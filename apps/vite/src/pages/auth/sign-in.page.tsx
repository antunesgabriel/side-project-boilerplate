import { useState } from "react";
import {
  RiErrorWarningFill,
  RiEyeLine,
  RiEyeOffLine,
  RiInformationFill,
} from "@remixicon/react";
import { Link } from "react-router";
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

import { authClient, AUTH_ERROR_MESSAGES } from "~/config/auth";
import IconGoogle from "~/assets/google.svg?react";
import Logo from "~/assets/logo-two.svg?react";

/*

await authClient.signIn.email({
    email: "test@user.com",
    password: "password1234"
})

*/

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

  const { control, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    setIsLoading(true);
    setAlertErrorMessage(undefined);

    const { error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
    });

    if (error) {
      const errorMessage = error.code
        ? AUTH_ERROR_MESSAGES[error.code as keyof typeof AUTH_ERROR_MESSAGES]
        : "Sorry, something went wrong. Please try again later.";

      setAlertErrorMessage(errorMessage);
    }

    if (error?.message) {
      setAlertErrorMessage(error.message);
    }

    setIsLoading(false);
  };

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

        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
            {!!alertErrorMessage && (
              <Alert.Root
                className="w-full animate-in fade-in duration-300"
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
                  <div className="flex items-center justify-between">
                    <Label.Root htmlFor="password">Password</Label.Root>
                    <LinkButton.Root variant="gray" size="small">
                      <Link to="/auth/forgot-password">Forgot?</Link>
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
          </FancyButton.Root>
        </form>

        <div className="flex justify-center gap-1 text-paragraph-sm text-text-sub-600">
          Don’t have an account?
          <LinkButton.Root variant="black" size="medium" asChild>
            <Link to="/auth/sign-up">Register</Link>
          </LinkButton.Root>
        </div>
      </div>
    </main>
  );
}
