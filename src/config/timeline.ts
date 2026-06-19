// ─── Types ────────────────────────────────────────────────────────────────────

export type TimelineCategory =
  | "Education"
  | "Project"
  | "Certification"
  | "Achievement"
  | "Learning"
  | "Experience";

export interface TimelineEntry {
  id: string;
  date: string;         // Display string, e.g. "2022 – Present"
  title: string;
  category: TimelineCategory;
  organization?: string;
  description: string;
  highlight?: boolean;  // Visually accents an especially important entry
}

// ─── Icon map key type ────────────────────────────────────────────────────────
// Resolved in <TimelineIcon> so Lucide is never imported here.

export const timelineCategoryIcons: Record<TimelineCategory, string> = {
  Education:     "GraduationCap",
  Project:       "Code2",
  Certification: "Award",
  Achievement:   "Trophy",
  Learning:      "BookOpen",
  Experience:    "Briefcase",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
// Most recent first.

export const timelineEntries: TimelineEntry[] = [
  {
    id: "acm-treasurer",
    date: "2024 – Present",
    title: "Treasurer — ACM Student Chapter",
    category: "Experience",
    organization: "RCPIT, Shirpur",
    description:
      "Managing budgets, coordinating technical events, and leading the college's ACM chapter as a core organising member.",
    highlight: true,
  },
  {
    id: "hacktoberfest-2024",
    date: "Oct 2024",
    title: "Hacktoberfest 2024 Contributor",
    category: "Achievement",
    organization: "Open Source",
    description:
      "Completed Hacktoberfest 2024 with merged pull requests across open-source repositories.",
  },
  {
    id: "reverie",
    date: "2024",
    title: "Built Reverie — AI Journaling App",
    category: "Project",
    description:
      "Full-stack journaling application with Next.js 14, Express, Expo React Native, MongoDB Atlas, and Gemini 1.5 Flash AI integration.",
    highlight: true,
  },
  {
    id: "coditor",
    date: "2024",
    title: "Built Coditor — SaaS Code Collaboration",
    category: "Project",
    description:
      "Next.js 15, Convex, Monaco Editor, and LemonSqueezy payments. Real-time collaborative code editor with subscription billing.",
    highlight: true,
  },
  {
    id: "mumble-chat",
    date: "2024",
    title: "Built Mumble Chat — React Native App",
    category: "Project",
    description:
      "Cross-platform real-time chat application using React Native, Expo, Socket.IO, and Bun as the runtime.",
  },
  {
    id: "meta-certification",
    date: "2024",
    title: "Meta Front-End Developer Certificate",
    category: "Certification",
    organization: "Meta / Coursera",
    description:
      "Completed the Meta Front-End Developer Professional Certificate covering React, HTML/CSS, JavaScript, and UI/UX fundamentals.",
  },
  {
    id: "cs50-python",
    date: "2024",
    title: "CS50P — Introduction to Python",
    category: "Certification",
    organization: "Harvard / edX",
    description:
      "Completed Harvard's CS50P with strong fundamentals in Python programming, OOP, and file I/O.",
  },
  {
    id: "conversecloud",
    date: "2023 – 2024",
    title: "Built ConverseCloud — Language Exchange Platform",
    category: "Project",
    description:
      "Full-stack language exchange platform with React, Node.js, MongoDB, Socket.IO, and WebRTC for real-time communication.",
    highlight: true,
  },
  {
    id: "hacktoberfest-2023",
    date: "Oct 2023",
    title: "Hacktoberfest 2023 Contributor",
    category: "Achievement",
    organization: "Open Source",
    description:
      "Active open-source contributor during Hacktoberfest 2023 with multiple merged pull requests.",
  },
  {
    id: "rcpit-acm-website",
    date: "2023",
    title: "Built RCPIT ACM Chapter Official Website",
    category: "Project",
    organization: "RCPIT ACM",
    description:
      "Designed and developed the official website for the college ACM chapter, handling full frontend architecture.",
  },
  {
    id: "be-start",
    date: "2022 – Present",
    title: "B.E. Computer Engineering",
    category: "Education",
    organization: "R.C. Patel Institute of Technology, Shirpur",
    description:
      "Currently in the third year of B.E. Computer Engineering with a CGPA of 8.93. Coursework covers Data Structures, Algorithms, DBMS, Operating Systems, and Computer Networks.",
    highlight: true,
  },
];
