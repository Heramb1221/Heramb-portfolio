import { cn } from "@/lib/utils";
import type { TimelineEntry, TimelineCategory } from "@/config/timeline";
import { TimelineIcon, getCategoryColour } from "@/components/timeline/TimelineIcon";

// ─── Category badge ───────────────────────────────────────────────────────────

function CategoryBadge({ category }: { category: TimelineCategory }) {
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

// ─── TimelineCard ─────────────────────────────────────────────────────────────

interface TimelineCardProps {
  entry: TimelineEntry;
  /** Which side of the central line the card sits on (desktop alternating layout) */
  side?: "left" | "right";
}

/**
 * A single timeline entry card.
 * Contains icon, date, category badge, title, org, and description.
 */
export function TimelineCard({ entry, side = "right" }: TimelineCardProps) {
  const { title, date, category, organization, description, highlight } = entry;

  return (
    <div
      className={cn(
        "flex items-start gap-4",
        side === "left" && "lg:flex-row-reverse",
      )}
    >
      {/* Icon — visible on mobile inline; on desktop it overlaps the centre line */}
      <div className="flex-shrink-0 lg:hidden">
        <TimelineIcon category={category} />
      </div>

      {/* Card */}
      <article
        className={cn(
          "flex-1 rounded-xl border bg-card p-5 shadow-sm",
          "transition-transform duration-200 ease-out hover:-translate-y-0.5",
          highlight
            ? "border-primary/30"
            : "border-border",
        )}
        aria-label={title}
      >
        {/* Date + Category */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <time
            className="text-xs font-medium text-muted-foreground"
            dateTime={date}
          >
            {date}
          </time>
          <CategoryBadge category={category} />
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold leading-snug text-foreground">
          {title}
        </h3>

        {/* Organization */}
        {organization && (
          <p className="mt-0.5 text-xs text-muted-foreground">{organization}</p>
        )}

        {/* Description */}
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      </article>
    </div>
  );
}
