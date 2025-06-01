import { Link } from "react-router";
import { motion } from "motion/react";
import { RiSidebarFoldLine } from "@remixicon/react";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  useSidebar,
} from "@repo/ui/components/blocks/sidebar";
import * as CompactButton from "@repo/ui/components/ui/compact-button";

import Logo from "~/assets/logo.svg?react";

export function AppSidebarHeader() {
  const { toggleSidebar, open } = useSidebar();

  return (
    <SidebarHeader className="py-5">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            className="flex gap-3 items-center p-3 w-full text-left whitespace-nowrap outline-none focus:outline-none transition-all-default"
            asChild
          >
            <Link to="/">
              <div className="size-10 shrink-0 text-primary-base">
                <Logo className="size-10" />
              </div>

              <div className="flex gap-3 items-center transition duration-300 w-[172px] shrink-0">
                <div className="flex-1 space-y-1">
                  <div className="text-label-sm text-text-strong-950">
                    Sidesaas
                  </div>
                  <div className="text-paragraph-xs text-text-sub-600">
                    v0.0.1
                  </div>
                </div>
              </div>
            </Link>
          </SidebarMenuButton>

          <motion.div
            animate={{
              opacity: open ? 1 : 0,
              scale: open ? 1 : 0,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            <SidebarMenuAction
              className="top-[0.8rem] right-2 text-text-sub-600"
              asChild
            >
              <CompactButton.Root onClick={toggleSidebar} variant="ghost">
                <CompactButton.Icon as={RiSidebarFoldLine} />
              </CompactButton.Root>
            </SidebarMenuAction>
          </motion.div>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
