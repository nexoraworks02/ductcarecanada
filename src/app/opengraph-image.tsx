import { ImageResponse } from "next/og";
import { site } from "@/config/site";

// Social share card shown when the site is shared on Facebook, WhatsApp, X, etc.
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          background: "linear-gradient(135deg, #15181C 0%, #1D2127 60%, #292E35 100%)",
          borderBottom: "14px solid #C8102E",
          fontFamily: "sans-serif",
          padding: "72px",
        }}
      >
        {/* Emblem — drawn inline so it needs no asset (same as /images/logo/emblem.svg) */}
        <svg width="150" height="150" viewBox="0 0 64 64" fill="none" style={{ marginBottom: 34 }}>
          <rect width="64" height="64" rx="15" fill="#C8102E" />
          <path d="M12 25 32 9.5 52 25" stroke="#fff" strokeWidth="4.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 40h24a5 5 0 1 0-5-5" stroke="#fff" strokeWidth="4.2" strokeLinecap="round" />
          <path d="M16 50h17a4 4 0 1 1-4 4" stroke="#FFC6CC" strokeWidth="4.2" strokeLinecap="round" />
        </svg>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            letterSpacing: 6,
            color: "#FF9AA5",
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          Ducts · Furnaces · Dryer Vents · HRVs
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 800,
            color: "#ffffff",
            marginTop: 18,
            lineHeight: 1.05,
          }}
        >
          {site.name}
        </div>
        <div style={{ display: "flex", fontSize: 38, color: "#D9D6D2", marginTop: 20 }}>
          {site.tagline}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            fontWeight: 700,
            color: "#FF9AA5",
            marginTop: 34,
          }}
        >
          {site.defaultPhone}
        </div>
      </div>
    ),
    { ...size }
  );
}
