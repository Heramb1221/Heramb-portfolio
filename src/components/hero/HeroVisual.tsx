import { cn } from "@/lib/utils";
import Image from "next/image";

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
          {/* Background profile image */}
          <Image
            src="/profile.jpg"
            alt="Heramb Chaudhari"
            fill
            sizes="(max-width: 1280px) 300px, 340px"
            className="object-cover opacity-80 transition-opacity duration-300 hover:opacity-95"
            priority
          />

          {/* Subtle gradient overlay to blend photo with theme & improve text contrast */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/10 z-10" />

          {/* Floating tech chips */}
          <TechChip className="absolute left-5 top-5 z-20">TypeScript</TechChip>
          <TechChip className="absolute right-5 top-5 z-20">React</TechChip>
          <TechChip className="absolute bottom-5 left-5 z-20">Node.js</TechChip>
          <TechChip className="absolute bottom-5 right-5 z-20">Next.js</TechChip>
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
