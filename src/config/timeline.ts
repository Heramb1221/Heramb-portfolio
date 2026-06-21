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
"Elected Treasurer of the ACM Student Chapter, contributing to technical initiatives, event planning, and chapter operations.",
highlight: true,
technologies: ["Leadership", "Budgeting", "Event Planning", "Collaboration"],
details: [
"Manage chapter finances, budgeting, and operational planning.",
"Support workshops, coding events, and technical sessions.",
"Collaborate with faculty, students, and chapter leadership to execute initiatives."
]
},

{
id: "be-start",
date: "2023 – Present",
title: "B.E. Computer Engineering",
category: "Education",
organization: "R.C. Patel Institute of Technology, Shirpur",
description:
"Currently pursuing Computer Engineering with a CGPA of 8.93 while building software projects and participating in technical communities.",
highlight: true,
technologies: [
"Data Structures",
"Algorithms",
"DBMS",
"Operating Systems",
"Computer Networks"
],
details: [
"Current CGPA: 8.93 / 10.",
"Strong foundation in software engineering fundamentals.",
"Active contributor to technical clubs, projects, and hackathons."
]
},

{
id: "conversecloud",
date: "2025",
title: "Built ConverseCloud — Language Exchange Platform",
category: "Project",
description:
"Full-stack language exchange platform with real-time messaging, video calling, authentication, and social networking features.",
highlight: true,
technologies: [
"React",
"Node.js",
"MongoDB",
"Stream Chat",
"Stream Video",
"TanStack Query",
"Zustand"
],
details: [
"Implemented real-time chat and video communication using Stream SDKs.",
"Designed deterministic channel generation and scalable user interactions.",
"Built secure authentication using JWT and httpOnly cookies."
],
link: {
label: "GitHub",
url: "https://github.com/Heramb1221"
}
},

{
id: "reverie",
date: "2025",
title: "Built Reverie — Personal Journaling Platform",
category: "Project",
description:
"Cross-platform journaling and mood-tracking application built for web and mobile experiences.",
technologies: [
"Next.js",
"React Native",
"TypeScript",
"MongoDB"
],
details: [
"Built private journaling workflows and mood tracking features.",
"Designed a shared backend architecture for web and mobile clients.",
"Focused on long-term reflection, memory preservation, and personal growth."
],
link: {
label: "GitHub",
url: "https://github.com/Heramb1221"
}
},

{
id: "rcpit-acm-website",
date: "2025",
title: "Built ACM Chapter Website",
category: "Project",
organization: "RCPIT ACM",
description:
"Developed and maintained the official ACM Student Chapter website.",
technologies: [
"Next.js",
"React",
"Tailwind CSS",
"Responsive Design"
],
details: [
"Implemented Home, About, Events, Gallery, and Contact modules.",
"Worked closely with chapter leadership on requirements and content.",
"Managed deployment, maintenance, and updates."
]
},

{
  id: "animeverse",
  date: "2024",
  title: "Winner — AnimeVerse Competition",
  category: "Achievement",
  description:
    "Led the team to victory in AnimeVerse, demonstrating leadership, teamwork, and creative problem-solving under competitive conditions.",
  technologies: [
    "Leadership",
    "Teamwork",
    "Problem Solving",
    "Communication"
  ],
  highlight: true,
  details: [
    "Served as Team Leader throughout the competition.",
    "Coordinated team efforts and decision-making.",
    "Successfully guided the team to a winning position."
  ]
},

{
id: "cyber-damaka",
date: "2024",
title: "Winner — Cyber Damaka Cybersecurity Competition",
category: "Achievement",
description:
"Secured 1st place among 44 participating teams in a cybersecurity competition.",
highlight: true,
technologies: [
"Cybersecurity",
"Problem Solving",
"Teamwork"
]
},

{
id: "hacktoberfest-2024",
date: "2024",
title: "Hacktoberfest 2024 Contributor",
category: "Achievement",
organization: "Open Source",
description:
"Successfully completed Hacktoberfest through open-source contributions.",
technologies: [
"Git",
"GitHub",
"Open Source"
],
link: {
label: "GitHub",
url: "https://github.com/Heramb1221"
}
},
];

