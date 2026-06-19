"use client";

import { motion } from "framer-motion";
import { stagger, staggerItem, defaultViewport } from "@/lib/animations";
import { Container, Section, SectionHeading } from "@/components/shared/Container";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactForm } from "@/components/contact/ContactForm";

export function ContactSection() {
  return (
    <Section id="contact" className="bg-muted/20">
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
              title="Let's Build Something Together"
              subtitle="Whether it's an internship opportunity, collaboration, or simply a conversation about technology, I'd love to connect."
              align="center"
            />
          </motion.div>

          {/* Two-column layout: info | form */}
          <motion.div
            variants={stagger}
            className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12"
          >
            {/* Left — contact information */}
            <motion.div variants={staggerItem}>
              <ContactInfo />
            </motion.div>

            {/* Right — contact form */}
            <motion.div variants={staggerItem}>
              <ContactForm />
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
