"use client";

import { motion } from "framer-motion";
import { stagger, staggerItem, defaultViewport } from "@/lib/animations";
import { Container, Section, SectionHeading } from "@/components/shared/Container";
import { LearningCard } from "@/components/learning/LearningCard";
import { learningItems } from "@/config/learning";

export function CurrentlyLearning() {
  return (
    <Section id="currently-learning" className="bg-muted/20">
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
              title="Currently Learning"
              subtitle="Technologies and concepts I am actively exploring to become a better software engineer."
              align="center"
            />
          </motion.div>

          {/* Cards grid */}
          <motion.div
            variants={stagger}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {learningItems.map((item) => (
              <motion.div key={item.id} variants={staggerItem}>
                <LearningCard item={item} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
