import Link from "next/link";
import { ExternalLink, FileText } from "lucide-react";

import { ExperienceCard } from "@/components/experience-card";
import { Section } from "@/components/section";
import { experience } from "@/content/experience";
import { site } from "@/content/site";
import { actionLinkClassName } from "@/lib/card-styles";

export default function ExperiencePage() {
  return (
    <Section title="Experience">
      <div className="relative z-10 mb-10 flex flex-wrap gap-4">
        <Link href="/resume" className={actionLinkClassName}>
          <FileText className="h-4 w-4 shrink-0" />
          Resume
        </Link>
        <a
          href={site.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={actionLinkClassName}
        >
          <ExternalLink className="h-4 w-4 shrink-0" />
          LinkedIn
        </a>
      </div>

      <div className="flex flex-col gap-6">
        {experience.map((entry) => (
          <ExperienceCard key={entry.id} experience={entry} />
        ))}
      </div>
    </Section>
  );
}
