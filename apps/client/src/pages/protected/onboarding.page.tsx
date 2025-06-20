import { useNavigate } from "react-router";
import { RiLogoutBoxRLine } from "@remixicon/react";

import * as Button from "@repo/ui/components/ui/button";

import { signOut } from "~/config/auth";

export function OnboardingPage() {
  const navigate = useNavigate();

  const onSignOut = async () => {
    await signOut();

    navigate("/auth/sign-in", { replace: true });
  };

  return (
    <main className="flex flex-col flex-1">
      Onboarding
      <Button.Root variant="primary" onClick={onSignOut}>
        <Button.Icon as={RiLogoutBoxRLine} />
        Sign out
      </Button.Root>
    </main>
  );
}
