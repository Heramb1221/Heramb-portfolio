"use client";

import { useState, useMemo } from "react";
import { Search, X, Tag as TagIcon, Compass, Folder } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Note } from "@/types/note";
import { NoteCard } from "@/components/notes/NoteCard";

interface NotesClientProps {
  notes: Note[];
}

export function NotesClient({ notes }: NotesClientProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    notes.forEach((n) => n.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, [notes]);

  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    notes.forEach((n) => {
      if (n.category) cats.add(n.category);
    });
    return Array.from(cats).sort();
  }, [notes]);

  const filtered = useMemo(() => {
    return notes.filter((n) => {

      const q = query.toLowerCase().trim();
      const matchesQuery = !q || 
        n.title.toLowerCase().includes(q) ||
        n.description.toLowerCase().includes(q) ||
        n.tags.some((t) => t.toLowerCase().includes(q)) ||
        n.category.toLowerCase().includes(q);

      const matchesCategory = !selectedCategory || n.category === selectedCategory;

      const matchesTag = !selectedTag || n.tags.includes(selectedTag);

      return matchesQuery && matchesCategory && matchesTag;
    });
  }, [notes, query, selectedCategory, selectedTag]);

  const hasActiveFilters = selectedCategory !== null || selectedTag !== null || query !== "";

  const clearAllFilters = () => {
    setQuery("");
    setSelectedCategory(null);
    setSelectedTag(null);
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 mt-8">
      {/* 1. Sidebar - Filtering Instruments */}
      <aside className="flex flex-col gap-6 lg:col-span-1">
        {/* Search Bento Panel */}
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card/35 p-5">
          <h3 className="font-heading text-xs font-bold tracking-wider text-muted-foreground uppercase flex items-center gap-1.5">
            <Search className="size-3 text-accent-creative" />
            <span>Search Garden</span>
          </h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search documents…"
              aria-label="Search notes"
              className={cn(
                "w-full rounded-xl border border-border bg-background py-2 pl-9 pr-9 text-xs",
                "text-foreground placeholder:text-muted-foreground",
                "outline-none transition-colors focus:border-accent-creative focus:ring-1 focus:ring-accent-creative/20",
              )}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4.5" aria-hidden />
              </button>
            )}
          </div>
        </div>

        {/* Categories Bento Panel */}
        <div className="flex flex-col gap-3 rounded-xl border border-border bg-card/35 p-5">
          <h3 className="font-heading text-xs font-bold tracking-wider text-muted-foreground uppercase flex items-center gap-1.5">
            <Folder className="size-3 text-accent-systems" />
            <span>Categories</span>
          </h3>
          <div className="flex flex-col gap-1.5">
            <button
              onClick={() => setSelectedCategory(null)}
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors",
                selectedCategory === null 
                  ? "bg-accent-systems/10 text-accent-systems border border-accent-systems/20" 
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              All Categories
            </button>
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors",
                  selectedCategory === cat 
                    ? "bg-accent-systems/10 text-accent-systems border border-accent-systems/20" 
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tag Cloud Bento Panel */}
        <div className="flex flex-col gap-3 rounded-xl border border-border bg-card/35 p-5">
          <h3 className="font-heading text-xs font-bold tracking-wider text-muted-foreground uppercase flex items-center gap-1.5">
            <TagIcon className="size-3 text-accent-creative" />
            <span>Filter by Tag</span>
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {allTags.map((tag) => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(isSelected ? null : tag)}
                  className={cn(
                    "px-2.5 py-1 rounded-full text-[10px] font-medium border transition-all duration-200",
                    isSelected
                      ? "border-accent-creative/30 bg-accent-creative/10 text-accent-creative font-semibold"
                      : "border-border bg-background text-muted-foreground hover:border-accent-creative/30 hover:text-foreground"
                  )}
                >
                  #{tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl border border-dashed border-accent-creative/40 text-accent-creative hover:bg-accent-creative/5 text-xs font-medium transition-colors duration-200"
          >
            <X className="size-3.5" />
            Clear All Filters
          </button>
        )}
      </aside>

      {/* 2. Main Grid - Filtered Notes List */}
      <main className="lg:col-span-3 flex flex-col gap-4">
        <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground px-1">
          <span>
            SHOWING {filtered.length} OF {notes.length} KNOWLEDGE FILES
          </span>
          {hasActiveFilters && (
            <span className="text-accent-creative uppercase font-semibold">FILTERS ACTIVE</span>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border py-20 text-center bg-card/15 flex flex-col items-center justify-center gap-3">
            <Compass className="size-8 text-muted-foreground animate-spin-slow" />
            <p className="text-xs text-muted-foreground">
              No matching knowledge logs found. Clear your filter parameters to explore.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {filtered.map((note) => (
              <div key={note.slug} data-cursor="read">
                <NoteCard note={note} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

