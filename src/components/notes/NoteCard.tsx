import Link from "next/link";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { ContentCard } from "@/components/shared/ContentCard";
import type { Note } from "@/types/note";
import { cn } from "@/lib/utils";

interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  const { slug, title, description, date, tags, category, readingTime } = note;

  const displayDate = date
    ? new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    : "";

  return (
    <ContentCard aria-label={title} className="gap-4">
      {/* Category + reading time */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          {category}
        </span>
        <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
          <Clock className="size-3" aria-hidden />
          {readingTime}
        </span>
      </div>

      {/* Title + description */}
      <div className="flex flex-col gap-1.5 flex-1">
        <h3 className="text-sm font-semibold leading-snug text-foreground line-clamp-2">
          {title}
        </h3>
        <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
          {description}
        </p>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5" aria-label="Tags">
          {tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer — date + read link */}
      <div className="flex items-center justify-between border-t border-border pt-3">
        {displayDate && (
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Calendar className="size-3" aria-hidden />
            {displayDate}
          </span>
        )}
        <Link
          href={`/notes/${slug}`}
          aria-label={`Read ${title}`}
          className={cn(
            "ml-auto inline-flex items-center gap-1 text-xs font-medium text-primary",
            "transition-opacity hover:opacity-75",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded",
          )}
        >
          Read
          <ArrowRight className="size-3" aria-hidden />
        </Link>
      </div>
    </ContentCard>
  );
}
