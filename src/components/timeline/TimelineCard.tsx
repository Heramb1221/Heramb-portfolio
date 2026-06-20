"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TimelineEntry, TimelineCategory } from "@/config/timeline";
import { TimelineIcon, getCategoryColour } from "@/components/timeline/TimelineIcon";

function CategoryBadge({ category }: { category: TimelineCategory }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5",
        "text-[11px] font-medium",
        getCategoryColour(category),
      )}
    >
      {category}
    </span>
  );
}

interface TimelineCardProps {
  entry: TimelineEntry;
  side?: "left" | "right";
}

export function TimelineCard({ entry, side = "right" }: TimelineCardProps) {
  const { title, date, category, organization, description, highlight, details, technologies, link } = entry;
  const [isExpanded, setIsExpanded] = useState(false);

  const isExpandable = !!(details?.length || technologies?.length || link);

  return (
    <div
      className={cn(
        "flex items-start gap-4 w-full",
        side === "left" && "lg:flex-row-reverse",
      )}
    >
      {/* Icon — visible on mobile inline; on desktop it overlaps the centre line */}
      <div className="flex-shrink-0 lg:hidden">
        <TimelineIcon category={category} />
      </div>

      {/* Card */}
      <article
        onClick={() => isExpandable && setIsExpanded(!isExpanded)}
        className={cn(
          "flex-1 rounded-xl border bg-card p-5 shadow-sm transition-all duration-300 select-none",
          isExpandable 
            ? "cursor-pointer hover:border-accent-creative/30 hover:shadow-[0_8px_30px_rgba(245,158,11,0.015)]" 
            : "border-border",
          highlight && "border-primary/20",
          isExpanded && "border-accent-creative/40 bg-card/60 shadow-[0_8px_30px_rgba(245,158,11,0.03)]"
        )}
        aria-label={title}
      >
        {/* Date + Category */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <time
            className="text-xs font-medium text-muted-foreground"
            dateTime={date}
          >
            {date}
          </time>
          <CategoryBadge category={category} />
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold leading-snug text-foreground">
          {title}
        </h3>

        {/* Organization */}
        {organization && (
          <p className="mt-0.5 text-xs text-muted-foreground">{organization}</p>
        )}

        {/* Description */}
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>

        {/* Expanded spec drawer */}
        {isExpandable && (
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-4 mt-4 border-t border-border/50 space-y-4">
              {/* Bulleted accomplishment details */}
              {details && details.length > 0 && (
                <ul className="space-y-2">
                  {details.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                      <span className="text-accent-creative mt-1.5 size-1.5 rounded-full flex-shrink-0 bg-accent-creative" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Technology tags */}
              {technologies && technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center rounded border border-border bg-muted/30 px-2 py-0.5 text-[10px] font-medium text-muted-foreground font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Outbound Links */}
              {link && (
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-accent-creative hover:underline pt-1 self-start"
                >
                  <span>{link.label}</span>
                  <ExternalLink className="size-3" />
                </a>
              )}
            </div>
          </motion.div>
        )}

        {/* Inspector logs at the footer */}
        {isExpandable && (
          <div className="mt-3 flex items-center justify-between border-t border-border/20 pt-2.5 font-mono text-[9px] text-muted-foreground/60">
            <span>[CONSOLE.RECORD: {isExpanded ? "INSPECT_ACTIVE" : "CLICK_TO_INSPECT"}]</span>
            <ChevronDown
              className={cn(
                "size-3.5 transition-transform duration-300",
                isExpanded && "rotate-180 text-accent-creative"
              )}
            />
          </div>
        )}
      </article>
    </div>
  );
}
