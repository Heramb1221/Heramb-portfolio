"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { stagger, staggerItem, defaultViewport } from "@/lib/animations";
import { Container, Section, SectionHeading } from "@/components/shared/Container";
import { SkillBadge, getSkillNodeId } from "@/components/skills/SkillCard";
import { SkillGraph } from "@/components/skills/SkillGraph";
import { skillCategories } from "@/config/skills";
import { Monitor, Server, Database, Compass, Wrench } from "lucide-react";

export function SkillsSection() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const frontend = skillCategories.find(c => c.id === "frontend");
  const backend = skillCategories.find(c => c.id === "backend");
  const database = skillCategories.find(c => c.id === "database");
  const tools = skillCategories.find(c => c.id === "tools");
  const learning = skillCategories.find(c => c.id === "learning");

  return (
    <Section id="skills" className="bg-muted/10 relative overflow-hidden border-t border-b border-border">
      {/* Decorative compass lines in the section background */}
      <div className="absolute top-0 right-0 w-96 h-96 border border-border/10 rounded-full -mr-48 -mt-48 pointer-events-none select-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] border border-dashed border-border/5 rounded-full -mr-250 -mt-250 pointer-events-none select-none" />
      
      <Container>
        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={defaultViewport}
          className="space-y-10"
        >
          {/* Heading */}
          <motion.div variants={staggerItem}>
            <SectionHeading
              title="Technical Instruments"
              subtitle="The languages, runtimes, and databases I use to build scalable full-stack software systems."
              align="center"
            />
          </motion.div>

          {/* Bento Grid */}
          <motion.div
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* 1. Ecosystem Graph (Col-span 2) */}
            <motion.div
              variants={staggerItem}
              className="lg:col-span-2 h-full"
            >
              <SkillGraph
                activeNode={activeNode}
                setActiveNode={setActiveNode}
                hoveredNode={hoveredNode}
                setHoveredNode={setHoveredNode}
              />
            </motion.div>

            {/* Right Column Bento Stack */}
            <div className="flex flex-col gap-6 lg:col-span-1">
              {/* 2. Core Frontend & Mobile Bento Card */}
              {frontend && (
                <motion.article
                  variants={staggerItem}
                  className="group relative flex flex-col gap-3 rounded-xl border border-border bg-card/35 p-5 hover:border-accent-creative/30 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(245,158,11,0.03)]"
                >
                  <div className="flex items-center justify-between font-mono text-[9px] text-muted-foreground">
                    <span>[FRNT.ENGINE-01]</span>
                    <span className="text-accent-creative">CREATIVE LAYER</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Monitor className="size-4 text-accent-creative" />
                    <h3 className="font-heading text-sm font-bold text-foreground">{frontend.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {frontend.skills.map((skill) => {
                      const nodeId = getSkillNodeId(skill);
                      return (
                        <SkillBadge
                          key={skill}
                          label={skill}
                          isActive={activeNode === nodeId}
                          isHovered={hoveredNode === nodeId}
                          onMouseEnter={() => nodeId && setHoveredNode(nodeId)}
                          onMouseLeave={() => setHoveredNode(null)}
                          onClick={() => nodeId && setActiveNode(activeNode === nodeId ? null : nodeId)}
                        />
                      );
                    })}
                  </div>
                </motion.article>
              )}

              {/* 3. Databases & Cache Bento Card */}
              {database && (
                <motion.article
                  variants={staggerItem}
                  className="group relative flex flex-col gap-3 rounded-xl border border-border bg-card/35 p-5 hover:border-accent-systems/30 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(16,185,129,0.03)]"
                >
                  <div className="flex items-center justify-between font-mono text-[9px] text-muted-foreground">
                    <span>[SYS.STORAGE-02]</span>
                    <span className="text-accent-systems">PERSISTENCE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="size-4 text-accent-systems" />
                    <h3 className="font-heading text-sm font-bold text-foreground">{database.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {database.skills.map((skill) => {
                      const nodeId = getSkillNodeId(skill);
                      return (
                        <SkillBadge
                          key={skill}
                          label={skill}
                          isActive={activeNode === nodeId}
                          isHovered={hoveredNode === nodeId}
                          onMouseEnter={() => nodeId && setHoveredNode(nodeId)}
                          onMouseLeave={() => setHoveredNode(null)}
                          onClick={() => nodeId && setActiveNode(activeNode === nodeId ? null : nodeId)}
                        />
                      );
                    })}
                  </div>
                </motion.article>
              )}
            </div>
          </motion.div>

          {/* Row 2 Bento Grid (Bottom Row) */}
          <motion.div
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* 4. Backend & Protocols Bento Card */}
            {backend && (
              <motion.article
                variants={staggerItem}
                className="group relative flex flex-col gap-3 rounded-xl border border-border bg-card/35 p-5 hover:border-accent-systems/30 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(16,185,129,0.03)]"
              >
                <div className="flex items-center justify-between font-mono text-[9px] text-muted-foreground">
                  <span>[SYS.RUNTIME-03]</span>
                  <span className="text-accent-systems">LOGIC LAYER</span>
                </div>
                <div className="flex items-center gap-2">
                  <Server className="size-4 text-accent-systems" />
                  <h3 className="font-heading text-sm font-bold text-foreground">{backend.title}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {backend.skills.map((skill) => {
                    const nodeId = getSkillNodeId(skill);
                    return (
                      <SkillBadge
                        key={skill}
                        label={skill}
                        isActive={activeNode === nodeId}
                        isHovered={hoveredNode === nodeId}
                        onMouseEnter={() => nodeId && setHoveredNode(nodeId)}
                        onMouseLeave={() => setHoveredNode(null)}
                        onClick={() => nodeId && setActiveNode(activeNode === nodeId ? null : nodeId)}
                      />
                    );
                  })}
                </div>
              </motion.article>
            )}

            {/* 5. Platforms & Utilities Bento Card */}
            {tools && (
              <motion.article
                variants={staggerItem}
                className="group relative flex flex-col gap-3 rounded-xl border border-border bg-card/35 p-5 hover:border-accent-creative/30 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(245,158,11,0.03)]"
              >
                <div className="flex items-center justify-between font-mono text-[9px] text-muted-foreground">
                  <span>[DEV.UTILITIES-04]</span>
                  <span className="text-accent-creative">INSTRUMENTS</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wrench className="size-4 text-accent-creative" />
                  <h3 className="font-heading text-sm font-bold text-foreground">{tools.title}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {tools.skills.map((skill) => {
                    const nodeId = getSkillNodeId(skill);
                    return (
                      <SkillBadge
                        key={skill}
                        label={skill}
                        isActive={activeNode === nodeId}
                        isHovered={hoveredNode === nodeId}
                        onMouseEnter={() => nodeId && setHoveredNode(nodeId)}
                        onMouseLeave={() => setHoveredNode(null)}
                        onClick={() => nodeId && setActiveNode(activeNode === nodeId ? null : nodeId)}
                      />
                    );
                  })}
                </div>
              </motion.article>
            )}

            {/* 6. Currently Learning / Exploration Bento Card */}
            {learning && (
              <motion.article
                variants={staggerItem}
                className="group relative flex flex-col gap-3 rounded-xl border border-accent-systems/30 bg-card/35 p-5 hover:border-accent-systems/60 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(16,185,129,0.05)]"
              >
                <div className="flex items-center justify-between font-mono text-[9px] text-muted-foreground">
                  <span>[SYS.FRONTIER-05]</span>
                  <span className="text-accent-systems">EXPLORATION</span>
                </div>
                <div className="flex items-center gap-2">
                  <Compass className="size-4 text-accent-systems animate-spin-slow" />
                  <h3 className="font-heading text-sm font-bold text-foreground">{learning.title}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {learning.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center rounded-full border border-accent-systems/30 bg-accent-systems/5 px-2.5 py-0.5 text-xs font-medium text-accent-systems transition-colors group-hover:border-accent-systems/60 hover:bg-accent-systems/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.article>
            )}
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}

