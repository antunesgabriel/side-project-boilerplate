export function PageHeader() {
  return (
    <header className="flex flex-col gap-4 py-5 px-4 md:flex-row md:gap-3 md:justify-between md:items-center lg:px-8 min-h-[88px]">
      <div className="flex flex-1 gap-4 lg:gap-3.5">
        <div className="flex justify-center items-center rounded-full ring-1 ring-inset size-12 shrink-0 bg-bg-white-0 shadow-regular-xs ring-stroke-soft-200"></div>
      </div>
    </header>
  );
}
