"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarCheck, Check, Minus, Phone, Plus, ShieldCheck } from "lucide-react";
import { Container } from "../ui/Container";
import { lowestPrice, provinces, site, telHref } from "@/config/site";
import { cn } from "@/lib/utils";

// Light split hero: headline + promise on the left, a live "instant price"
// card on the right. Every number comes from the pricing tiers in site.ts.
export function Hero() {
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.5, 0.27, 1] as const } },
  };

  return (
    <section className="relative overflow-hidden bg-canvas pb-16 pt-[104px] sm:pb-20 sm:pt-[116px] lg:pb-24 lg:pt-[152px]">
      {/* Blueprint-style duct grid + red corner block */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:linear-gradient(to_right,#e6e1dc_1px,transparent_1px),linear-gradient(to_bottom,#e6e1dc_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-0 hidden h-full w-[42%] skew-x-[-8deg] bg-teal-800 lg:block" />

      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } }}
        >
          <motion.p
            variants={item}
            className="inline-flex items-center gap-2 border-l-4 border-teal-400 bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-teal-800 shadow-sm"
          >
            Duct cleaning across Canada
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-6 max-w-[15ch] font-display text-4xl font-black leading-[1.02] tracking-tight text-teal-800 sm:text-5xl lg:text-[3.6rem]"
          >
            Clean ducts. <span className="text-teal-400">Clear price.</span> No surprises.
          </motion.h1>
          <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            {`Every supply and return vent in your home, cleaned by trained crews in seven regions — from $${lowestPrice}, with the total confirmed before we start.`}
          </motion.p>

          <motion.ul variants={item} className="mt-7 grid max-w-xl gap-3 text-sm font-semibold text-teal-800 sm:grid-cols-3">
            {["Every vent included", "Free furnace inspection", "Arrivals 8 am – 6 pm"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center bg-teal-400 text-white">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#quote"
              className="btn-primary inline-flex items-center justify-center gap-2 bg-teal-400 px-8 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-teal-500"
            >
              <CalendarCheck className="h-5 w-5" />
              Book online
            </Link>
            <a
              href={telHref(site.defaultPhone)}
              className="inline-flex items-center justify-center gap-2 border-2 border-teal-800 px-8 py-4 text-sm font-bold uppercase tracking-[0.12em] text-teal-800 transition-colors hover:bg-teal-800 hover:text-white"
            >
              <Phone className="h-4 w-4" />
              {site.defaultPhone}
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.21, 0.5, 0.27, 1] }}
        >
          <PriceCheck />
        </motion.div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Instant price card: region → furnaces → extras → live total.        */
/* ------------------------------------------------------------------ */
const EXTRAS = ["dryer", "ac", "hrv", "brush-cleaning"];

function PriceCheck() {
  const [code, setCode] = useState("ON");
  const [furnaces, setFurnaces] = useState(0);
  const [extras, setExtras] = useState<string[]>([]);

  const province = provinces.find((p) => p.code === code)!;
  const { base, addons } = province.pricing;
  const furnace = addons.find((a) => a.id === "furnace")!;
  const extraItems = addons.filter((a) => EXTRAS.includes(a.id));
  const total =
    base.price +
    furnaces * furnace.price +
    extraItems.filter((a) => extras.includes(a.id)).reduce((s, a) => s + a.price, 0);

  const toggle = (id: string) =>
    setExtras((xs) => (xs.includes(id) ? xs.filter((x) => x !== id) : [...xs, id]));

  return (
    <div className="relative border-t-[6px] border-teal-400 bg-white p-6 shadow-[0_40px_80px_-40px_rgba(29,33,39,0.55)] sm:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-400">Instant price check</p>
      <h2 className="mt-1 font-display text-2xl font-extrabold text-teal-800">What will my cleaning cost?</h2>

      <label className="mt-6 block text-xs font-bold uppercase tracking-wider text-ink-soft" htmlFor="pc-region">
        Your region
      </label>
      <select
        id="pc-region"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="mt-2 w-full border border-line bg-canvas px-3 py-3 font-semibold text-teal-800 outline-none focus:border-teal-400"
      >
        {provinces.map((p) => (
          <option key={p.code} value={p.code}>
            {p.name}
          </option>
        ))}
      </select>

      <div className="mt-5 flex items-center justify-between gap-4 border-b border-line pb-5">
        <div>
          <p className="font-semibold text-teal-800">Furnace cleaning</p>
          <p className="text-xs text-ink-soft">{`$${furnace.price} per furnace · inspection is free`}</p>
        </div>
        <div className="flex items-center">
          <button
            type="button"
            aria-label="Fewer furnaces"
            onClick={() => setFurnaces((n) => Math.max(0, n - 1))}
            className="flex h-9 w-9 items-center justify-center border border-line text-teal-800 hover:border-teal-400"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-10 text-center font-display text-lg font-bold text-teal-800" aria-live="polite">
            {furnaces}
          </span>
          <button
            type="button"
            aria-label="More furnaces"
            onClick={() => setFurnaces((n) => Math.min(furnace.maxQty ?? 3, n + 1))}
            className="flex h-9 w-9 items-center justify-center border border-line text-teal-800 hover:border-teal-400"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <p className="mt-5 text-xs font-bold uppercase tracking-wider text-ink-soft">Popular extras</p>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {extraItems.map((a) => {
          const on = extras.includes(a.id);
          return (
            <button
              key={a.id}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(a.id)}
              className={cn(
                "flex items-center justify-between gap-2 border px-3 py-2.5 text-left text-sm font-semibold transition-colors",
                on ? "border-teal-400 bg-teal-50 text-teal-700" : "border-line text-teal-800 hover:border-teal-300"
              )}
            >
              <span className="truncate">{a.label}</span>
              <span className="shrink-0 text-xs">{`+$${a.price}`}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex items-end justify-between gap-4 bg-teal-800 px-5 py-4 text-white">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-mint-400">Your estimate</p>
          <p className="text-xs text-white/70">{`${base.label} $${base.price} + extras`}</p>
        </div>
        <span key={total} className="total-pop font-display text-4xl font-black">{`$${total}`}</span>
      </div>

      <Link
        href="/#quote"
        className="btn-primary mt-4 flex items-center justify-center gap-2 bg-teal-400 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-teal-500"
      >
        Book this cleaning
      </Link>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-ink-soft">
        <ShieldCheck className="h-3.5 w-3.5 text-teal-400" />
        Every vent included — your final total is confirmed before we start.
      </p>
    </div>
  );
}
