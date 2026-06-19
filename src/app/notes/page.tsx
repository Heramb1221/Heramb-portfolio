import type { Metadata } from "next";
import { siteUrl }  from "@/lib/url";
import { getNotes } from "@/lib/notes";
import { Container, Section, SectionHeading } from "@/components/shared/Container";
import { NotesClient } from "@/components/notes/NotesClient";

export const metadata: Metadata = {
  title:       "Notes",
  description: "Technical notes, project write-ups, and learning logs from my software engineering journey.",
  alternates:  { canonical: `${siteUrl}/notes` },
};

export default function NotesPage() {
  const notes = getNotes();
  return (
    <Section as="main" id="notes" className="pt-24">
      <Container>
        <SectionHeading
          title="Notes"
          subtitle="Technical notes, project write-ups, and learning logs."
        />
        <NotesClient notes={notes} />
      </Container>
    </Section>
  );
}
