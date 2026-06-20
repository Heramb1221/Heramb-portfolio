import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type CTAVariant = "primary" | "secondary" | "ghost";

interface CTAButtonProps {
  href: string;
  children: ReactNode;
  variant?: CTAVariant;
  external?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const variantMap: Record<CTAVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:opacity-90 active:opacity-80",
  secondary:
    "border border-border bg-transparent text-foreground hover:bg-muted active:bg-muted/80",
  ghost:
    "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted",
};

const sizeMap = {
  sm: "h-8 px-4 text-xs",
  md: "h-10 px-5 text-sm",
  lg: "h-11 px-6 text-sm",
};

export function CTAButton({
  href,
  children,
  variant = "primary",
  external = false,
  className,
  size = "md",
}: CTAButtonProps) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        variantMap[variant],
        sizeMap[size],
        className,
      )}
    >
      {children}
    </Link>
  );
}
