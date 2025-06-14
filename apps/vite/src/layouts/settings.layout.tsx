import { RiSettings2Line } from "@remixicon/react";
import { Outlet } from "react-router";
import * as PageHeader from "@repo/ui/components/blocks/page-header";

export function SettingsLayout() {
  return (
    <div className="flex relative z-50 flex-col flex-1 self-stretch mx-auto w-full max-w-[1360px]">
      <PageHeader.Root
        title="Settings"
        subtitle="Manage your preferences and configure various options."
        icon={<PageHeader.Icon as={RiSettings2Line} />}
      />

      {/* Settings Tabs Navigation */}

      <section className="px-4 lg:px-8">
        <Outlet />
      </section>
    </div>
  );
}
