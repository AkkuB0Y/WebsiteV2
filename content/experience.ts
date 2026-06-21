export type Experience = {
  id: string;
  role: string;
  company: string;
  dates: string;
  bullets: string[];
  stack: string[];
  url: string;
  logo: string;
};

export const experience: Experience[] = [
  {
    id: "exp-1",
    role: "Software Engineer Intern",
    company: "Lorem Labs",
    dates: "May 2024 – Aug 2024",
    bullets: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    ],
    stack: ["python", "aws", "docker"],
    url: "https://example.com",
    logo: "/images/experience/lorem-labs.svg",
  },
  {
    id: "exp-2",
    role: "Research Assistant",
    company: "Ipsum University",
    dates: "Jan 2023 – Present",
    bullets: [
      "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
    ],
    stack: ["c++", "linux", "matlab"],
    url: "https://example.com",
    logo: "/images/experience/ipsum-university.svg",
  },
];
