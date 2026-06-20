"use client";

import { motion } from "framer-motion";
import { stagger, staggerItem, defaultViewport } from "@/lib/animations";
import { Container, Section, SectionHeading } from "@/components/shared/Container";
import { RecommendationCard } from "@/components/recommendations/RecommendationCard";
import type { Recommendation } from "@/types/recommendation";
import Link from "next/link";
import { MessageSquarePlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-border py-16 text-center">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-muted-foreground">
          No recommendations yet.
        </p>
        <p className="text-xs text-muted-foreground">
          Be the first to share your experience working with me!
        </p>
      </div>
      <Link
        href="/recommendations"
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "rounded-xl font-mono text-[10px] tracking-wider"
        )}
      >
        <MessageSquarePlus className="mr-1.5 size-3.5" />
        <span>WRITE A RECOMMENDATION</span>
      </Link>
    </div>
  );
}

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
            <div className="flex flex-col gap-8">
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

              <motion.div
                variants={staggerItem}
                className="flex justify-center"
              >
                <Link
                  href="/recommendations"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "rounded-xl px-5 py-4 font-mono text-xs tracking-wider border-border hover:bg-muted"
                  )}
                >
                  <MessageSquarePlus className="mr-1.5 size-4" />
                  <span>WRITE A RECOMMENDATION</span>
                </Link>
              </motion.div>
            </div>
          )}
        </motion.div>
      </Container>
    </Section>
  );
}
