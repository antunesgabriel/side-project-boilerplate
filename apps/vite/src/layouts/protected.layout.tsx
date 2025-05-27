import { RiLoaderLine } from "@remixicon/react";
import { Navigate, Outlet } from "react-router";

import {
  SidebarProvider,
  SidebarInset,
} from "@repo/ui/components/blocks/sidebar";

import { useSession } from "~/config/auth";
import { AppSidebar } from "~/components/app-sidebar";

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
        <main className="flex flex-col min-h-screen">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
