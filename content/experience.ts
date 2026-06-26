export type ExperienceLink = {
  label: string;
  url: string;
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  dates: string;
  summary: string;
  stack: string[];
  url?: string;
  links?: ExperienceLink[];
  logo: string;
};

export const experience: Experience[] = [
  {
    id: "exp-1",
    role: "DevOps & Infrastructure Intern",
    company: "Scrawlr",
    dates: "May 2026 -",
    summary:
      "I'm currently working at Scrawlr as a DevOps Engineering Intern. So far, I've rebuilt 'Poppy', a GitHub Actions PR reviewer that uses MCP and OpenAI to tear through massive 1,000-line code diffs in seconds for 50+ engineers. I've also overhauled our cross-repo observability with Sentry and Slack, fixed critical memory crashes for scraping processes using AWS ECS and Terraform, and spun up automated local dev tooling with Postgres and 1Password CLI.",
    stack: ["aws", "terraform", "mcp", "github actions ci", "sentry", "postgres"],
    url: "https://scrawlr.com",
    logo: "/images/experience/scrawlr.png",
  },
  {
    id: "exp-2",
    role: "Network Automation Intern",
    company: "Nokia",
    dates: "September 2025 – December 2025",
    summary:
      "Over fall 2025, I interned on the IT Network team, where I worked on the cutting-edge of AI-based network automation software. I built an agentic network alarm resolver using LLMs, RAG and Kafka, managing deployments on a custom fault-tolerant failover system built with Docker and Linux. The system resolved close to 100 alarms a second and increased resolution times by 67%.",
    stack: ["docker", "linux", "kafka", "agentic ai", "azure"],
    url: "https://nokia.com",
    logo: "/images/experience/nokia.jpeg",
  },
  {
    id: "exp-3",
    role: "Software Developer Intern",
    company: "Nokia",
    dates: "Jan 2025 – April 2025",
    summary:
      "Over winter 2025, I interned as a member of the Network Developer Portal team, where I designed and implemented full-stack features for this portal with 12,000+ users. I worked on everything from small frontend updates, to large changes to our backend authorization and ci/cd pipeline infrastructure.",
    stack: ["django", "mysql", "azure", "gitlab", "pandas"],
    url: "https://network.developer.nokia.com",
    logo: "/images/experience/nokia.jpeg",
  },
  {
    id: "exp-4",
    role: "Technical Consultant Intern",
    company: "Zafin",
    dates: "May 2024 – Aug 2024",
    summary:
      "Over summer 2024, I interned at Zafin, a multi-national Fintech company specializing in banking modernization. At Zafin, I helped build a rules engine, a full-stack tool for business rule configuration, transformation and execution.",
    stack: ["react", "spring", "django", "mongodb", "docker"],
    url: "https://zafin.com",
    logo: "/images/experience/zafin.jpeg",
  },
  {
    id: "exp-5",
    role: "Freelance Web Developer",
    company: "KTB / Finex / The Smile Team",
    dates: "Jul 2023 - ",
    summary:
      "I've also been working on the side as a freelance web dev for a handful of GTA-based businesses, providing primarily WordPress-based solutions and maintenance. You can check out these websites by clicking on the links below!",
    stack: ["wordpress", "figma", "javascript", "php"],
    links: [
      { label: "KTB", url: "https://killtheburr.com" },
      { label: "Finex", url: "https://finex-solutions.com" },
      { label: "Smile Team", url: "https://smileteamtoronto.ca" },
    ],
    logo: "/images/experience/webdev.jpg",
  },
];
