"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  category: "language" | "framework" | "data" | "platform";
  description: string;
}

interface Link {
  from: string;
  to: string;
  type: "dependency" | "flow" | "deployment";
}

const NODES: Node[] = [
  { id: "ts", label: "TypeScript", x: 65, y: 40, category: "language", description: "Primary language for type-safe full-stack apps." },
  { id: "js", label: "JavaScript", x: 65, y: 100, category: "language", description: "Core web scripting and asynchronous runtime logic." },
  { id: "sql", label: "SQL", x: 65, y: 160, category: "language", description: "Structured querying for relational databases." },
  { id: "python", label: "Python", x: 65, y: 220, category: "language", description: "Scripting, automations, and AI integrations." },
  { id: "java", label: "Java", x: 65, y: 280, category: "language", description: "Object-oriented language for enterprise applications." },
  { id: "c", label: "C", x: 65, y: 340, category: "language", description: "Systems programming and low-level memory control." },

  { id: "next", label: "Next.js", x: 185, y: 55, category: "framework", description: "React Framework with App Router & Server Actions." },
  { id: "react", label: "React", x: 185, y: 125, category: "framework", description: "Component-driven UI library for web applications." },
  { id: "reactnative", label: "React Native", x: 185, y: 195, category: "framework", description: "Cross-platform framework for iOS and Android apps." },
  { id: "tailwind", label: "Tailwind CSS", x: 185, y: 265, category: "framework", description: "Utility-first CSS framework for rapid styling." },
  { id: "electron", label: "Electron", x: 185, y: 335, category: "framework", description: "Framework for building cross-platform desktop apps." },

  { id: "node", label: "Node.js", x: 305, y: 55, category: "framework", description: "V8-powered backend runtime for servers and tooling." },
  { id: "express", label: "Express", x: 305, y: 125, category: "framework", description: "Minimalist server framework for REST APIs." },
  { id: "rest", label: "REST APIs", x: 305, y: 195, category: "framework", description: "Scalable HTTP-based client-server architectures." },
  { id: "socketio", label: "Socket.IO", x: 305, y: 265, category: "framework", description: "Bi-directional, low-latency event-based communication." },
  { id: "webrtc", label: "WebRTC", x: 305, y: 335, category: "framework", description: "Real-time peer-to-peer audio, video, and data streaming." },

  { id: "postgres", label: "PostgreSQL", x: 425, y: 55, category: "data", description: "Highly reliable open-source relational database." },
  { id: "mongodb", label: "MongoDB", x: 425, y: 125, category: "data", description: "Document database for flexible JSON data models." },
  { id: "prisma", label: "Prisma ORM", x: 425, y: 195, category: "data", description: "Type-safe database client and migrations tool." },
  { id: "convex", label: "Convex", x: 425, y: 265, category: "data", description: "Reactive backend-as-a-service database and functions." },
  { id: "firebase", label: "Firebase", x: 425, y: 335, category: "data", description: "Google's mobile and web application development platform." },

  { id: "vercel", label: "Vercel", x: 545, y: 110, category: "platform", description: "Cloud platform for serverless and Edge hosting." },
  { id: "github", label: "GitHub", x: 545, y: 270, category: "platform", description: "Git-based collaboration, version control, and CI/CD." },
];

const LINKS: Link[] = [
  { from: "ts", to: "next", type: "dependency" },
  { from: "ts", to: "react", type: "dependency" },
  { from: "ts", to: "reactnative", type: "dependency" },
  { from: "ts", to: "node", type: "dependency" },
  { from: "ts", to: "prisma", type: "dependency" },

  { from: "js", to: "ts", type: "dependency" },
  { from: "js", to: "react", type: "dependency" },
  { from: "js", to: "node", type: "dependency" },
  { from: "js", to: "electron", type: "dependency" },

  { from: "sql", to: "postgres", type: "flow" },
  { from: "python", to: "node", type: "flow" },
  { from: "java", to: "rest", type: "dependency" },
  { from: "c", to: "electron", type: "dependency" },

  { from: "tailwind", to: "next", type: "dependency" },
  { from: "tailwind", to: "react", type: "dependency" },
  { from: "react", to: "next", type: "dependency" },
  { from: "react", to: "reactnative", type: "dependency" },
  { from: "react", to: "electron", type: "dependency" },

  { from: "node", to: "express", type: "dependency" },
  { from: "express", to: "rest", type: "dependency" },
  { from: "node", to: "socketio", type: "dependency" },
  { from: "node", to: "webrtc", type: "dependency" },

  { from: "rest", to: "postgres", type: "flow" },
  { from: "rest", to: "mongodb", type: "flow" },
  { from: "prisma", to: "postgres", type: "flow" },
  { from: "prisma", to: "mongodb", type: "flow" },

  { from: "socketio", to: "mongodb", type: "flow" },
  { from: "webrtc", to: "socketio", type: "flow" },

  { from: "convex", to: "next", type: "flow" },
  { from: "firebase", to: "reactnative", type: "flow" },
  { from: "firebase", to: "react", type: "flow" },

  { from: "next", to: "vercel", type: "deployment" },
  { from: "postgres", to: "vercel", type: "deployment" },
  { from: "mongodb", to: "vercel", type: "deployment" },
  { from: "github", to: "vercel", type: "deployment" },
];

interface SkillGraphProps {
  activeNode: string | null;
  setActiveNode: (id: string | null) => void;
  hoveredNode: string | null;
  setHoveredNode: (id: string | null) => void;
}

export function SkillGraph({
  activeNode,
  setActiveNode,
  hoveredNode,
  setHoveredNode,
}: SkillGraphProps) {
  const [coords, setCoords] = useState("21°35'N / 74°88'E");
  const containerRef = useRef<HTMLDivElement>(null);

  const activeNodeObj = NODES.find(n => n.id === activeNode);
  const connectedNodes = new Set<string>();
  const connectedLinks = new Set<number>();

  const currentFocus = hoveredNode || activeNode;

  if (currentFocus) {
    connectedNodes.add(currentFocus);
    LINKS.forEach((link, idx) => {
      if (link.from === currentFocus) {
        connectedNodes.add(link.to);
        connectedLinks.add(idx);
      } else if (link.to === currentFocus) {
        connectedNodes.add(link.from);
        connectedLinks.add(idx);
      }
    });
  }

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 600;
    const y = ((e.clientY - rect.top) / rect.height) * 380;

    const latBase = 21.5833;
    const lonBase = 74.8800;
    
    const lat = latBase + (190 - y) * 0.0015;
    const lon = lonBase + (x - 300) * 0.0015;
    
    setCoords(`${lat.toFixed(4)}°N / ${lon.toFixed(4)}°E`);

    NODES.forEach((node) => {
      const dx = node.x - x;
      const dy = node.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      let offsetX = 0;
      let offsetY = 0;
      
      const threshold = 75;
      if (dist < threshold) {
        const force = (threshold - dist) / threshold;
        const pushDistance = 14;
        offsetX = (dx / dist) * force * pushDistance;
        offsetY = (dy / dist) * force * pushDistance;
      }

      gsap.to(`.node-inner-${node.id}`, {
        x: offsetX,
        y: offsetY,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });

      gsap.to(`.link-from-${node.id}`, {
        attr: { x1: node.x + offsetX, y1: node.y + offsetY },
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
      
      gsap.to(`.link-to-${node.id}`, {
        attr: { x2: node.x + offsetX, y2: node.y + offsetY },
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  };

  const handleMouseLeave = () => {
    setCoords("21°35'N / 74°88'E");

    NODES.forEach((node) => {
      gsap.to(`.node-inner-${node.id}`, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.6)",
        overwrite: "auto",
      });
      
      gsap.to(`.link-from-${node.id}`, {
        attr: { x1: node.x, y1: node.y },
        duration: 0.8,
        ease: "elastic.out(1, 0.6)",
        overwrite: "auto",
      });
      
      gsap.to(`.link-to-${node.id}`, {
        attr: { x2: node.x, y2: node.y },
        duration: 0.8,
        ease: "elastic.out(1, 0.6)",
        overwrite: "auto",
      });
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col h-full border border-border bg-card/40 rounded-xl overflow-hidden backdrop-blur-md"
    >
      {/* Dynamic Keyframes for Path Flows */}
      <style>{`
        @keyframes activeFlow {
          to {
            stroke-dashoffset: -20;
          }
        }
        .active-path-flow {
          animation: activeFlow 0.8s linear infinite;
        }
      `}</style>

      {/* Title Bar - vintage navigator grid details */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/30 font-mono text-[10px] tracking-wider text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-systems animate-pulse" />
          <span>SYS.INSTRUMENT - ECOSYSTEM_GRAPH [ACTIVE]</span>
        </div>
        <div className="font-mono tabular-nums">{`COORDS: ${coords}`}</div>
      </div>

      <div className="relative flex-1 min-h-[360px] md:min-h-[400px] overflow-hidden select-none">
        {/* Blueprint background grid */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]" 
          style={{
            backgroundImage: "radial-gradient(currentColor 1px, transparent 1px), linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "20px 20px, 40px 40px, 40px 40px",
            backgroundPosition: "center center",
          }}
        />

        {/* SVG Drawing Canvas */}
        <svg
          viewBox="0 0 600 380"
          className="w-full h-full p-6 text-slate-400 dark:text-slate-600"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Filters for neon glow */}
          <defs>
            <filter id="glow-creative" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-systems" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            
            {/* Arrow Marker Definitions */}
            <marker id="arrow" viewBox="0 0 10 10" refX="24" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="currentColor" opacity="0.4" />
            </marker>
            <marker id="arrow-active-creative" viewBox="0 0 10 10" refX="24" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="var(--color-accent-creative)" />
            </marker>
            <marker id="arrow-active-systems" viewBox="0 0 10 10" refX="24" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="var(--color-accent-systems)" />
            </marker>
          </defs>

          {/* SVG Links (Line elements for direct attribute GSAP animations) */}
          <g>
            {LINKS.map((link, idx) => {
              const fromNode = NODES.find(n => n.id === link.from)!;
              const toNode = NODES.find(n => n.id === link.to)!;
              
              const isActive = connectedLinks.has(idx);
              const isCreativeLink = fromNode.category === "language" || fromNode.category === "framework";

              return (
                <line
                  key={idx}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={
                    isActive
                      ? isCreativeLink
                        ? "var(--color-accent-creative)"
                        : "var(--color-accent-systems)"
                      : "currentColor"
                  }
                  strokeWidth={isActive ? 1.5 : 0.75}
                  strokeDasharray={
                    isActive 
                      ? "6 4"
                      : link.type === "deployment" 
                      ? "4 4" 
                      : "none"
                  }
                  opacity={
                    currentFocus
                      ? isActive
                        ? 1
                        : 0.06
                      : 0.25
                  }
                  className={cn(
                    "transition-all duration-300",
                    `link-from-${link.from} link-to-${link.to}`,
                    isActive && "active-path-flow"
                  )}
                  markerEnd={
                    isActive
                      ? isCreativeLink
                        ? "url(#arrow-active-creative)"
                        : "url(#arrow-active-systems)"
                      : "url(#arrow)"
                  }
                />
              );
            })}
          </g>

          {/* SVG Nodes */}
          <g>
            {NODES.map((node) => {
              const isSelected = activeNode === node.id;
              const isHighlighted = connectedNodes.has(node.id);
              const isDimmed = currentFocus && !isHighlighted;

              const isSystems = node.category === "data" || node.category === "platform";

              const glowFilter = isSelected
                ? isSystems
                  ? "url(#glow-systems)"
                  : "url(#glow-creative)"
                : undefined;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  className={cn(
                    "cursor-pointer group select-none transition-opacity duration-300",
                    isDimmed && "opacity-25"
                  )}
                  onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {/* Inner relative group to animate relative to translation origin */}
                  <g className={`node-inner-${node.id}`}>
                    {/* Outer glow aura on selection */}
                    {isSelected && (
                      <circle
                        r="16"
                        fill={isSystems ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)"}
                        className="animate-pulse"
                      />
                    )}

                    {/* Node central dot */}
                    <circle
                      r={isSelected ? 6 : 4}
                      fill={
                        isSelected
                          ? isSystems
                            ? "var(--color-accent-systems)"
                            : "var(--color-accent-creative)"
                          : "currentColor"
                      }
                      className="transition-all duration-300 group-hover:scale-125"
                      opacity={isDimmed ? 0.2 : 1}
                    />

                    {/* Outer circle pointer area */}
                    <circle
                      r="15"
                      fill="transparent"
                      className="group-hover:stroke-current"
                      strokeWidth="0.5"
                      strokeDasharray="2 2"
                      opacity={isSelected ? 0.8 : 0}
                    />

                    {/* Text labels using Outfit font */}
                    <text
                      y="-12"
                      textAnchor="middle"
                      className={`font-heading text-[10px] font-semibold tracking-wide ${
                        isSelected 
                          ? isSystems
                            ? "fill-accent-systems font-bold"
                            : "fill-accent-creative font-bold"
                          : isHighlighted
                          ? "fill-foreground font-medium"
                          : "fill-muted-foreground group-hover:fill-foreground"
                      } transition-colors duration-300`}
                      opacity={isDimmed ? 0.25 : 1}
                      filter={glowFilter}
                    >
                      {node.label}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Dynamic details overlay at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border/60 bg-muted/20 backdrop-blur-md font-mono text-xs">
          {activeNodeObj ? (
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`font-semibold uppercase tracking-wider ${
                  activeNodeObj.category === "data" || activeNodeObj.category === "platform"
                    ? "text-accent-systems"
                    : "text-accent-creative"
                }`}>
                  {activeNodeObj.label}
                </span>
                <span className="text-[10px] text-muted-foreground">[{activeNodeObj.category.toUpperCase()}]</span>
              </div>
              <p className="text-muted-foreground leading-relaxed text-[11px] sm:text-xs">
                {activeNodeObj.description}
              </p>
            </div>
          ) : (
            <div className="text-muted-foreground text-[11px] flex items-center justify-center gap-1.5 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600" />
              <span>Click nodes to inspect full stack connections & dependencies.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
