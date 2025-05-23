import Logo from "~/assets/logo-two.svg?react";

import ThemeSwitch from "./theme-switch";

export default function Header() {
  return (
    <div className="border-b border-stroke-soft-200">
      <header className="flex items-center justify-between max-w-5xl px-5 mx-auto h-14">
        <a
          href="/"
          className="flex items-center gap-2 text-label-md text-text-strong-950"
        >
          <Logo className="text-primary-base size-9" />
          SideSaas
        </a>

        <ThemeSwitch />
      </header>
    </div>
  );
}
