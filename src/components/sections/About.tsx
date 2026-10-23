"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { BadgeCheck, CheckCircle2, Quote } from "lucide-react";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "../ui/Reveal";
import { lowestPrice } from "@/config/site";

// Trust points for the About section.
const POINTS = [
  "Trained, background-checked crews",
  "Price confirmed before work starts",
  "Free furnace inspection every visit",
  "Floors and furniture protected",
  "Houses, condos & commercial units",
  "Appointments 8 am – 6 pm",
];

// "About company" block (reference layout): parallax photo with an
// overlapping blue quote card, heading, checklist and a second photo.
export function About() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-40, 40]);

  return (
    <section ref={ref} id="about" className="scroll-mt-24 overflow-hidden bg-white py-24 sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Photo + quote card */}
        <Reveal from="left" className="relative mx-auto w-full max-w-[480px] pb-16 sm:pb-10">
          {/* Vertical (4:5) frame + vertical photo so nothing is awkwardly cropped */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-md shadow-[0_30px_70px_-30px_rgba(29,33,39,0.5)]">
            <motion.div style={{ y: imgY }} className="absolute -inset-y-12 inset-x-0">
              <Image
                src="/images/photos/maritime.webp"
                alt="Duct Care Canada technicians cleaning flexible air ducts in a bright home"
                fill
                quality={90}
                sizes="(min-width: 1024px) 480px, 90vw"
                className="object-cover"
              />
            </motion.div>
          </div>
          <Reveal
            from="up"
            delay={0.3}
            className="absolute -bottom-2 left-6 right-6 rounded-md bg-teal-400 p-7 text-white shadow-[0_24px_50px_-20px_rgba(29,33,39,0.9)] sm:left-16 sm:right-[-1.5rem]"
          >
            <Quote className="absolute right-5 top-4 h-10 w-10 text-white/25" />
            <p className="relative text-base italic leading-relaxed">
              Your ducts move every breath of air in your home. We treat them
              with care — and we confirm the price before the hoses come out.
            </p>
          </Reveal>
          {/* Floating badge */}
          <div className="absolute -right-3 top-8 hidden rounded-md bg-white px-5 py-4 shadow-xl motion-safe:animate-[float-y_5s_ease-in-out_infinite] sm:block">
            <p className="font-display text-3xl font-black text-teal-800">{`$${lowestPrice}`}</p>
            <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">Starting price</p>
          </div>
        </Reveal>

        {/* Copy */}
        <div>
          <Reveal>
            <Eyebrow>About Duct Care Canada</Eyebrow>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-teal-800 sm:text-5xl">
              Duct cleaning done properly
            </h2>
            <p className="mt-5 text-lg font-light leading-relaxed text-ink-soft">
              We start with a look at your system, then work room by room:
              negative-pressure vacuum on the trunk lines, rotary brushes in the
              branches, and every register and return wiped down. You get a
              quieter, cleaner system and a furnace that doesn&apos;t have to
              work as hard.
            </p>
          </Reveal>

          <Stagger className="mt-8 grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {POINTS.map((p) => (
              <StaggerItem key={p}>
                <span className="flex items-center gap-3 font-medium text-teal-800">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-teal-400" />
                  {p}
                </span>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.2} className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <div className="relative h-24 w-28 shrink-0 sm:h-32 sm:w-40 overflow-hidden rounded-md shadow-lg">
              <Image
                src="/images/photos/duct-hose.webp"
                alt="Duct cleaning hose inside an air duct"
                fill
                quality={90}
                sizes="160px"
                className="object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
            <div className="flex min-w-0 flex-1 items-start gap-3">
              <BadgeCheck className="mt-1 h-8 w-8 shrink-0 text-teal-400" />
              <p className="font-light leading-relaxed text-ink-soft">
                <span className="font-bold text-teal-800">Fully insured.</span>{" "}
                Booking homes and businesses in Ontario, the Prairies, Quebec, BC and the Maritimes.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
