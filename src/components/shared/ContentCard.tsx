import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContentCardProps {
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
  noPadding?: boolean;
}

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
        "group flex flex-col rounded-xl border border-border bg-card",
        "transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_8px_30px_rgba(245,158,11,0.06)]",
        !noPadding && "p-5",
        className,
      )}
    >
      {children}
    </article>
  );
}
