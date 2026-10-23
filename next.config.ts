import type { NextConfig } from "next";

// Old URLs → new pages. permanent: true issues a 308 so users and Google
// carry over cleanly. Duct Care Canada is a brand-new domain, so there is
// nothing to redirect yet — add entries here if an old site's URLs need
// to point at the new pages.
const legacyRedirects: { source: string; destination: string }[] = [];

const nextConfig: NextConfig = {
  // Every URL ends in "/" — keep the same shape for SEO consistency.
  trailingSlash: true,
  images: {
    // AVIF first (sharpest per byte), WebP fallback.
    formats: ["image/avif", "image/webp"],
    // Next 16 only allows listed qualities: 75 = default, 90 = large photos.
    qualities: [75, 90],
  },
  async redirects() {
    return legacyRedirects.map((r) => ({ ...r, permanent: true }));
  },
};

export default nextConfig;
