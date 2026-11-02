/**
 * Ilustraciones planas de «Previsión y pagos» (dibujo propio, viewBox 120×90, solo rellenos con
 * los tokens de la marca). La clave coincide con el `id` de `coverage.items` en copy.ts.
 */
const TOOTH =
  "M20 9C13 9 9 14.5 9 21c0 5.5 2.2 9.6 3.4 14.6 1.7 6.9 2.3 14.4 6.2 20 1.5 2.1 4.4 1.7 5.2-.9l2.8-11.1c.8-2.8 3.4-3.9 5.4-3.9s4.6 1.1 5.4 3.9l2.8 11.1c.8 2.6 3.7 3 5.2.9 3.9-5.6 4.5-13.1 6.2-20C52.8 30.6 55 26.5 55 21 55 14.5 51 9 44 9c-5 0-7.6 2.8-12 2.8S25 9 20 9z";

const illustrations: Record<string, React.ReactNode> = {
  // Boleta con detalle de prestaciones + moneda con flecha de devolución
  reembolso: (
    <>
      <path className="fill-white" d="M30 12h44v60l-5.5-4.4-5.5 4.4-5.5-4.4-5.5 4.4-5.5-4.4-5.5 4.4-5.5-4.4L30 72z" />
      <rect className="fill-accent" x="36" y="19" width="16" height="4" rx="2" />
      <rect className="fill-sage-mid" x="36" y="29" width="32" height="3" rx="1.5" />
      <rect className="fill-sage-mid" x="36" y="36" width="26" height="3" rx="1.5" />
      <rect className="fill-sage-mid" x="36" y="43" width="29" height="3" rx="1.5" />
      <rect className="fill-deep" x="36" y="54" width="14" height="4" rx="2" opacity=".75" />
      <rect className="fill-accent" x="56" y="54" width="12" height="4" rx="2" />
      <circle className="fill-accent" cx="84" cy="58" r="16" />
      <circle className="fill-sage-mid" cx="84" cy="58" r="11.5" opacity=".35" />
      <path d="M78 58a6 6 0 1 0 6-6" fill="none" stroke="white" strokeWidth="2.6" strokeLinecap="round" />
      <path className="fill-white" d="M84 47.5l5 4.5-5 4.5z" />
    </>
  ),
  // Paraguas que protege un diente
  seguros: (
    <>
      <path className="fill-accent" d="M24 44C24 26 40 13 60 13s36 13 36 31c-3.8-4.2-10.2-4.2-14 0-3.8-4.2-10.2-4.2-14 0-3.8-4.2-10.2-4.2-14 0-3.8-4.2-10.2-4.2-14 0-3.8-4.2-10.2-4.2-14 0z" />
      <path className="fill-sage-mid" d="M60 13c-7 5.5-10 17-10 31-1.4-1.6-3-2.4-4-2.6C46.4 28 52 18 60 13z" opacity=".55" />
      <circle className="fill-deep" cx="60" cy="12" r="2.6" />
      <rect className="fill-deep" x="58.7" y="44" width="2.6" height="25" rx="1.3" />
      <path d="M60 68c0 5-7 5-7 0" fill="none" className="stroke-deep" strokeWidth="2.6" strokeLinecap="round" />
      <path className="fill-white" d={TOOTH} transform="translate(65 47) scale(.42)" />
    </>
  ),
  // Tarjeta de pago + calendario de cuotas
  cuotas: (
    <>
      <rect className="fill-accent" x="16" y="18" width="62" height="40" rx="6" />
      <rect className="fill-deep" x="16" y="27" width="62" height="7" />
      <rect className="fill-sage-mid" x="24" y="40" width="11" height="8" rx="2" />
      <rect className="fill-white" x="24" y="51" width="22" height="2.6" rx="1.3" opacity=".6" />
      <rect className="fill-white" x="64" y="40" width="34" height="34" rx="5" />
      <rect className="fill-deep" x="64" y="40" width="34" height="8" rx="4" />
      <rect className="fill-deep" x="64" y="44" width="34" height="4" />
      {[0, 1, 2].map((col) =>
        [0, 1].map((row) => (
          <rect key={`${col}-${row}`} className={col === 0 && row === 0 ? "fill-accent" : "fill-sage-mid"} x={69 + col * 9.5} y={52 + row * 9.5} width="6.5" height="6.5" rx="1.5" opacity={col === 0 && row === 0 ? 1 : 0.55} />
        )),
      )}
    </>
  ),
  // Portapapeles con lista revisada + lápiz
  presupuesto: (
    <>
      <rect className="fill-accent" x="34" y="12" width="46" height="66" rx="6" />
      <rect className="fill-white" x="39" y="19" width="36" height="54" rx="3" />
      <rect className="fill-deep" x="47" y="8" width="20" height="9" rx="3.5" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle className="fill-accent" cx="46" cy={31 + i * 12} r="3.6" />
          <path d={`M44.3 ${31 + i * 12}l1.3 1.3 2.4-2.6`} fill="none" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          <rect className="fill-sage-mid" x="53" y={29.6 + i * 12} width={i === 1 ? 14 : 18} height="2.8" rx="1.4" />
        </g>
      ))}
      <rect className="fill-deep" x="53" y="63" width="12" height="3.4" rx="1.7" opacity=".75" />
      <g transform="rotate(35 92 46)">
        <rect className="fill-deep" x="88" y="22" width="8" height="40" rx="2" />
        <rect className="fill-sage-mid" x="88" y="22" width="8" height="6" rx="2" />
        <path className="fill-white" d="M88 62h8l-4 9z" />
        <path className="fill-deep" d="M90.6 67.8h2.8L92 71z" />
      </g>
    </>
  ),
};

export function CoverageIllustration({ id, className = "" }: { id: string; className?: string }) {
  return (
    <svg viewBox="0 0 120 90" aria-hidden className={className}>
      {illustrations[id]}
    </svg>
  );
}
