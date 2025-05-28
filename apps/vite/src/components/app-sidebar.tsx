import { Link } from "react-router";
import { RiArtboard2Line, RiMap2Line, RiPieChartLine } from "@remixicon/react";
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
} from "@repo/ui/components/blocks/sidebar";
import * as Divider from "@repo/ui/components/ui/divider";

import Logo from "~/assets/logo.svg?react";

const projects = [
  {
    name: "Design Engineering",
    url: "#",
    icon: RiArtboard2Line,
  },
  {
    name: "Sales & Marketing",
    url: "#",
    icon: RiPieChartLine,
  },
  {
    name: "Travel",
    url: "#",
    icon: RiMap2Line,
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
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarMenu>
            {projects.map((project, idx) => (
              <SidebarMenuItem key={project.name}>
                <SidebarMenuButton
                  className="group relative flex items-center gap-2 whitespace-nowrap rounded-lg py-2 text-text-sub-600 hover:bg-bg-weak-50 transition duration-200 ease-out aria-[current=page]:bg-bg-weak-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 w-full px-3 text-label-sm"
                  isActive={idx === 0}
                  asChild
                >
                  <Link to={`/projects/${project.url}`}>
                    <project.icon />
                    <span>{project.name}</span>
                  </Link>
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
