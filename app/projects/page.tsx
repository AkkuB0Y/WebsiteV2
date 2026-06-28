import { Github } from "lucide-react";

import { ProjectCard } from "@/components/project-card";
import { ProjectSection } from "@/components/project-section";
import { Section } from "@/components/section";
import { projectSections } from "@/content/projects";
import { site } from "@/content/site";
import { actionLinkClassName } from "@/lib/card-styles";

export default function ProjectsPage() {
  const [networkSection, aiSection, fullStackSection] = projectSections;
  const [featuredAiProject, ...otherAiProjects] = aiSection.projects;

  return (
    <Section title="Projects">
      <div className="relative z-10 mb-10 flex flex-wrap gap-4">
        <a
          href={site.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className={actionLinkClassName}
        >
          <Github className="h-4 w-4 shrink-0" />
          GitHub
        </a>
      </div>

      <div className="flex flex-col gap-14">
        <ProjectSection
          label={networkSection.label}
          accent={networkSection.accent}
          count={networkSection.projects.length}
          background="grid"
        >
          <div className="flex flex-col gap-4">
            {networkSection.projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                variant="row"
                accent={networkSection.accent}
              />
            ))}
          </div>
        </ProjectSection>

        <ProjectSection
          label={aiSection.label}
          accent={aiSection.accent}
          count={aiSection.projects.length}
          background="gradient"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <ProjectCard
              project={featuredAiProject}
              variant="featured"
              accent={aiSection.accent}
              className="sm:col-span-2"
            />
            {otherAiProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                accent={aiSection.accent}
              />
            ))}
          </div>
        </ProjectSection>

        <ProjectSection
          label={fullStackSection.label}
          accent={fullStackSection.accent}
          count={fullStackSection.projects.length}
          background="lines"
        >
          <div className="grid gap-4 sm:grid-cols-6">
            {fullStackSection.projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                accent={fullStackSection.accent}
                className={index === 0 ? "sm:col-span-4" : "sm:col-span-3"}
              />
            ))}
          </div>
        </ProjectSection>
      </div>
    </Section>
  );
}
