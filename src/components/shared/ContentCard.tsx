import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContentCardProps {
  children: ReactNode;
  className?: string;
  /** Passed to the underlying <article> for accessibility */
  "aria-label"?: string;
  /** Optional: removes default padding so inner sections can set their own */
  noPadding?: boolean;
}

/**
 * Shared base card wrapper.
 * Used by: RecommendationCard, AchievementCard, CertificationCard, NoteCard.
 *
 * Provides:
 *  - rounded-xl border
 *  - bg-card
 *  - soft shadow
 *  - CSS hover lift (no JS listener)
 *  - consistent p-5 padding (override with noPadding + custom className)
 *  - responsive behaviour via standard block layout
 */
export function ContentCard({
  children,
  className,
  "aria-label": ariaLabel,
  noPadding = false,
}: ContentCardProps) {
  return (
    <article
      aria-label={ariaLabel}
      className={cn(
        "flex flex-col rounded-xl border border-border bg-card",
        "shadow-sm transition-transform duration-200 ease-out hover:-translate-y-1",
        !noPadding && "p-5",
        className,
      )}
    >
      {children}
    </article>
  );
}
