export interface Note {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  category: string;
  readingTime: string;
  content?: string;
  relatedProjects?: string[];
}
