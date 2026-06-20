import Link from "next/link";
import { ExternalLink, GitFork, ArrowLeft, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";
import { extractDisplayMetrics, getStatusVariant } from "@/types/project";
import { Tag } from "@/components/shared/Tag";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { getNotes } from "@/lib/notes";

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      {children}
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <ul className="flex flex-col gap-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
          <CheckCircle2 className="mt-0.5 size-4 flex-shrink-0 text-primary/60" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const {
    title, description, category, status, technologies,
    github, liveDemo, screenshots, metrics,
    overview, problem, solution, architecture,
    challenges, lessonsLearned, futureImprovements,
  } = project;

  const displayMetrics  = extractDisplayMetrics(metrics, 6);
  const statusVariant   = getStatusVariant(status);
  
  const allNotes = getNotes();
  const relatedNotes = allNotes.filter(
    (n) => n.relatedProjects?.includes(project.slug) || project.relatedNotes?.includes(n.slug)
  );

  return (
    <div className="mx-auto max-w-[860px] px-6 py-20 lg:px-8">
      {/* Back link */}
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Back to all projects"
      >
        <ArrowLeft className="size-3.5" aria-hidden /> Back to Projects
      </Link>

      {/* Hero meta */}
      <header className="mb-12 flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">{category}</span>
          <Tag variant={statusVariant}>{status}</Tag>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">{description}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {technologies.map((t) => (
            <span key={t} className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">
              {t}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 pt-1">
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer"
              aria-label={`View ${title} on GitHub`}
              className={cn("inline-flex h-10 items-center gap-2 rounded-xl border border-border px-4 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground")}>
              <GitFork className="size-4" aria-hidden /> GitHub
            </a>
          )}
          {liveDemo && (
            <a href={liveDemo} target="_blank" rel="noopener noreferrer"
              aria-label={`Open ${title} live demo`}
              className={cn("inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90")}>
              <ExternalLink className="size-4" aria-hidden /> Live Demo
            </a>
          )}
        </div>
      </header>

      {/* Content sections */}
      <div className="flex flex-col gap-10">
        {/* Screenshots */}
        {screenshots.length > 0 && (
          <ProjectGallery screenshots={screenshots} projectTitle={title} />
        )}

        {/* Metrics */}
        {displayMetrics.length > 0 && (
          <DetailSection title="Key Metrics">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {displayMetrics.map((m) => (
                <div key={m} className="rounded-xl border border-border bg-card px-4 py-3">
                  <p className="text-sm font-medium text-foreground">{m}</p>
                </div>
              ))}
            </div>
          </DetailSection>
        )}

        {overview     && <DetailSection title="Overview"><p className="text-sm leading-relaxed text-muted-foreground">{overview}</p></DetailSection>}
        {problem      && <DetailSection title="Problem"><p className="text-sm leading-relaxed text-muted-foreground">{problem}</p></DetailSection>}
        {solution     && <DetailSection title="Solution"><p className="text-sm leading-relaxed text-muted-foreground">{solution}</p></DetailSection>}
        {architecture && <DetailSection title="Architecture"><p className="text-sm leading-relaxed text-muted-foreground">{architecture}</p></DetailSection>}

        {challenges.length > 0          && <DetailSection title="Challenges"><BulletList items={challenges} /></DetailSection>}
        {lessonsLearned.length > 0      && <DetailSection title="Lessons Learned"><BulletList items={lessonsLearned} /></DetailSection>}
        {futureImprovements.length > 0  && <DetailSection title="Future Improvements"><BulletList items={futureImprovements} /></DetailSection>}

        {relatedNotes.length > 0 && (
          <DetailSection title="Development Log & Engineering Decisions">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {relatedNotes.map((note) => (
                <Link
                  key={note.slug}
                  href={`/notes/${note.slug}`}
                  className="group flex flex-col gap-2 rounded-xl border border-border bg-card/45 p-5 hover:border-accent-creative/30 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(245,158,11,0.03)] hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                    <span>{note.date}</span>
                    <span>{note.readingTime}</span>
                  </div>
                  <h4 className="font-heading font-bold text-sm text-foreground group-hover:text-accent-creative transition-colors duration-200">
                    {note.title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {note.description}
                  </p>
                  <div className="flex items-center gap-1.5 font-mono text-[9px] text-accent-creative mt-1 font-semibold">
                    <span>READ DOCUMENTATION</span>
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </DetailSection>
        )}
      </div>
    </div>
  );
}
