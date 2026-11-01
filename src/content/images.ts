import type { StaticImageData } from "next/image";
import boxDental from "@/assets/images/box-dental-luminoso.webp";
import drAtWork from "@/assets/images/dr-nunez-atendiendo.webp";
import drPortrait from "@/assets/images/dr-nunez-retrato.webp";
import ttoEndodontics from "@/assets/images/tto-endodoncia.webp";
import ttoAesthetics from "@/assets/images/tto-estetica.webp";
import ttoImplants from "@/assets/images/tto-implantes.webp";
import ttoOrthodontics from "@/assets/images/tto-ortodoncia.webp";
import ttoPeriodontics from "@/assets/images/tto-periodoncia.webp";
import ttoPrevention from "@/assets/images/tto-prevencion.webp";

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
  clinic: {
    src: boxDental,
    alt: "Box dental blanco con sillón gris, monitor y piso de madera clara",
    credit: unsplash("Kari Bjorn Photography", "karibjorn", "Fdku_oMrDvk"),
  },
  ttoImplants: {
    src: ttoImplants,
    alt: "Modelo dental que muestra un implante entre dos dientes naturales",
    credit: unsplash("Jonathan Borba", "jonathanborba", "W9YEY6G8LVM"),
  },
  ttoOrthodontics: {
    src: ttoOrthodontics,
    alt: "Modelo de dientes con brackets metálicos sobre una mesa clara",
    credit: unsplash("Harold Hisona", "harold_angus", "cx3JCL5PDew"),
  },
  ttoAesthetics: {
    src: ttoAesthetics,
    alt: "Primer plano de una sonrisa con dientes blancos y alineados",
    credit: unsplash("Kamal Hoseinianzade", "teravis_sk", "RCQnbyQsnUg"),
  },
  ttoPrevention: {
    src: ttoPrevention,
    alt: "Revisión dental con espejo e instrumento de examen",
    credit: unsplash("Caroline LM", "carocaro1987", "8BkF0sTC6Uo"),
  },
  ttoEndodontics: {
    src: ttoEndodontics,
    alt: "Odontólogo revisando radiografías dentales en un negatoscopio",
    credit: unsplash("Jonathan Borba", "jonathanborba", "v_2FRXEba94"),
  },
  ttoPeriodontics: {
    src: ttoPeriodontics,
    alt: "Mano con guante sosteniendo instrumentos de examen dental",
    credit: unsplash("Katarzyna Zygnerska", "katasha", "98eodnv1abo"),
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
