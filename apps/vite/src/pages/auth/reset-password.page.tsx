import { useEffect, useState } from "react";
import {
  RiErrorWarningFill,
  RiEyeLine,
  RiEyeOffLine,
  RiInformationFill,
  RiLoaderLine,
} from "@remixicon/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";

import * as FancyButton from "@repo/ui/components/ui/fancy-button";
import * as Input from "@repo/ui/components/ui/input";
import * as Label from "@repo/ui/components/ui/label";
import * as Hint from "@repo/ui/components/ui/hint";
import * as Alert from "@repo/ui/components/ui/alert";
import { LevelBar } from "@repo/ui/components/blocks/level-bar";

import { resetPassword, AUTH_ERROR_MESSAGES } from "~/config/auth";
import Logo from "~/assets/logo-two.svg?react";

const formSchema = z
  .object({
    password: z
      .string({ required_error: "Password is required" })
      .trim()
      .min(8, "Password must be at least 8 characters long")
      .max(50, "Password must be at most 50 characters long"),
    confirmPassword: z
      .string({ required_error: "Confirm password is required" })
      .trim()
      .min(8, "Confirm password must be at least 8 characters long"),
    token: z.string().min(1, "Token is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [alertErrorMessage, setAlertErrorMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { search } = useLocation();

  const { control, handleSubmit, setValue } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      password: "",
      confirmPassword: "",
      token: "",
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(search);

    const token = params.get("token");
    if (!token) {
      setAlertErrorMessage("Invalid reset password token");

      return;
    }

    setValue("token", token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    setIsLoading(true);
    setAlertErrorMessage(undefined);

    const { error } = await resetPassword(
      {
        newPassword: values.password,
        token: values.token,
      },
      {
        onSuccess() {
          navigate("/auth/sign-in");
        },
      },
    ).finally(() => setIsLoading(false));

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
          <div className="text-title-h6 text-text-strong-950">
            Set new password
          </div>
          <div className="text-paragraph-sm text-text-sub-600">
            Must be at least 8 characters long.
          </div>
        </div>

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
            Set password
            {isLoading && (
              <FancyButton.Icon as={RiLoaderLine} className="animate-spin" />
            )}
          </FancyButton.Root>
        </form>
      </div>
    </main>
  );
}
