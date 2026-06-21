import Image from "next/image";
import { ExternalLink } from "lucide-react";

import type { Experience } from "@/content/experience";
import { groupShimmerHoverClasses } from "@/components/shimmer-text";
import { cardClassName } from "@/lib/card-styles";
import { cn } from "@/lib/utils";

import { StackRow } from "./stack-row";

type ExperienceCardProps = {
  experience: Experience;
};

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <a
      href={experience.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${experience.company} — open website`}
      className={cn(cardClassName, "flex gap-5 p-6")}
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-border bg-surface-2">
        <Image
          src={experience.logo}
          alt={`${experience.company} logo`}
          fill
          className="object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3
                className={cn(
                  "text-lg font-medium text-text transition-colors duration-300",
                  groupShimmerHoverClasses
                )}
              >
                {experience.role}
              </h3>
              <ExternalLink className="hidden h-3.5 w-3.5 shrink-0 text-muted opacity-0 transition-all duration-300 group-hover:text-text group-hover:opacity-100 sm:block" />
            </div>
            <p className="text-sm text-muted">{experience.company}</p>
          </div>
          <p className="shrink-0 font-mono text-xs text-muted">
            {experience.dates}
          </p>
        </div>

        <ul className="mt-4 list-inside list-disc space-y-2 text-sm leading-relaxed text-muted">
          {experience.bullets.map((bullet, index) => (
            <li key={`${experience.id}-bullet-${index}`}>{bullet}</li>
          ))}
        </ul>

        <div className="mt-4">
          <StackRow stack={experience.stack} />
        </div>
      </div>
    </a>
  );
}
