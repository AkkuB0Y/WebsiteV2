import { cn } from "@/lib/utils";

export const shimmerHoverClasses =
  "hover:bg-[linear-gradient(90deg,var(--text),#888888,var(--text))] hover:bg-[length:200%_auto] hover:bg-clip-text hover:text-transparent hover:animate-shimmer";

export const shimmerBlockHoverClasses = cn(
  shimmerHoverClasses,
  "inline-block overflow-visible pb-[0.12em] leading-[1.2]"
);

export const groupShimmerHoverClasses =
  "group-hover:bg-[linear-gradient(90deg,var(--text),#888888,var(--text))] group-hover:bg-[length:200%_auto] group-hover:bg-clip-text group-hover:text-transparent group-hover:animate-shimmer";

type ShimmerTextProps = {
  children: React.ReactNode;
  className?: string;
};

export function ShimmerText({ children, className }: ShimmerTextProps) {
  return (
    <span
      className={cn(
        "inline cursor-default overflow-visible pb-[0.08em] text-text",
        shimmerHoverClasses,
        className
      )}
    >
      {children}
    </span>
  );
}
