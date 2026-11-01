/** Encabezado centrado común a todas las secciones: emblema opcional, antetítulo, título y entradilla. */
export function SectionHeader({
  id,
  eyebrow,
  title,
  intro,
  emblem,
  tag,
  className = "",
}: {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** Logo o motivo gráfico pequeño sobre el antetítulo. */
  emblem?: React.ReactNode;
  /** Etiqueta opcional, p. ej. «Contenido provisional». */
  tag?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={`mx-auto flex max-w-5xl flex-col items-center text-center ${className}`}>
      {emblem && <div data-reveal>{emblem}</div>}
      <p className="eyebrow mt-5" data-reveal>
        {eyebrow}
      </p>
      {tag && (
        <div className="mt-4" data-reveal>
          {tag}
        </div>
      )}
      <h2 id={id} className="display-lg mt-5" data-reveal>
        {title}
      </h2>
      {intro && (
        <div className="mt-5 max-w-2xl text-lg leading-relaxed opacity-80" data-reveal>
          {intro}
        </div>
      )}
    </header>
  );
}
