import { ExternalLink, Award } from "lucide-react";
import { ContentCard } from "@/components/shared/ContentCard";
import type { Certification } from "@/types/certificate";
import { cn } from "@/lib/utils";

interface CertificationCardProps {
  certification: Certification;
}

export function CertificationCard({ certification }: CertificationCardProps) {
  const { title, issuer, issueDate, credentialUrl } = certification;

  return (
    <ContentCard aria-label={title} className="gap-4">
      {/* Icon + Issuer */}
      <div className="flex items-center gap-3">
        <div
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
          aria-hidden="true"
        >
          <Award className="size-4" />
        </div>
        <p className="text-xs font-medium text-muted-foreground">{issuer}</p>
      </div>

      {/* Title */}
      <div className="flex flex-col gap-1 flex-1">
        <h3 className="text-sm font-semibold leading-snug text-foreground">
          {title}
        </h3>
        <time
          className="text-xs text-muted-foreground"
          dateTime={issueDate}
        >
          {issueDate}
        </time>
      </div>

      {/* Credential link — only if URL exists and is non-empty */}
      {credentialUrl && (
        <a
          href={credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View credential for ${title}`}
          className={cn(
            "mt-auto inline-flex w-fit items-center gap-1.5 rounded-lg",
            "border border-border px-3 py-1.5 text-xs font-medium",
            "text-muted-foreground transition-colors",
            "hover:border-primary/30 hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
        >
          <ExternalLink className="size-3" aria-hidden />
          View Credential
        </a>
      )}
    </ContentCard>
  );
}
