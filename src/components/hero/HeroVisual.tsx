import { cn } from "@/lib/utils";

// ─── TechChip ─────────────────────────────────────────────────────────────────

function TechChip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "rounded-full border border-border bg-background px-2.5 py-1",
        "text-xs font-medium text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

// ─── HeroVisual ───────────────────────────────────────────────────────────────

/**
 * Right-column profile placeholder.
 * Uses HC monogram, floating tech chips, and a status badge.
 * Replace inner content with <Image> once a profile photo is added.
 */
export function HeroVisual() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        {/* Profile card */}
        <div
          className={cn(
            "relative flex h-[300px] w-[300px] items-center justify-center",
            "overflow-hidden rounded-2xl border border-border bg-card",
            "xl:h-[340px] xl:w-[340px]",
          )}
        >
          {/* Directional gradient — subtle, no glow */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-primary/5" />

          {/* HC monogram */}
          <div
            className={cn(
              "relative z-10 flex h-28 w-28 items-center justify-center",
              "rounded-2xl border border-primary/20 bg-primary/10",
            )}
            aria-hidden="true"
          >
            <span className="select-none font-mono text-4xl font-bold tracking-tight text-primary">
              HC
            </span>
          </div>

          {/* Floating tech chips */}
          <TechChip className="absolute left-5 top-5">TypeScript</TechChip>
          <TechChip className="absolute right-5 top-5">React</TechChip>
          <TechChip className="absolute bottom-5 left-5">Node.js</TechChip>
          <TechChip className="absolute bottom-5 right-5">Next.js</TechChip>
        </div>

        {/* Status indicator */}
        <div
          className={cn(
            "absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap",
            "flex items-center gap-2 rounded-full border border-border",
            "bg-background px-4 py-1.5 shadow-sm",
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
          <span className="text-xs font-medium text-foreground">
            Open to Opportunities
          </span>
        </div>
      </div>
    </div>
  );
}
