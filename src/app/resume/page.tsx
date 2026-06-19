import type { Metadata } from "next";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { siteUrl }    from "@/lib/url";
import { skillCategories } from "@/config/skills";
import { getCertifications } from "@/lib/content";
import { getFeaturedProjects } from "@/lib/projects";
import { education, experience } from "@/config/resume";

export const metadata: Metadata = {
  title: "Resume",
  description: "Web resume of Heramb Chaudhari — Full Stack Developer.",
  alternates: { canonical: `${siteUrl}/resume` },
  openGraph: { title: "Resume — Heramb Chaudhari", images: ["/api/og"] },
};

// ─── Section wrapper ──────────────────────────────────────────────────────────
function RS({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">{title}</h2>
        <div className="h-px flex-1 bg-border" />
      </div>
      {children}
    </section>
  );
}

export default function ResumePage() {
  const certifications = getCertifications();
  const projects       = getFeaturedProjects().slice(0, 4);

  return (
    <main className="mx-auto max-w-[860px] px-6 py-20 lg:px-8">
      {/* Header */}
      <header className="mb-10 flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{siteConfig.author.name}</h1>
        <p className="text-sm text-muted-foreground">
          {siteConfig.author.email} · {siteConfig.author.location}
        </p>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Computer Engineering student with strong full-stack development skills across React, Node.js,
          MongoDB, Next.js, and React Native. Passionate about building practical, scalable software.
          Open to internship opportunities and collaborative software engineering roles.
        </p>
        <a
          href="/api/resume"
          download
          aria-label="Download PDF resume"
          className={cn(
            "mt-4 inline-flex w-fit items-center gap-2 rounded-xl bg-primary px-5 py-2.5",
            "text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90",
          )}
        >
          <Download className="size-4" aria-hidden /> Download PDF
        </a>
      </header>

      <div className="flex flex-col gap-10">
        {/* Education */}
        <RS title="Education">
          {education.map((e) => (
            <div key={e.institution} className="flex flex-col gap-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">{e.degree}</p>
                  <p className="text-xs text-muted-foreground">{e.institution} · {e.location}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-medium text-muted-foreground">{e.period}</p>
                  <p className="text-xs text-primary">CGPA {e.cgpa}</p>
                </div>
              </div>
              <ul className="mt-1 flex flex-col gap-0.5">
                {e.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-primary/60" aria-hidden />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </RS>

        {/* Skills */}
        <RS title="Technical Skills">
          <div className="flex flex-col gap-2">
            {skillCategories.map((cat) => (
              <div key={cat.id} className="flex items-start gap-3 text-xs">
                <span className="w-36 flex-shrink-0 font-medium text-foreground">{cat.title}</span>
                <span className="text-muted-foreground">{cat.skills.join(", ")}</span>
              </div>
            ))}
          </div>
        </RS>

        {/* Projects */}
        <RS title="Projects">
          {projects.map((p) => (
            <div key={p.slug} className="flex flex-col gap-1">
              <div className="flex items-start justify-between gap-4">
                <p className="text-sm font-semibold text-foreground">{p.title}</p>
                <span className="flex-shrink-0 text-xs text-muted-foreground">{p.status}</span>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">{p.description}</p>
              <p className="text-xs text-primary">{p.technologies.slice(0, 5).join(" · ")}</p>
            </div>
          ))}
        </RS>

        {/* Experience */}
        <RS title="Experience">
          {experience.map((e) => (
            <div key={e.title} className="flex flex-col gap-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">{e.title}</p>
                  <p className="text-xs text-muted-foreground">{e.organization}</p>
                </div>
                <span className="flex-shrink-0 text-xs text-muted-foreground">{e.period}</span>
              </div>
              <ul className="mt-1 flex flex-col gap-0.5">
                {e.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-primary/60" aria-hidden />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </RS>

        {/* Certifications */}
        <RS title="Certifications">
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            {certifications.map((c) => (
              <div key={c.id} className="flex items-center justify-between gap-2 text-xs">
                <span className="truncate text-foreground">{c.title}</span>
                <span className="flex-shrink-0 text-muted-foreground">{c.issueDate}</span>
              </div>
            ))}
          </div>
        </RS>
      </div>
    </main>
  );
}
