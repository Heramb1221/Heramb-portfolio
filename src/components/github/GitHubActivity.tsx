import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { getGitHubData } from "@/lib/github";
import { siteConfig } from "@/config/site";
import { Container, Section, SectionHeading } from "@/components/shared/Container";
import { GitHubStatsRow } from "@/components/github/GithubStats";
import { GitHubRepoCard } from "@/components/github/GitHubRepoCard";

function GitHubFallback() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
      <p className="text-sm font-medium text-muted-foreground">
        GitHub activity is currently unavailable.
      </p>
      <a
        href={siteConfig.links.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit GitHub profile"
        className={cn(
          "inline-flex items-center gap-1.5 rounded-xl border border-border",
          "px-4 py-2 text-xs font-medium text-muted-foreground",
          "transition-colors hover:border-primary/30 hover:text-foreground",
        )}
      >
        <ExternalLink className="size-3" aria-hidden />
        Visit my GitHub profile directly
      </a>
    </div>
  );
}

export async function GitHubActivity() {
  const { user, repos, totalStars } = await getGitHubData();

  return (
    <Section id="github-activity">
      <Container>
        {/* Heading */}
        <SectionHeading
          title="GitHub Activity"
          subtitle="Open source activity and repositories that reflect my software engineering journey."
          align="center"
        />

        {/* Fallback when API is down */}
        {!user ? (
          <GitHubFallback />
        ) : (
          <div className="flex flex-col gap-10">
            {/* Stats row */}
            <GitHubStatsRow
              publicRepos={user.public_repos}
              totalStars={totalStars}
              followers={user.followers}
              following={user.following}
            />

            {/* Featured repos grid */}
            {repos.length > 0 && (
              <div className="flex flex-col gap-5">
                <h3 className="text-sm font-semibold text-foreground">
                  Featured Repositories
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {repos.map((repo) => (
                    <GitHubRepoCard key={repo.id} repo={repo} />
                  ))}
                </div>
              </div>
            )}

            {/* View all link */}
            <div className="flex justify-center">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View all GitHub repositories"
                className={cn(
                  "inline-flex h-10 items-center gap-2 rounded-xl border border-border",
                  "px-5 text-sm font-medium text-muted-foreground",
                  "transition-colors hover:border-primary/30 hover:text-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                )}
              >
                <ExternalLink className="size-4" aria-hidden />
                View All Repositories
              </a>
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
