import type { Metadata } from "next";
import { Container, Section, SectionHeading } from "@/components/shared/Container";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { getAllProjectsSorted, getAllCategories } from "@/lib/projects";

import { siteUrl } from "@/lib/url";

export const metadata: Metadata = {
  title: "Projects",
  description: "A collection of projects that reflect my software engineering journey.",
  alternates: { canonical: `${siteUrl}/projects` },
  openGraph: { title: "Projects", description: "A collection of projects that reflect my software engineering journey.", images: ["/api/og"] },
};

export default function ProjectsPage() {
  const projects   = getAllProjectsSorted();
  const categories = getAllCategories();

  return (
    <Section as="main" id="projects" className="pt-24">
      <Container>
        <SectionHeading
          title="Projects"
          subtitle="A collection of projects that reflect my software engineering journey."
        />
        <ProjectsGrid projects={projects} categories={categories} />
      </Container>
    </Section>
  );
}
