import { useState } from "react";
import { Link } from "react-router";
import {
  RiErrorWarningFill,
  RiInformationFill,
  RiLoaderLine,
  RiMailLine,
  RiUserLine,
} from "@remixicon/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";

import * as FancyButton from "@repo/ui/components/ui/fancy-button";
import * as Input from "@repo/ui/components/ui/input";
import * as Label from "@repo/ui/components/ui/label";
import * as Hint from "@repo/ui/components/ui/hint";
import * as Alert from "@repo/ui/components/ui/alert";
import * as Button from "@repo/ui/components/ui/button";

import { forgetPassword, AUTH_ERROR_MESSAGES } from "~/config/auth";
import Logo from "~/assets/logo-two.svg?react";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type FormValues = z.infer<typeof formSchema>;

export function ForgetPasswordPage() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [alertErrorMessage, setAlertErrorMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    setIsLoading(true);
    setAlertErrorMessage(undefined);

    const { error } = await forgetPassword(
      {
        email: values.email,
        redirectTo: `${BASE_URL}/auth/reset-password`,
      },
      {
        onSuccess() {
          setShowSuccessMessage(true);
        },
      }
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
    <>
      <header className="flex gap-6 justify-between items-center pt-2.5 pb-3.5 mx-auto w-full lg:py-0">
        <Link to="/" className="shrink-0">
          <Logo className="size-10 fill-primary-base text-primary-base" />
        </Link>
        <nav className="flex gap-3 items-center">
          <span className="text-right text-paragraph-sm text-text-sub-600">
            Remembered your password?
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
              Forgot your password?
            </div>
            <div className="text-paragraph-sm text-text-sub-600">
              Please, enter your email to reset your password.
            </div>
          </div>

          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-3">
              {!!showSuccessMessage && (
                <Alert.Root
                  className="w-full duration-300 animate-in fade-in"
                  status="information"
                >
                  <Alert.Icon as={RiErrorWarningFill} />
                  We just sent an email to reset your password.
                  <button
                    type="button"
                    onClick={() => setShowSuccessMessage(false)}
                  >
                    <Alert.CloseIcon />
                  </button>
                </Alert.Root>
              )}

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
                        <Input.Icon as={RiMailLine} />

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
            </div>

            <FancyButton.Root
              variant="primary"
              type="submit"
              disabled={isLoading}
            >
              Reset Password
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
