import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface HighlightCardProps {
  icon: LucideIcon;
  iconLabel: string;
  title: string;
  description: string;
}

export function HighlightCard({
  icon: Icon,
  iconLabel,
  title,
  description,
}: HighlightCardProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border border-border bg-card p-4",
        "shadow-sm transition-transform duration-200 ease-out hover:-translate-y-0.5",
      )}
    >
      {/* Icon */}
      <div
        className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
        aria-hidden="true"
      >
        <Icon className="size-4" aria-label={iconLabel} />
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
