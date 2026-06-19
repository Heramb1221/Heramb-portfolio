import type { MetadataRoute } from "next";
import { siteUrl }            from "@/lib/url";
import { getAllProjectsSorted } from "@/lib/projects";
import { getNotes }            from "@/lib/notes";

const staticRoutes = [
  { route: "",           priority: 1.0, changeFrequency: "monthly" },
  { route: "/projects",  priority: 0.9, changeFrequency: "weekly"  },
  { route: "/resume",    priority: 0.8, changeFrequency: "monthly" },
  { route: "/notes",     priority: 0.7, changeFrequency: "weekly"  },
  { route: "/playground",priority: 0.5, changeFrequency: "monthly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllProjectsSorted();
  const notes    = getNotes();

  const projectUrls: MetadataRoute.Sitemap = projects.map((p) => ({
    url:              `${siteUrl}/projects/${p.slug}`,
    lastModified:     new Date(),
    changeFrequency:  "monthly",
    priority:         0.8,
  }));

  const noteUrls: MetadataRoute.Sitemap = notes.map((n) => ({
    url:              `${siteUrl}/notes/${n.slug}`,
    lastModified:     n.date ? new Date(n.date) : new Date(),
    changeFrequency:  "monthly",
    priority:         0.6,
  }));

  const staticUrls: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url:              `${siteUrl}${r.route}`,
    lastModified:     new Date(),
    changeFrequency:  r.changeFrequency,
    priority:         r.priority,
  }));

  return [...staticUrls, ...projectUrls, ...noteUrls];
}
