import { experience } from "@/content/experience";
import { fun } from "@/content/fun";
import { projects } from "@/content/projects";

/** Content arrays are ordered newest-first; first entry is the home highlight. */
export function getHomeHighlights() {
  return {
    experience: experience[0] ?? null,
    project: projects[0] ?? null,
  };
}

export function getDefaultPlace() {
  return fun.places[0] ?? null;
}

export function getRandomPlace() {
  if (fun.places.length === 0) {
    return null;
  }

  const index = Math.floor(Math.random() * fun.places.length);
  return fun.places[index];
}
