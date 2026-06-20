import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TagVariant = "default" | "primary" | "success" | "warning";

interface TagProps {
  children: ReactNode;
  variant?: TagVariant;
  className?: string;
}

const variantMap: Record<TagVariant, string> = {
  default: "bg-muted text-muted-foreground",
  primary: "bg-primary/10 text-primary",
  success: "bg-emerald-500/10 text-emerald-500",
  warning: "bg-amber-500/10 text-amber-500",
};

export function Tag({ children, variant = "default", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantMap[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
