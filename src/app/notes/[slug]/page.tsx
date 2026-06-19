import type { Metadata } from "next";
import { notFound }      from "next/navigation";
import { MDXRemote }     from "next-mdx-remote/rsc";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Tag as TagIcon } from "lucide-react";
import { cn }            from "@/lib/utils";
import { siteUrl }       from "@/lib/url";
import { getNoteBySlug, getNotes } from "@/lib/notes";

// ─── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return getNotes().map((n) => ({ slug: n.slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note     = getNoteBySlug(slug);
  if (!note) return { title: "Note Not Found" };
  return {
    title:       note.title,
    description: note.description,
    alternates:  { canonical: `${siteUrl}/notes/${slug}` },
    openGraph: {
      title:       note.title,
      description: note.description,
      type:        "article",
      publishedTime: note.date,
    },
  };
}

// ─── MDX components ───────────────────────────────────────────────────────────

const mdxComponents = {
  h1: (p: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 {...p} className="mb-4 mt-8 text-2xl font-bold tracking-tight text-foreground" />
  ),
  h2: (p: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...p} className="mb-3 mt-8 text-xl font-semibold text-foreground" />
  ),
  h3: (p: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...p} className="mb-2 mt-6 text-base font-semibold text-foreground" />
  ),
  p: (p: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...p} className="mb-4 text-sm leading-relaxed text-muted-foreground" />
  ),
  ul: (p: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...p} className="mb-4 flex flex-col gap-1.5 pl-4" />
  ),
  li: (p: React.HTMLAttributes<HTMLLIElement>) => (
    <li {...p} className="text-sm text-muted-foreground [&::marker]:text-primary" style={{ listStyleType: "disc" }} />
  ),
  a: (p: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...p} className="text-primary underline-offset-4 hover:underline" target={p.href?.startsWith("http") ? "_blank" : undefined} rel={p.href?.startsWith("http") ? "noopener noreferrer" : undefined} />
  ),
  code: (p: React.HTMLAttributes<HTMLElement>) => (
    <code {...p} className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground" />
  ),
  pre: (p: React.HTMLAttributes<HTMLPreElement>) => (
    <pre {...p} className="mb-4 overflow-x-auto rounded-xl border border-border bg-muted p-4 font-mono text-xs leading-relaxed text-foreground" />
  ),
  blockquote: (p: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote {...p} className="mb-4 border-l-2 border-primary pl-4 text-sm italic text-muted-foreground" />
  ),
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note     = getNoteBySlug(slug);

  if (!note || !note.content) notFound();

  const displayDate = note.date
    ? new Date(note.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "";

  return (
    <main className="mx-auto max-w-[720px] px-6 py-20 lg:px-8">
      {/* Back */}
      <Link href="/notes" className="mb-8 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="size-3.5" aria-hidden /> Back to Notes
      </Link>

      {/* Header */}
      <header className="mb-10 flex flex-col gap-4">
        <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{note.category}</span>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{note.title}</h1>
        {note.description && <p className="text-sm leading-relaxed text-muted-foreground">{note.description}</p>}

        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          {displayDate && (
            <span className="flex items-center gap-1"><Calendar className="size-3" aria-hidden />{displayDate}</span>
          )}
          <span className="flex items-center gap-1"><Clock className="size-3" aria-hidden />{note.readingTime}</span>
        </div>

        {note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5" aria-label="Tags">
            {note.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                <TagIcon className="size-2.5" aria-hidden />{tag}
              </span>
            ))}
          </div>
        )}

        <div className={cn("h-px w-full bg-border")} />
      </header>

      {/* MDX content */}
      <article>
        <MDXRemote source={note.content} components={mdxComponents} />
      </article>
    </main>
  );
}
