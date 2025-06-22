import { RiMenu3Line } from "@remixicon/react";
import { Link } from "react-router";

import * as Avatar from "@repo/ui/components/ui/avatar";
import * as Button from "@repo/ui/components/ui/button";
import { useSidebar } from "@repo/ui/components/blocks/sidebar";

import { User } from "~/config/auth";

export function MobileHeader({ user }: { user?: User }) {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="flex justify-between items-center px-4 w-full border-b md:hidden h-[60px] border-stroke-soft-200">
      <Link to="/" className="shrink-0">
        <Avatar.Root size="40" color="purple" placeholderType="user">
          {user?.image ? <Avatar.Image src={user?.image} /> : null}
        </Avatar.Root>
      </Link>

      <div className="flex gap-3">
        <div className="flex w-1 shrink-0 items-center before:h-full before:w-px before:bg-stroke-soft-200" />

        <Button.Root variant="neutral" mode="ghost" onClick={toggleSidebar}>
          <Button.Icon as={RiMenu3Line} className="size-5" />
        </Button.Root>
      </div>
    </div>
  );
}
