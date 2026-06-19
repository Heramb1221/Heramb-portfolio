import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

// ─── Container ────────────────────────────────────────────────────────────────

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/** Max-width 1280 px, centred, horizontal padding per design system. */
export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-[1280px] px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: ElementType;
}

/** Standard vertical rhythm for every page section. */
export function Section({
  children,
  className,
  id,
  as: Comp = "section",
}: SectionProps) {
  return (
    <Comp id={id} className={cn("py-16 md:py-24", className)}>
      {children}
    </Comp>
  );
}

// ─── SectionHeading ───────────────────────────────────────────────────────────

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

/** Consistent heading block for every section. */
export function SectionHeading({
  title,
  subtitle,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" && "text-center",
        className,
      )}
    >
      <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground",
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
