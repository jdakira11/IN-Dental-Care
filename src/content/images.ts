import type { StaticImageData } from "next/image";
import boxDental from "@/assets/images/box-dental-luminoso.webp";
import drAtWork from "@/assets/images/dr-nunez-atendiendo.webp";
import drHead from "@/assets/images/dr-nunez-cabeza.webp";
import drPortrait from "@/assets/images/dr-nunez-retrato.webp";

/**
 * Registro de imágenes. «hero» y «doctor» son fotos entregadas por el cliente (credit: null).
 * El resto proceden de Unsplash (licencia Unsplash: uso comercial gratuito,
 * sin atribución obligatoria; no se permite revenderlas sin modificar ni recopilarlas para
 * crear un servicio similar). Se verificó en la página de cada foto que NO eran «Unsplash+».
 *
 * ⚠️ Las de Unsplash son ILUSTRATIVAS: no muestran al Dr. Núñez, su equipo ni su consulta.
 * Sustitúyelas por fotografía propia cuando esté disponible (mismo nombre de clave).
 */
export interface SiteImage {
  src: StaticImageData;
  alt: string;
  /** null = foto propia del cliente (no se etiqueta como ilustrativa ni aparece en créditos). */
  credit: { author: string; profile: string; source: string } | null;
}

const unsplash = (author: string, handle: string, photoId: string) => ({
  author,
  profile: `https://unsplash.com/@${handle}`,
  source: `https://unsplash.com/photos/${photoId}`,
});

export const images = {
  hero: {
    src: drAtWork,
    alt: "El Dr. Ignacio Núñez revisa los dientes de una paciente en su consulta",
    credit: null,
  },
  doctor: {
    src: drPortrait,
    alt: "Retrato del Dr. Ignacio Núñez con delantal blanco y los brazos cruzados en su consulta",
    credit: null,
  },
  /** Solo la cabeza del retrato, fondo transparente (recorte propio): sobresale del marco de diente. */
  doctorHead: {
    src: drHead,
    alt: "",
    credit: null,
  },
  clinic: {
    src: boxDental,
    alt: "Box dental blanco con sillón gris, monitor y piso de madera clara",
    credit: unsplash("Kari Bjorn Photography", "karibjorn", "Fdku_oMrDvk"),
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
