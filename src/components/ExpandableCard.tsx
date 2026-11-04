"use client";

import { useId, useState } from "react";
import { Plus } from "./icons";

/**
 * Tarjeta desplegable: icono + título siempre visibles; un clic abre el detalle y otro lo cierra.
 * La altura se anima con grid-template-rows (0fr → 1fr); cerrada, el contenido queda `inert`.
 * La usan Tratamientos y Previsión y pagos.
 */
export function ExpandableCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className={`group rounded-3xl border bg-card transition-[border-color,box-shadow] duration-300 ${open ? "border-accent/40 shadow-xl shadow-ink/5" : "border-line hover:border-accent/40"}`}>
      <h3>
        <button type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((v) => !v)} className="flex w-full items-center gap-5 rounded-3xl p-5 text-left md:p-6">
          <span className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl transition-colors duration-300 md:h-20 md:w-20 ${open ? "bg-sage" : "bg-paper-2 group-hover:bg-sage"}`}>{icon}</span>
          <span className="flex-1 font-title text-[1.4rem] leading-tight md:text-[1.6rem]">{title}</span>
          <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color,color] duration-300 ${open ? "rotate-45 border-accent bg-accent text-white" : "border-line text-accent"}`}>
            <Plus width={18} height={18} />
          </span>
        </button>
      </h3>
      <div id={panelId} role="region" aria-label={title} inert={!open} className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-soft)] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <div className={`px-5 pb-7 transition-opacity duration-500 md:px-6 ${open ? "opacity-100" : "opacity-0"}`}>
            <div className="border-t border-line pt-5">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
