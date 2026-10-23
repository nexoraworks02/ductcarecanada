"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { Container } from "../ui/Container";
import { contactLineFor, provinces, site, telHref } from "@/config/site";

/**
 * Full-width red booking band at the top of the footer on every page. "Book
 * online" links to "#quote", which the site-wide <BookingModal /> opens. On a
 * province page it names that area and shows its starting price, and the
 * Call / WhatsApp buttons use that province's line when it has its own.
 */
export function BookingCTA() {
  const pathname = usePathname();
  const slug = pathname.split("/").filter(Boolean)[0];
  const area = provinces.find((p) => p.slug === slug);
  const priceFrom = area?.priceFrom ?? Math.min(...provinces.map((p) => p.priceFrom));
  const line = contactLineFor(area?.code);
  const waText = encodeURIComponent(
    `Hi ${site.name}, I want a free duct cleaning quote${area ? ` in ${area.name}` : ""}.`
  );

  return (
    <div id="quote" className="relative scroll-mt-24 overflow-hidden bg-teal-400 text-white">
      {/* Diagonal darker-red block on the right */}
      <div aria-hidden="true" className="absolute -right-20 inset-y-0 hidden w-[38%] skew-x-[-12deg] bg-teal-600 lg:block" />
      <Container className="relative flex flex-col gap-8 py-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/80">Ready when you are</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
            {`Book your ${area ? `${area.name} ` : ""}duct cleaning — from $${priceFrom}`}
          </h2>
          <p className="mt-3 text-white/85">
            Takes about two minutes. Every vent included, and your total is confirmed before we start.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="#quote"
            className="btn-primary inline-flex items-center justify-center gap-2 whitespace-nowrap bg-white px-7 py-4 text-sm font-bold uppercase tracking-[0.12em] text-teal-400 transition-colors hover:bg-teal-800 hover:text-white"
          >
            <CalendarCheck className="h-5 w-5" />
            Book online
          </Link>
          <a
            href={telHref(line.phone)}
            aria-label={`Call ${line.region} ${line.phone}`}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap border-2 border-white px-6 py-4 text-sm font-bold uppercase tracking-[0.12em] transition-colors hover:bg-white hover:text-teal-400"
          >
            <Phone className="h-4 w-4" />
            {line.phone}
          </a>
          <a
            href={`https://wa.me/${line.whatsappDigits}?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp ${line.region} ${line.phone}`}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap bg-[#25D366] px-6 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white transition-transform hover:-translate-y-0.5"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </Container>
    </div>
  );
}
