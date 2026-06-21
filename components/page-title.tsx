import { cn } from "@/lib/utils";

import { shimmerBlockHoverClasses } from "./shimmer-text";

type PageTitleProps = {
  children: React.ReactNode;
  className?: string;
};

export function PageTitle({ children, className }: PageTitleProps) {
  return (
    <h1
      className={cn(
        "mb-10 overflow-visible text-4xl font-medium tracking-tight text-text md:text-5xl",
        className
      )}
    >
      <span className={cn("cursor-default", shimmerBlockHoverClasses)}>
        {children}
      </span>
    </h1>
  );
}
