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
  SidebarMenuItemActiveIndicator,
  SidebarMenuAction,
} from "@repo/ui/components/blocks/sidebar";

import { AppSidebarHeader } from "./app-siderbar-header";
import { AppSidebarUserProfile } from "./app-sidebar-user-profile";

const main = [
  {
    name: "Overview",
    url: "#",
    icon: RiLayoutGridLine,
  },
  {
    name: "Analytics",
    url: "#",
    icon: RiBarChartBoxLine,
  },
  {
    name: "Products",
    url: "#",
    icon: RiShoppingBag2Line,
  },
  {
    name: "Orders",
    url: "#",
    icon: RiHistoryLine,
  },
  {
    name: "Discounts",
    url: "#",
    icon: RiPriceTag3Line,
  },
  {
    name: "Apps",
    url: "#",
    icon: RiApps2Line,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="bg-bg-weak-50">
      <AppSidebarHeader />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarMenu>
            {main.map((item, idx) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton isActive={idx === 0} asChild>
                  <NavLink to={`/projects/${item.url}`}>
                    <SidebarMenuItemActiveIndicator />
                    <item.icon />
                    <span>{item.name}</span>

                    <SidebarMenuAction
                      className="size-5 opacity-0 transition-all duration-200 ease-out group-data-[active=true]:opacity-100 text-text-soft-400"
                      disabled
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
