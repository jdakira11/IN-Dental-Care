import Image from "next/image";
import logoHorizontal from "@/assets/images/logo-horizontal.webp";
import logoStacked from "@/assets/images/logo-apilado.webp";

/**
 * Logo del cliente (IN Dental Care). Original en raster con fondo blanco, recortado y con
 * fondo transparente. Sus colores (azul marino) no se leen sobre fondo oscuro: en el pie se
 * muestra la versión apilada sobre una tarjeta blanca.
 */
export function Logo({ variant = "horizontal", className = "" }: { variant?: "horizontal" | "stacked"; className?: string }) {
  if (variant === "stacked") {
    return (
      <span className={`inline-block rounded-2xl bg-white px-5 py-4 ${className}`}>
        <Image src={logoStacked} alt="IN Dental Care" className="h-auto w-40" sizes="160px" />
      </span>
    );
  }
  return <Image src={logoHorizontal} alt="IN Dental Care" priority className={`h-11 w-auto md:h-12 ${className}`} sizes="250px" />;
}
