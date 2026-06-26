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
    github: "https://github.com/AkkuB0Y",
    linkedin: "https://www.linkedin.com/in/akshaysatish26205/",
    email: "mailto:asatish@uwaterloo.ca",
  },
  resumePdf: "/resume.pdf",
  intro: [
    { text: "Hello, I'm " },
    { text: "Akshay", shimmer: true },
    { text: ", a " },
    { text: "Computer Engineering", shimmer: true },
    { text: " student @ " },
    { text: "UWaterloo", shimmer: true },
    { text: "." },
  ],
  description:
    "I'm an aspiring engineer with a passion for building software systems. On this site, you can find out more about my industry experience, technical projects, and fun hobbies.",
};
