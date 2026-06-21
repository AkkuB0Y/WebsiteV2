import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { projects } from "@/content/projects";

export default function ProjectsPage() {
  return (
    <Section title="Projects">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
}
