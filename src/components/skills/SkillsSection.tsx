"use client";

import { motion } from "framer-motion";
import { stagger, staggerItem, defaultViewport } from "@/lib/animations";
import { Container, Section, SectionHeading } from "@/components/shared/Container";
import { SkillCard } from "@/components/skills/SkillCard";
import { skillCategories } from "@/config/skills";

export function SkillsSection() {
  return (
    <Section id="skills" className="bg-muted/20">
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
              title="Technical Skills"
              subtitle="Technologies and tools I use to design, build, and deploy modern software solutions."
              align="center"
            />
          </motion.div>

          {/* 2-column grid — single on mobile, 2 on sm+ */}
          <motion.div
            variants={stagger}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {skillCategories.map((cat) => (
              <motion.div key={cat.id} variants={staggerItem}>
                <SkillCard
                  title={cat.title}
                  icon={cat.icon}
                  iconLabel={cat.iconLabel}
                  skills={cat.skills}
                  variant={cat.id === "learning" ? "learning" : "default"}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
