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

function ExperienceCardContent({ experience }: ExperienceCardProps) {
  const isLinkedCard = Boolean(experience.url);

  return (
    <>
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
                  isLinkedCard && groupShimmerHoverClasses
                )}
              >
                {experience.role}
              </h3>
              {isLinkedCard ? (
                <ExternalLink className="hidden h-3.5 w-3.5 shrink-0 text-muted opacity-0 transition-all duration-300 group-hover:text-text group-hover:opacity-100 sm:block" />
              ) : null}
            </div>
            <p className="text-sm text-muted">{experience.company}</p>
          </div>
          <p className="shrink-0 font-mono text-xs text-muted">
            {experience.dates}
          </p>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted">
          {experience.summary}
        </p>

        {experience.links ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {experience.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded border border-border/80 bg-surface-2 px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:border-border hover:text-text"
              >
                {link.label}
                <ExternalLink className="h-3 w-3 shrink-0 opacity-60" />
              </a>
            ))}
          </div>
        ) : null}

        <div className="mt-4">
          <StackRow stack={experience.stack} />
        </div>
      </div>
    </>
  );
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const className = cn(cardClassName, "flex gap-5 p-6");

  if (experience.links) {
    return (
      <div className={className}>
        <ExperienceCardContent experience={experience} />
      </div>
    );
  }

  return (
    <a
      href={experience.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${experience.company} — open website`}
      className={className}
    >
      <ExperienceCardContent experience={experience} />
    </a>
  );
}
