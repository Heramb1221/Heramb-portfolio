export const siteConfig = {
  name: "Heramb Chaudhari",
  shortName: "HC",
  title: "Heramb Chaudhari — Full Stack Developer",
  titleTemplate: "%s | Heramb Chaudhari",
  description:
    "Computer Engineering student passionate about full-stack development and building scalable applications. Open to internships and software development opportunities.",
  tagline: "Software Engineering Through Continuous Learning",
  url: "https://heramb.dev",
  ogImage: "/og.png",
  keywords: [
    "Heramb Chaudhari",
    "Computer Engineering Student",
    "Full Stack Developer",
    "React Developer",
    "Node.js Developer",
    "Software Engineer",
    "React Native Developer",
    "MERN Stack",
    "Next.js Developer",
  ],
  author: {
    name: "Heramb Vinayak Chaudhari",
    email: "hchaudhari1221@gmail.com",
    phone: "7387363266",
    location: "Jalgaon, Maharashtra, India",
    availability: "Open to Internship / Job / Freelance",
  },
  links: {
    github: "https://github.com/Heramb1221",
    linkedin: "https://www.linkedin.com/in/heramb-chaudhari/",
    leetcode: "https://leetcode.com/u/Heramb1221/",
    email: "mailto:hchaudhari1221@gmail.com",
    resume: "/resume",
    devTo: "https://dev.to/heramb1221",
  },
} as const;

export type SiteConfig = typeof siteConfig;
