export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  cgpa: string;
  highlights: string[];
}

export interface Experience {
  title: string;
  organization: string;
  period: string;
  type: "Leadership" | "Internship" | "Freelance";
  highlights: string[];
}

export const education: Education[] = [
  {
    degree: "B.E. Computer Engineering",
    institution: "R.C. Patel Institute of Technology",
    location: "Shirpur, Maharashtra",
    period: "2022 – 2026",
    cgpa: "8.93",
    highlights: [
      "Relevant coursework: Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, OOP",
      "Active member of ACM Student Chapter",
      "Hacktoberfest 2023 & 2024 contributor",
    ],
  },
];

export const experience: Experience[] = [
  {
    title: "Treasurer",
    organization: "ACM Student Chapter, RCPIT",
    period: "2024 – Present",
    type: "Leadership",
    highlights: [
      "Managing annual chapter budget and event finances",
      "Coordinating technical workshops, hackathons, and guest lectures",
      "Developed and maintain the official ACM chapter website",
    ],
  },
];
