import { cn } from "@/lib/utils";
import type { LearningItem, LearningStatus } from "@/config/learning";

const statusStyles: Record<LearningStatus, string> = {
  Learning:      "bg-primary/10 text-primary border-primary/20",
  Exploring:     "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Practicing:    "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  Completed:     "bg-muted text-muted-foreground border-border",
  "Future Ready":"bg-violet-500/10 text-violet-500 border-violet-500/20",
};

function StatusBadge({ status }: { status: LearningStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5",
        "text-[11px] font-medium",
        statusStyles[status],
      )}
    >
      {status}
    </span>
  );
}

function CategoryChip({ label }: { label: string }) {
  return (
    <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
      {label}
    </span>
  );
}

interface LearningCardProps {
  item: LearningItem;
}

export function LearningCard({ item }: LearningCardProps) {
  const { name, category, description, status } = item;

  return (
    <article
      className={cn(
        "flex flex-col gap-4 rounded-xl border border-border bg-card p-5",
        "shadow-sm transition-transform duration-200 ease-out hover:-translate-y-1",
      )}
      aria-label={`Currently learning: ${name}`}
    >
      {/* Top row: category + status */}
      <div className="flex items-center justify-between gap-2">
        <CategoryChip label={category} />
        <StatusBadge status={status} />
      </div>

      {/* Tech name */}
      <div className="flex flex-col gap-1.5">
        <h3 className="text-sm font-semibold text-foreground">{name}</h3>
        <p className="text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </article>
  );
}
