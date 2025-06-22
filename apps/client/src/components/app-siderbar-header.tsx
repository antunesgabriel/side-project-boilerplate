import { Link } from "react-router";
import { RiSupabaseFill, RiCloseLargeLine } from "@remixicon/react";
import { AnimatePresence, motion } from "motion/react";

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@repo/ui/components/blocks/sidebar";
import * as Button from "@repo/ui/components/ui/button";
import { useIsMobile } from "@repo/ui/hooks/use-is-mobile";

export function AppSidebarHeader() {
  const { open, toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();

  return (
    <SidebarHeader>
      <SidebarMenu>
        <AnimatePresence initial={false}>
          <SidebarMenuItem className="flex gap-2 justify-between items-center transition-all">
            <SidebarMenuButton asChild size="lg">
              <Link to="/">
                <div className="flex justify-center items-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground aspect-square size-8">
                  <RiSupabaseFill className="size-4" />
                </div>

                <div className="grid flex-1 text-sm leading-tight text-left">
                  <span className="truncate text-label-sm text-text-strong-950">
                    Company
                  </span>
                  <span className="truncate text-paragraph-xs">v0.0.1</span>
                </div>
              </Link>
            </SidebarMenuButton>

            {open && isMobile ? (
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
                  <Button.Icon as={RiCloseLargeLine} />
                </Button.Root>
              </motion.div>
            ) : null}
          </SidebarMenuItem>
        </AnimatePresence>
      </SidebarMenu>
    </SidebarHeader>
  );
}
