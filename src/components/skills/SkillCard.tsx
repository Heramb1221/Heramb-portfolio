import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function getSkillNodeId(skillLabel: string): string | null {
  const norm = skillLabel.toLowerCase().replace(/[\s.-]/g, "");
  if (norm === "typescript") return "ts";
  if (norm === "javascript") return "js";
  if (norm === "sql") return "sql";
  if (norm === "python") return "python";
  if (norm === "java") return "java";
  if (norm === "c") return "c";
  
  if (norm === "nextjs") return "next";
  if (norm === "react") return "react";
  if (norm === "reactnative" || norm === "expo") return "reactnative";
  if (norm === "tailwindcss") return "tailwind";
  if (norm === "electron") return "electron";
  
  if (norm === "nodejs") return "node";
  if (norm === "express" || norm === "expressjs") return "express";
  if (norm === "socketio") return "socketio";
  if (norm === "restapis") return "rest";
  if (norm === "webrtc") return "webrtc";
  
  if (norm === "postgresql") return "postgres";
  if (norm === "mongodb" || norm === "mongodbatlas") return "mongodb";
  if (norm === "prismaorm" || norm === "prisma") return "prisma";
  if (norm === "convex") return "convex";
  if (norm === "firebase") return "firebase";
  
  if (norm === "vercel") return "vercel";
  if (norm === "github" || norm === "git") return "github";
  return null;
}

interface SkillBadgeProps {
  label: string;
  isActive?: boolean;
  isHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

export function SkillBadge({
  label,
  isActive,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: SkillBadgeProps) {
  const nodeId = getSkillNodeId(label);
  const isInteractive = !!nodeId;

  const isSystems = 
    nodeId === "sql" || 
    nodeId === "python" || 
    nodeId === "postgres" || 
    nodeId === "mongodb" || 
    nodeId === "prisma" || 
    nodeId === "vercel" ||
    nodeId === "rest" ||
    nodeId === "socketio" ||
    nodeId === "webrtc" ||
    nodeId === "convex" ||
    nodeId === "firebase" ||
    nodeId === "java" ||
    nodeId === "c" ||
    nodeId === "github";

  const hoverClass = isSystems
    ? "border-accent-systems/60 bg-accent-systems/10 text-foreground"
    : "border-accent-creative/60 bg-accent-creative/10 text-foreground";

  const activeClass = isSystems
    ? "border-accent-systems bg-accent-systems/15 text-foreground font-semibold shadow-[0_0_10px_rgba(16,185,129,0.12)]"
    : "border-accent-creative bg-accent-creative/15 text-foreground font-semibold shadow-[0_0_10px_rgba(245,158,11,0.12)]";

  return (
    <span
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-full transition-all duration-300",
        "border px-2.5 py-0.5 text-xs font-medium select-none",
        isInteractive ? "cursor-pointer hover:scale-[1.02]" : "cursor-default",
        isActive
          ? activeClass
          : isHovered
          ? hoverClass
          : "border-border bg-muted text-muted-foreground hover:border-accent/40 hover:text-foreground hover:bg-accent/5",
      )}
    >
      {label}
    </span>
  );
}

interface SkillCardProps {
  title: string;
  icon: LucideIcon;
  iconLabel: string;
  skills: string[];
  variant?: "default" | "learning";
}

export function SkillCard({
  title,
  icon: Icon,
  iconLabel,
  skills,
  variant = "default",
}: SkillCardProps) {
  const isLearning = variant === "learning";

  return (
    <article
      className={cn(
        "group flex flex-col gap-4 rounded-xl border bg-card p-5",
        "transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(245,158,11,0.06)]",
        isLearning ? "border-accent/30 hover:border-accent/50" : "border-border hover:border-accent/30",
      )}
      aria-label={`${title} skills`}
    >
      {/* Header — icon + title */}
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg",
            isLearning
              ? "bg-amber-500/10 text-amber-500"
              : "bg-primary/10 text-primary",
          )}
          aria-hidden="true"
        >
          <Icon className="size-4" aria-label={iconLabel} />
        </div>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>

      {/* Skill badges — wrap automatically */}
      <div
        className="flex flex-wrap gap-1.5"
        role="list"
        aria-label={`${title} technologies`}
      >
        {skills.map((skill) => (
          <div key={skill} role="listitem">
            <SkillBadge label={skill} />
          </div>
        ))}
      </div>
    </article>
  );
}
