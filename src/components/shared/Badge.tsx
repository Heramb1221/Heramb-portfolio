import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

/**
 * Tech-stack badge.
 * Blue tinted pill used on project cards to list languages / frameworks.
 * Design system: rounded-full, primary/10 background.
 */
export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary",
        className,
      )}
    >
      {children}
    </span>
  );
}
