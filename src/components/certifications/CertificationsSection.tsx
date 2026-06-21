"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { stagger, staggerItem, defaultViewport } from "@/lib/animations";
import { Container, Section, SectionHeading } from "@/components/shared/Container";
import type { Certification } from "@/types/certificate";
import { ExternalLink, ShieldCheck, Terminal, CheckCircle2, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface CertificationsSectionProps {
  certifications: Certification[];
}

export function CertificationsSection({ certifications }: CertificationsSectionProps) {

  const [activeIndex, setActiveIndex] = useState(0);
  const activeCert = certifications[activeIndex] || certifications[0];

  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hudHovering, setHudHovering] = useState(false);

  const handleHudMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  if (!certifications || certifications.length === 0) return null;

  const isImageLink = (url: string | null) => {
    if (!url) return false;
    return (
      url.includes("cloudinary.com") ||
      url.toLowerCase().endsWith(".png") ||
      url.toLowerCase().endsWith(".jpg") ||
      url.toLowerCase().endsWith(".jpeg") ||
      url.toLowerCase().endsWith(".webp") ||
      url.includes("image/upload")
    );
  };

  const hasImage = !!activeCert.imageUrl || isImageLink(activeCert.credentialUrl);
  const displayImageUrl = activeCert.imageUrl || activeCert.credentialUrl || "";

  const mockSHA256 = (title: string, issuer: string) => {
    const combined = `${title}-${issuer}-verified-credential`;
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
      hash = (hash << 5) - hash + combined.charCodeAt(i);
      hash |= 0;
    }
    return `SHA256:${Math.abs(hash).toString(16).toUpperCase()}8F1A29D4...`;
  };

  const isSystems = (issuer: string) => {
    const sysKeywords = ["aws", "microsoft", "google", "oracle", "nptel", "dbms", "mongo", "postman", "udemy"];
    return sysKeywords.some((k) => issuer.toLowerCase().includes(k));
  };

  return (
    <Section id="certifications" className="bg-muted/5 relative overflow-hidden border-b border-border">
      {/* Background Grid Accent Lines */}
      <div className="absolute top-0 left-1/3 w-[1px] h-full bg-border/5 pointer-events-none select-none" />
      <div className="absolute bottom-10 left-0 w-full h-[1px] bg-border/5 pointer-events-none select-none" />

      <Container>
        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={defaultViewport}
          className="space-y-12"
        >
          {/* Section Title */}
          <motion.div variants={staggerItem}>
            <SectionHeading
              title="Verified Credentials"
              subtitle="Professional certificates, specializations, and course completions validating engineering capabilities."
              align="center"
            />
          </motion.div>

          {/* Interactive Console Console Wrapper */}
          <motion.div 
            variants={staggerItem}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* Left Column: Certifications Index Ledger */}
            <div className="lg:col-span-5 flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar scroll-smooth">
              <div className="flex items-center justify-between px-2 pb-1 border-b border-border/40 font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
                <span>Credentials Index ({certifications.length})</span>
                <span>Category / Status</span>
              </div>
              
              <div className="flex flex-col gap-2">
                {certifications.map((cert, index) => {
                  const isActive = index === activeIndex;
                  const sys = isSystems(cert.issuer);
                  const serial = `[CRED.${cert.issuer.substring(0, 3).toUpperCase()}-${cert.id.substring(0, 4).toUpperCase()}]`;

                  return (
                    <button
                      key={cert.id}
                      onClick={() => setActiveIndex(index)}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={cn(
                        "w-full text-left flex items-center justify-between p-4 rounded-xl border transition-all duration-300 relative group cursor-pointer overflow-hidden",
                        isActive
                          ? sys
                            ? "bg-accent-systems/5 border-accent-systems/40 shadow-[0_4px_20px_rgba(16,185,129,0.03)]"
                            : "bg-accent-creative/5 border-accent-creative/40 shadow-[0_4px_20px_rgba(245,158,11,0.03)]"
                          : "bg-card/20 border-border/60 hover:bg-card/35 hover:border-border"
                      )}
                    >
                      {/* Active Left Indicator Light */}
                      {isActive && (
                        <div 
                          className={cn(
                            "absolute left-0 top-0 bottom-0 w-1 rounded-l-xl", 
                            sys ? "bg-accent-systems" : "bg-accent-creative"
                          )} 
                        />
                      )}

                      <div className="flex gap-3 items-center min-w-0 pr-2">
                        {/* Monospace Order Prefix */}
                        <span className="font-mono text-[10px] text-muted-foreground/60">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <div className="flex flex-col min-w-0">
                          <h4 className="font-heading text-xs font-bold text-foreground truncate group-hover:text-foreground/95">
                            {cert.title}
                          </h4>
                          <span className="font-mono text-[9px] text-muted-foreground/80 mt-0.5 truncate">
                            {cert.issuer} • {cert.issueDate}
                          </span>
                        </div>
                      </div>

                      {/* Right Indicator LED */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="font-mono text-[8px] text-muted-foreground/45 hidden sm:inline">
                          {serial}
                        </span>
                        <span 
                          className={cn(
                            "h-2 w-2 rounded-full ring-4 transition-all duration-300",
                            isActive 
                              ? sys 
                                ? "bg-accent-systems ring-accent-systems/20 animate-pulse" 
                                : "bg-accent-creative ring-accent-creative/20 animate-pulse"
                              : "bg-muted-foreground/20 ring-transparent"
                          )} 
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: High-Fidelity Verification HUD Panel */}
            <div 
              onMouseMove={handleHudMouseMove}
              onMouseEnter={() => setHudHovering(true)}
              onMouseLeave={() => setHudHovering(false)}
              className="lg:col-span-7 rounded-2xl border border-border bg-[#0C0C12] p-6 relative overflow-hidden flex flex-col justify-between shadow-2xl min-h-[460px] select-none"
            >
              {/* Drafting Corner Crosshairs */}
              <span className="absolute top-3 left-3 font-mono text-[9px] text-muted-foreground/20 pointer-events-none">+</span>
              <span className="absolute top-3 right-3 font-mono text-[9px] text-muted-foreground/20 pointer-events-none">+</span>
              <span className="absolute bottom-3 left-3 font-mono text-[9px] text-muted-foreground/20 pointer-events-none">+</span>
              <span className="absolute bottom-3 right-3 font-mono text-[9px] text-muted-foreground/20 pointer-events-none">+</span>

              {/* Technical Blueprint Dot Grid Background */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-[0.06]"
                style={{
                  backgroundImage: "radial-gradient(var(--border) 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />

              {/* Interactive Spotlight Glow */}
              {hudHovering && (
                <div
                  className="pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, ${
                      isSystems(activeCert.issuer) ? "rgba(16, 185, 129, 0.07)" : "rgba(245, 158, 11, 0.07)"
                    }, transparent 80%)`,
                  }}
                />
              )}

              {/* Top HUD Telemetry Ribbon */}
              <div className="flex items-center justify-between border-b border-border/40 pb-3 font-mono text-[9px] text-muted-foreground/60 z-10">
                <div className="flex items-center gap-2">
                  <Terminal className="size-3 text-muted-foreground/45" />
                  <span className="tracking-wider uppercase">RESOLVING: CREDENTIAL_LEDGER</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>SECURE CONNECTIVITY [OK]</span>
                </div>
              </div>

              {/* Main Animated Display Section */}
              <div className="my-6 flex-1 flex flex-col justify-center items-center relative z-10 min-h-[220px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCert.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="w-full flex flex-col items-center justify-center h-full"
                  >
                    {hasImage ? (
                      /* Certificate Image Viewer */
                      <div className="relative group/viewer w-full max-w-[420px] aspect-[4/3] rounded-lg border border-border/80 bg-background/50 overflow-hidden flex items-center justify-center p-2 shadow-inner">
                        {/* CRT Glass Reflection Effect Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none z-20" />
                        
                        {/* Glowing Scanning Vector Line */}
                        <motion.div
                          className="absolute left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent z-25 pointer-events-none"
                          animate={{ top: ["0%", "100%", "0%"] }}
                          transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Certificate Image */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={displayImageUrl} 
                          alt={`Certificate for ${activeCert.title}`}
                          className="max-w-full max-h-full object-contain rounded border border-border/20 shadow-md group-hover/viewer:scale-[1.01] transition-transform duration-500"
                        />

                        {/* Direct Link Overlay Badge */}
                        <a 
                          href={displayImageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute top-2 right-2 bg-black/60 backdrop-blur-md border border-border/50 text-[9px] font-mono text-foreground hover:bg-black/80 px-2 py-1 rounded flex items-center gap-1 z-30 transition-all opacity-0 group-hover/viewer:opacity-100"
                        >
                          <Eye className="size-2.5" />
                          <span>EXPAND</span>
                        </a>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-5 justify-center py-4">
                        {/* Holographic concentric telemetry wheels */}
                        <div className="relative flex items-center justify-center w-36 h-36">
                          <motion.div
                            className={cn(
                              "absolute inset-0 border border-dashed rounded-full",
                              isSystems(activeCert.issuer) ? "border-accent-systems/20" : "border-accent-creative/20"
                            )}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                          />
                          <motion.div
                            className={cn(
                              "absolute w-28 h-28 border border-dotted rounded-full",
                              isSystems(activeCert.issuer) ? "border-accent-systems/30" : "border-accent-creative/30"
                            )}
                            animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                          />
                          <motion.div
                            className={cn(
                              "absolute w-20 h-20 border rounded-full flex items-center justify-center bg-black/40",
                              isSystems(activeCert.issuer) 
                                ? "border-accent-systems/40 text-accent-systems" 
                                : "border-accent-creative/40 text-accent-creative"
                            )}
                            animate={{ rotate: -360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          >
                            <ShieldCheck className="size-10" />
                          </motion.div>
                        </div>

                        {/* Digital Ledger readout log */}
                        <div className="text-center font-mono space-y-1">
                          <span className="text-[10px] text-emerald-500 font-bold tracking-widest uppercase flex items-center justify-center gap-1">
                            <CheckCircle2 className="size-3" />
                            AUTHENTICATED
                          </span>
                          <span className="text-[8px] text-muted-foreground/60 block">
                            REGISTRY STATUS: SECURELY RESOLVED
                          </span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom HUD Metadata & Verification Controls */}
              <div className="border-t border-border/40 pt-4 flex flex-col gap-4 relative z-10">
                <div className="flex flex-col gap-1.5">
                  {/* Ledger Hash */}
                  <span className="font-mono text-[8px] text-muted-foreground/40 tracking-wider">
                    {mockSHA256(activeCert.title, activeCert.issuer)}
                  </span>
                  
                  {/* Details block */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="font-heading text-base font-black text-foreground leading-snug">
                      {activeCert.title}
                    </h3>
                    <span className="font-mono text-xs text-muted-foreground flex-shrink-0">
                      {activeCert.issueDate}
                    </span>
                  </div>
                  
                  <span className="font-mono text-xs text-muted-foreground">
                    ISSUED BY: <span className="text-foreground font-semibold">{activeCert.issuer}</span>
                  </span>
                </div>

                {/* Primary CTA verification button */}
                {activeCert.credentialUrl && (
                  <a
                    href={activeCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border font-mono text-xs font-bold tracking-wider transition-all duration-300 cursor-pointer shadow-lg active:scale-[0.99]",
                      isSystems(activeCert.issuer)
                        ? "bg-accent-systems/10 border-accent-systems/30 text-accent-systems hover:bg-accent-systems/20 hover:border-accent-systems/50 hover:shadow-accent-systems/5"
                        : "bg-accent-creative/10 border-accent-creative/30 text-accent-creative hover:bg-accent-creative/20 hover:border-accent-creative/50 hover:shadow-accent-creative/5"
                    )}
                  >
                    <span>VERIFY ORIGINAL CREDENTIAL</span>
                    <ExternalLink className="size-3.5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
