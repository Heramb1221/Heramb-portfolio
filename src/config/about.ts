import type { LucideIcon } from "lucide-react";
import { Layers, Lightbulb, BookOpen, GitFork, Users, Zap } from "lucide-react";

export interface Highlight {
  id: string;
  icon: LucideIcon;
  iconLabel: string;
  title: string;
  description: string;
}

export interface AboutContent {
  paragraphs: string[];
  highlights: Highlight[];
}

export const aboutContent: AboutContent = {
  paragraphs: [
    "I'm a third-year Computer Engineering student at R. C. Patel Institute of Technology, Shirpur, with a curiosity for understanding how software works beneath the surface. I enjoy building projects not just to create products, but to explore new ideas, technologies, and engineering challenges.",

    "Over the past few years, I've built applications across web, mobile, and real-time systems — from chat platforms and SaaS products to developer tools and personal experiments. Each project has been an opportunity to learn something new, whether that's system architecture, state management, authentication, databases, or user experience.",

    "I see software engineering as a continuous process of exploration. Recently, I've been focusing on strengthening my engineering fundamentals while exploring areas such as backend development, cloud technologies, system design, DevOps, AI/ML, and game development through hands-on projects and continuous learning.",

    "Outside of academics, I serve as Treasurer of the ACM Student Chapter at my college, contribute to open source, and enjoy experimenting with ideas that sit outside my comfort zone. This portfolio is a collection of those explorations, projects, and lessons learned along the way.",
  ],

  highlights: [
    {
      id: "software-engineering",
      icon: Layers,
      iconLabel: "Software engineering",
      title: "Software Engineering",
      description:
        "Building web, mobile, and real-time applications while exploring architecture and systems.",
    },

    {
      id: "problem-solving",
      icon: Lightbulb,
      iconLabel: "Problem solving",
      title: "Problem Solving",
      description:
        "Strengthening fundamentals through DSA, C++, and engineering challenges.",
    },

    {
      id: "learning",
      icon: BookOpen,
      iconLabel: "Continuous learning",
      title: "Explorer Mindset",
      description:
        "Currently exploring .NET, AWS, DevOps, AI/ML, and System Design.",
    },

    {
      id: "open-source",
      icon: GitFork,
      iconLabel: "Open source",
      title: "Open Source",
      description:
        "Hacktoberfest contributor with 44+ public repositories on GitHub.",
    },

    {
      id: "collaboration",
      icon: Users,
      iconLabel: "Leadership & Collaboration",
      title: "Community",
      description:
        "Treasurer at ACM Student Chapter and contributor to technical initiatives.",
    },

    {
      id: "builder",
      icon: Zap,
      iconLabel: "Builder mindset",
      title: "Build to Learn",
      description:
        "Every project is an opportunity to explore a new domain, tool, or idea.",
    },
  ],
};
