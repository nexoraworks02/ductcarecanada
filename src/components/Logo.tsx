import { cn } from "@/lib/utils";
import { site } from "@/config/site";

/** Brand mark: emblem image plus crisp CSS text. `tone="dark"` = charcoal text, for light backgrounds. */
export function Logo({
  className,
  tone = "light",
  size = "md",
}: {
  className?: string;
  tone?: "light" | "dark";
  size?: "sm" | "md"; // sm = compact navbar version
}) {
  const dark = tone === "dark";
  const sm = size === "sm";
  return (
    <span className={cn("inline-flex items-center", sm ? "gap-2.5" : "gap-3", className)}>
      {/* Duct "C" + house emblem from the logo. On dark backgrounds it sits on
          a white tile so the navy lines stay visible. */}
      <span className={cn("shrink-0", !dark && "rounded-md bg-white px-1.5 py-1")}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo/emblem.webp"
          alt={site.name}
          width={420}
          height={196}
          className={cn("w-auto", sm ? "h-9 sm:h-10" : "h-10 sm:h-12")}
        />
      </span>
      <span className="flex flex-col whitespace-nowrap leading-none">
        <span
          className={cn(
            "font-display font-black uppercase tracking-[0.02em]",
            sm ? "text-[0.95rem] sm:text-[1.1rem]" : "text-[1.05rem] sm:text-[1.5rem]",
            dark ? "text-teal-800" : "text-white"
          )}
        >
          Duct Care <span className={dark ? "text-teal-400" : "text-mint-400"}>Canada</span>
        </span>
        <span
          className={cn(
            "mt-1 font-bold uppercase",
            sm ? "text-[9px] tracking-[0.18em] sm:text-[9.5px]" : "text-[10px] tracking-[0.2em] sm:text-[11px]",
            dark ? "text-ink-soft" : "text-[#D9D6D2]"
          )}
        >
          Duct &amp; Furnace Cleaning
        </span>
      </span>
    </span>
  );
}
