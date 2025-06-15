import { useState } from "react";
import {
  RiArrowRightSLine,
  RiContactsBookLine,
  RiUserLine,
} from "@remixicon/react";
import * as TabMenuVertical from "@repo/ui/components/ui/tab-menu-vertical";

const items = [
  {
    label: "Profile Settings",
    icon: RiUserLine,
    value: "profile",
  },
  {
    label: "Contact Information",
    icon: RiContactsBookLine,
    value: "contact",
  },
];

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="py-5 md:py-8">
      <TabMenuVertical.Root
        className="grid gap-8 items-start grid-cols-[auto,1fr] xl:grid-cols-[1fr_minmax(0,352px)_1fr]"
        defaultValue="profile"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <div className="p-2.5 rounded-2xl ring-1 ring-inset w-[258px] shrink-0 bg-bg-white-0 shadow-regular-xs ring-stroke-soft-200">
          <h4 className="py-1 px-2 mb-2 uppercase text-subheading-xs text-text-soft-400">
            Select Menu
          </h4>

          <TabMenuVertical.List>
            {items.map(({ label, icon: Icon, value }) => (
              <TabMenuVertical.Trigger
                key={`tab_trigger_${value}`}
                value={value}
              >
                <TabMenuVertical.Icon as={Icon} />
                {label}
                <TabMenuVertical.ArrowIcon as={RiArrowRightSLine} />
              </TabMenuVertical.Trigger>
            ))}
          </TabMenuVertical.List>
        </div>

        <TabMenuVertical.Content
          value="profile"
          className="data-[state=active]:duration-300 data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-4"
        >
          Profile Settings
        </TabMenuVertical.Content>

        <TabMenuVertical.Content
          value="contact"
          className="data-[state=active]:duration-300 data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-4"
        >
          Contact
        </TabMenuVertical.Content>
      </TabMenuVertical.Root>
    </div>
  );
}
