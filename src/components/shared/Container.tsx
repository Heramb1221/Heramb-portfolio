import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-[1280px] px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: ElementType;
}

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

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

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
