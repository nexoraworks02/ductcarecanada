import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Figtree } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileCTABar } from "@/components/MobileCTABar";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { MetaPixel } from "@/components/MetaPixel";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BookingModal } from "@/components/BookingModal";

// Figtree for body + headings — friendly geometric sans for the Duct Care Canada look.
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
  display: "swap",
});

const siteUrl = site.url;

export const metadata: Metadata = {
  title: {
    default: `Duct Care Canada | Air Duct & Furnace Cleaning | Free Quote`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  icons: { icon: "/icon.png", apple: "/apple-icon.png" },
  keywords: [
    "duct cleaning Canada",
    "air duct cleaning near me",
    "furnace cleaning",
    "dryer vent cleaning",
    "HRV cleaning",
    "duct cleaning Toronto",
    "duct cleaning Calgary",
    "duct cleaning Montreal",
    "Duct Care Canada",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: site.name,
    title: `Air Duct & Furnace Cleaning | ${site.name}`,
    description: site.description,
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: `Air Duct & Furnace Cleaning | ${site.name}`,
    description: site.description,
  },
  verification: site.googleSiteVerification
    ? { google: site.googleSiteVerification }
    : undefined,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  name: site.name,
  description: site.description,
  url: siteUrl,
  telephone: site.defaultPhone,
  email: site.email,
  priceRange: "$$",
  // TODO(launch): add streetAddress + postalCode once the real office address is set in site.ts.
  address: {
    "@type": "PostalAddress",
    addressLocality: "Toronto",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  image: `${siteUrl}/opengraph-image`,
  // Square logo Google can show next to the business name.
  logo: `${siteUrl}/images/logo/logo-google.png`,
  sameAs: [site.facebookUrl, site.instagramUrl].filter(Boolean),
  areaServed: [
    ...[
      "Ontario",
      "Alberta",
      "Quebec",
      "British Columbia",
      "Manitoba",
      "Saskatchewan",
      "Nova Scotia",
      "New Brunswick",
      "Prince Edward Island",
      "Newfoundland and Labrador",
    ].map((name) => ({ "@type": "State", name })),
    { "@type": "Country", name: "Canada" },
  ],
  makesOffer: [
    "Air Duct Cleaning",
    "Furnace Cleaning",
    "Dryer Vent Cleaning",
    "Air Conditioning Coil Cleaning",
    "HRV Cleaning",
    "Brush Cleaning",
  ].map((name) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name },
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-ink pb-16 lg:pb-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MetaPixel />
        <ScrollProgress />
        <Navbar />
        {children}
        <Footer />
        <MobileCTABar />
        <WhatsAppButton />
        <BookingModal />
      </body>
      {/* GA4 loads only once a real Measurement ID is set in site config */}
      {site.gaMeasurementId && <GoogleAnalytics gaId={site.gaMeasurementId} />}
    </html>
  );
}
