import Image, { type StaticImageData } from "next/image";

/**
 * Banda con imagen fija: la página se desliza por encima (efecto parallax).
 * Técnica compatible con móviles (iOS no soporta background-attachment: fixed): contenedor con
 * clip-path y la imagen en position: fixed. Ningún ancestro puede tener `transform`.
 */
export function FixedImageBand({
  image,
  alt,
  children,
  className = "h-[75svh] min-h-[26rem]",
}: {
  image: StaticImageData;
  alt: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative [clip-path:inset(0)] ${className}`} role="img" aria-label={alt}>
      <div className="fixed inset-0">
        <Image src={image} alt="" fill sizes="100vw" placeholder="blur" className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0.3)_0%,rgb(0_0_0/0.05)_40%,rgb(0_0_0/0.7)_100%)]" />
      </div>
      {children && <div className="on-dark relative flex h-full flex-col items-center justify-end pb-12 text-center text-white">{children}</div>}
    </div>
  );
}
