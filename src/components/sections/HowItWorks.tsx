import Link from "next/link";
import { ArrowRight, CalendarCheck, Wind, Wrench } from "lucide-react";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "../ui/Reveal";

const STEPS = [
  {
    icon: CalendarCheck,
    time: "About 2 minutes",
    title: "Book online",
    text: "Pick your region, add any extras and choose a morning, afternoon or evening arrival. You see the total before you send it.",
  },
  {
    icon: Wrench,
    time: "Usually 2–4 hours",
    title: "We clean the whole system",
    text: "The crew confirms the price, puts your ducts under negative pressure and works room by room — every supply, return and register.",
  },
  {
    icon: Wind,
    time: "From day one",
    title: "Enjoy cleaner air",
    text: "Less dust on your furniture, better airflow to the far rooms, and a furnace that doesn't strain. Not happy with a vent? We come back.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-white py-24 sm:py-28">
      <Container>
        <div className="grid items-end gap-6 md:grid-cols-2">
          <Reveal>
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-teal-800 sm:text-5xl">
              Three steps to clean ducts
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-ink-soft md:text-right">
              No sales visit, no on-site upsell. Book it, we clean it, you breathe easier.
            </p>
          </Reveal>
        </div>

        <Stagger className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {/* Connecting line behind the step numbers */}
          <span aria-hidden="true" className="absolute left-0 right-0 top-7 hidden h-0.5 bg-teal-100 md:block" />
          {STEPS.map(({ icon: Icon, time, title, text }, i) => (
            <StaggerItem key={title} className="relative">
              <div className="flex items-center gap-4">
                <span className="relative flex h-14 w-14 shrink-0 items-center justify-center bg-teal-400 font-display text-xl font-black text-white">
                  {i + 1}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-canvas px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-ink-soft">
                  <Icon className="h-3.5 w-3.5 text-teal-400" />
                  {time}
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-teal-800">{title}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{text}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.2} className="mt-12">
          <Link
            href="/#quote"
            className="group inline-flex items-center gap-2 font-bold uppercase tracking-wider text-teal-400 hover:text-teal-600"
          >
            Start step one
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
