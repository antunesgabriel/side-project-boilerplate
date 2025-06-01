import { motion, AnimatePresence } from "motion/react";
import { RiSidebarUnfoldLine } from "@remixicon/react";
import { Link } from "react-router";

import * as CompactButton from "@repo/ui/components/ui/compact-button";
import { useSidebar } from "@repo/ui/components/blocks/sidebar";

import Logo from "~/assets/logo-two.svg?react";

import ThemeSwitch from "./theme-switch";

export default function Header() {
  const { open, toggleSidebar } = useSidebar();
  return (
    <div>
      <header className="flex justify-between items-center px-5 mx-auto max-w-5xl h-[88px]">
        <div className="flex items-center gap-3">
          <AnimatePresence initial={false}>
            {open ? null : (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <CompactButton.Root onClick={toggleSidebar} variant="ghost">
                  <CompactButton.Icon as={RiSidebarUnfoldLine} />
                </CompactButton.Root>
              </motion.div>
            )}
          </AnimatePresence>

          <Link
            to="/"
            className="flex gap-2 items-center text-label-md text-text-strong-950"
          >
            <Logo className="text-primary-base size-9" />
            SideSaas
          </Link>
        </div>

        <ThemeSwitch />
      </header>
    </div>
  );
}
