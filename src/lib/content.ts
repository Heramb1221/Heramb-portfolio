import fs   from "fs";
import path from "path";
import yaml  from "js-yaml";
import type { Recommendation } from "@/types/recommendation";
import type { Achievement }    from "@/types/achievement";

// ─── Shared helper ────────────────────────────────────────────────────────────

function filenameToId(filename: string): string {
  return filename
    .replace(/\.yaml$/, "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
}

function readYamlDir(dir: string): Array<Record<string, unknown>> {
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".yaml"))
      .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
      .map((filename) => {
        const raw  = fs.readFileSync(path.join(dir, filename), "utf-8");
        const data = yaml.load(raw) as Record<string, unknown>;
        return { _id: filenameToId(filename), ...(data ?? {}) };
      });
  } catch {
    return [];
  }
}

// ─── Recommendations ──────────────────────────────────────────────────────────

const recommendationsDir = path.join(
  process.cwd(),
  "src/content/recommendations",
);

/**
 * Reads all recommendation YAML files and returns typed Recommendation[].
 * Server-side only. Returns [] if directory is missing or parse fails.
 */
export function getRecommendations(): Recommendation[] {
  return readYamlDir(recommendationsDir).map((data) => ({
    id:           String(data._id          ?? ""),
    name:         String(data.name         ?? ""),
    role:         String(data.role         ?? ""),
    organization: String(data.organization ?? ""),
    message:      String(data.message      ?? ""),
    avatar:       data.avatar ? String(data.avatar) : null,
  }));
}

// ─── Achievements ─────────────────────────────────────────────────────────────

const achievementsDir = path.join(
  process.cwd(),
  "src/content/achievements",
);

/**
 * Reads all achievement YAML files and returns typed Achievement[].
 * Server-side only. Returns [] if directory is missing or parse fails.
 */
export function getAchievements(): Achievement[] {
  return readYamlDir(achievementsDir).map((data) => ({
    id:           String(data._id          ?? ""),
    title:        String(data.title        ?? ""),
    organization: String(data.organization ?? ""),
    date:         String(data.date         ?? ""),
    description:  String(data.description  ?? ""),
    category:     data.category ? String(data.category) : undefined,
    link:         data.link ? String(data.link) : null,
  }));
}

// ─── Certifications ───────────────────────────────────────────────────────────

import type { Certification } from "@/types/certificate";

const certificationsDir = path.join(
  process.cwd(),
  "src/content/certifications",
);

/**
 * Reads all certification YAML files and returns typed Certification[].
 * Server-side only. Returns [] if directory is missing or parse fails.
 * YAMLs are sorted by filename (alphabetical), which roughly matches issuer order.
 */
export function getCertifications(): Certification[] {
  return readYamlDir(certificationsDir).map((data) => ({
    id:            String(data._id           ?? ""),
    title:         String(data.title         ?? ""),
    issuer:        String(data.issuer        ?? ""),
    issueDate:     String(data.issueDate     ?? ""),
    credentialUrl: data.credentialUrl ? String(data.credentialUrl) : null,
  }));
}
