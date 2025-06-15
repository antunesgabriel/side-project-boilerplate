import { RiExchangeLine } from "@remixicon/react";
import * as PageHeader from "@repo/ui/components/blocks/page-header";

export function BillingPage() {
  return (
    <div className="flex relative z-50 flex-col flex-1 self-stretch mx-auto w-full max-w-[1360px]">
      <PageHeader.Root
        title="Billing"
        subtitle="Manage your billing and payments"
        icon={<PageHeader.Icon as={RiExchangeLine} />}
      />

      <section className="px-4 lg:px-8" />
    </div>
  );
}
