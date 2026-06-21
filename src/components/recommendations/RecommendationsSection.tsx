"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { stagger, staggerItem, defaultViewport } from "@/lib/animations";
import { Container, Section, SectionHeading } from "@/components/shared/Container";
import { RecommendationCard } from "@/components/recommendations/RecommendationCard";
import type { Recommendation } from "@/types/recommendation";
import Link from "next/link";
import { MessageSquarePlus, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(3);
      } else if (window.innerWidth >= 640) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  // Cap index to valid range when visibleCount changes
  useEffect(() => {
    const maxIndex = Math.max(0, recommendations.length - visibleCount);
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [visibleCount, recommendations.length, currentIndex]);

  const maxIndex = Math.max(0, recommendations.length - visibleCount);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  const isDraggable = recommendations.length > visibleCount;

  const handleDragEnd = (event: any, info: any) => {
    if (!isDraggable) return;
    const threshold = 50; // drag threshold in pixels
    if (info.offset.x < -threshold) {
      handleNext();
    } else if (info.offset.x > threshold) {
      handlePrev();
    }
  };

  const slideTransition = {
    duration: 0.5,
    ease: [0.4, 0, 0.2, 1] as [number, number, number, number], // state change ease from DESIGN_SYSTEM.md
  };

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
            <div className="flex flex-col gap-6">
              {/* Carousel wrapper with keyboard events */}
              <div
                tabIndex={0}
                onKeyDown={handleKeyDown}
                className="relative w-full outline-none focus-visible:ring-1 focus-visible:ring-primary/30 rounded-xl"
                aria-label="Recommendations carousel. Use arrow keys to navigate."
              >
                {/* Viewport wrapper with negative margins for layout alignment */}
                <div className="mx-[-10px] overflow-hidden px-2.5 py-4">
                  <motion.div
                    ref={trackRef}
                    drag={isDraggable ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={handleDragEnd}
                    animate={{ x: `-${currentIndex * (100 / visibleCount)}%` }}
                    transition={slideTransition}
                    className={cn(
                      "flex",
                      isDraggable ? "cursor-grab active:cursor-grabbing" : ""
                    )}
                    style={{ touchAction: "pan-y" }}
                  >
                    {recommendations.map((rec) => (
                      <motion.div
                        key={rec.id}
                        variants={staggerItem}
                        className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-2.5 select-none"
                      >
                        <RecommendationCard recommendation={rec} />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Navigation controls */}
              <motion.div
                variants={staggerItem}
                className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-border/40 pt-6"
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "icon" }),
                      "rounded-lg border-border hover:border-primary/50 hover:text-primary transition-all disabled:opacity-40 disabled:pointer-events-none"
                    )}
                    aria-label="Previous recommendation"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  <span className="font-mono text-xs text-muted-foreground select-none tracking-widest min-w-[60px] text-center">
                    {String(currentIndex + 1).padStart(2, "0")} / {String(recommendations.length).padStart(2, "0")}
                  </span>

                  <button
                    onClick={handleNext}
                    disabled={currentIndex === maxIndex}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "icon" }),
                      "rounded-lg border-border hover:border-primary/50 hover:text-primary transition-all disabled:opacity-40 disabled:pointer-events-none"
                    )}
                    aria-label="Next recommendation"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

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
