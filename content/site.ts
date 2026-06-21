export type SocialLinks = {
  github: string;
  linkedin: string;
  email: string;
};

export type IntroSegment = {
  text: string;
  shimmer?: boolean;
};

export type SiteContent = {
  name: string;
  socials: SocialLinks;
  resumePdf: string;
  intro: IntroSegment[];
  description: string;
};

export const site: SiteContent = {
  name: "Lorem Ipsum",
  socials: {
    github: "https://github.com",
    linkedin: "https://www.linkedin.com",
    email: "mailto:hello@example.com",
  },
  resumePdf: "/resume.pdf",
  intro: [
    { text: "Hello, I'm " },
    { text: "Lorem", shimmer: true },
    { text: ", a " },
    { text: "placeholder", shimmer: true },
    { text: " student and engineer @ " },
    { text: "Ipsum Corp", shimmer: true },
    { text: "." },
  ],
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
};
