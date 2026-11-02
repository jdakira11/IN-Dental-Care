"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { testimonials } from "@/content/testimonials";
import { ChevronLeft, ChevronRight, Star } from "./icons";

const INTERVAL_MS = 4500;
const REDUCED = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * Opiniones en bucle (adaptado de la skill web-prototipo). Avanza solo y la opinión que llega al
 * centro hace zoom hacia el frente; las demás quedan atrás, más pequeñas y atenuadas.
 * Se pausa al pasar el ratón o al enfocar con teclado, tiene botón de pausa (WCAG 2.2.2) y no
 * avanza sola si el sistema pide reducir el movimiento.
 */
export function TestimonialsCarousel() {
  const items = testimonials;
  const n = items.length;
  // Tres copias para un bucle sin saltos visibles; se trabaja siempre sobre la copia central.
  const loop = [...items, ...items, ...items];
  const [index, setIndex] = useState(n);
  const [animate, setAnimate] = useState(true);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, () => window.matchMedia(REDUCED).matches, () => false);
  const [userChoice, setUserChoice] = useState<boolean | null>(null);
  const playing = userChoice ?? !reducedMotion;
  const [hovered, setHovered] = useState(false);
  const [metrics, setMetrics] = useState({ viewport: 0, step: 0, card: 0 });
  const viewportRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLLIElement>(null);

  // Medidas para centrar la tarjeta activa.
  useLayoutEffect(() => {
    const measure = () => {
      const vp = viewportRef.current;
      const card = firstCardRef.current;
      if (!vp || !card) return;
      const gap = parseFloat(getComputedStyle(card.parentElement!).columnGap || "0");
      setMetrics({ viewport: vp.clientWidth, step: card.offsetWidth + gap, card: card.offsetWidth });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, []);

  const go = useCallback((delta: number) => {
    setAnimate(true);
    setIndex((i) => i + delta);
  }, []);

  // Avance automático: la siguiente opinión entra desde la derecha.
  useEffect(() => {
    if (!playing || hovered) return;
    const id = window.setInterval(() => go(1), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [playing, hovered, go]);

  // Al salir de la copia central, se recoloca sin animación en la equivalente.
  const onTransitionEnd = () => {
    if (index < n || index >= 2 * n) {
      setAnimate(false);
      setIndex((i) => (((i % n) + n) % n) + n);
    }
  };
  useEffect(() => {
    if (!animate) {
      const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
      return () => cancelAnimationFrame(id);
    }
  }, [animate]);

  const offset = metrics.viewport / 2 - (index * metrics.step + metrics.card / 2);
  const active = ((index % n) + n) % n;

  return (
    <div
      role="region"
      aria-roledescription="carrusel"
      aria-label="Opiniones de pacientes"
      className="mt-14"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
    >
      <div ref={viewportRef} className="relative -mx-5 overflow-hidden py-10 md:mx-0">
        <ul
          className="flex gap-3 md:gap-5"
          style={{
            transform: `translate3d(${offset}px,0,0)`,
            transition: animate ? "transform 1.1s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
            visibility: metrics.step ? "visible" : "hidden",
          }}
          onTransitionEnd={(e) => e.target === e.currentTarget && onTransitionEnd()}
        >
          {loop.map((t, i) => {
            const isActive = i === index;
            return (
              <li key={i} ref={i === 0 ? firstCardRef : undefined} aria-hidden={!isActive} className="w-[17rem] shrink-0 md:w-[22rem]">
                {/* Zoom hacia el frente: la activa crece, se ilumina y gana sombra */}
                <figure
                  className={`flex h-full flex-col rounded-3xl border p-7 transition-[transform,opacity,background-color,border-color,box-shadow] duration-700 ease-[var(--ease-out-soft)] md:p-8 ${
                    isActive ? "scale-100 border-white/25 bg-white/[0.09] opacity-100 shadow-2xl shadow-black/40" : "scale-[0.82] border-white/10 bg-white/[0.03] opacity-40"
                  }`}
                >
                  <div className="flex gap-1 text-metal" aria-label="5 de 5 estrellas">
                    {Array.from({ length: 5 }, (_, s) => (
                      <Star key={s} />
                    ))}
                  </div>
                  <blockquote className="mt-5 flex-1 leading-relaxed text-white/85 md:text-lg">«{t.text}»</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                    <span aria-hidden className="grid h-10 w-10 place-items-center rounded-full bg-metal/15 font-title text-lg text-metal">
                      {t.name[0]}
                    </span>
                    <span className="text-sm">
                      <span className="block font-semibold text-white">{t.name}</span>
                      <span className="text-white/70">{t.treatment}</span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button type="button" onClick={() => go(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-white/25 hover:bg-white/10" aria-label="Opinión anterior">
          <ChevronLeft />
        </button>
        <div className="flex gap-2" aria-hidden>
          {items.map((_, i) => (
            <span key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? "w-6 bg-metal" : "w-1.5 bg-white/30"}`} />
          ))}
        </div>
        <button type="button" onClick={() => go(1)} className="grid h-11 w-11 place-items-center rounded-full border border-white/25 hover:bg-white/10" aria-label="Opinión siguiente">
          <ChevronRight />
        </button>
        <button type="button" onClick={() => setUserChoice(!playing)} className="ml-2 rounded-full border border-white/25 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] hover:bg-white/10" aria-pressed={!playing}>
          {playing ? "Pausar" : "Reproducir"}
        </button>
      </div>
      <p className="sr-only" aria-live={playing ? "off" : "polite"}>
        Opinión {active + 1} de {n}: {items[active].text} — {items[active].name}
      </p>
    </div>
  );
}
