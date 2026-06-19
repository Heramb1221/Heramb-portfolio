"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { stagger, staggerItem, defaultViewport } from "@/lib/animations";
import { Container, Section, SectionHeading } from "@/components/shared/Container";
import { HighlightCard } from "@/components/about/HighlightCard";
import { aboutContent } from "@/config/about";

export function AboutSection() {
  const { paragraphs, highlights } = aboutContent;

  return (
    <Section id="about">
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
              title="About Me"
              subtitle="A brief introduction about my journey and interests in software engineering."
            />
          </motion.div>

          {/* Two-column layout: text | highlights */}
          <motion.div
            variants={stagger}
            className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16"
          >
            {/* Left — professional summary */}
            <motion.div variants={staggerItem} className="flex flex-col gap-6">
              <div
                className="flex flex-col gap-4"
                aria-label="Professional summary"
              >
                {paragraphs.map((para, i) => (
                  <p
                    key={i}
                    className="text-sm leading-relaxed text-muted-foreground sm:text-base"
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className={cn(
                    "inline-flex h-11 items-center justify-center gap-2 rounded-xl px-6",
                    "bg-primary text-sm font-medium text-primary-foreground",
                    "transition-opacity hover:opacity-90",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  )}
                  aria-label="Scroll to contact section"
                >
                  Let&apos;s Build Something Together
                  <ArrowRight className="size-4" aria-hidden />
                </button>
              </div>
            </motion.div>

            {/* Right — highlight cards */}
            <motion.div
              variants={stagger}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
              role="list"
              aria-label="Key strengths and interests"
            >
              {highlights.map((h) => (
                <motion.div key={h.id} variants={staggerItem} role="listitem">
                  <HighlightCard
                    icon={h.icon}
                    iconLabel={h.iconLabel}
                    title={h.title}
                    description={h.description}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
