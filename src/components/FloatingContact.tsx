"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig, whatsappLink } from "@/config/site";
import { WhatsAppIcon } from "./icons";

const message = "Hola, quisiera agendar una hora con el Dr. Núñez.";

/**
 * Contacto flotante. Móvil: barra con «Agendar hora» + WhatsApp que aparece tras la portada y se
 * oculta sobre el formulario y el pie. Escritorio: botón redondo de WhatsApp.
 */
export function FloatingContact() {
  const [pastHero, setPastHero] = useState(false);
  const [overTarget, setOverTarget] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const targets = ["agenda", "pie"].map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const visible = new Set<Element>();
    const heroObserver = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting), { threshold: 0.15 });
    const targetObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      setOverTarget(visible.size > 0);
    });
    if (hero) heroObserver.observe(hero);
    // Fuera de la portada (páginas legales) no hay hero: la barra se muestra desde el inicio.
    else requestAnimationFrame(() => setPastHero(true));
    targets.forEach((t) => targetObserver.observe(t));
    return () => {
      heroObserver.disconnect();
      targetObserver.disconnect();
    };
  }, []);

  const wa = siteConfig.contact.whatsapp;
  const showBar = pastHero && !overTarget;

  return (
    <>
      {wa && (
        <a href={whatsappLink(wa, message)} target="_blank" rel="noopener noreferrer" aria-label="Escríbenos por WhatsApp" className={`fixed bottom-6 right-6 z-30 hidden h-14 w-14 place-items-center rounded-full bg-[#1f7a4d] text-white shadow-lg shadow-black/15 transition-[transform,opacity] duration-300 hover:scale-105 md:grid ${overTarget ? "pointer-events-none opacity-0" : ""}`}>
          <WhatsAppIcon width={26} height={26} />
        </a>
      )}
      <div aria-hidden={!showBar} inert={!showBar} className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 p-3 backdrop-blur-md transition-transform duration-300 md:hidden ${showBar ? "translate-y-0" : "translate-y-full"}`}>
        <div className="flex gap-2">
          <Link href="/#agenda" className="btn btn-primary flex-1">
            Agendar hora
          </Link>
          {wa && (
            <a href={whatsappLink(wa, message)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="btn bg-[#1f7a4d] px-4 text-white">
              <WhatsAppIcon />
            </a>
          )}
        </div>
      </div>
    </>
  );
}
