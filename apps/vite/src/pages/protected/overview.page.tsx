import { RiUserLine } from "@remixicon/react";
import * as PageHeader from "@repo/ui/components/blocks/page-header";

export function OverviewPage() {
  return (
    <div className="flex relative z-50 flex-col flex-1 self-stretch mx-auto w-full max-w-[1360px]">
      <PageHeader.Root
        title="Jhon  Doe"
        subtitle="Welcome back to Side Project"
        icon={<PageHeader.Icon as={RiUserLine} />}
      />

      <section className="px-4 lg:px-8" />
    </div>
  );
}
