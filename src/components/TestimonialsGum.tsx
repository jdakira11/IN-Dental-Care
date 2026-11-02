import { testimonials } from "@/content/testimonials";
import { Star } from "./icons";

/**
 * Opiniones como una arcada superior: una encía continua de la que cuelgan los dientes, con una
 * opinión dentro de cada uno. Las ranuras van pegadas (sin hueco) para que la encía no se corte;
 * la separación entre dientes la da el margen interior de cada diente.
 * Las formas son SVG estirados (preserveAspectRatio="none"), así se adaptan al largo del texto.
 */

// Borde inferior de la encía en cada ranura: arco sobre el diente y papila en punta entre dientes.
const GUM_SCALLOP = "M0 0H100V44C97 50 93 42 88 28C80 8 20 8 12 28C7 42 3 50 0 44Z";
// Corona del diente (la raíz queda oculta bajo la encía); dos cúspides suaves abajo.
const CROWN = "M7 0H93C97 30 99 58 95 80C93 92 85 99 75 99C67 99 60 94 50 94S33 99 25 99C15 99 7 92 5 80C1 58 3 30 7 0Z";
// Sombra lateral para dar volumen
const CROWN_SHADE = "M93 0C97 30 99 58 95 80C93 92 85 99 75 99C82 94 87 84 88 70C90 48 90 22 86 0Z";

export function TestimonialsGum() {
  return (
    <div className="no-scrollbar -mx-5 mt-14 overflow-x-auto px-5 pb-4 lg:mx-0 lg:overflow-visible lg:px-0">
      <ul className="relative flex w-max snap-x snap-mandatory lg:grid lg:w-full lg:grid-cols-4">
        {/* Encía continua detrás de las ranuras: degradado de arriba (más profundo) hacia el borde */}
        <span aria-hidden className="absolute inset-x-0 top-0 z-10 h-16 rounded-t-[2.5rem] bg-[linear-gradient(180deg,var(--color-gum-deep),var(--color-gum)_85%)]" />
        {testimonials.map((t, i) => (
          <li key={t.name} className="relative flex w-[78vw] max-w-[19rem] shrink-0 snap-center flex-col lg:w-auto lg:max-w-none" data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}>
            <svg aria-hidden viewBox="0 0 100 56" preserveAspectRatio="none" className="absolute inset-x-0 top-[3.9rem] z-10 h-[4.5rem] w-full">
              {/* Reborde más oscuro bajo el festoneado para dar volumen */}
              <path d={GUM_SCALLOP} className="fill-gum-deep" transform="translate(0 5)" />
              <path d={GUM_SCALLOP} className="fill-gum" />
            </svg>
            <figure className="relative mx-1.5 mt-12 flex-1 px-7 pb-16 pt-16 text-ink md:px-8">
              <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                <path d={CROWN} className="fill-ivory" />
                <path d={CROWN_SHADE} className="fill-ivory-shade" />
              </svg>
              <div className="relative">
                <div className="flex gap-1 text-accent" aria-label="5 de 5 estrellas">
                  {Array.from({ length: 5 }, (_, s) => (
                    <Star key={s} width={14} height={14} />
                  ))}
                </div>
                <blockquote className="mt-4 text-[0.9375rem] leading-relaxed text-ink-soft">«{t.text}»</blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="block font-semibold text-ink">{t.name}</span>
                  <span className="text-ink-mute">{t.treatment}</span>
                </figcaption>
              </div>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
