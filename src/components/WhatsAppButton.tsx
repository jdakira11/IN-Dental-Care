import { WhatsAppIcon } from "./icons";

/** Botón que abre el chat de WhatsApp con un mensaje inicial ya escrito. `digits`: "56912345678". */
export function WhatsAppButton({ digits, message, label = "Escríbenos por WhatsApp", className = "" }: { digits: string; message?: string; label?: string; className?: string }) {
  const href = `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`btn bg-[#1f7a4d] text-white hover:bg-[#17603c] ${className}`}>
      <WhatsAppIcon />
      {label}
    </a>
  );
}
