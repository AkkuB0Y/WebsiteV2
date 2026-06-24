import Image from "next/image";
import Link from "next/link";

import { getHomeHighlights } from "@/lib/highlights";
import { cn } from "@/lib/utils";

type HighlightLabelProps = {
  children: React.ReactNode;
};

function HighlightLabel({ children }: HighlightLabelProps) {
  return (
    <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted/70">
      {children}
    </p>
  );
}

type HighlightTileProps = {
  href: string;
  label: string;
  title: string;
  meta?: string;
  thumbnail?: { src: string; alt: string };
};

function HighlightTile({
  href,
  label,
  title,
  meta,
  thumbnail,
}: HighlightTileProps) {
  const content = (
    <>
      <HighlightLabel>{label}</HighlightLabel>
      <div className={cn(thumbnail && "flex items-center gap-3")}>
        {thumbnail ? (
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded border border-border/80 bg-surface-2">
            <Image
              src={thumbnail.src}
              alt={thumbnail.alt}
              fill
              className="object-cover"
            />
          </div>
        ) : null}
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-text">{title}</p>
          {meta ? (
            <p className="mt-0.5 truncate text-xs text-muted">{meta}</p>
          ) : null}
        </div>
      </div>
    </>
  );

  const className =
    "group block min-w-0 rounded-md px-3 py-3 transition-colors hover:bg-surface/60 sm:px-4";

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

export function HomeHighlights() {
  const { experience: latestExperience, project, place } = getHomeHighlights();

  if (!latestExperience && !project && !place) {
    return null;
  }

  return (
    <div className="mt-10 w-full border-t border-border/50 pt-8">
      <div className="grid gap-1 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-border/50">
        {latestExperience ? (
          <HighlightTile
            href="/experience"
            label="Work"
            title={latestExperience.role}
            meta={`${latestExperience.company} · ${latestExperience.dates}`}
          />
        ) : null}
        {project ? (
          <HighlightTile
            href="/projects"
            label="Project"
            title={project.title}
            meta={project.stack.slice(0, 3).join(" · ")}
          />
        ) : null}
        {place ? (
          <HighlightTile
            href="/fun"
            label="Somewhere"
            title={place.name}
            thumbnail={{ src: place.thumbnail, alt: place.name }}
          />
        ) : null}
      </div>
    </div>
  );
}
