import { experience } from "@/content/experience";
import { fun } from "@/content/fun";
import { projects } from "@/content/projects";

/** Content arrays are ordered newest-first; first entry is the home highlight. */
export function getHomeHighlights() {
  return {
    experience: experience[0] ?? null,
    project: projects[0] ?? null,
    place: fun.places[0] ?? null,
  };
}
