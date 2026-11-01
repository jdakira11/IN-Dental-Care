/**
 * Iconos planos de cada tratamiento (dibujo propio, viewBox 64×64, sin trazos: solo rellenos
 * con los tokens de la marca). La clave coincide con el `id` de `src/content/treatments.ts`.
 */
const TOOTH =
  "M20 9C13 9 9 14.5 9 21c0 5.5 2.2 9.6 3.4 14.6 1.7 6.9 2.3 14.4 6.2 20 1.5 2.1 4.4 1.7 5.2-.9l2.8-11.1c.8-2.8 3.4-3.9 5.4-3.9s4.6 1.1 5.4 3.9l2.8 11.1c.8 2.6 3.7 3 5.2.9 3.9-5.6 4.5-13.1 6.2-20C52.8 30.6 55 26.5 55 21 55 14.5 51 9 44 9c-5 0-7.6 2.8-12 2.8S25 9 20 9z";

const sparkle = (cx: number, cy: number, r: number) => `M${cx} ${cy - r}Q${cx} ${cy} ${cx + r} ${cy}Q${cx} ${cy} ${cx} ${cy + r}Q${cx} ${cy} ${cx - r} ${cy}Q${cx} ${cy} ${cx} ${cy - r}Z`;

const icons: Record<string, React.ReactNode> = {
  implantes: (
    <>
      <path className="fill-white" d="M18 6c-6.5 0-10 5-10 10.5 0 4.2 1.4 7.4 2.4 11.5h43.2c1-4.1 2.4-7.3 2.4-11.5C56 11 52.5 6 46 6c-5 0-8.6 2.6-14 2.6S23 6 18 6z" />
      <rect className="fill-sage-mid" x="25" y="28" width="14" height="6" rx="1.5" />
      <path className="fill-accent" d="M23 35h18l-2.4 19.5L32 60l-6.6-5.5z" />
      <path className="fill-deep" d="M23.6 40h16.8l-.4 3H24zm.9 7h15l-.4 3H24.9zm1 7h13l-1.6 2.6h-9.8z" opacity=".55" />
    </>
  ),
  rehabilitacion: (
    <>
      <path className="fill-white" d={TOOTH} />
      <path className="fill-accent" d="M20 9C13 9 9 14.5 9 21c0 3 .6 5.6 1.4 8.2 7 2.4 14.3 3.4 21.6 3.4s14.6-1 21.6-3.4c.8-2.6 1.4-5.2 1.4-8.2C55 14.5 51 9 44 9c-5 0-7.6 2.8-12 2.8S25 9 20 9z" />
      <rect className="fill-white" x="15" y="15" width="9" height="4" rx="2" opacity=".45" />
    </>
  ),
  estetica: (
    <>
      <path className="fill-white" d={TOOTH} transform="translate(4 6) scale(.875)" />
      <rect className="fill-sage-mid" x="15" y="19" width="5" height="11" rx="2.5" />
      <path className="fill-accent" d={sparkle(53, 11, 8)} />
      <path className="fill-deep" d={sparkle(8, 52, 5)} opacity=".7" />
      <path className="fill-accent" d={sparkle(57, 30, 3.5)} />
    </>
  ),
  ortodoncia: (
    <>
      <path className="fill-white" d={TOOTH} transform="translate(-3.5 13) scale(.58)" />
      <path className="fill-white" d={TOOTH} transform="translate(30 13) scale(.58)" />
      <rect className="fill-deep" x="2" y="26.3" width="60" height="2.4" rx="1.2" />
      <rect className="fill-accent" x="9.6" y="22.5" width="11" height="10" rx="2.2" />
      <rect className="fill-accent" x="43.1" y="22.5" width="11" height="10" rx="2.2" />
      <rect className="fill-white" x="13.1" y="26.1" width="4" height="2.8" rx=".8" opacity=".6" />
      <rect className="fill-white" x="46.6" y="26.1" width="4" height="2.8" rx=".8" opacity=".6" />
    </>
  ),
  endodoncia: (
    <>
      <path className="fill-white" d={TOOTH} />
      <path className="fill-accent" d="M23 23c0-3.4 4-5.6 9-5.6s9 2.2 9 5.6c0 3.3-2.2 5.6-3.3 8.8L35.6 53h-1.8L32 37.5 30.2 53h-1.8l-2.1-21.2C25.2 28.6 23 26.3 23 23z" />
      <circle className="fill-sage-mid" cx="32" cy="23" r="2.6" />
    </>
  ),
  prevencion: (
    <>
      <path className="fill-accent" d="M32 5l21 7.4V27c0 13.6-8.9 24-21 29.4C19.9 51 11 40.6 11 27V12.4z" />
      <path className="fill-sage-mid" d="M32 5l21 7.4V27c0 13.6-8.9 24-21 29.4z" opacity=".25" />
      <path className="fill-white" d={TOOTH} transform="translate(17.6 17) scale(.45)" />
    </>
  ),
};

export function TreatmentIcon({ id, className = "" }: { id: string; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
      {icons[id]}
    </svg>
  );
}
