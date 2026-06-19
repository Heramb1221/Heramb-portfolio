import Link from "next/link";
import { siteConfig } from "@/config/site";
import { navItems } from "@/config/navigation";

const footerSections = [
  {
    label: "Navigation",
    links: navItems.map((n) => ({ label: n.label, href: n.href, external: false })),
  },
  {
    label: "Sections",
    links: [
      { label: "Projects",       href: "/#featured-projects",  external: false },
      { label: "Skills",         href: "/#skills",             external: false },
      { label: "Certifications", href: "/#certifications",     external: false },
      { label: "GitHub",         href: "/#github-activity",    external: false },
      { label: "Contact",        href: "/#contact",            external: false },
    ],
  },
  {
    label: "Connect",
    links: [
      { label: "GitHub",   href: siteConfig.links.github,   external: true },
      { label: "LinkedIn", href: siteConfig.links.linkedin, external: true },
      { label: "LeetCode", href: siteConfig.links.leetcode, external: true },
      { label: "Email",    href: siteConfig.links.email,    external: false },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="mx-auto max-w-[1280px] px-6 py-10 lg:px-8">
        {/* Top row — brand + link groups */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              aria-label="Home"
              className="w-fit font-mono text-sm font-semibold text-foreground transition-opacity hover:opacity-75"
            >
              <span className="text-primary">&lt;</span>
              <span>{siteConfig.shortName}</span>
              <span className="text-primary"> /&gt;</span>
            </Link>
            <p className="text-xs leading-relaxed text-muted-foreground max-w-[200px]">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Link groups */}
          {footerSections.map((section) => (
            <nav key={section.label} aria-label={`${section.label} links`}>
              <p className="mb-3 text-xs font-semibold text-foreground">
                {section.label}
              </p>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom row — copyright */}
        <div className="mt-8 border-t border-border/50 pt-6">
          <p className="text-xs text-muted-foreground">
            &copy; {year} {siteConfig.author.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
