"use client";

import { useEffect, useRef } from "react";

/**
 * Línea de tiempo de pasos que se revela al hacer scroll (estructura inspirada en la sección
 * «Process» de dentalrx.ca): números unidos por una línea vertical; el texto de cada paso aparece
 * al llegar a ~65 % de la pantalla y la línea se rellena según el avance.
 * Sin JS o con «reducir movimiento» todo queda visible y la línea, completa.
 */
export function ProcessTimeline({ steps }: { steps: { title: string; text: string }[] }) {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = Array.from(list.querySelectorAll<HTMLElement>("[data-step]"));
    const trigger = () => window.innerHeight * 0.65;
    items.forEach((el) => {
      if (el.getBoundingClientRect().top > trigger()) el.setAttribute("data-step-pending", "");
    });

    let frame = 0;
    const update = () => {
      frame = 0;
      const line = trigger();
      const rect = list.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (line - rect.top) / rect.height));
      list.style.setProperty("--progress", progress.toFixed(4));
      items.forEach((el) => {
        if (el.getBoundingClientRect().top < line) el.removeAttribute("data-step-pending");
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      items.forEach((el) => el.removeAttribute("data-step-pending"));
      list.style.removeProperty("--progress");
    };
  }, []);

  return (
    <ol ref={listRef} className="process relative">
      {/* Línea base y relleno de progreso, centradas bajo los números */}
      <span aria-hidden className="absolute bottom-6 left-[1.1875rem] top-6 w-px bg-line" />
      <span aria-hidden className="process-fill absolute bottom-6 left-[1.1875rem] top-6 w-px origin-top bg-accent" />
      {steps.map((s, i) => (
        <li key={s.title} data-step className="process-step relative grid grid-cols-[2.5rem_1fr] gap-5 pb-14 last:pb-0 md:gap-8 md:pb-20">
          <span className="process-num relative z-10 grid h-10 w-10 place-items-center rounded-full border border-line bg-paper text-sm font-semibold tabular-nums text-ink-soft">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="process-body relative pr-8 pt-1.5">
            <h3 className="text-xl font-semibold md:text-2xl">{s.title}</h3>
            <p className="mt-2 max-w-lg leading-relaxed text-ink-soft">{s.text}</p>
            {/* Esquina decorativa */}
            <svg aria-hidden width="12" height="12" viewBox="0 0 12 12" className="absolute right-0 top-3 text-accent">
              <path d="M1 1h10v10" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
        </li>
      ))}
    </ol>
  );
}
