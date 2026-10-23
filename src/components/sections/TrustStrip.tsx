import { BadgeCheck, ClipboardCheck, Flame, LayoutGrid } from "lucide-react";
import { Container } from "../ui/Container";

// Charcoal band right under the hero: the four promises in one line.
const POINTS = [
  { icon: LayoutGrid, title: "Every vent included", text: "No vent counts, no per-register fees." },
  { icon: Flame, title: "Free furnace inspection", text: "A look at your furnace on every visit." },
  { icon: ClipboardCheck, title: "Price confirmed first", text: "Your total is agreed before we start." },
  { icon: BadgeCheck, title: "Trained, insured crews", text: "Floors protected, cleaned up after." },
];

export function TrustStrip() {
  return (
    <section aria-label="Our promises" className="bg-teal-800 text-white">
      <Container className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
        {POINTS.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-start gap-4 bg-teal-800 px-2 py-7 sm:px-6">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-teal-400">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display font-bold">{title}</p>
              <p className="mt-0.5 text-sm text-white/70">{text}</p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
