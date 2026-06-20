import fs   from "fs";
import path from "path";
import yaml  from "js-yaml";
import type { Project } from "@/types/project";

const contentBase = path.join(process.cwd(), "src/content/projectsdetails");

function filenameToSlug(filename: string): string {
  return filename
    .replace(/\.yaml$/, "")
    .toLowerCase()
    .replace(/[—–]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function normalizeScreenshots(raw: unknown): Array<Record<string, string>> {
  if (!Array.isArray(raw)) return [];
  return raw.filter(
    (s): s is Record<string, string> =>
      s !== null && typeof s === "object" && !Array.isArray(s),
  );
}

function parseProject(
  filename: string,
  data: Record<string, unknown>,
): Project {
  return {
    slug:            filenameToSlug(filename),
    title:           String(data.title          ?? ""),
    description:     String(data.description    ?? ""),
    category:        String(data.category       ?? ""),
    featured:        Boolean(data.featured),
    status:          String(data.status         ?? ""),
    technologies:    Array.isArray(data.technologies)
                       ? (data.technologies as string[])
                       : [],
    github:          data.github   ? String(data.github)   : null,
    liveDemo:        data.liveDemo ? String(data.liveDemo) : null,
    video:           data.video    ? String(data.video)    : null,
    screenshots:     normalizeScreenshots(data.screenshots),
    metrics:         (data.metrics ?? {}) as Record<string, unknown>,
    overview:        String(data.overview         ?? ""),
    problem:         String(data.problem          ?? ""),
    solution:        String(data.solution         ?? ""),
    architecture:    String(data.architecture     ?? ""),
    challenges:      Array.isArray(data.challenges)
                       ? (data.challenges as string[])
                       : [],
    lessonsLearned:  Array.isArray(data.lessonsLearned)
                       ? (data.lessonsLearned as string[])
                       : [],
    futureImprovements: Array.isArray(data.futureImprovements)
                       ? (data.futureImprovements as string[])
                       : [],
    relatedNotes:    Array.isArray(data.relatedNotes)
                       ? (data.relatedNotes as string[])
                       : [],
  };
}

function readProjectsFromDir(dir: string): Project[] {
  try {
    const files = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".yaml"))
      .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

    return files.map((filename) => {
      const raw  = fs.readFileSync(path.join(dir, filename), "utf-8");
      const data = yaml.load(raw) as Record<string, unknown>;
      return parseProject(filename, data ?? {});
    });
  } catch {
    return [];
  }
}

export function getProjectCount(): number {
  try {
    const featured = fs
      .readdirSync(path.join(contentBase, "Featured projects"))
      .filter((f) => f.endsWith(".yaml")).length;
    const regular = fs
      .readdirSync(path.join(contentBase, "Projects"))
      .filter((f) => f.endsWith(".yaml")).length;
    return featured + regular;
  } catch {
    return 20;
  }
}

export function getFeaturedProjects(): Project[] {
  return readProjectsFromDir(path.join(contentBase, "Featured projects"));
}

export function getAllProjects(): Project[] {
  return readProjectsFromDir(path.join(contentBase, "Projects"));
}

export function getAllProjectsSorted(): Project[] {
  return [...getFeaturedProjects(), ...getAllProjects()];
}

export function getProjectBySlug(slug: string): Project | null {
  const all = getAllProjectsSorted();
  return all.find((p) => p.slug === slug) ?? null;
}

export function getAllCategories(): string[] {
  const all = getAllProjectsSorted();
  const cats = new Set(all.map((p) => p.category).filter(Boolean));
  return Array.from(cats).sort();
}
