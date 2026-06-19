export type SocialIconName =
  | "git-fork"
  | "briefcase"
  | "code-2"
  | "mail"
  | "file-text";

export interface SocialLink {
  label: string;
  href: string;
  icon: SocialIconName;
  external: boolean;
}

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/Heramb1221",
    icon: "git-fork",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/heramb-chaudhari/",
    icon: "briefcase",
    external: true,
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/Heramb1221/",
    icon: "code-2",
    external: true,
  },
  {
    label: "Email",
    href: "mailto:hchaudhari1221@gmail.com",
    icon: "mail",
    external: false,
  },
  {
    label: "Resume",
    href: "/resume",
    icon: "file-text",
    external: false,
  },
];
