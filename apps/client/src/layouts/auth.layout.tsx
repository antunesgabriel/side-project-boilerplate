import { Outlet } from "react-router";

export function AuthLayout() {
  return (
    <div className="grid min-h-screen min-[1440px]:grid-cols-[minmax(0,608fr),minmax(0,832fr)] lg:grid-cols-[minmax(0,608fr),minmax(0,832fr)] xl:grid-cols-[608px,minmax(0,1fr)]">
      <main className="flex flex-col px-6 h-full lg:py-6 lg:px-11">
        <Outlet />

        <div className="flex gap-4 justify-between items-center pb-4 -mx-2 mt-auto lg:pb-0 lg:mx-0">
          <span className="text-paragraph-sm text-text-sub-600">
            © 2025 Company
          </span>
        </div>
      </main>
      <div className="hidden p-2 pl-0 lg:block">
        <div className="relative rounded-2xl size-full bg-bg-weak-50"></div>
      </div>
    </div>
  );
}
