import type { LucideIcon } from "lucide-react";
import {
  Monitor,
  Server,
  Database,
  Code2,
  Wrench,
  BookOpen,
} from "lucide-react";

export interface SkillCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  iconLabel: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    icon: Monitor,
    iconLabel: "Frontend development",
    skills: [
      "React",
      "Next.js",
      "React Native",
      "Expo",
      "TypeScript",
      "Tailwind CSS",
      "Electron",
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: Server,
    iconLabel: "Backend development",
    skills: [
      "Node.js",
      "Express.js",
      "Bun",
      "REST APIs",
      "Socket.IO",
      "WebRTC",
      "JWT Auth",
    ],
  },
  {
    id: "database",
    title: "Database",
    icon: Database,
    iconLabel: "Databases and storage",
    skills: [
      "MongoDB",
      "MongoDB Atlas",
      "PostgreSQL",
      "Prisma ORM",
      "Convex",
    ],
  },
  {
    id: "languages",
    title: "Programming Languages",
    icon: Code2,
    iconLabel: "Programming languages",
    skills: [
      "JavaScript",
      "TypeScript",
      "Java",
      "Python",
      "C",
      "SQL",
    ],
  },
  {
    id: "tools",
    title: "Tools & Platforms",
    icon: Wrench,
    iconLabel: "Developer tools and platforms",
    skills: [
      "Git",
      "GitHub",
      "Vercel",
      "Cloudinary",
      "Postman",
      "VS Code",
      "Figma",
      "LemonSqueezy",
    ],
  },
  {
    id: "learning",
    title: "Currently Learning",
    icon: BookOpen,
    iconLabel: "Technologies currently being learned",
    skills: [".NET", "Docker", "AWS", "System Design"],
  },
];
