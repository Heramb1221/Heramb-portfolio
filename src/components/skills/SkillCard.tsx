import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── SkillBadge ───────────────────────────────────────────────────────────────

interface SkillBadgeProps {
  label: string;
}

/**
 * Individual skill pill inside a SkillCard.
 * Muted background — visually distinct from project TechnologyBadge (primary tint).
 */
export function SkillBadge({ label }: SkillBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full",
        "border border-border bg-muted px-2.5 py-0.5",
        "text-xs font-medium text-muted-foreground",
        "transition-colors hover:border-primary/30 hover:text-foreground",
      )}
    >
      {label}
    </span>
  );
}

// ─── SkillCard ────────────────────────────────────────────────────────────────

interface SkillCardProps {
  title: string;
  icon: LucideIcon;
  iconLabel: string;
  skills: string[];
  /** Accent variant — "learning" uses amber tint to distinguish it visually */
  variant?: "default" | "learning";
}

/**
 * Category card for the Skills section.
 * Contains an icon, category title, and a wrapping row of SkillBadge elements.
 * Hover lift is CSS-only for performance (no JS per card).
 */
export function SkillCard({
  title,
  icon: Icon,
  iconLabel,
  skills,
  variant = "default",
}: SkillCardProps) {
  const isLearning = variant === "learning";

  return (
    <article
      className={cn(
        "flex flex-col gap-4 rounded-xl border bg-card p-5",
        "shadow-sm transition-transform duration-200 ease-out hover:-translate-y-1",
        isLearning ? "border-amber-500/20" : "border-border",
      )}
      aria-label={`${title} skills`}
    >
      {/* Header — icon + title */}
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg",
            isLearning
              ? "bg-amber-500/10 text-amber-500"
              : "bg-primary/10 text-primary",
          )}
          aria-hidden="true"
        >
          <Icon className="size-4" aria-label={iconLabel} />
        </div>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>

      {/* Skill badges — wrap automatically */}
      <div
        className="flex flex-wrap gap-1.5"
        role="list"
        aria-label={`${title} technologies`}
      >
        {skills.map((skill) => (
          <div key={skill} role="listitem">
            <SkillBadge label={skill} />
          </div>
        ))}
      </div>
    </article>
  );
}
