import Link from "next/link";
import { nav } from "@/content/copy";
import { formatWhatsapp, siteConfig, telLink, whatsappLink } from "@/config/site";
import { Logo } from "./Logo";
import { Instagram, Mail, Phone, WhatsAppIcon } from "./icons";

export function Footer() {
  const { contact, hours, social } = siteConfig;
  return (
    <footer id="pie" className="on-dark bg-deep text-white/80">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:py-20">
        <div>
          <Logo tone="light" />
          <p className="mt-6 max-w-xs text-[0.9375rem] leading-relaxed">
            Odontología particular en {contact.city}, {contact.region}. {siteConfig.yearsOfExperience} años cuidando sonrisas.
          </p>
          {social.instagram && (
            <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="mt-6 inline-grid h-11 w-11 place-items-center rounded-full border border-white/20 transition-colors hover:bg-white/10">
              <Instagram />
            </a>
          )}
        </div>
        <nav aria-label="Pie de página">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-metal">Navegación</h2>
          <ul className="mt-5 space-y-2.5 text-[0.9375rem]">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={`/${item.href}`} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-metal">Contacto</h2>
          <ul className="mt-5 space-y-3 text-[0.9375rem]">
            <li>
              {contact.address}
              <br />
              {contact.city}, {contact.region}
            </li>
            {contact.phone && (
              <li>
                <a href={telLink(contact.phone)} className="inline-flex items-center gap-2 hover:text-white">
                  <Phone width={16} height={16} /> {contact.phone}
                </a>
              </li>
            )}
            {contact.whatsapp && (
              <li>
                <a href={whatsappLink(contact.whatsapp)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white">
                  <WhatsAppIcon width={16} height={16} /> {formatWhatsapp(contact.whatsapp)}
                </a>
              </li>
            )}
            {contact.email && (
              <li>
                <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 break-all hover:text-white">
                  <Mail width={16} height={16} /> {contact.email}
                </a>
              </li>
            )}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-metal">Horario</h2>
          <ul className="mt-5 space-y-3 text-[0.9375rem]">
            {hours.map((h) => (
              <li key={h.days}>
                <span className="block text-white">{h.days}</span>
                {h.time}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-[0.8125rem] text-white/65 md:flex-row md:items-center md:justify-between">
          <p>
            © {siteConfig.name} · {siteConfig.isFictional && "Prototipo de demostración con datos ficticios"}
          </p>
          <ul className="flex gap-5">
            <li>
              <Link href="/privacidad" className="hover:text-white">
                Privacidad
              </Link>
            </li>
            <li>
              <Link href="/creditos" className="hover:text-white">
                Créditos fotográficos
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
