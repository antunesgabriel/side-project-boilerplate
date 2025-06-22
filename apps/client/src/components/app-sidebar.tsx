import { NavLink } from "react-router";
import {
  RiApps2Line,
  RiArrowRightSLine,
  RiCalendarLine,
  RiLayoutGridLine,
  RiGroupLine,
} from "@remixicon/react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarMenuAction,
  SidebarMenuItemActiveIndicator,
} from "@repo/ui/components/blocks/sidebar";

import { AppSidebarHeader } from "./app-siderbar-header";
import { AppSidebarUserProfile } from "./app-sidebar-user-profile";

const main = [
  {
    name: "Overview",
    url: "/",
    icon: RiLayoutGridLine,
  },
  {
    name: "Calendar",
    url: "/calendar",
    icon: RiCalendarLine,
  },
  {
    name: "Team",
    url: "/team",
    icon: RiGroupLine,
  },
  {
    name: "Apps",
    url: "/apps",
    icon: RiApps2Line,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <AppSidebarHeader />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarMenu>
            {main.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild tooltip={item.name}>
                  <NavLink
                    to={item.url}
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    <SidebarMenuItemActiveIndicator />
                    <item.icon />
                    <span>{item.name}</span>

                    <SidebarMenuAction
                      className="size-4 opacity-0 transition-all duration-200 ease-out group-data-[active=true]:opacity-100 !text-text-soft-400"
                      disabled
                      asChild
                    >
                      <RiArrowRightSLine />
                    </SidebarMenuAction>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <AppSidebarUserProfile />
      </SidebarFooter>
    </Sidebar>
  );
}
