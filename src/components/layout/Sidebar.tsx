"use client";

import Link from "next/link";
import { GitFork, Briefcase, Code2, Mail, FileText } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { socialLinks, type SocialIconName } from "@/config/socials";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// ─── Icon registry ────────────────────────────────────────────────────────────
// lucide-react v1 removed Github/Linkedin brand icons;
// using semantic equivalents that remain recognisable in context.

const iconMap: Record<SocialIconName, LucideIcon> = {
  "git-fork":   GitFork,
  briefcase:    Briefcase,
  "code-2":     Code2,
  mail:         Mail,
  "file-text":  FileText,
};

// ─── Desktop sidebar link ─────────────────────────────────────────────────────

interface DesktopLinkProps {
  href: string;
  label: string;
  icon: SocialIconName;
  external: boolean;
}

function DesktopLink({ href, label, icon, external }: DesktopLinkProps) {
  const Icon = iconMap[icon];

  return (
    <Tooltip>
      {/* base-ui uses render prop instead of asChild */}
      <TooltipTrigger
        render={
          <Link
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            aria-label={label}
          />
        }
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-lg",
          "text-muted-foreground transition-colors",
          "hover:bg-muted hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        )}
      >
        <Icon className="size-4" aria-hidden />
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={8}>
        {label}
      </TooltipContent>
    </Tooltip>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

export function Sidebar() {
  return (
    // delay prop is the correct base-ui prop (not delayDuration)
    <TooltipProvider delay={200}>

      {/* Desktop — fixed left column, starts below the navbar (top-16) */}
      <aside
        aria-label="Social links"
        className={cn(
          "fixed left-0 top-16 z-40 hidden h-[calc(100vh-4rem)] w-14",
          "flex-col items-center justify-center gap-1",
          "border-r border-border/50 bg-background/50 backdrop-blur-sm",
          "md:flex",
        )}
      >
        {socialLinks.map((link) => (
          <DesktopLink key={link.label} {...link} />
        ))}
      </aside>

      {/* Mobile — floating bottom action bar */}
      <nav
        aria-label="Social links"
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 flex items-center justify-around",
          "border-t border-border/50 bg-background/90 px-2 py-2 backdrop-blur-md",
          "md:hidden",
        )}
      >
        {socialLinks.map((link) => {
          const Icon = iconMap[link.icon];
          return (
            <Link
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              aria-label={link.label}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 rounded-lg px-3 py-1.5",
                "text-muted-foreground transition-colors",
                "hover:text-foreground active:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
            >
              <Icon className="size-4" aria-hidden />
              <span className="text-[10px] font-medium leading-none">
                {link.label}
              </span>
            </Link>
          );
        })}
      </nav>

    </TooltipProvider>
  );
}
