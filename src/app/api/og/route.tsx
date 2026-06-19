import { ImageResponse } from "next/og";
import { siteConfig }    from "@/config/site";

export const runtime = "edge";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          background: "#0F172A",
          fontFamily: "sans-serif",
        }}
      >
        {/* Subtle grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* <HC /> logo */}
        <div
          style={{
            display: "flex",
            fontSize: 48,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            fontFamily: "monospace",
          }}
        >
          <span style={{ color: "#3B82F6" }}>&lt;</span>
          <span style={{ color: "#F8FAFC" }}>HC</span>
          <span style={{ color: "#3B82F6" }}> /&gt;</span>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: "#F8FAFC",
            letterSpacing: "-0.02em",
          }}
        >
          {siteConfig.author.name}
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 20,
            color: "#94A3B8",
            fontWeight: 400,
            maxWidth: 700,
            textAlign: "center",
          }}
        >
          {siteConfig.tagline}
        </div>

        {/* Availability pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 8,
            background: "rgba(16,185,129,0.12)",
            border: "1px solid rgba(16,185,129,0.3)",
            borderRadius: 999,
            padding: "8px 20px",
            fontSize: 16,
            color: "#34D399",
            fontWeight: 500,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#10B981",
            }}
          />
          {siteConfig.author.availability}
        </div>
      </div>
    ),
    {
      width:  1200,
      height: 630,
    },
  );
}
