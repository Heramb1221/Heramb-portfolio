import type { Metadata } from "next";
import { siteUrl } from "@/lib/url";
import { getAchievements } from "@/lib/content";
import { getGitHubData } from "@/lib/github";
import { getLeetCodeData } from "@/lib/leetcode";
import { AchievementsSection } from "@/components/achievements/Achievements";

export const metadata: Metadata = {
  title: "Achievements",
  description: "Dynamic development statistics, open-source activity, professional credentials, and technical achievements.",
  alternates: { canonical: `${siteUrl}/achievements` },
};

export default async function AchievementsPage() {
  const achievements = getAchievements();
  const githubData = await getGitHubData();
  const leetcodeData = await getLeetCodeData();

  return (
    <main className="pt-24 min-h-screen">
      <AchievementsSection
        achievements={achievements}
        githubData={githubData}
        leetcodeData={leetcodeData}
      />
    </main>
  );
}
