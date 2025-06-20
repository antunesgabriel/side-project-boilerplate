import { Link } from "react-router";
import { RiSideBarLine, RiSupabaseFill } from "@remixicon/react";
import { AnimatePresence, motion } from "motion/react";

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@repo/ui/components/blocks/sidebar";
import * as Button from "@repo/ui/components/ui/button";

export function AppSidebarHeader() {
  const { open, toggleSidebar } = useSidebar();

  return (
    <SidebarHeader>
      <SidebarMenu>
        <AnimatePresence initial={false}>
          <SidebarMenuItem>
            {!open ? (
              <motion.div
                initial={{ opacity: 0, scale: 0, marginBottom: 0 }}
                animate={{ opacity: 1, scale: 1, marginBottom: 8 }}
                exit={{ opacity: 0, scale: 0, marginBottom: 0 }}
              >
                <SidebarMenuButton
                  size="lg"
                  className="flex items-center justify-center"
                  tooltip="Toggle sidebar"
                  onClick={toggleSidebar}
                >
                  <RiSideBarLine className="!size-5" />
                </SidebarMenuButton>
              </motion.div>
            ) : null}
          </SidebarMenuItem>
        </AnimatePresence>

        <AnimatePresence initial={false}>
          <SidebarMenuItem className="transition-all flex items-center gap-2 justify-between">
            <SidebarMenuButton asChild size="lg">
              <Link to="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <RiSupabaseFill className="size-4" />
                </div>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate text-label-sm text-text-strong-950">
                    SideAntunes
                  </span>
                  <span className="truncate text-paragraph-xs">v0.0.1</span>
                </div>
              </Link>
            </SidebarMenuButton>

            {open ? (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <Button.Root
                  onClick={toggleSidebar}
                  size="small"
                  mode="ghost"
                  variant="neutral"
                >
                  <Button.Icon as={RiSideBarLine} />
                </Button.Root>
              </motion.div>
            ) : null}
          </SidebarMenuItem>
        </AnimatePresence>
      </SidebarMenu>
    </SidebarHeader>
  );
}
