import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { cn }         from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { siteUrl }    from "@/lib/url";
import { Providers }  from "@/components/layout/Providers";
import { Navbar }     from "@/components/layout/Navbar";
import { Sidebar }    from "@/components/layout/Sidebar";
import { Footer }     from "@/components/layout/Footer";
import { Loader }     from "@/components/shared/Loader";
import { CustomCursor } from "@/components/layout/CustomCursor";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], display: "swap" });
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], display: "swap" });

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name:     siteConfig.author.name,
  jobTitle: "Computer Engineering Student & Full Stack Developer",
  url:      siteUrl,
  email:    siteConfig.author.email,
  image:    `${siteUrl}/api/og`,
  sameAs: [
    siteConfig.links.github,
    siteConfig.links.linkedin,
    siteConfig.links.leetcode,
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:  siteConfig.title,
    template: siteConfig.titleTemplate,
  },
  description:  siteConfig.description,
  keywords:     [...siteConfig.keywords],
  authors:      [{ name: siteConfig.author.name, url: siteUrl }],
  creator:      siteConfig.author.name,
  robots:       { index: true, follow: true },
  alternates:   { canonical: siteUrl },
  openGraph: {
    type:        "website",
    locale:      "en_US",
    url:         siteUrl,
    title:       siteConfig.title,
    description: siteConfig.description,
    siteName:    siteConfig.name,
    images: [{
      url:    "/api/og",
      width:  1200,
      height: 630,
      alt:    siteConfig.title,
    }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       siteConfig.title,
    description: siteConfig.description,
    images:      ["/api/og"],
    creator:     "@heramb1221",
  },
  icons: {
    icon:    "/favicon.svg",
    shortcut:"/favicon.svg",
    apple:   "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)",  color: "#0F172A" },
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full antialiased", inter.variable, jetbrainsMono.variable, outfit.variable)}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        <Providers>
          <CustomCursor />
          <Loader />
          <Navbar />
          <Sidebar />
          <div className="flex flex-1 flex-col md:pl-14">
            <main className="flex-1 pt-16 pb-16 md:pb-0">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
