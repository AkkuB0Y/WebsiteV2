import type { CSSProperties } from "react";
import { ExternalLink } from "lucide-react";

import type { Project } from "@/content/projects";
import { groupShimmerHoverClasses } from "@/components/shimmer-text";
import { cardClassName } from "@/lib/card-styles";
import { cn } from "@/lib/utils";

import { StackRow } from "./stack-row";

type ProjectCardProps = {
  project: Project;
  variant?: "default" | "row" | "featured";
  accent?: string;
  className?: string;
};

export function ProjectCard({
  project,
  variant = "default",
  accent,
  className,
}: ProjectCardProps) {
  const accentStyle: CSSProperties | undefined = accent
    ? { borderTopColor: accent }
    : undefined;

  if (variant === "row") {
    return (
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.title} — open repository`}
        className={cn(
          cardClassName,
          "flex items-stretch gap-0 p-0",
          className
        )}
      >
        <div
          aria-hidden
          className="w-1 shrink-0 rounded-l-[5px]"
          style={{ backgroundColor: accent }}
        />
        <div className="flex min-w-0 flex-1 items-start justify-between gap-4 p-5 sm:p-6">
          <div className="min-w-0">
            <h3
              className={cn(
                "text-lg font-medium text-text transition-colors duration-300",
                groupShimmerHoverClasses
              )}
            >
              {project.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {project.description}
            </p>
            <div className="mt-4">
              <StackRow stack={project.stack} />
            </div>
          </div>
          <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-muted opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-text group-hover:opacity-100" />
        </div>
      </a>
    );
  }

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.title} — open repository`}
      className={cn(
        cardClassName,
        "flex h-full flex-col p-6",
        accent && "border-t-2",
        variant === "featured" && "sm:p-8",
        className
      )}
      style={accentStyle}
    >
      <div className="flex items-start justify-between gap-3">
        <h3
          className={cn(
            "font-medium text-text transition-colors duration-300",
            variant === "featured" ? "text-xl" : "text-lg",
            groupShimmerHoverClasses
          )}
        >
          {project.title}
        </h3>
        <ExternalLink className="h-4 w-4 shrink-0 text-muted opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-text group-hover:opacity-100" />
      </div>
      <p
        className={cn(
          "mt-3 flex-1 leading-relaxed text-muted",
          variant === "featured" ? "text-base" : "text-sm"
        )}
      >
        {project.description}
      </p>
      <div className="mt-4">
        <StackRow stack={project.stack} />
      </div>
    </a>
  );
}
