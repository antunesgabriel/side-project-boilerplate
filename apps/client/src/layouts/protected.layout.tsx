import { RiLoaderLine } from "@remixicon/react";
import { Navigate, Outlet } from "react-router";

import {
  SidebarProvider,
  SidebarInset,
} from "@repo/ui/components/blocks/sidebar";

import { useSession } from "~/config/auth";
import { AppSidebar } from "~/components/app-sidebar";
import { MobileHeader } from "~/components/mobile-header";

export function ProtectedLayout() {
  const { data: session, isPending } = useSession();

  if (isPending)
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <RiLoaderLine className="animate-spin text-primary-base" />
      </div>
    );

  if (!session) return <Navigate to="/auth/sign-in" replace />;

  if (!session.user.emailVerified)
    return <Navigate to="/auth/verify-email" replace />;

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        {/* Header mobile */}
        <MobileHeader user={session.user} />

        <div className="flex flex-col flex-1 mx-auto w-full max-w-[1360px]">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
