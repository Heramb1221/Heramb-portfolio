export interface Achievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  category?: string;
  link: string | null;
}

export type AchievementCategory =
  | "Competition"
  | "Open Source"
  | "Cloud"
  | "Innovation"
  | "Arts"
  | string;

export const achievementCategoryColours: Record<string, string> = {
  Competition:  "bg-violet-500/10 text-violet-500 border-violet-500/20",
  "Open Source":"bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  Cloud:        "bg-sky-500/10 text-sky-500 border-sky-500/20",
  Innovation:   "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Arts:         "bg-rose-500/10 text-rose-500 border-rose-500/20",
  default:      "bg-muted text-muted-foreground border-border",
};

export function getCategoryColour(category?: string): string {
  if (!category) return achievementCategoryColours.default;
  return achievementCategoryColours[category] ?? achievementCategoryColours.default;
}
