import type { Metadata } from "next";
import { Container, Section, SectionHeading } from "@/components/shared/Container";
import { RecommendationModerator } from "@/app/recommendations/moderate/RecommendationModerator";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Recommendation Moderation Panel",
  description: "Approve or delete pending recommendations.",
};

export default function ModerationPage() {
  return (
    <Section as="main" id="recommendations-moderation" className="pt-24 min-h-screen">
      <Container>
        <div className="flex flex-col gap-8">
          {/* Back */}
          <Link href="/recommendations" className="mb-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors self-start">
            <ArrowLeft className="size-3.5" aria-hidden /> Back to Recommendations
          </Link>

          <div className="border-b border-border pb-6">
            <SectionHeading
              title="Moderation Console"
              subtitle="Approve pending recommendations or purge invalid entries."
            />
          </div>

          <RecommendationModerator />
        </div>
      </Container>
    </Section>
  );
}
