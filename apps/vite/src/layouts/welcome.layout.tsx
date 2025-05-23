import { Outlet } from "react-router";

import Header from "~/components/header";

export function WelcomeLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <Outlet />
    </div>
  );
}
