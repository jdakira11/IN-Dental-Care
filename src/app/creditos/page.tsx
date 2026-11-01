import type { Metadata } from "next";
import Image from "next/image";
import { LegalPage } from "@/components/LegalPage";
import { images } from "@/content/images";

export const metadata: Metadata = {
  title: "Créditos fotográficos",
  alternates: { canonical: "/creditos" },
};

export default function CreditsPage() {
  return (
    <LegalPage title="Créditos fotográficos">
      <p>
        Las fotografías de esta web son imágenes ilustrativas publicadas en{" "}
        <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">
          Unsplash
        </a>{" "}
        bajo la{" "}
        <a href="https://unsplash.com/license" target="_blank" rel="noopener noreferrer">
          licencia de Unsplash
        </a>
        . No muestran al Dr. Núñez, a su equipo ni su consulta (salvo sus retratos, que son fotografías propias). Gracias a sus autores:
      </p>
      <ul className="!mt-8 grid gap-4 sm:grid-cols-2">
        {Object.entries(images).flatMap(([key, img]) => (!img.credit ? [] : [{ key, img, credit: img.credit }])).map(({ key, img, credit }) => (
          <li key={key} className="!ml-0 flex !list-none items-center gap-4">
            <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-sage">
              <Image src={img.src} alt="" fill sizes="64px" className="object-cover" />
            </span>
            <span className="text-[0.9375rem]">
              <a href={credit.source} target="_blank" rel="noopener noreferrer">
                Foto
              </a>{" "}
              de{" "}
              <a href={credit.profile} target="_blank" rel="noopener noreferrer">
                {credit.author}
              </a>
            </span>
          </li>
        ))}
      </ul>
    </LegalPage>
  );
}
