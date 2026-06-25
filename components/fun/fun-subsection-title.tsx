import { cn } from "@/lib/utils";

type FunSubsectionTitleProps = {
  children: React.ReactNode;
  className?: string;
};

export function FunSubsectionTitle({
  children,
  className,
}: FunSubsectionTitleProps) {
  return (
    <h2
      className={cn(
        "mb-5 font-mono text-xs uppercase tracking-[0.2em] text-muted",
        className
      )}
    >
      {children}
    </h2>
  );
}
