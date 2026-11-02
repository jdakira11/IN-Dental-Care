import type { Metadata } from "next";
import { Manrope, Outfit } from "next/font/google";
import { FloatingContact } from "@/components/FloatingContact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RevealObserver } from "@/components/RevealObserver";
import { INTRO_SEEN_KEY } from "@/config/intro";
import { getSiteUrl, siteConfig } from "@/config/site";
import "./globals.css";

// Títulos: Outfit (sans geométrica, pedida por el cliente). Texto: Manrope (sans humanista muy legible).
const title = Outfit({ variable: "--font-title-face", subsets: ["latin"] });
const body = Manrope({ variable: "--font-body-face", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: { default: `${siteConfig.name} · ${siteConfig.doctor} · Dentista en Vitacura`, template: `%s · ${siteConfig.name}` },
  description: siteConfig.description,
  openGraph: { type: "website", locale: "es_CL", siteName: siteConfig.name, title: `${siteConfig.name} · Dentista en Vitacura`, description: siteConfig.description },
};

const introGate = `try{if(sessionStorage.getItem("${INTRO_SEEN_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("sin-intro")}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: el script de abajo puede añadir `sin-intro` antes de hidratar.
    <html lang="es-CL" className={`${title.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        {/* Antes del primer pintado: omite la intro si ya se vio en la sesión o con «reducir movimiento». */}
        <script dangerouslySetInnerHTML={{ __html: introGate }} />
      </head>
      <body>
        <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-card focus:px-5 focus:py-3">
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <FloatingContact />
        <RevealObserver />
      </body>
    </html>
  );
}
