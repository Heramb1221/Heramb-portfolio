"use client";

import { motion } from "framer-motion";
import { stagger, staggerItem, defaultViewport } from "@/lib/animations";
import { Container, Section, SectionHeading } from "@/components/shared/Container";
import { AchievementCard } from "@/components/achievements/AchievementCard";
import type { Achievement } from "@/types/achievement";

interface AchievementsSectionProps {
  achievements: Achievement[];
}

export function AchievementsSection({ achievements }: AchievementsSectionProps) {
  return (
    <Section id="achievements">
      <Container>
        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={defaultViewport}
        >
          <motion.div variants={staggerItem}>
            <SectionHeading
              title="Achievements"
              subtitle="Milestones that reflect my technical growth, participation, and continuous learning."
              align="center"
            />
          </motion.div>

          <motion.div
            variants={stagger}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {achievements.map((achievement) => (
              <motion.div key={achievement.id} variants={staggerItem}>
                <AchievementCard achievement={achievement} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
