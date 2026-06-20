import {
  GraduationCap,
  Code2,
  Award,
  Trophy,
  BookOpen,
  Briefcase,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { TimelineCategory } from "@/config/timeline";
import { cn } from "@/lib/utils";

const iconMap: Record<TimelineCategory, LucideIcon> = {
  Education:     GraduationCap,
  Project:       Code2,
  Certification: Award,
  Achievement:   Trophy,
  Learning:      BookOpen,
  Experience:    Briefcase,
};

const colourMap: Record<TimelineCategory, string> = {
  Education:     "bg-primary/10 text-primary border-primary/20",
  Project:       "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  Certification: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Achievement:   "bg-violet-500/10 text-violet-500 border-violet-500/20",
  Learning:      "bg-sky-500/10 text-sky-500 border-sky-500/20",
  Experience:    "bg-rose-500/10 text-rose-500 border-rose-500/20",
};

interface TimelineIconProps {
  category: TimelineCategory;
  className?: string;
}

export function TimelineIcon({ category, className }: TimelineIconProps) {
  const Icon = iconMap[category];
  return (
    <div
      className={cn(
        "flex h-9 w-9 flex-shrink-0 items-center justify-center",
        "rounded-full border-2 bg-background",
        colourMap[category],
        className,
      )}
      aria-hidden="true"
    >
      <Icon className="size-4" />
    </div>
  );
}

export function getCategoryColour(category: TimelineCategory): string {
  return colourMap[category];
}
