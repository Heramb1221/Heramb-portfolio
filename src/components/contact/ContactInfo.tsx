import { Mail, Link as LinkIcon, GitFork, Code2, MapPin, FileText } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

// ─── ContactLinkCard ──────────────────────────────────────────────────────────

interface ContactLinkCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}

function ContactLinkCard({
  icon,
  label,
  value,
  href,
  external,
}: ContactLinkCardProps) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={`${label}: ${value}`}
      className={cn(
        "flex items-center gap-4 rounded-xl border border-border bg-card p-4",
        "shadow-sm transition-transform duration-200 ease-out hover:-translate-y-0.5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      )}
    >
      <div
        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
        aria-hidden="true"
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-semibold text-foreground">{value}</p>
      </div>
    </Link>
  );
}

// ─── ContactInfo ──────────────────────────────────────────────────────────────

export function ContactInfo() {
  return (
    <div className="flex flex-col gap-5">
      {/* Availability callout */}
      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
        <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          Currently Available
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {siteConfig.author.availability}
        </p>
      </div>

      {/* Contact links */}
      <div className="flex flex-col gap-3" role="list" aria-label="Contact information">
        <div role="listitem">
          <ContactLinkCard
            icon={<Mail className="size-4" />}
            label="Email"
            value="hchaudhari1221@gmail.com"
            href={siteConfig.links.email}
          />
        </div>
        <div role="listitem">
          <ContactLinkCard
            icon={<LinkIcon className="size-4" />}
            label="LinkedIn"
            value="linkedin.com/in/heramb-chaudhari"
            href={siteConfig.links.linkedin}
            external
          />
        </div>
        <div role="listitem">
          <ContactLinkCard
            icon={<GitFork className="size-4" />}
            label="GitHub"
            value="github.com/Heramb1221"
            href={siteConfig.links.github}
            external
          />
        </div>
        <div role="listitem">
          <ContactLinkCard
            icon={<Code2 className="size-4" />}
            label="LeetCode"
            value="leetcode.com/u/Heramb1221"
            href={siteConfig.links.leetcode}
            external
          />
        </div>
        <div role="listitem">
          <ContactLinkCard
            icon={<MapPin className="size-4" />}
            label="Location"
            value={siteConfig.author.location}
            href="https://maps.google.com/?q=Jalgaon,Maharashtra,India"
            external
          />
        </div>
      </div>

      {/* Resume download */}
      <Link
        href="/resume"
        aria-label="Download resume"
        className={cn(
          "flex items-center justify-center gap-2 rounded-xl",
          "border border-border bg-card px-5 py-3",
          "text-sm font-medium text-muted-foreground",
          "shadow-sm transition-colors hover:border-primary/30 hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        )}
      >
        <FileText className="size-4" aria-hidden />
        Download Resume
      </Link>
    </div>
  );
}
