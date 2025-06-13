import { NavLink } from "react-router";
import {
  RiApps2Line,
  RiArrowRightSLine,
  RiBarChartBoxLine,
  RiHistoryLine,
  RiLayoutGridLine,
  RiPriceTag3Line,
  RiShoppingBag2Line,
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
  SidebarRail,
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
    name: "Analytics",
    url: "/analytics",
    icon: RiBarChartBoxLine,
  },
  {
    name: "Products",
    url: "/products",
    icon: RiShoppingBag2Line,
  },
  {
    name: "Orders",
    url: "/orders",
    icon: RiHistoryLine,
  },
  {
    name: "Discounts",
    url: "/discounts",
    icon: RiPriceTag3Line,
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
                      className="size-4 opacity-0 transition-all duration-200 ease-out group-data-[active=true]:opacity-100 text-text-soft-400"
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

      <SidebarRail />
    </Sidebar>
  );
}
