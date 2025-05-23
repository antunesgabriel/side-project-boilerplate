import { RiGithubFill } from "@remixicon/react";

import * as Button from "@repo/ui/components/ui/button";
import { Link } from "react-router";

export function WelcomePage() {
  return (
    <main className="flex flex-col flex-1">
      <div className="container flex-1 px-5 mx-auto">
        <div className="flex flex-col items-center mt-48">
          <h1 className="max-w-3xl text-center text-balance text-title-h3 text-text-strong-950">
            Quick Starter AlignUI Template with Next.js & Typescript
          </h1>

          <div className="flex gap-4 mt-6">
            <Button.Root mode="lighter">
              <Button.Icon as={RiGithubFill} />
              Button
            </Button.Root>
            <Button.Root variant="neutral" asChild>
              <a
                href="https://github.com/alignui/alignui-nextjs-typescript-starter"
                target="_blank"
              >
                <Button.Icon as={RiGithubFill} />
                Give a star
              </a>
            </Button.Root>

            <Button.Root variant="neutral" mode="stroke" asChild>
              <a href="https://alignui.com/docs" target="_blank">
                Read our docs
              </a>
            </Button.Root>
          </div>

          <div className="mt-12 w-full max-w-xl">
            <h2 className="text-lg font-semibold text-text-primary">
              What&apos;s Included:
            </h2>
            <ul className="flex flex-col gap-2 mt-3 ml-6 font-mono font-medium list-disc text-paragraph-sm text-text-sub-600">
              <li>Tailwind setup with AlignUI tokens.</li>
              <li>
                Base components are stored in{" "}
                <code className="py-0.5 px-1 font-semibold rounded bg-bg-weak-50 text-text-strong-950">
                  @repo/ui/components/ui
                </code>{" "}
                folder.
              </li>
              <li>
                Utils are stored in{" "}
                <code className="py-0.5 px-1 font-semibold rounded bg-bg-weak-50 text-text-strong-950">
                  @repo/ui/utils
                </code>{" "}
                folder.
              </li>
              <li>
                Custom hooks are stored in{" "}
                <code className="py-0.5 px-1 font-semibold rounded bg-bg-weak-50 text-text-strong-950">
                  @repo/ui/hooks
                </code>{" "}
                folder.
              </li>
              <li>Dark mode setup.</li>
              <li>Inter font setup.</li>
            </ul>
          </div>

          <div className="mt-12 w-full max-w-xl">
            <h2 className="text-lg font-semibold text-text-primary">Pages</h2>
            <ul className="flex flex-col gap-2 mt-3 ml-6 font-mono font-medium list-disc text-paragraph-sm text-text-sub-600">
              <li>
                SignIn page in{" "}
                <Link
                  className="text-primary-base hover:underline"
                  to="/auth/sign-in"
                >
                  /auth/sign-in
                </Link>
                .
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
