"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Note } from "@/types/note";
import { NoteCard } from "@/components/notes/NoteCard";

interface NotesClientProps {
  notes: Note[];
}

export function NotesClient({ notes }: NotesClientProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return notes;
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.tags.some((t) => t.toLowerCase().includes(q)) ||
        n.category.toLowerCase().includes(q),
    );
  }, [notes, query]);

  return (
    <div className="flex flex-col gap-8">
      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, tag, or category…"
          aria-label="Search notes"
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

      {/* Result count */}
      <p className="text-xs text-muted-foreground">
        {filtered.length} note{filtered.length !== 1 ? "s" : ""}{query ? ` matching "${query}"` : ""}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-16 text-center">
          <p className="text-sm text-muted-foreground">No notes found. Try adjusting your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((note) => (
            <NoteCard key={note.slug} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}
