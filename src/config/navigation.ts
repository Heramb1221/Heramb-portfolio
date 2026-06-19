export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Notes", href: "/notes" },
  { label: "Achievements", href: "/achievements" },
  { label: "Resume", href: "/resume" },
];
