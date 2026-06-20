import fs   from "fs";
import path from "path";
import matter       from "gray-matter";
import readingTime  from "reading-time";
import type { Note } from "@/types/note";

const notesDir = path.join(process.cwd(), "src/content/notes");

function filenameToSlug(filename: string): string {
  return filename
    .replace(/\.mdx?$/, "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
}

function parseNote(filename: string, raw: string, includeContent = false): Note {
  const { data, content } = matter(raw);
  const rt = readingTime(content);

  return {
    slug:        filenameToSlug(filename),
    title:       String(data.title       ?? "Untitled"),
    description: String(data.description ?? ""),
    date:        String(data.date        ?? ""),
    tags:        Array.isArray(data.tags) ? (data.tags as string[]) : [],
    category:    String(data.category    ?? ""),
    readingTime: rt.text,
    relatedProjects: Array.isArray(data.relatedProjects) ? (data.relatedProjects as string[]) : [],
    ...(includeContent ? { content } : {}),
  };
}

export function getNotes(): Note[] {
  try {
    if (!fs.existsSync(notesDir)) return [];
    return fs
      .readdirSync(notesDir)
      .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
      .map((f) => {
        const raw = fs.readFileSync(path.join(notesDir, f), "utf-8");
        return parseNote(f, raw);
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch {
    return [];
  }
}

export function getNoteBySlug(slug: string): Note | null {
  try {
    if (!fs.existsSync(notesDir)) return null;
    const files = fs.readdirSync(notesDir).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
    const file  = files.find((f) => filenameToSlug(f) === slug);
    if (!file) return null;
    const raw = fs.readFileSync(path.join(notesDir, file), "utf-8");
    return parseNote(file, raw, true);
  } catch {
    return null;
  }
}
