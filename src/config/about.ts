import type { LucideIcon } from "lucide-react";
import { Layers, Lightbulb, BookOpen, GitFork, Users, Zap } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Data ─────────────────────────────────────────────────────────────────────

export const aboutContent: AboutContent = {
  paragraphs: [
    "I'm a third-year Computer Engineering student at R.C. Patel Institute of Technology, Shirpur, with an 8.93 CGPA and a hands-on focus on full-stack development. I build real applications — web, mobile, and desktop — across the complete stack using React, Node.js, MongoDB, Next.js, and React Native.",
    "I approach software engineering as a craft. Each project I take on is an opportunity to explore architecture decisions, solve real problems, and sharpen my technical depth. From real-time chat platforms to SaaS tools and cross-platform apps, I focus on writing clean, maintainable code that scales.",
    "I'm currently expanding into .NET, Docker, and Azure while actively contributing to open source through Hacktoberfest and leading the ACM chapter at my institution. I'm open to internship roles and collaborative opportunities where I can contribute and continue to grow.",
  ],
  highlights: [
    {
      id: "fullstack",
      icon: Layers,
      iconLabel: "Full stack development",
      title: "Full Stack Development",
      description: "Web, mobile, and desktop — across the entire stack.",
    },
    {
      id: "problem-solving",
      icon: Lightbulb,
      iconLabel: "Problem solving",
      title: "Problem Solving",
      description: "Competitive programming and real-world engineering challenges.",
    },
    {
      id: "learning",
      icon: BookOpen,
      iconLabel: "Continuous learning",
      title: "Continuous Learning",
      description: "Expanding into .NET, Docker, Azure, and System Design.",
    },
    {
      id: "open-source",
      icon: GitFork,
      iconLabel: "Open source",
      title: "Open Source",
      description: "Hacktoberfest contributor. 44+ public GitHub repositories.",
    },
    {
      id: "collaboration",
      icon: Users,
      iconLabel: "Team collaboration",
      title: "Team Collaboration",
      description: "ACM Chapter Treasurer. Cross-functional project experience.",
    },
    {
      id: "fast-learner",
      icon: Zap,
      iconLabel: "Fast learner",
      title: "Fast Learner",
      description: "New stack, new domain — I pick it up and ship it.",
    },
  ],
};
