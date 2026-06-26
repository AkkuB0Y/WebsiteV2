export type Project = {
  id: string;
  title: string;
  description: string;
  stack: string[];
  url: string;
};

export type ProjectSection = {
  id: string;
  label: string;
  accent: string;
  projects: Project[];
};

export const projectSections: ProjectSection[] = [
  {
    id: "network-infra",
    label: "Network + Infra",
    accent: "#34d399",
    projects: [
      {
        id: "project-1",
        title: "WiFi Sentinel",
        description:
          "A lightweight local network health monitoring daemon with a real-time web dashboard.",
        stack: ["go", "sqlite", "cloud sync", "gcp"],
        url: "https://github.com/AkkuB0Y/WiFiSentinel",
      },
      {
        id: "project-4",
        title: "Terraform EKS Platform",
        description:
          "Production-grade Infrastructure as Code (IaC) setup for provisioning a managed Kubernetes (EKS) cluster on AWS.",
        stack: ["aws", "kubernetes", "terraform"],
        url: "https://github.com/AkkuB0Y/TerraformEKSPlatform",
      },
      {
        id: "project-5",
        title: "Zero-Trust Network Security",
        description:
          "Granular network security within a Kubernetes cluster using NetworkPolicies",
        stack: ["opencv", "mediapipe", "numpy"],
        url: "https://github.com/AkkuB0Y/ZeroTrustNetworkSecurity",
      },
    ],
  },
  {
    id: "ai",
    label: "AI",
    accent: "#a78bfa",
    projects: [
      {
        id: "project-6",
        title: "PharmFill",
        description:
          "DeltaHacksX winning hackathon project for prescription OCR and transfer.",
        stack: ["react native", "google cloud vision ocr", "figma"],
        url: "https://devpost.com/software/pharmfill",
      },
      {
        id: "project-2",
        title: "NoteFinder",
        description:
          "A real-time CV system that ingests a webcam feed of a guitarist's fretting hand and outputs the (string, fret) position of each pressed finger",
        stack: ["opencv", "mediapipe", "numpy"],
        url: "https://github.com/AkkuB0Y/NoteFinder",
      },
      {
        id: "project-3",
        title: "TextToTable",
        description:
          "WIP tool to turn natural language voice queries into instant, interactive data dashboards",
        stack: ["openai whisper", "sqlite", "react"],
        url: "https://github.com/AkkuB0Y/TextToTable",
      },
    ],
  },
  {
    id: "full-stack",
    label: "Full-stack",
    accent: "#38bdf8",
    projects: [
      {
        id: "project-7",
        title: "Spotify Remake",
        description:
          "A full-stack remake of Spotify complete with authentication, favourites, and custom song upload.",
        stack: ["react/next.js", "tailwind", "supabase", "stripe"],
        url: "https://github.com/AkkuB0Y/Spotify-Remake",
      },
      {
        id: "project-8",
        title: "Save the Planet",
        description:
          "A parallax image gallery made as an homage to some of our most vulnerable friends.",
        stack: ["svelte", "javascript"],
        url: "https://save-the-planet-mu.vercel.app",
      },
      {
        id: "project-9",
        title: "IKnowASpot",
        description:
          "Fullstack tool designed to allow you to find and share lesser known, niche spots around town.",
        stack: ["next.js", "supabase", "prisma", "cloudinary"],
        url: "https://github.com/AkkuB0Y/IKnowASpot",
      },
    ],
  },
];

export const projects = projectSections.flatMap((section) => section.projects);
