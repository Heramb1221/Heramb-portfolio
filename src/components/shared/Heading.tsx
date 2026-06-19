import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Level = "h1" | "h2" | "h3" | "h4";

interface HeadingProps {
  level?: Level;
  children: ReactNode;
  className?: string;
}

const sizeMap: Record<Level, string> = {
  h1: "text-3xl font-bold sm:text-4xl md:text-5xl",
  h2: "text-2xl font-semibold sm:text-3xl",
  h3: "text-xl font-semibold sm:text-2xl",
  h4: "text-lg font-semibold sm:text-xl",
};

export function Heading({ level: Level = "h2", children, className }: HeadingProps) {
  return (
    <Level
      className={cn(
        "tracking-tight text-foreground",
        sizeMap[Level],
        className,
      )}
    >
      {children}
    </Level>
  );
}
