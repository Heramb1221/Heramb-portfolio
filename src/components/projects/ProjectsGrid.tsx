"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";
import { ProjectCard } from "@/components/projects/ProjectCard";

interface ProjectsGridProps {
  projects: Project[];
  categories: string[];
}

export function ProjectsGrid({ projects, categories }: ProjectsGridProps) {
  const [query,          setQuery]          = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return projects.filter((p) => {
      const matchesCategory =
        activeCategory === "All" || p.category === activeCategory;
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [projects, query, activeCategory]);

  const filterOptions = ["All", ...categories];

  return (
    <div className="flex flex-col gap-8">
      {/* Search + filters */}
      <div className="flex flex-col gap-4">
        {/* Search */}
        <div className="relative max-w-md">
          <Search
            className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, technology, or category…"
            aria-label="Search projects"
            className={cn(
              "w-full rounded-xl border border-border bg-card py-2.5 pl-9 pr-9 text-sm",
              "text-foreground placeholder:text-muted-foreground",
              "outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/20",
            )}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" aria-hidden />
            </button>
          )}
        </div>

        {/* Category filters */}
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter by category"
        >
          {filterOptions.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                activeCategory === cat
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Result count */}
      <p className="text-xs text-muted-foreground">
        {filtered.length} project{filtered.length !== 1 ? "s" : ""}
        {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
        {query ? ` matching "${query}"` : ""}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-16 text-center">
          <p className="text-sm text-muted-foreground">
            No projects found. Try adjusting your search or filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
