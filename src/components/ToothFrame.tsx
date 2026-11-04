import Image, { type StaticImageData } from "next/image";
import { useId } from "react";

/** Silueta de diente en unidades 0–1 (clipPathUnits="objectBoundingBox"): se adapta a cualquier tamaño. */
const TOOTH_PATH =
  "M0.24,0.01 C0.09,0.01 0,0.12 0,0.26 C0,0.38 0.05,0.47 0.08,0.57 C0.12,0.72 0.13,0.87 0.21,0.97 C0.25,1.01 0.31,1 0.33,0.95 L0.39,0.75 C0.41,0.69 0.45,0.67 0.5,0.67 C0.55,0.67 0.59,0.69 0.61,0.75 L0.67,0.95 C0.69,1 0.75,1.01 0.79,0.97 C0.87,0.87 0.88,0.72 0.92,0.57 C0.95,0.47 1,0.38 1,0.26 C1,0.12 0.91,0.01 0.76,0.01 C0.65,0.01 0.6,0.07 0.5,0.07 C0.4,0.07 0.35,0.01 0.24,0.01 Z";

/** Posición de la foto respecto al marco, en % del ancho/alto del marco (puede salirse de él). */
export interface PhotoBox {
  left: number;
  top: number;
  width: number;
  height: number;
}

/**
 * Foto recortada con forma de diente, con contorno de acento y un segundo trazo exterior.
 * Con `cutout` (misma foto, solo la cabeza con fondo transparente) la cabeza se pinta encima sin
 * recortar y sobresale por arriba del diente: efecto «pop-out».
 */
export function ToothFrame({ image, cutout, box, alt, sizes, priority = false, className = "" }: { image: StaticImageData; cutout?: StaticImageData; box: PhotoBox; alt: string; sizes: string; priority?: boolean; className?: string }) {
  const clipId = useId().replace(/:/g, "");
  const boxStyle = { left: `${box.left}%`, top: `${box.top}%`, width: `${box.width}%`, height: `${box.height}%` };
  return (
    <div className={`relative aspect-[10/11] ${className}`}>
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={TOOTH_PATH} />
          </clipPath>
        </defs>
      </svg>
      <div className="absolute inset-0 bg-sage" style={{ clipPath: `url(#${clipId})` }}>
        <div className="absolute" style={boxStyle}>
          <Image src={image} alt={alt} fill sizes={sizes} priority={priority} placeholder="blur" className="object-cover" />
        </div>
      </div>
      <svg viewBox="0 0 1 1" preserveAspectRatio="none" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
        <path d={TOOTH_PATH} fill="none" className="stroke-accent" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
        <path d={TOOTH_PATH} fill="none" className="stroke-sage-mid" strokeWidth="1.5" vectorEffect="non-scaling-stroke" transform="translate(-0.035 -0.03) scale(1.07 1.06)" />
      </svg>
      {cutout && (
        <div aria-hidden className="pointer-events-none absolute" style={boxStyle}>
          <Image src={cutout} alt="" fill sizes={sizes} priority={priority} className="object-cover" />
        </div>
      )}
    </div>
  );
}
