import { useNavigate, Link } from "react-router";
import {
  RiArrowUpSLine,
  RiExchangeLine,
  RiLayoutGridLine,
  RiLogoutBoxRLine,
  RiMoonLine,
  RiSettings2Line,
  RiUserLine,
} from "@remixicon/react";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
} from "@repo/ui/components/blocks/sidebar";
import * as Avatar from "@repo/ui/components/ui/avatar";
import * as CompactButton from "@repo/ui/components/ui/compact-button";
import * as Badge from "@repo/ui/components/ui/badge";
import * as Divider from "@repo/ui/components/ui/divider";
import * as Dropdown from "@repo/ui/components/ui/dropdown";
import * as Switch from "@repo/ui/components/ui/switch";

import { useTheme } from "~/hooks/use-theme";
import { signOut } from "~/config/auth";

const CustomVerifiedIconSVG = () => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="size-5 text-verified-base"
  >
    <path
      d="M8.75437 3.81492C7.8784 3.53135 6.92613 3.92578 6.50722 4.74572L6.00361 5.73145C5.94377 5.84858 5.84852 5.94383 5.73139 6.00367L4.74566 6.50728C3.92572 6.92619 3.53129 7.87846 3.81485 8.75443L4.15577 9.80756C4.19627 9.93268 4.19627 10.0674 4.15577 10.1926L3.81485 11.2457C3.53129 12.1217 3.92572 13.0739 4.74566 13.4929L5.73139 13.9964C5.84852 14.0563 5.94377 14.1516 6.00361 14.2687L6.50722 15.2544C6.92613 16.0744 7.8784 16.4688 8.75437 16.1852L9.8075 15.8443C9.93262 15.8038 10.0674 15.8038 10.1925 15.8443L11.2456 16.1852C12.1216 16.4688 13.0739 16.0744 13.4928 15.2544L13.9964 14.2687C14.0562 14.1516 14.1515 14.0563 14.2686 13.9964L15.2544 13.4929C16.0743 13.0739 16.4687 12.1217 16.1852 11.2457L15.8442 10.1926C15.8037 10.0674 15.8037 9.93268 15.8442 9.80756L16.1852 8.75443C16.4687 7.87846 16.0743 6.92619 15.2544 6.50728L14.2686 6.00367C14.1515 5.94383 14.0562 5.84858 13.9964 5.73145L13.4928 4.74572C13.0739 3.92578 12.1216 3.53135 11.2456 3.81492L10.1925 4.15583C10.0674 4.19633 9.93262 4.19633 9.8075 4.15583L8.75437 3.81492ZM6.72485 9.84837L7.60874 8.96443L9.3765 10.7322L12.9121 7.19672L13.7959 8.0806L9.3765 12.5L6.72485 9.84837Z"
      fill="currentColor"
    ></path>
  </svg>
);

export function AppSidebarUserProfile() {
  const { theme, setTheme } = useTheme();

  const navigate = useNavigate();

  const onSignOut = async () => {
    await signOut();

    navigate("/auth/sign-in", { replace: true });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <SidebarMenuButton
              size="lg"
              className="group flex w-full items-center gap-3 whitespace-nowrap h-auto rounded-10 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar.Root className="size-8">
                <Avatar.Image src="https://avatar.iran.liara.run/public/12" />
              </Avatar.Root>

              <div className="flex-1 space-y-1 text-left">
                <div className="flex gap-0.5 items-center text-label-sm text-text-strong-950">
                  Jhon Doe
                  <CustomVerifiedIconSVG />
                </div>
                <div className="text-paragraph-xs text-text-sub-600">
                  jhon@doe.com
                </div>
              </div>

              <SidebarMenuAction asChild>
                <CompactButton.Root className="right-2 top-[1.3em]">
                  <CompactButton.Icon as={RiArrowUpSLine} />
                </CompactButton.Root>
              </SidebarMenuAction>
            </SidebarMenuButton>
          </Dropdown.Trigger>

          <Dropdown.Content align="center" side="right">
            <div className="flex gap-3 items-center p-2">
              <Avatar.Root size="40">
                <Avatar.Image src="https://avatar.iran.liara.run/public/12" />
                <Avatar.Indicator position="top">
                  <CustomVerifiedIconSVG />
                </Avatar.Indicator>
              </Avatar.Root>
              <div className="flex-1">
                <div className="text-label-sm text-text-strong-950">
                  Jhon Doe
                </div>
                <div className="mt-1 text-paragraph-xs text-text-sub-600">
                  jhon@doe.com
                </div>
              </div>
              <Badge.Root variant="light" color="green" size="medium">
                PRO
              </Badge.Root>
            </div>

            <Dropdown.Item
              onSelect={(e) => {
                e.preventDefault();
                setTheme(theme === "light" ? "dark" : "light");
              }}
            >
              <Dropdown.ItemIcon as={RiMoonLine} />
              Dark Mode
              <span className="flex-1" />
              <Switch.Root checked={theme === "dark"} />
            </Dropdown.Item>

            <Divider.Root variant="line-spacing" />

            <Dropdown.Group>
              <Dropdown.Item asChild>
                <Link to="/billing">
                  <Dropdown.ItemIcon as={RiExchangeLine} />
                  Billing
                </Link>
              </Dropdown.Item>

              <Dropdown.Item asChild>
                <Link to="/integrations">
                  <Dropdown.ItemIcon as={RiLayoutGridLine} />
                  Integrations
                </Link>
              </Dropdown.Item>

              <Dropdown.Item asChild>
                <Link to="/settings">
                  <Dropdown.ItemIcon as={RiSettings2Line} />
                  Settings
                </Link>
              </Dropdown.Item>
            </Dropdown.Group>

            <Divider.Root variant="line-spacing" />

            <Dropdown.Group>
              <Dropdown.Item asChild>
                <Link to="/account">
                  <Dropdown.ItemIcon as={RiUserLine} />
                  Account
                </Link>
              </Dropdown.Item>

              <Dropdown.Item onClick={onSignOut}>
                <Dropdown.ItemIcon as={RiLogoutBoxRLine} />
                Logout
              </Dropdown.Item>
            </Dropdown.Group>

            <div className="p-2 text-paragraph-sm text-text-soft-400">
              v0.0.1 · Terms & Conditions
            </div>
          </Dropdown.Content>
        </Dropdown.Root>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
