import { RiSettings2Line } from "@remixicon/react";
import { Outlet, useLocation, NavLink } from "react-router";

import * as PageHeader from "@repo/ui/components/blocks/page-header";
import * as TabMenuHorizontal from "@repo/ui/components/ui/tab-menu-horizontal";

export function SettingsLayout() {
  const { pathname } = useLocation();

  return (
    <div className="flex relative z-50 flex-col flex-1 self-stretch mx-auto w-full max-w-[1360px]">
      <PageHeader.Root
        title="Settings"
        subtitle="Manage your preferences and configure various options."
        icon={<PageHeader.Icon as={RiSettings2Line} />}
      />

      {/* Settings Tabs Navigation */}
      <TabMenuHorizontal.Root
        defaultValue="/settings"
        value={pathname}
        className="px-4 lg:px-8"
      >
        <TabMenuHorizontal.List>
          <TabMenuHorizontal.Trigger value="/settings" asChild>
            <NavLink to="/settings" replace>
              General
            </NavLink>
          </TabMenuHorizontal.Trigger>

          <TabMenuHorizontal.Trigger value="/settings/profile" asChild>
            <NavLink to="/settings/profile" replace>
              Profile
            </NavLink>
          </TabMenuHorizontal.Trigger>

          <TabMenuHorizontal.Trigger value="/settings/security" asChild>
            <NavLink to="/settings/security" replace>
              Security
            </NavLink>
          </TabMenuHorizontal.Trigger>

          <TabMenuHorizontal.Trigger value="/settings/notifications" asChild>
            <NavLink to="/settings/notifications" replace>
              Notifications
            </NavLink>
          </TabMenuHorizontal.Trigger>

          <TabMenuHorizontal.Trigger value="/settings/integrations" asChild>
            <NavLink to="/settings/integrations" replace>
              Integrations
            </NavLink>
          </TabMenuHorizontal.Trigger>
        </TabMenuHorizontal.List>
      </TabMenuHorizontal.Root>

      <section className="px-4 lg:px-8">
        <Outlet />
      </section>
    </div>
  );
}
