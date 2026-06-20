"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { stagger, staggerItem, defaultViewport } from "@/lib/animations";
import { Container, Section, SectionHeading } from "@/components/shared/Container";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Project } from "@/types/project";

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-20 text-center">
      <p className="text-sm font-medium text-muted-foreground">
        No featured projects found.
      </p>
      <p className="text-xs text-muted-foreground">
        Add a YAML file to{" "}
        <code className="font-mono">
          src/content/projectsdetails/Featured projects/
        </code>
      </p>
    </div>
  );
}

interface FeaturedProjectProps {
  projects: Project[];
}

export function FeaturedProject({ projects }: FeaturedProjectProps) {
  return (
    <Section id="featured-projects">
      <Container>
        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={defaultViewport}
        >
          {/* Section heading — centred */}
          <motion.div variants={staggerItem}>
            <SectionHeading
              title="Featured Projects"
              subtitle="Some of the projects that best represent my software engineering journey and technical expertise."
              align="center"
              className="mb-10 md:mb-14"
            />
          </motion.div>

          {/* Projects grid or empty state */}
          {projects.length === 0 ? (
            <EmptyState />
          ) : (
            <motion.div
              variants={stagger}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2"
            >
              {projects.map((project) => (
                <motion.div key={project.slug} variants={staggerItem}>
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* View all CTA */}
          {projects.length > 0 && (
            <motion.div
              variants={staggerItem}
              className="mt-12 flex justify-center"
            >
              <Link
                href="/projects"
                className={cn(
                  "inline-flex h-11 items-center justify-center gap-2 rounded-xl px-6",
                  "bg-primary text-sm font-medium text-primary-foreground",
                  "transition-opacity hover:opacity-90",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
                aria-label="View all projects"
              >
                View All Projects
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </motion.div>
          )}
        </motion.div>
      </Container>
    </Section>
  );
}
