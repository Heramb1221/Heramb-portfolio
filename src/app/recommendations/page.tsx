export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Container, Section, SectionHeading } from "@/components/shared/Container";
import { getApprovedRecommendations } from "@/app/actions/recommendations";
import { RecommendationForm } from "@/app/recommendations/RecommendationForm";
import { RecommendationCard } from "@/components/recommendations/RecommendationCard";
import Link from "next/link";
import { Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "Recommendation Portal",
  description: "Share your experience working with Heramb or read testimonials from classmates, mentors, and collaborators.",
};

export default async function RecommendationsPage() {
  const recommendations = await getApprovedRecommendations();

  return (
    <Section as="main" id="recommendations-portal" className="pt-24 min-h-screen">
      <Container>
        <div className="flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
            <SectionHeading
              title="Recommendation Portal"
              subtitle="Submit a recommendation or read feedback from colleagues, classmates, and mentors."
            />
            <Link 
              href="/recommendations/moderate"
              className="text-xs font-mono tracking-wider text-muted-foreground hover:text-accent-creative flex items-center gap-1.5 self-start md:self-auto"
            >
              <Compass className="size-3.5 animate-spin-slow" />
              <span>[ADMIN.MODERATION]</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left: Feed of Approved Recommendations */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                <span>[SYS.FEED_COUNT: {recommendations.length} APPROVED_DOCUMENTS]</span>
              </div>
              
              {recommendations.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border py-16 text-center bg-card/15">
                  <p className="text-sm text-muted-foreground">No approved recommendations yet. Be the first to write one!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {recommendations.map((rec) => (
                    <RecommendationCard 
                      key={rec.id} 
                      recommendation={{
                        id: rec.id,
                        name: rec.name,
                        role: rec.role,
                        organization: rec.organization,
                        message: rec.message,
                        avatar: rec.avatar
                      }} 
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right: Submission Form */}
            <div className="lg:col-span-1 lg:sticky lg:top-24">
              <RecommendationForm />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
