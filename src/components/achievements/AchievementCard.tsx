import { ExternalLink } from "lucide-react";
import { ContentCard } from "@/components/shared/ContentCard";
import type { Achievement } from "@/types/achievement";
import { getCategoryColour } from "@/types/achievement";
import { cn } from "@/lib/utils";

// ─── Category badge ───────────────────────────────────────────────────────────

function CategoryBadge({ category }: { category?: string }) {
  if (!category) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5",
        "text-[11px] font-medium",
        getCategoryColour(category),
      )}
    >
      {category}
    </span>
  );
}

// ─── AchievementCard ─────────────────────────────────────────────────────────

interface AchievementCardProps {
  achievement: Achievement;
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  const { title, organization, date, description, category, link } =
    achievement;

  return (
    <ContentCard
      aria-label={title}
      className="gap-4"
    >
      {/* Category + Date */}
      <div className="flex items-center justify-between gap-2">
        <CategoryBadge category={category} />
        <time
          className="text-[11px] font-medium text-muted-foreground"
          dateTime={date}
        >
          {date}
        </time>
      </div>

      {/* Title */}
      <div className="flex flex-col gap-0.5">
        <h3 className="text-sm font-semibold leading-snug text-foreground">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground">{organization}</p>
      </div>

      {/* Description */}
      <p className="flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-3">
        {description}
      </p>

      {/* Optional link */}
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View details for ${title}`}
          className={cn(
            "mt-auto inline-flex w-fit items-center gap-1.5 rounded-lg",
            "border border-border px-3 py-1.5 text-xs font-medium",
            "text-muted-foreground transition-colors",
            "hover:border-primary/30 hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
        >
          <ExternalLink className="size-3" aria-hidden />
          View Details
        </a>
      )}
    </ContentCard>
  );
}
