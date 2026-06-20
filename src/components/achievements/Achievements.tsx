"use client";

import { motion } from "framer-motion";
import { stagger, staggerItem, defaultViewport } from "@/lib/animations";
import { Container, Section, SectionHeading } from "@/components/shared/Container";
import { ExternalLink, Trophy, Star, Flame, Code } from "lucide-react";
import type { Achievement } from "@/types/achievement";
import type { GitHubData } from "@/lib/github";
import type { LeetCodeData } from "@/lib/leetcode";

interface AchievementsSectionProps {
  achievements: Achievement[];
  githubData: GitHubData;
  leetcodeData: LeetCodeData;
}

export function AchievementsSection({
  achievements,
  githubData,
  leetcodeData,
}: AchievementsSectionProps) {
  // Solve counts & percentage calculations for LeetCode
  const totalSolved = leetcodeData.totalSolved;
  const easyPct = (leetcodeData.easySolved / totalSolved) * 100;
  const medPct = (leetcodeData.mediumSolved / totalSolved) * 100;
  const hardPct = (leetcodeData.hardSolved / totalSolved) * 100;

  return (
    <Section id="achievements" className="bg-muted/10 relative overflow-hidden border-t border-b border-border">
      <Container>
        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={defaultViewport}
          className="space-y-10"
        >
          {/* Header */}
          <motion.div variants={staggerItem}>
            <SectionHeading
              title="Milestones & Metrics"
              subtitle="Dynamic development statistics, open-source activity, professional credentials, and technical achievements."
              align="center"
            />
          </motion.div>

          {/* Bento Grid */}
          <motion.div
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* 1. LeetCode Metrics Card */}
            <motion.article
              variants={staggerItem}
              className="flex flex-col gap-4 rounded-xl border border-border bg-card/35 p-5 hover:border-accent-systems/30 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(16,185,129,0.03)]"
            >
              <div className="flex items-center justify-between font-mono text-[9px] text-muted-foreground">
                <span>[LC.ALGORITHMS-01]</span>
                <span className="text-accent-systems">LEETCODE STATS</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Code className="size-4.5 text-accent-systems" />
                <h3 className="font-heading text-sm font-bold text-foreground">Algorithm Practice</h3>
              </div>

              {/* Counts */}
              <div className="flex items-baseline justify-between mt-2">
                <div className="flex flex-col">
                  <span className="font-heading text-3xl font-black text-foreground">
                    {totalSolved}
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase">Solved Problems</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-sm font-bold text-foreground">
                    #{leetcodeData.ranking?.toLocaleString("en-US") || "180,000"}
                  </span>
                  <p className="text-[10px] font-mono text-muted-foreground uppercase">Global Rank</p>
                </div>
              </div>

              {/* Progress visual bar */}
              <div className="w-full h-2 rounded-full bg-muted overflow-hidden flex mt-2">
                <div 
                  className="bg-emerald-500 h-full transition-all" 
                  style={{ width: `${easyPct}%` }} 
                  title={`Easy: ${leetcodeData.easySolved}`}
                />
                <div 
                  className="bg-amber-500 h-full transition-all" 
                  style={{ width: `${medPct}%` }} 
                  title={`Medium: ${leetcodeData.mediumSolved}`}
                />
                <div 
                  className="bg-red-500 h-full transition-all" 
                  style={{ width: `${hardPct}%` }} 
                  title={`Hard: ${leetcodeData.hardSolved}`}
                />
              </div>

              {/* Difficulty stats */}
              <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono mt-1">
                <div className="bg-emerald-500/5 rounded p-1.5 border border-emerald-500/10">
                  <span className="text-emerald-500 font-bold block">{leetcodeData.easySolved}</span>
                  <span className="text-muted-foreground text-[8px] uppercase">Easy</span>
                </div>
                <div className="bg-amber-500/5 rounded p-1.5 border border-amber-500/10">
                  <span className="text-amber-500 font-bold block">{leetcodeData.mediumSolved}</span>
                  <span className="text-muted-foreground text-[8px] uppercase">Medium</span>
                </div>
                <div className="bg-red-500/5 rounded p-1.5 border border-red-500/10">
                  <span className="text-red-500 font-bold block">{leetcodeData.hardSolved}</span>
                  <span className="text-muted-foreground text-[8px] uppercase">Hard</span>
                </div>
              </div>
            </motion.article>

            {/* 2. GitHub Activity Card */}
            <motion.article
              variants={staggerItem}
              className="flex flex-col gap-4 rounded-xl border border-border bg-card/35 p-5 hover:border-accent-creative/30 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(245,158,11,0.03)]"
            >
              <div className="flex items-center justify-between font-mono text-[9px] text-muted-foreground">
                <span>[GH.CONTRIBUTIONS-02]</span>
                <span className="text-accent-creative">GITHUB DIRECTORY</span>
              </div>

              <div className="flex items-center gap-2">
                <Flame className="size-4.5 text-accent-creative" />
                <h3 className="font-heading text-sm font-bold text-foreground">Open Source Index</h3>
              </div>

              {/* Repos / Stars Counts */}
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="flex flex-col">
                  <span className="font-heading text-2xl font-black text-foreground">
                    {githubData.user?.public_repos ?? 18}
                  </span>
                  <span className="text-[9px] font-mono text-muted-foreground uppercase">Public Repositories</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-heading text-2xl font-black text-foreground flex items-center gap-1">
                    {githubData.totalStars} <Star className="size-4 text-accent-creative fill-accent-creative/20" />
                  </span>
                  <span className="text-[9px] font-mono text-muted-foreground uppercase">Cumulative Stars</span>
                </div>
              </div>

              {/* List of top repos */}
              <div className="flex flex-col gap-2 mt-1">
                <span className="text-[8px] font-mono text-muted-foreground uppercase tracking-widest border-b border-border pb-1">
                  FEATURED CODE BASES
                </span>
                <div className="flex flex-col gap-1.5">
                  {githubData.repos.slice(0, 3).map((repo) => (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between text-xs hover:text-accent-creative transition-colors"
                    >
                      <span className="font-semibold truncate max-w-[150px]">{repo.name}</span>
                      <span className="font-mono text-[9px] text-muted-foreground flex items-center gap-1">
                        {repo.language && <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#f59e0b" }} />}
                        {repo.language}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.article>

            {/* 3. Hackathons & Milestones Timeline (Col-span 2) */}
            <motion.article
              variants={staggerItem}
              className="md:col-span-2 flex flex-col gap-4 rounded-xl border border-border bg-card/35 p-6 hover:border-accent-systems/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between font-mono text-[9px] text-muted-foreground">
                <span>[SYS.ACHIEVEMENTS-03]</span>
                <span className="text-accent-systems">TRACK_RECORD</span>
              </div>

              <div className="flex items-center gap-2">
                <Trophy className="size-4.5 text-accent-systems" />
                <h3 className="font-heading text-sm font-bold text-foreground">Hackathons & Leadership</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                {achievements.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex flex-col gap-2 rounded-lg border border-border/80 bg-background/40 p-4 hover:border-accent-systems/30 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between font-mono text-[9px] text-muted-foreground">
                      <span className="text-accent-systems font-bold uppercase">{item.category || "HONOR"}</span>
                      <span>{item.date}</span>
                    </div>
                    <h4 className="font-heading font-bold text-xs text-foreground leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-muted-foreground font-mono leading-none">
                      {item.organization}
                    </p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed flex-1 mt-1 line-clamp-3">
                      {item.description}
                    </p>
                    {item.link && (
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-[9px] text-accent-systems mt-2 font-semibold hover:underline"
                      >
                        <span>VIEW EVENT DETAILS</span>
                        <ExternalLink className="size-2.5" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </motion.article>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
