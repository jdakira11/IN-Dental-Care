import { Tooth } from "./icons";

/** Logo provisional (no hay identidad del cliente): emblema con diente + nombre. */
export function Logo({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  const light = tone === "light";
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span className={`grid h-10 w-10 place-items-center rounded-full ${light ? "bg-metal/15 text-metal" : "bg-sage text-accent"}`}>
        <Tooth width={22} height={22} strokeWidth={1.6} />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-title text-[1.45rem] ${light ? "text-white" : "text-ink"}`}>IIN Dental Care</span>
        <span className={`mt-1 text-[0.625rem] font-semibold uppercase tracking-[0.22em] ${light ? "text-metal" : "text-ink-mute"}`}>Dr. Ignacio Núñez</span>
      </span>
    </span>
  );
}
