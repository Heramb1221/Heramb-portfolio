import { Suspense } from "react";
import { getProjectCount, getFeaturedProjects } from "@/lib/projects";
import { getAchievements, getCertifications } from "@/lib/content";
import { getApprovedRecommendations } from "@/app/actions/recommendations";
import { getGitHubData } from "@/lib/github";
import { getLeetCodeData } from "@/lib/leetcode";
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

export default async function Home() {
  const projectCount     = getProjectCount();
  const featuredProjects = getFeaturedProjects();
  const recommendations  = await getApprovedRecommendations();
  const achievements     = getAchievements();
  const certifications   = getCertifications();
  const githubData       = await getGitHubData();
  const leetcodeData     = await getLeetCodeData();

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
      <AchievementsSection 
        achievements={achievements} 
        githubData={githubData}
        leetcodeData={leetcodeData}
      />
      <CertificationsSection certifications={certifications} />
      <Suspense fallback={null}>
        <GitHubActivity />
      </Suspense>
      <ContactSection />
    </>
  );
}
