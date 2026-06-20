export type TimelineCategory =
  | "Education"
  | "Project"
  | "Certification"
  | "Achievement"
  | "Learning"
  | "Experience";

export interface TimelineEntry {
  id: string;
  date: string;
  title: string;
  category: TimelineCategory;
  organization?: string;
  description: string;
  highlight?: boolean;
  details?: string[];
  technologies?: string[];
  link?: { label: string; url: string };
}

export const timelineCategoryIcons: Record<TimelineCategory, string> = {
  Education:     "GraduationCap",
  Project:       "Code2",
  Certification: "Award",
  Achievement:   "Trophy",
  Learning:      "BookOpen",
  Experience:    "Briefcase",
};

export const timelineEntries: TimelineEntry[] = [
  {
    id: "acm-treasurer",
    date: "2025 – Present",
    title: "Treasurer — ACM Student Chapter",
    category: "Experience",
    organization: "RCPIT, Shirpur",
    description:
      "Managing budgets, coordinating technical events, and leading the college's ACM chapter as a core organising member.",
    highlight: true,
    technologies: ["Leadership", "Budgeting", "Event Coordination", "Public Speaking"],
    details: [
      "Overseeing financial planning and budget approvals for over 10+ chapter activities annually.",
      "Coordinated major technical events, coding hackathons, and educational workshops reaching 500+ student participants.",
      "Liaison between college administration, student bodies, and industry experts for guest lectures."
    ]
  },
  {
    id: "hacktoberfest-2024",
    date: "Oct 2024",
    title: "Hacktoberfest 2024 Contributor",
    category: "Achievement",
    organization: "Open Source",
    description:
      "Completed Hacktoberfest 2024 with merged pull requests across open-source repositories.",
    technologies: ["Git", "GitHub", "Open Source", "Documentation"],
    link: { label: "GitHub Activity", url: "https://github.com/Heramb1221" }
  },
  {
    id: "reverie",
    date: "2026",
    title: "Built Reverie — AI Journaling App",
    category: "Project",
    description:
      "Full-stack journaling application with Next.js 14, Express, Expo React Native, MongoDB Atlas, and Gemini 1.5 Flash AI integration.",
    highlight: true,
    technologies: ["Next.js", "Express", "Expo", "React Native", "MongoDB", "Gemini AI", "JWT"],
    details: [
      "Built a secure cross-platform journaling app featuring automated mood tracking and daily summaries.",
      "Integrated Gemini 1.5 Flash API to parse journaling texts and provide personalized positive reinforcement.",
      "Engineered clean REST APIs in Node/Express and mapped responsive client pages in React Native."
    ],
    link: { label: "GitHub Repo", url: "https://github.com/Heramb1221" }
  },
  {
    id: "coditor",
    date: "2025",
    title: "Built Coditor — SaaS Code Collaboration",
    category: "Project",
    description:
      "Next.js 15, Convex, Monaco Editor, and LemonSqueezy payments. Real-time collaborative code editor with subscription billing.",
    highlight: true,
    technologies: ["Next.js", "Convex", "Monaco Editor", "LemonSqueezy", "Tailwind CSS"],
    details: [
      "Created low-latency real-time collaborative workspaces using Convex's reactive database engine.",
      "Embedded Microsoft Monaco Editor with customized linting, themes, and console execution environments.",
      "Integrated LemonSqueezy webhooks for complete merchant billing lifecycle and user subscriptions."
    ],
    link: { label: "GitHub Repo", url: "https://github.com/Heramb1221" }
  },
  {
    id: "mumble-chat",
    date: "2026",
    title: "Built Mumble Chat — React Native App",
    category: "Project",
    description:
      "Cross-platform real-time chat application using React Native, Expo, Socket.IO, and Bun as the runtime.",
    technologies: ["React Native", "Expo", "Socket.IO", "Node.js", "Bun"],
    details: [
      "Designed a real-time instant messaging UI supporting media attachments, typing indicators, and user presences.",
      "Set up a Socket.IO signaling layer on a Bun-powered server for high-performance websocket operations."
    ]
  },
  {
    id: "meta-certification",
    date: "2024",
    title: "Meta Front-End Developer Certificate",
    category: "Certification",
    organization: "Meta / Coursera",
    description:
      "Completed the Meta Front-End Developer Professional Certificate covering React, HTML/CSS, JavaScript, and UI/UX fundamentals.",
    technologies: ["React", "HTML/CSS", "JavaScript", "UI/UX Foundations", "Version Control"],
    link: { label: "Verify Credential", url: "https://www.coursera.org/account/accomplishments/professional-cert/S2E4N5J9L7F2" }
  },
  {
    id: "cs50-python",
    date: "2024",
    title: "CS50P — Introduction to Python",
    category: "Certification",
    organization: "Harvard / edX",
    description:
      "Completed Harvard's CS50P with strong fundamentals in Python programming, OOP, and file I/O.",
    technologies: ["Python", "OOP", "Unit Testing (pytest)", "Regular Expressions", "APIs"],
    link: { label: "Verify Credential", url: "https://cs50.harvard.edu/certificates/python" }
  },
  {
    id: "conversecloud",
    date: "2025",
    title: "Built ConverseCloud — Language Exchange Platform",
    category: "Project",
    description:
      "Full-stack language exchange platform with React, Node.js, MongoDB, Socket.IO, and WebRTC for real-time communication.",
    highlight: true,
    technologies: ["React", "Node.js", "MongoDB", "Socket.IO", "WebRTC", "PeerJS"],
    details: [
      "Engineered real-time video/audio channels using WebRTC (PeerJS) to enable peer-to-peer language sessions.",
      "Wrote custom Socket.IO signaling handlers for session management, presence controls, and direct calling alerts.",
      "Deployed a responsive MERN dashboard for user discovery, filter tags, and profile updates."
    ],
    link: { label: "GitHub Repo", url: "https://github.com/Heramb1221" }
  },
  {
    id: "hacktoberfest-2023",
    date: "Oct 2023",
    title: "Hacktoberfest 2023 Contributor",
    category: "Achievement",
    organization: "Open Source",
    description:
      "Active open-source contributor during Hacktoberfest 2023 with multiple merged pull requests.",
    technologies: ["Git", "GitHub", "Open Source Contribution"]
  },
  {
    id: "rcpit-acm-website",
    date: "2025",
    title: "Built RCPIT ACM Chapter Official Website",
    category: "Project",
    organization: "RCPIT ACM",
    description:
      "Designed and developed the official website for the college ACM chapter, handling full frontend architecture.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    details: [
      "Designed clean grid layouts to catalog chapter committees, executive boards, and upcoming student registrations.",
      "Optimized loading speeds and asset delivery for the portal, achieving mobile responsiveness."
    ]
  },
  {
    id: "be-start",
    date: "2023 – Present",
    title: "B.E. Computer Engineering",
    category: "Education",
    organization: "R.C. Patel Institute of Technology, Shirpur",
    description:
      "Currently in the third year of B.E. Computer Engineering with a CGPA of 8.93. Coursework covers Data Structures, Algorithms, DBMS, Operating Systems, and Computer Networks.",
    highlight: true,
    technologies: ["Data Structures", "Algorithms", "DBMS", "Operating Systems", "Computer Networks"],
    details: [
      "Maintaining an academic CGPA of 8.93/10.0.",
      "Acquired strong foundations in Object-Oriented Programming, Database Normalization, and Network Protocols.",
      "Active participation in campus coding bootcamps and student chapter activities."
    ]
  },
];
