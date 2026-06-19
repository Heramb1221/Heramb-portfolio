"use client";

import { motion } from "framer-motion";
import { stagger, staggerItem, defaultViewport } from "@/lib/animations";
import { Container, Section, SectionHeading } from "@/components/shared/Container";
import { CertificationCard } from "@/components/certifications/CertificationCard";
import type { Certification } from "@/types/certificate";

interface CertificationsSectionProps {
  certifications: Certification[];
}

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
  return (
    <Section id="certifications" className="bg-muted/20">
      <Container>
        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={defaultViewport}
        >
          <motion.div variants={staggerItem}>
            <SectionHeading
              title="Certifications"
              subtitle="Courses, certifications, and credentials that demonstrate continuous learning and technical growth."
              align="center"
            />
          </motion.div>

          <motion.div
            variants={stagger}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {certifications.map((cert) => (
              <motion.div key={cert.id} variants={staggerItem}>
                <CertificationCard certification={cert} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
