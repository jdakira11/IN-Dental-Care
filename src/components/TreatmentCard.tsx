import Link from "next/link";
import type { Treatment } from "@/content/treatments";
import { ExpandableCard } from "./ExpandableCard";
import { ArrowRight } from "./icons";
import { TreatmentIcon } from "./TreatmentIcon";

/** Tratamiento desplegable: icono + nombre; al abrir, descripción, puntos clave y enlace para agendar. */
export function TreatmentCard({ treatment: t }: { treatment: Treatment }) {
  return (
    <ExpandableCard title={t.name} icon={<TreatmentIcon id={t.id} className="h-11 w-11 md:h-14 md:w-14" />}>
      <p className="text-ink-soft">{t.summary}</p>
      <ul className="mt-5 space-y-2 text-[0.9375rem] text-ink-soft">
        {t.points.map((p) => (
          <li key={p} className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {p}
          </li>
        ))}
      </ul>
      <Link href="#agenda" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
        Agendar evaluación <ArrowRight width={16} height={16} />
      </Link>
    </ExpandableCard>
  );
}
