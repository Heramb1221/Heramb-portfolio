export type ProjectStatus =
  | "Completed"
  | "Active Development"
  | "Archived Learning Project"
  | "Experimental Prototype"
  | (string & Record<never, never>);

export interface Project {
  slug: string;
  title: string;
  description: string;
  category: string;
  featured: boolean;
  status: ProjectStatus;
  technologies: string[];
  github: string | null;
  liveDemo: string | null;
  video: string | null;
  screenshots: Array<Record<string, string>>;
  metrics: Record<string, unknown>;
  overview: string;
  problem: string;
  solution: string;
  architecture: string;
  challenges: string[];
  lessonsLearned: string[];
  futureImprovements: string[];
  relatedNotes?: string[];
}

export function getThumbnailUrl(
  screenshots: Array<Record<string, string>>,
): string | null {
  if (!screenshots?.length) return null;
  const first = screenshots[0];
  if (!first || typeof first !== "object") return null;
  const url = Object.values(first)[0];
  return typeof url === "string" && url.trim() ? url.trim() : null;
}

export function extractDisplayMetrics(
  metrics: Record<string, unknown>,
  max = 3,
): string[] {
  const result: string[] = [];
  for (const value of Object.values(metrics)) {
    if (result.length >= max) break;
    if (typeof value === "boolean") continue;
    if (typeof value === "string" && value.trim().length >= 2) {
      result.push(value.trim());
    } else if (Array.isArray(value) && value.length > 0) {
      const joined = (value as unknown[])
        .filter((v): v is string => typeof v === "string")
        .slice(0, 2)
        .join(" · ");
      if (joined) result.push(joined);
    }
  }
  return result;
}

export function getStatusVariant(
  status: string,
): "success" | "warning" | "default" {
  if (status === "Completed") return "success";
  if (status === "Active Development") return "warning";
  return "default";
}
