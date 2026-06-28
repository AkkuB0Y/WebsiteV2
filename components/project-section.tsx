import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

type SectionBackground = "grid" | "gradient" | "lines";

type ProjectSectionProps = {
  label: string;
  accent: string;
  count: number;
  background?: SectionBackground;
  children: React.ReactNode;
  className?: string;
};

const backgroundClassNames: Record<SectionBackground, string> = {
  grid: "project-section-surface--grid",
  gradient: "project-section-surface--gradient",
  lines: "project-section-surface--lines",
};

export function ProjectSection({
  label,
  accent,
  count,
  background = "grid",
  children,
  className,
}: ProjectSectionProps) {
  const surfaceStyle = {
    "--section-accent": accent,
  } as CSSProperties;

  return (
    <section className={cn("relative", className)}>
      <div
        className={cn(
          "project-section-surface",
          backgroundClassNames[background]
        )}
        style={surfaceStyle}
      >
        <div className="mb-5 flex items-end justify-between gap-4 border-b border-border/40 pb-4">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="h-2 w-2 shrink-0 rounded-full"
              style={{
                backgroundColor: accent,
                boxShadow: `0 0 12px ${accent}66`,
              }}
            />
            <h2 className="text-lg font-medium tracking-tight text-text">
              {label}
            </h2>
          </div>
          <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-muted/60">
            {count} {count === 1 ? "project" : "projects"}
          </p>
        </div>
        {children}
      </div>
    </section>
  );
}
