import { Star, GitFork, ExternalLink } from "lucide-react";
import { ContentCard } from "@/components/shared/ContentCard";
import type { GitHubRepo } from "@/lib/github";
import { languageColours } from "@/lib/github";
import { cn } from "@/lib/utils";

interface GitHubRepoCardProps {
  repo: GitHubRepo;
}

export function GitHubRepoCard({ repo }: GitHubRepoCardProps) {
  const { name, description, html_url, language, stargazers_count, forks_count } = repo;
  const langColour = language ? (languageColours[language] ?? "#94a3b8") : null;

  return (
    <ContentCard aria-label={`Repository: ${name}`} className="gap-3">
      {/* Repo name */}
      <h3 className="text-sm font-semibold text-foreground truncate">
        {name}
      </h3>

      {/* Description */}
      <p className="flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
        {description ?? "No description available."}
      </p>

      {/* Meta row — language + stars + forks */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        {language && langColour && (
          <span className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: langColour }}
              aria-hidden="true"
            />
            {language}
          </span>
        )}
        <span className="flex items-center gap-1" aria-label={`${stargazers_count} stars`}>
          <Star className="size-3" aria-hidden />
          {stargazers_count}
        </span>
        <span className="flex items-center gap-1" aria-label={`${forks_count} forks`}>
          <GitFork className="size-3" aria-hidden />
          {forks_count}
        </span>
      </div>

      {/* GitHub link */}
      <a
        href={html_url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${name} on GitHub`}
        className={cn(
          "mt-auto inline-flex w-fit items-center gap-1.5 rounded-lg",
          "border border-border px-3 py-1.5 text-xs font-medium",
          "text-muted-foreground transition-colors",
          "hover:border-primary/30 hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        )}
      >
        <ExternalLink className="size-3" aria-hidden />
        View on GitHub
      </a>
    </ContentCard>
  );
}
