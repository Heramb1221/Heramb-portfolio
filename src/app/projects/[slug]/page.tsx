import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjectsSorted } from "@/lib/projects";
import { ProjectDetail } from "@/components/projects/ProjectDetail";

// ─── Static params ────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return getAllProjectsSorted().map((p) => ({ slug: p.slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project  = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.description,
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project  = getProjectBySlug(slug);

  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
