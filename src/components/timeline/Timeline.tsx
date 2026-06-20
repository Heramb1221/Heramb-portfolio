"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { stagger, staggerItem, defaultViewport } from "@/lib/animations";
import { Container, Section, SectionHeading } from "@/components/shared/Container";
import { TimelineCard } from "@/components/timeline/TimelineCard";
import { TimelineIcon } from "@/components/timeline/TimelineIcon";
import { timelineEntries } from "@/config/timeline";

function DesktopTimelineItem({
  entry,
  index,
}: {
  entry: (typeof timelineEntries)[number];
  index: number;
}) {
  const side = index % 2 === 0 ? "left" : "right";

  return (
    <div className="relative hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
      {/* Left slot */}
      <div className={side === "left" ? "flex justify-end" : ""}>
        {side === "left" && <TimelineCard entry={entry} side="left" />}
      </div>

      {/* Centre icon — sits on the line */}
      <div className="flex flex-col items-center">
        <TimelineIcon category={entry.category} />
      </div>

      {/* Right slot */}
      <div className={side === "right" ? "flex justify-start" : ""}>
        {side === "right" && <TimelineCard entry={entry} side="right" />}
      </div>
    </div>
  );
}

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 75%"]
  });

  const scaleY = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 90,
    restDelta: 0.001
  });

  return (
    <Section id="timeline">
      <Container>
        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={defaultViewport}
        >
          {/* Heading */}
          <motion.div variants={staggerItem}>
            <SectionHeading
              title="My Journey"
              subtitle="A timeline of education, projects, certifications, and technical milestones."
              align="center"
            />
          </motion.div>

          {/* Timeline body */}
          <div ref={containerRef} className="relative mt-10">

            {/* Background line — static dimmed */}
            <div
              className="absolute inset-y-0 left-1/2 hidden w-[2px] -translate-x-1/2 bg-border/40 lg:block"
              aria-hidden="true"
            />

            {/* Glowing active path line — scroll linked */}
            <motion.div
              style={{ scaleY, originY: 0 }}
              className="absolute inset-y-0 left-1/2 hidden w-[2px] -translate-x-1/2 bg-accent origin-top lg:block shadow-[0_0_8px_rgba(245,158,11,0.3)]"
              aria-hidden="true"
            />

            {/* Mobile: single-column list */}
            <motion.div
              variants={stagger}
              className="flex flex-col gap-6 lg:hidden"
            >
              {timelineEntries.map((entry) => (
                <motion.div key={entry.id} variants={staggerItem}>
                  <TimelineCard entry={entry} />
                </motion.div>
              ))}
            </motion.div>

            {/* Desktop: alternating two-column */}
            <motion.div
              variants={stagger}
              className="hidden flex-col gap-10 lg:flex"
            >
              {timelineEntries.map((entry, index) => (
                <motion.div key={entry.id} variants={staggerItem}>
                  <DesktopTimelineItem entry={entry} index={index} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
