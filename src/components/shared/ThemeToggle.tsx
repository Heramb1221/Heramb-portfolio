"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle colour theme"
      className={cn(
        "relative inline-flex h-8 w-8 items-center justify-center rounded-lg",
        "text-muted-foreground transition-colors",
        "hover:bg-muted hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      {/* Sun — visible in light mode */}
      <Sun
        className="size-4 rotate-0 scale-100 transition-all duration-200 dark:-rotate-90 dark:scale-0"
        aria-hidden
      />
      {/* Moon — visible in dark mode */}
      <Moon
        className="absolute size-4 rotate-90 scale-0 transition-all duration-200 dark:rotate-0 dark:scale-100"
        aria-hidden
      />
    </button>
  );
}
