"use client";

import { useEffect, useState } from "react";
import logoSymbol from "@/assets/images/logo-simbolo.webp";
import { INTRO_SEEN_KEY } from "@/config/intro";
import { intro } from "@/content/copy";
import { treatments } from "@/content/treatments";
import { TreatmentIcon } from "./TreatmentIcon";

/** Duración total en ms; debe coincidir con el retraso + duración de `intro-out` en globals.css. */
const TOTAL_MS = 8000;

/**
 * Animación de entrada: la «I» aparece y se desplaza dejando paso a la «N», se dibuja el diente
 * del logo, entran el nombre y el eslogan, luego los servicios uno a uno, y todo se desvanece.
 *
 * Toda la secuencia es CSS (globals.css, bloque «Intro»): aunque falle JavaScript, la capa se
 * desvanece sola. El script en línea del layout añade `sin-intro` a <html> si ya se vio en esta
 * sesión o si el sistema pide reducir movimiento, y entonces no se muestra.
 *
 * Coordenadas del símbolo = píxeles del logo original (1536×1024) recortado en (465, 258).
 */
export function IntroSplash() {
  const [state, setState] = useState<"playing" | "leaving" | "done">("playing");

  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains("sin-intro")) {
      requestAnimationFrame(() => setState("done"));
      return;
    }
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {}
    root.style.overflow = "hidden";
    const finish = window.setTimeout(() => setState("done"), TOTAL_MS);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setState("leaving");
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(finish);
      document.removeEventListener("keydown", onKey);
      root.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (state === "done") document.documentElement.style.overflow = "";
    if (state !== "leaving") return;
    const t = window.setTimeout(() => setState("done"), 450);
    return () => window.clearTimeout(t);
  }, [state]);

  if (state === "done") return null;

  const name = "IN DENTAL CARE";
  return (
    <div className={`intro ${state === "leaving" ? "intro-leaving" : ""}`}>
      <div aria-hidden className="intro-stage flex flex-col items-center px-5 text-center">
        <svg viewBox="465 245 680 400" className="w-[min(62vw,19rem)] overflow-visible">
          <defs>
            <mask id="intro-tooth-mask" maskUnits="userSpaceOnUse" x="465" y="200" width="700" height="480">
              <path className="intro-draw intro-draw-a" pathLength={1} d="M760 385C752 330 772 284 830 278c32-2 58 10 80 24" />
              <path className="intro-draw intro-draw-b" pathLength={1} d="M858 328c62-6 102-60 178-62 54 0 72 34 71 84-1 80-47 190-123 280" strokeWidth="58" />
              <path className="intro-draw intro-draw-c" pathLength={1} d="M872 497c28 25 88 25 146-29" strokeWidth="34" />
            </mask>
          </defs>
          {/* N primero: la «I» pasa por delante al desplazarse */}
          <g className="intro-n">
            <path d="M575 609V360h46l162 174.7V360h50v249h-45.3L623 431v178z" fill="#022442" />
          </g>
          <g className="intro-i-slide">
            <g className="intro-i-pop">
              <rect x="479" y="360" width="52" height="249" fill="#022442" />
            </g>
          </g>
          <image href={logoSymbol.src} x="465" y="258" width="680" height="390" mask="url(#intro-tooth-mask)" />
        </svg>

        <p className="mt-6 font-title text-[clamp(1.35rem,4.5vw,2rem)] font-medium tracking-[0.22em] text-[#022442]">
          {name.split("").map((ch, i) => (
            <span key={i} className={`intro-letter ${i >= 10 ? "text-[#069d93]" : ""}`} style={{ "--i": i } as React.CSSProperties}>
              {ch === " " ? " " : ch}
            </span>
          ))}
        </p>
        <span className="intro-rule mt-3 block h-px w-[min(70vw,22rem)] bg-[#022442]" />
        <p className="intro-slogan mt-4 text-base text-ink-soft md:text-lg">{intro.slogan}</p>

        <ul className="mt-10 grid grid-cols-3 gap-x-4 gap-y-5 md:grid-cols-6 md:gap-x-6">
          {treatments.map((t, i) => (
            <li key={t.id} className="intro-service flex w-24 flex-col items-center gap-2 md:w-28" style={{ "--i": i } as React.CSSProperties}>
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-sage md:h-[4.5rem] md:w-[4.5rem]">
                <TreatmentIcon id={t.id} className="h-11 w-11 md:h-12 md:w-12" />
              </span>
              <span className="text-[0.8125rem] font-medium leading-tight text-ink-soft">{t.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <button type="button" onClick={() => setState("leaving")} className="intro-skip absolute bottom-6 right-6 rounded-full border border-line bg-card px-5 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:border-accent hover:text-accent">
        Saltar intro
      </button>
    </div>
  );
}
