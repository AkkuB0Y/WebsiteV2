export type Project = {
  id: string;
  title: string;
  description: string;
  stack: string[];
  url: string;
};

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Lorem Platform",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    stack: ["aws", "docker", "linux"],
    url: "https://github.com",
  },
  {
    id: "project-2",
    title: "Dolor Analytics",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
    stack: ["typescript", "react", "postgres"],
    url: "https://github.com",
  },
  {
    id: "project-3",
    title: "Sit Amet CLI",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    stack: ["go", "grpc", "kubernetes"],
    url: "https://github.com",
  },
];
