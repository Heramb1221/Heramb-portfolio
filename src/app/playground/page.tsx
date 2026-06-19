import type { Metadata } from "next";
import Link from "next/link";
import { FlaskConical, ArrowLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { siteUrl } from "@/lib/url";

export const metadata: Metadata = {
  title: "Playground",
  description: "A space for experiments, creative ideas, and interactive prototypes.",
};

export default function PlaygroundPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 pt-16">
      <div className="flex max-w-lg flex-col items-center gap-6 text-center">
        {/* Icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card">
          <FlaskConical className="size-8 text-primary" aria-hidden />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Playground
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            A place for experiments, creative ideas, and interactive prototypes.
          </p>
          <p className="mt-1 text-sm font-medium text-primary">Coming Soon.</p>
        </div>

        {/* Back home */}
        <Link
          href="/"
          className={cn(
            "inline-flex h-10 items-center gap-2 rounded-xl border border-border px-5",
            "text-sm font-medium text-muted-foreground transition-colors",
            "hover:border-primary/30 hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
          aria-label="Back to home"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back Home
        </Link>
      </div>
    </main>
  );
}
