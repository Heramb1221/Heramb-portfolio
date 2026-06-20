"use client";

import { useState } from "react";
import { ExternalLink, Award, CheckCircle2 } from "lucide-react";
import type { Certification } from "@/types/certificate";
import { cn } from "@/lib/utils";

interface CertificationCardProps {
  certification: Certification;
}

export function CertificationCard({ certification }: CertificationCardProps) {
  const { id, title, issuer, issueDate, credentialUrl } = certification;

  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const serialNumber = `[CRED.${issuer.substring(0, 3).toUpperCase()}-${id.substring(0, 4).toUpperCase()}]`;
  const isSystems = issuer.toLowerCase().includes("aws") || issuer.toLowerCase().includes("microsoft") || issuer.toLowerCase().includes("google");

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      data-cursor="verify"
      className={cn(
        "group relative flex flex-col gap-4 rounded-xl border border-border bg-card/35 p-5 transition-all duration-300 overflow-hidden",
        isSystems ? "hover:border-accent-systems/30" : "hover:border-accent-creative/30"
      )}
      style={{ willChange: "transform" }}
    >
      {/* Holographic light beam layer */}
      {hovering && (
        <div
          className="pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(280px circle at ${coords.x}px ${coords.y}px, ${
              isSystems ? "rgba(16, 185, 129, 0.12)" : "rgba(245, 158, 11, 0.12)"
            }, transparent 80%)`,
          }}
        />
      )}

      {/* Certificate Header Bar */}
      <div className="flex items-center justify-between font-mono text-[9px] text-muted-foreground z-10">
        <span>{serialNumber}</span>
        <span className={cn("flex items-center gap-1", isSystems ? "text-accent-systems" : "text-accent-creative")}>
          <CheckCircle2 className="size-2.5" />
          VERIFIED
        </span>
      </div>

      {/* Card Content */}
      <div className="flex gap-3.5 z-10 flex-1">
        {/* Left: Badge Icon */}
        <div
          className={cn(
            "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border transition-all duration-300",
            isSystems
              ? "bg-accent-systems/5 border-accent-systems/15 text-accent-systems group-hover:bg-accent-systems/10 group-hover:border-accent-systems/30"
              : "bg-accent-creative/5 border-accent-creative/15 text-accent-creative group-hover:bg-accent-creative/10 group-hover:border-accent-creative/30"
          )}
        >
          <Award className="size-5" />
        </div>

        {/* Right: Title / Issuer details */}
        <div className="flex flex-col gap-1 flex-1">
          <h4 className="font-heading text-sm font-bold text-foreground leading-snug group-hover:text-foreground/90 transition-colors">
            {title}
          </h4>
          <p className="text-xs text-muted-foreground">{issuer}</p>
        </div>
      </div>

      {/* Footer block */}
      <div className="flex items-center justify-between border-t border-border/40 pt-3 mt-1 z-10 font-mono text-[10px] text-muted-foreground">
        <span>ISSUED: {issueDate}</span>
        
        {credentialUrl && (
          <a
            href={credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-border/60 bg-background/50 hover:text-foreground hover:bg-muted/50 transition-all text-[9px] font-semibold tracking-wider",
              isSystems ? "hover:border-accent-systems/30" : "hover:border-accent-creative/30"
            )}
          >
            <span>VERIFY</span>
            <ExternalLink className="size-2.5" />
          </a>
        )}
      </div>
    </div>
  );
}
