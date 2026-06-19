import { cn } from "@/lib/utils";

// ─── StatBox ──────────────────────────────────────────────────────────────────

function StatBox({
  value,
  label,
}: {
  value: number | string;
  label: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-1 rounded-xl border border-border",
        "bg-card px-6 py-5 shadow-sm",
      )}
    >
      <p className="text-2xl font-bold tracking-tight text-foreground">
        {value}
      </p>
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
    </div>
  );
}

// ─── GitHubStatsRow ───────────────────────────────────────────────────────────

interface GitHubStatsRowProps {
  publicRepos: number;
  totalStars: number;
  followers: number;
  following: number;
}

/**
 * Horizontal stats row for the GitHub Activity section.
 * Server-compatible — no hooks or client-only APIs.
 */
export function GitHubStatsRow({
  publicRepos,
  totalStars,
  followers,
  following,
}: GitHubStatsRowProps) {
  return (
    <div
      className="grid grid-cols-2 gap-4 sm:grid-cols-4"
      aria-label="GitHub statistics"
    >
      <StatBox value={`${publicRepos}+`} label="Public Repos" />
      <StatBox value={`${totalStars}+`}  label="Total Stars" />
      <StatBox value={followers}          label="Followers" />
      <StatBox value={following}          label="Following" />
    </div>
  );
}
