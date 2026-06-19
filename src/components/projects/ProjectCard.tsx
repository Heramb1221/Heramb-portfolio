import Image from "next/image";
import { ExternalLink, GitFork, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";
import {
  getThumbnailUrl,
  extractDisplayMetrics,
  getStatusVariant,
} from "@/types/project";
import { Tag } from "@/components/shared/Tag";
import { CTAButton } from "@/components/shared/CTAButton";

// ─── TechnologyBadge ──────────────────────────────────────────────────────────

interface TechnologyBadgeProps {
  label: string;
  className?: string;
}

/** Individual tech-stack pill on a project card. */
export function TechnologyBadge({ label, className }: TechnologyBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-primary/20 bg-primary/10",
        "px-2 py-0.5 text-[11px] font-medium text-primary",
        className,
      )}
    >
      {label}
    </span>
  );
}

// ─── ProjectMetric ────────────────────────────────────────────────────────────

interface ProjectMetricProps {
  value: string;
}

/** A single key metric displayed inside a project card. */
export function ProjectMetric({ value }: ProjectMetricProps) {
  return (
    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <span
        className="h-1 w-1 flex-shrink-0 rounded-full bg-primary/50"
        aria-hidden="true"
      />
      {value}
    </span>
  );
}

// ─── ProjectActions ───────────────────────────────────────────────────────────

interface ProjectActionsProps {
  github: string | null;
  liveDemo: string | null;
  slug: string;
  title: string;
}

/** Action buttons row at the bottom of every project card. */
export function ProjectActions({
  github,
  liveDemo,
  slug,
  title,
}: ProjectActionsProps) {
  return (
    <div className="flex flex-wrap gap-2 pt-1" role="group" aria-label={`Actions for ${title}`}>
      {github && (
        <CTAButton
          href={github}
          variant="secondary"
          size="sm"
          external
          className="gap-1.5"
          aria-label={`View ${title} on GitHub`}
        >
          <GitFork className="size-3" aria-hidden />
          GitHub
        </CTAButton>
      )}
      {liveDemo && (
        <CTAButton
          href={liveDemo}
          variant="secondary"
          size="sm"
          external
          className="gap-1.5"
          aria-label={`Open ${title} live demo`}
        >
          <ExternalLink className="size-3" aria-hidden />
          Live Demo
        </CTAButton>
      )}
      <CTAButton
        href={`/projects/${slug}`}
        variant="primary"
        size="sm"
        className="gap-1.5"
        aria-label={`Read ${title} case study`}
      >
        <ArrowRight className="size-3" aria-hidden />
        Case Study
      </CTAButton>
    </div>
  );
}

// ─── ProjectCard ──────────────────────────────────────────────────────────────

const MAX_TECH_BADGES  = 5;
const MAX_METRICS      = 3;

interface ProjectCardProps {
  project: Project;
}

/** Full project card — thumbnail, metadata, badges, metrics, actions. */
export function ProjectCard({ project }: ProjectCardProps) {
  const {
    slug, title, description, category, status,
    technologies, github, liveDemo, screenshots, metrics,
  } = project;

  const thumbnailUrl    = getThumbnailUrl(screenshots);
  const displayMetrics  = extractDisplayMetrics(metrics, MAX_METRICS);
  const displayTechs    = technologies.slice(0, MAX_TECH_BADGES);
  const extraTechCount  = Math.max(0, technologies.length - MAX_TECH_BADGES);
  const statusVariant   = getStatusVariant(status);

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-border bg-card",
        "shadow-sm transition-transform duration-200 ease-out hover:-translate-y-1",
      )}
      aria-label={title}
    >
      {/* Thumbnail — 16:9 */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={`${title} screenshot`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 640px"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          /* Graceful placeholder when no screenshot is available */
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <span className="select-none font-mono text-3xl font-bold text-muted-foreground/40">
              {title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-4 p-5">

        {/* Category + Status */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-muted-foreground">{category}</span>
          <Tag variant={statusVariant}>{status}</Tag>
        </div>

        {/* Title + Description */}
        <div className="flex flex-col gap-1.5">
          <h3 className="text-base font-semibold leading-snug text-foreground">
            {title}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        {/* Tech badges */}
        {displayTechs.length > 0 && (
          <div className="flex flex-wrap gap-1.5" aria-label="Technologies used">
            {displayTechs.map((tech) => (
              <TechnologyBadge key={tech} label={tech} />
            ))}
            {extraTechCount > 0 && (
              <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                +{extraTechCount} more
              </span>
            )}
          </div>
        )}

        {/* Metrics */}
        {displayMetrics.length > 0 && (
          <div
            className="flex flex-col gap-1.5 border-t border-border pt-3"
            aria-label="Project metrics"
          >
            {displayMetrics.map((m) => (
              <ProjectMetric key={m} value={m} />
            ))}
          </div>
        )}

        {/* Actions — pushed to bottom */}
        <div className="mt-auto border-t border-border pt-4">
          <ProjectActions
            github={github}
            liveDemo={liveDemo}
            slug={slug}
            title={title}
          />
        </div>

      </div>
    </article>
  );
}
