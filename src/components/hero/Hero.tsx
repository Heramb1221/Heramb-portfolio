"use client";

import { motion } from "framer-motion";
import { ChevronDown, ArrowRight, GitFork, Briefcase, Code2, Mail } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { stagger, staggerItem } from "@/lib/animations";
import { Container } from "@/components/shared/Container";
import { CTAButton } from "@/components/shared/CTAButton";
import { Tag } from "@/components/shared/Tag";
import { HeroVisual } from "@/components/hero/HeroVisual";

interface HeroSocialLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  external?: boolean;
}

function HeroSocialLink({ href, label, icon, external }: HeroSocialLinkProps) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={label}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-lg",
        "text-muted-foreground transition-colors",
        "hover:bg-muted hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      )}
    >
      {icon}
    </Link>
  );
}

const heroSocials: HeroSocialLinkProps[] = [
  {
    href: siteConfig.links.github,
    label: "GitHub",
    icon: <GitFork className="size-4" aria-hidden />,
    external: true,
  },
  {
    href: siteConfig.links.linkedin,
    label: "LinkedIn",
    icon: <Briefcase className="size-4" aria-hidden />,
    external: true,
  },
  {
    href: siteConfig.links.leetcode,
    label: "LeetCode",
    icon: <Code2 className="size-4" aria-hidden />,
    external: true,
  },
  {
    href: siteConfig.links.email,
    label: "Email",
    icon: <Mail className="size-4" aria-hidden />,
    external: false,
  },
];

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-[calc(100vh-4rem)] items-center py-24"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Left: text content */}
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="flex flex-col gap-5"
          >
            {/* Availability */}
            <motion.div variants={staggerItem}>
              <Tag variant="success" className="w-fit gap-1.5">
                <span aria-hidden>✦</span> Available for Opportunities
              </Tag>
            </motion.div>

            {/* Greeting + Name */}
            <motion.div variants={staggerItem} className="flex flex-col gap-2">
              <h1 className="text-5xl font-extrabold tracking-tighter text-foreground sm:text-7xl lg:text-[5.5rem] leading-[1.1]">
                The Explorer&apos;s<br />
                <span className="text-accent">Atlas.</span>
              </h1>
              <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground mt-2">
                Heramb Chaudhari // Full Stack Engineer
              </p>
            </motion.div>

            {/* Description — 3 lines max */}
            <motion.p
              variants={staggerItem}
              className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg mt-2"
            >
              I build scalable full-stack applications — from real-time platforms
              and mobile apps to SaaS products. Focused on clean architecture,
              engineering depth, and software that solves real problems.
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={staggerItem} className="flex flex-col sm:flex-row flex-wrap gap-3 mt-4">
              <CTAButton href="https://herambchaudhari.vercel.app/" external size="lg" className="shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                Take full experience of my portfolio
                <ArrowRight className="size-4" aria-hidden />
              </CTAButton>
              <CTAButton href="#featured-projects" variant="secondary" size="lg">
                View Projects
              </CTAButton>
            </motion.div>

            {/* Social icons */}
            <motion.div
              variants={staggerItem}
              className="flex items-center gap-1"
              role="list"
              aria-label="Social profiles"
            >
              {heroSocials.map((s) => (
                <div key={s.label} role="listitem">
                  <HeroSocialLink {...s} />
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: visual — desktop only */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            className="hidden items-center justify-center lg:flex"
          >
            <HeroVisual />
          </motion.div>

        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <button
          type="button"
          onClick={() =>
            document
              .getElementById("recruiter-snapshot")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          aria-label="Scroll to overview section"
          className={cn(
            "flex items-center justify-center rounded-lg p-1",
            "text-muted-foreground transition-colors",
            "hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
        >
          <ChevronDown className="size-5" aria-hidden />
        </button>
      </motion.div>
    </section>
  );
}
