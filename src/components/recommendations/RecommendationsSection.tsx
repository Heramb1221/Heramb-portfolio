"use client";

import { motion } from "framer-motion";
import { stagger, staggerItem, defaultViewport } from "@/lib/animations";
import { Container, Section, SectionHeading } from "@/components/shared/Container";
import { RecommendationCard } from "@/components/recommendations/RecommendationCard";
import type { Recommendation } from "@/types/recommendation";

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border py-16 text-center">
      <p className="text-sm font-medium text-muted-foreground">
        No recommendations yet.
      </p>
      <p className="text-xs text-muted-foreground">
        Add YAML files to{" "}
        <code className="font-mono">src/content/recommendations/</code>
      </p>
    </div>
  );
}

// ─── RecommendationsSection ───────────────────────────────────────────────────

interface RecommendationsSectionProps {
  recommendations: Recommendation[];
}

export function RecommendationsSection({
  recommendations,
}: RecommendationsSectionProps) {
  return (
    <Section id="recommendations" className="bg-muted/20">
      <Container>
        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={defaultViewport}
        >
          <motion.div variants={staggerItem}>
            <SectionHeading
              title="Recommendations"
              subtitle="Feedback from professors, mentors, teammates, and collaborators who have worked with me."
              align="center"
            />
          </motion.div>

          {recommendations.length === 0 ? (
            <EmptyState />
          ) : (
            <motion.div
              variants={stagger}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {recommendations.map((rec) => (
                <motion.div key={rec.id} variants={staggerItem}>
                  <RecommendationCard recommendation={rec} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </Container>
    </Section>
  );
}
