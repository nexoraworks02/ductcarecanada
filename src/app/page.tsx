import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Services } from "@/components/sections/Services";
import { Comparison } from "@/components/sections/Comparison";
import { PricingPlans } from "@/components/sections/PricingPlans";
import { About } from "@/components/sections/About";
import { VideoTestimonials } from "@/components/sections/VideoTestimonials";
import { Areas } from "@/components/sections/Areas";
import { FAQ } from "@/components/sections/FAQ";
import { faqs } from "@/config/faqs";
import { hasVideoTestimonials } from "@/config/feedback-videos";

// FAQ rich-result schema — mirrors the FAQ section visible on this page.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

// Homepage: light split hero with instant price card → promise strip →
// how it works → services → comparison table → pricing → about → areas → FAQ.
// The booking band sits at the top of the footer (all pages).
// Written reviews (components/sections/Reviews.tsx) are hidden until real
// Google reviews exist — add <Reviews /> back here then. Video testimonials
// show automatically once clips are listed in config/feedback-videos.ts.
export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero />
      <TrustStrip />
      <HowItWorks />
      <Services />
      <Comparison />
      <PricingPlans />
      <About />
      {hasVideoTestimonials && <VideoTestimonials />}
      <Areas />
      <FAQ />
    </main>
  );
}
