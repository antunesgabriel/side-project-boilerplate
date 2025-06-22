"use client";
import React from "react";
import { cn } from "@ui/utils/cn";
import type { PolymorphicComponentProps } from "@ui/utils/polymorphic";

type PageHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  avatarUrl?: string;
};

const Root = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  (
    { title, subtitle, icon, children, className, avatarUrl, ...rest },
    forwardedRef
  ) => {
    return (
      <header
        ref={forwardedRef}
        className={`flex min-h-[88px] flex-col gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between md:gap-3 lg:px-8 ${className || ""}`}
        {...rest}
      >
        <div className="flex flex-1 gap-4 lg:gap-3.5">
          <div className="flex text-static-black relative justify-center items-center rounded-full ring-1 ring-inset size-12 shrink-0 bg-bg-white-0 shadow-regular-xs ring-stroke-soft-200">
            {avatarUrl ? (
              <img
                className="size-full rounded-full object-cover"
                src={avatarUrl}
              />
            ) : (
              icon
            )}
          </div>

          <div className="space-y-1">
            <h1 className="text-label-md text-text-strong-950 lg:text-label-lg">
              {title}
            </h1>
            {subtitle && (
              <p className="text-paragraph-sm text-text-sub-600">{subtitle}</p>
            )}
          </div>
        </div>

        {children}
      </header>
    );
  }
);

Root.displayName = "PageHeader";

const Actions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...rest }, forwardedRef) => {
  return (
    <div
      ref={forwardedRef}
      {...rest}
      className={cn("items-center gap-3 flex", className)}
    >
      {children}
    </div>
  );
});

Actions.displayName = "PageHeaderActions";

type HeaderIconProps = React.HTMLAttributes<HTMLDivElement> & {};

function Icon<T extends React.ElementType>({
  as,
  className,
  ...rest
}: PolymorphicComponentProps<T, HeaderIconProps>) {
  const Component = as || "div";

  return (
    <Component
      className={cn("size-6 text-text-sub-600", className)}
      {...rest}
    />
  );
}

Icon.displayName = "PageHeaderIcon";

export { Root, Actions, Icon };
