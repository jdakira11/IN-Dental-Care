"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { testimonials } from "@/content/testimonials";
import { ChevronLeft, ChevronRight, Star } from "./icons";

const INTERVAL_MS = 4500;
const GLIDE_MS = 900;
const REDUCED = "(prefers-reduced-motion: reduce)";
const DESKTOP = "(min-width: 768px)";
const subscribeMedia = (query: string) => (onChange: () => void) => {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};
const subscribeReduced = subscribeMedia(REDUCED);
const subscribeDesktop = subscribeMedia(DESKTOP);

/**
 * Opiniones en bucle sobre un desplazamiento real (scroll-snap), como el carrusel de catálogo de
 * la skill: en cada fotograma se calcula la cercanía de cada tarjeta al centro (--p: 1 en el centro,
 * 0 a una tarjeta de distancia) y con ella cambian tamaño, opacidad y brillo de forma continua.
 * Los bordes se funden con una máscara. En móvil las laterales encogen y se apagan menos (--s, --o)
 * para que asomen y se note que hay más opiniones.
 *
 * Escritorio: avance automático cada 4,5 s, flechas y Pausar (WCAG 2.2.2); se pausa con el ratón
 * encima o con el foco dentro. Móvil: sin controles ni avance automático; se desliza con el dedo
 * y los puntos indican cuántas opiniones hay. Sin avance automático con «reducir movimiento».
 * Bucle: tres copias; al detenerse en una copia lateral se recoloca sin animación en la central.
 */
export function TestimonialsCarousel() {
  const items = testimonials;
  const n = items.length;
  const loop = [...items, ...items, ...items];
  const scrollerRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const settle = useRef(0);
  const [active, setActive] = useState(n);
  const reduced = useSyncExternalStore(subscribeReduced, () => window.matchMedia(REDUCED).matches, () => false);
  const desktop = useSyncExternalStore(subscribeDesktop, () => window.matchMedia(DESKTOP).matches, () => false);
  const [userChoice, setUserChoice] = useState<boolean | null>(null);
  const playing = desktop && (userChoice ?? !reduced);
  const [hovered, setHovered] = useState(false);

  const cards = () => Array.from(scrollerRef.current?.querySelectorAll<HTMLElement>("[data-card]") ?? []);
  const leftFor = (el: HTMLElement, card: HTMLElement) => card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2;

  const update = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0");
    let best = 0;
    let bestDist = Infinity;
    cards().forEach((card, i) => {
      const d = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
      const p = Math.max(0, 1 - d / (card.offsetWidth + gap));
      card.style.setProperty("--p", (p * p * (3 - 2 * p)).toFixed(3)); // suavizado (smoothstep)
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best);
    return best;
  }, []);

  // Al detenerse en una copia lateral, salta sin animación a la misma tarjeta de la copia central.
  const recenter = useCallback(() => {
    const el = scrollerRef.current;
    const best = update();
    if (!el || best === undefined || (best >= n && best < 2 * n)) return;
    const target = cards()[best < n ? best + n : best - n];
    el.scrollTo({ left: leftFor(el, target), behavior: "instant" });
    update();
  }, [n, update]);

  // Posición inicial en la copia central y recálculo al cambiar el tamaño.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const card = cards()[n];
      if (card && el.scrollLeft === 0) el.scrollTo({ left: leftFor(el, card), behavior: "instant" });
      update();
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [n, update]);

  const onScroll = () => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(update);
    window.clearTimeout(settle.current);
    settle.current = window.setTimeout(recenter, 180);
  };

  // Desplazamiento propio (más lento y suave que el nativo): el snap se suspende mientras dura.
  const glide = useRef(0);
  const goTo = useCallback(
    (index: number) => {
      const el = scrollerRef.current;
      const card = cards()[Math.max(0, Math.min(3 * n - 1, index))];
      if (!el || !card) return;
      const to = leftFor(el, card);
      cancelAnimationFrame(glide.current);
      if (reduced) {
        el.scrollTo({ left: to, behavior: "instant" });
        return;
      }
      const from = el.scrollLeft;
      const start = performance.now();
      el.style.scrollSnapType = "none";
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / GLIDE_MS);
        const eased = t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2; // easeInOutCubic
        el.scrollLeft = from + (to - from) * eased;
        if (t < 1) glide.current = requestAnimationFrame(step);
        else el.style.scrollSnapType = "";
      };
      glide.current = requestAnimationFrame(step);
    },
    [n, reduced],
  );

  // Avance automático (solo escritorio).
  useEffect(() => {
    if (!playing || hovered) return;
    const id = window.setInterval(() => goTo(active + 1), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [playing, hovered, active, goTo]);

  const current = active % n;

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
      <div
        ref={scrollerRef}
        onScroll={onScroll}
        className="no-scrollbar relative -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain py-10 [--card:min(72vw,22rem)] [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)] md:[mask-image:linear-gradient(90deg,transparent,#000_18%,#000_82%,transparent)] [padding-inline:calc((100%-var(--card))/2)] md:mx-0 md:gap-6"
      >
        {loop.map((t, i) => (
          <figure
            key={i}
            data-card
            aria-hidden={i !== active}
            className="flex w-[var(--card)] shrink-0 snap-center snap-always flex-col rounded-3xl border p-7 will-change-transform md:p-8 [--s:0.9] [--o:0.4] md:[--s:0.8] md:[--o:0.2] [transform:scale(calc(var(--s)_+_(1_-_var(--s))*var(--p,0)))] [opacity:calc(var(--o)_+_(1_-_var(--o))*var(--p,0))] [background:rgb(255_255_255/calc(0.03_+_0.06*var(--p,0)))] [border-color:rgb(255_255_255/calc(0.08_+_0.17*var(--p,0)))] [box-shadow:0_40px_70px_-30px_rgb(0_0_0/calc(0.55*var(--p,0)))]"
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
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-4">
        <button type="button" onClick={() => goTo(active - 1)} className="hidden h-11 w-11 place-items-center rounded-full border border-white/25 hover:bg-white/10 md:grid" aria-label="Opinión anterior">
          <ChevronLeft />
        </button>
        {/* Indicador de posición (en móvil es el único control: se desliza con el dedo) */}
        <div className="flex gap-2" aria-hidden>
          {items.map((_, i) => (
            <span key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? "w-6 bg-metal" : "w-1.5 bg-white/30"}`} />
          ))}
        </div>
        <button type="button" onClick={() => goTo(active + 1)} className="hidden h-11 w-11 place-items-center rounded-full border border-white/25 hover:bg-white/10 md:grid" aria-label="Opinión siguiente">
          <ChevronRight />
        </button>
        <button type="button" onClick={() => setUserChoice(!playing)} className="ml-2 hidden rounded-full border border-white/25 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] hover:bg-white/10 md:block" aria-pressed={!playing}>
          {playing ? "Pausar" : "Reproducir"}
        </button>
      </div>
      <p className="sr-only" aria-live={playing ? "off" : "polite"}>
        Opinión {current + 1} de {n}: {items[current].text} — {items[current].name}
      </p>
    </div>
  );
}
