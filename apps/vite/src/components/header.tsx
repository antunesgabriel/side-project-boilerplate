import { RiLayoutLeftLine } from "@remixicon/react";

import * as CompactButton from "@repo/ui/components/ui/compact-button";
import { useSidebar } from "@repo/ui/components/blocks/sidebar";

export default function Header() {
  const { toggleSidebar } = useSidebar();
  return (
    <div>
      <header className="flex justify-between items-center py-4 px-4 mx-auto w-full">
        <div className="flex gap-2 items-center">
          <CompactButton.Root
            onClick={toggleSidebar}
            className="text-text-sub-600"
          >
            <CompactButton.Icon as={RiLayoutLeftLine} />
          </CompactButton.Root>

          <div className="truncate text-label-sm">Home</div>
        </div>

        {/* Left content */}
      </header>
    </div>
  );
}
