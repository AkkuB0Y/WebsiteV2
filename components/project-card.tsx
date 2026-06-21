import { ExternalLink } from "lucide-react";

import type { Project } from "@/content/projects";
import { groupShimmerHoverClasses } from "@/components/shimmer-text";
import { cardClassName } from "@/lib/card-styles";
import { cn } from "@/lib/utils";

import { StackRow } from "./stack-row";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.title} — open repository`}
      className={cn(cardClassName, "flex h-full flex-col p-6")}
    >
      <div className="flex items-start justify-between gap-3">
        <h3
          className={cn(
            "text-lg font-medium text-text transition-colors duration-300",
            groupShimmerHoverClasses
          )}
        >
          {project.title}
        </h3>
        <ExternalLink className="h-4 w-4 shrink-0 text-muted opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-text group-hover:opacity-100" />
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {project.description}
      </p>
      <div className="mt-4">
        <StackRow stack={project.stack} />
      </div>
    </a>
  );
}
