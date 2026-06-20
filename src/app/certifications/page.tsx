import type { Metadata } from "next";
import { siteUrl } from "@/lib/url";
import { getCertifications } from "@/lib/content";
import { CertificationsSection } from "@/components/certifications/CertificationsSection";

export const metadata: Metadata = {
  title: "Certifications",
  description: "Professional certifications and technical credentials.",
  alternates: { canonical: `${siteUrl}/certifications` },
};

export default function CertificationsPage() {
  const certifications = getCertifications();

  return (
    <main className="pt-24 min-h-screen">
      <CertificationsSection certifications={certifications} />
    </main>
  );
}
