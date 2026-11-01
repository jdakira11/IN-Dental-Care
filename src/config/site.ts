/**
 * Datos del negocio — fuente única de verdad.
 * Proyecto FICTICIO de portafolio: dirección, teléfonos y credenciales son verosímiles pero
 * inventados. Si el proyecto pasa a ser real, sustitúyelos o déjalos en `null` («Pendiente»).
 */
export type SocialNetwork = "instagram" | "facebook" | "tiktok" | "linkedin" | "youtube";

export const siteConfig = {
  name: "IN Dental Care",
  doctor: "Dr. Ignacio Núñez",
  tagline: "Odontología particular en Vitacura",
  description:
    "Consulta odontológica particular del Dr. Ignacio Núñez en Vitacura. 20 años de experiencia en implantes, rehabilitación oral, estética y ortodoncia.",
  locale: "es-CL",
  currency: "CLP",
  url: "http://localhost:3000", // se sobrescribe con NEXT_PUBLIC_SITE_URL al publicar
  isFictional: true,
  yearsOfExperience: 20,
  contact: {
    address: "Av. Vitacura 5480, oficina 304" as string | null,
    city: "Vitacura" as string | null,
    region: "Región Metropolitana" as string | null,
    country: "Chile" as string | null,
    phone: "+56 2 2945 1180" as string | null,
    whatsapp: "56912345678" as string | null,
    email: "agenda@indentalcare.cl" as string | null,
    mapEmbedUrl: "https://www.google.com/maps?q=Vitacura,+Regi%C3%B3n+Metropolitana,+Chile&z=14&output=embed" as string | null,
    reference: "A pasos de metro Manquehue (5 min en auto) · Estacionamiento para pacientes",
  },
  hours: [
    { days: "Lunes a jueves", time: "09:00 – 19:30" },
    { days: "Viernes", time: "09:00 – 17:00" },
    { days: "Sábado", time: "09:30 – 13:30 (horas seleccionadas)" },
  ],
  social: {
    instagram: "https://instagram.com/",
  } as Partial<Record<SocialNetwork, string>>,
  /** Muestra etiquetas de «contenido provisional» mientras falte material real. */
  showContentNotices: true,
};

export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url).replace(/\/$/, "");
}

/** "56912345678" → "+56 9 1234 5678" (Chile); otros países: "+<dígitos>". */
export function formatWhatsapp(digits: string): string {
  const cl = digits.match(/^56(9)(\d{4})(\d{4})$/);
  return cl ? `+56 ${cl[1]} ${cl[2]} ${cl[3]}` : `+${digits}`;
}

export function whatsappLink(digits: string, message?: string): string {
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

export function telLink(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
