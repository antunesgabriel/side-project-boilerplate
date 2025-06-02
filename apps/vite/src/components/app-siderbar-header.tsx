import { Link } from "react-router";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@repo/ui/components/blocks/sidebar";

import Logo from "~/assets/logo-two.svg?react";

export function AppSidebarHeader() {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            className="px-1.5 space-x-1 w-full"
            asChild
          >
            <Link to="/">
              <div className="shrink-0 size-8">
                <Logo className="size-8 text-primary-base" />
              </div>

              <div>
                <div className="text-label-md text-text-strong-950">
                  Sidesaas
                </div>
                <div className="text-paragraph-xs text-text-sub-600">
                  v0.0.1
                </div>
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
