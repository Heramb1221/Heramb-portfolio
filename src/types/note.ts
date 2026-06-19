export interface Note {
  slug: string;
  title: string;
  description: string;
  date: string;          // ISO date string from frontmatter
  tags: string[];
  category: string;
  readingTime: string;   // e.g. "5 min read"
  /** Raw markdown body — used for full-page render */
  content?: string;
}
