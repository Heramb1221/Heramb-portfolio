"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Code2,
  Briefcase,
  Layers,
  GitFork,
  FolderOpen,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { stagger, staggerItem, defaultViewport } from "@/lib/animations";
import { Container, Section, SectionHeading } from "@/components/shared/Container";

interface CardData {
  icon: LucideIcon;
  label: string;
  sublabel: string;
  iconClass: string;
}

function buildCards(projectCount: number): CardData[] {
  return [
    {
      icon: GraduationCap,
      label: "Computer Engineering",
      sublabel: "R. C. Patel Institute of Technology · 8.93 CGPA",
      iconClass: "text-primary bg-primary/10",
    },
    {
      icon: Code2,
      label: "Software Engineer",
      sublabel: "Full Stack · Mobile · Real-Time Systems",
      iconClass: "text-primary bg-primary/10",
    },
    {
      icon: Briefcase,
      label: "Open To Opportunities",
      sublabel: "Internships · SDE Roles · Collaborations",
      iconClass: "text-emerald-500 bg-emerald-500/10",
    },
    {
      icon: Layers,
      label: "Currently Exploring",
      sublabel: ".NET · AWS · System Design",
      iconClass: "text-amber-500 bg-amber-500/10",
    },
    {
      icon: GitFork,
      label: "GitHub Active",
      sublabel: "44+ Public Repositories",
      iconClass: "text-primary bg-primary/10",
    },
    {
      icon: FolderOpen,
      label: `${projectCount}+ Projects Built`,
      sublabel: "Web · Mobile · Developer Tools",
      iconClass: "text-primary bg-primary/10",
    },
  ];
}

function SnapshotCard({ icon: Icon, label, sublabel, iconClass }: CardData) {
  return (
    <motion.article
      variants={staggerItem}
      className={cn(
        "flex flex-col gap-4 rounded-xl border border-border bg-card p-5",
        "shadow-sm transition-transform duration-200 ease-out",
        "hover:-translate-y-1",
      )}
      aria-label={label}
    >
      {/* Icon */}
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-xl",
          iconClass,
        )}
      >
        <Icon className="size-5" aria-hidden />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="text-xs leading-relaxed text-muted-foreground">{sublabel}</p>
      </div>
    </motion.article>
  );
}

interface RecruiterSnapshotProps {
  projectCount: number;
}

export function RecruiterSnapshot({ projectCount }: RecruiterSnapshotProps) {
  const cards = buildCards(projectCount);

  return (
    <Section id="recruiter-snapshot" className="bg-muted/20">
      <Container>
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={defaultViewport}
        >
          {/* Section heading */}
          <motion.div variants={staggerItem}>
            <SectionHeading
              title="Quick Overview"
              subtitle="A snapshot of my technical profile and current journey."
            />
          </motion.div>

          {/* Cards grid */}
          <motion.div
            variants={stagger}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {cards.map((card) => (
              <SnapshotCard key={card.label} {...card} />
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
