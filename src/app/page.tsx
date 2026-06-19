import { Suspense } from "react";
import { getProjectCount, getFeaturedProjects } from "@/lib/projects";
import { getRecommendations, getAchievements, getCertifications } from "@/lib/content";
import { Hero } from "@/components/hero/Hero";
import { RecruiterSnapshot } from "@/components/recruiter/RecruiterSnapshot";
import { FeaturedProject } from "@/components/projects/FeaturedProject";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { AboutSection } from "@/components/about/AboutSection";
import { CurrentlyLearning } from "@/components/learning/CurrentlyLearning";
import { Timeline } from "@/components/timeline/Timeline";
import { RecommendationsSection } from "@/components/recommendations/RecommendationsSection";
import { AchievementsSection } from "@/components/achievements/Achievements";
import { CertificationsSection } from "@/components/certifications/CertificationsSection";
import { GitHubActivity } from "@/components/github/GitHubActivity";
import { ContactSection } from "@/components/contact/ContactSection";

// Homepage — all sections implemented per roadmap:
// ✓ Hero  ✓ Recruiter Snapshot  ✓ Featured Projects  ✓ Skills  ✓ About
// ✓ Currently Learning  ✓ Timeline  ✓ Recommendations  ✓ Achievements
// ✓ Certifications  ✓ GitHub Activity  ✓ Contact

export default function Home() {
  const projectCount     = getProjectCount();
  const featuredProjects = getFeaturedProjects();
  const recommendations  = getRecommendations();
  const achievements     = getAchievements();
  const certifications   = getCertifications();

  return (
    <>
      <Hero />
      <RecruiterSnapshot projectCount={projectCount} />
      <FeaturedProject projects={featuredProjects} />
      <SkillsSection />
      <AboutSection />
      <CurrentlyLearning />
      <Timeline />
      <RecommendationsSection recommendations={recommendations} />
      <AchievementsSection achievements={achievements} />
      <CertificationsSection certifications={certifications} />
      <Suspense fallback={null}>
        <GitHubActivity />
      </Suspense>
      <ContactSection />
    </>
  );
}
