import { Quote } from "lucide-react";
import { ContentCard } from "@/components/shared/ContentCard";
import type { Recommendation } from "@/types/recommendation";
import { getInitials } from "@/types/recommendation";
import { cn } from "@/lib/utils";

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar({ name, avatar }: { name: string; avatar: string | null }) {
  const initials = getInitials(name);

  if (avatar) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={avatar}
        alt={`${name} avatar`}
        className="h-10 w-10 rounded-full object-cover"
        loading="lazy"
      />
    );
  }

  return (
    <div
      className={cn(
        "flex h-10 w-10 flex-shrink-0 items-center justify-center",
        "rounded-full bg-primary/10 text-xs font-semibold text-primary",
        "select-none",
      )}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

// ─── RecommendationCard ───────────────────────────────────────────────────────

interface RecommendationCardProps {
  recommendation: Recommendation;
}

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const { name, role, organization, message, avatar } = recommendation;

  return (
    <ContentCard
      aria-label={`Recommendation from ${name}`}
      className="gap-5"
    >
      {/* Quote icon */}
      <Quote
        className="h-6 w-6 flex-shrink-0 text-primary/30"
        aria-hidden="true"
      />

      {/* Message */}
      <blockquote className="flex-1 text-sm leading-relaxed text-muted-foreground">
        {message}
      </blockquote>

      {/* Author */}
      <footer className="flex items-center gap-3 border-t border-border pt-4">
        <Avatar name={name} avatar={avatar} />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{name}</p>
          <p className="truncate text-xs text-muted-foreground">
            {role} · {organization}
          </p>
        </div>
      </footer>
    </ContentCard>
  );
}
