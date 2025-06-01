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
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarMenuItemActiveIndicator,
  SidebarMenuAction,
} from "@repo/ui/components/blocks/sidebar";
import * as Divider from "@repo/ui/components/ui/divider";

import Logo from "~/assets/logo.svg?react";

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
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="flex gap-3 items-center p-3 w-full text-left whitespace-nowrap outline-none focus:outline-none transition-all-default"
            >
              <div className="size-10 shrink-0 text-primary-base">
                <Logo className="size-10" />
              </div>

              <div className="flex gap-3 items-center transition duration-300 w-[172px] shrink-0">
                <div className="flex-1 space-y-1">
                  <div className="text-label-sm">Apex</div>
                  <div className="text-paragraph-xs text-text-sub-600">
                    Finance &amp; Banking
                  </div>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <div className="px-5">
        <Divider.Root />
      </div>

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
      <SidebarFooter />
    </Sidebar>
  );
}
