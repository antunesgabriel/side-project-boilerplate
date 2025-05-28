import * as Divider from "@repo/ui/components/ui/divider";

import Logo from "~/assets/logo-two.svg?react";

import ThemeSwitch from "./theme-switch";

export default function Header() {
  return (
    <div>
      <header className="flex justify-between items-center px-5 mx-auto max-w-5xl h-[72px]">
        <a
          href="/"
          className="flex gap-2 items-center text-label-md text-text-strong-950"
        >
          <Logo className="text-primary-base size-9" />
          SideSaas
        </a>

        <ThemeSwitch />
      </header>

      <div className="px-5">
        <Divider.Root />
      </div>
    </div>
  );
}
