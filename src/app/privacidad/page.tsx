import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  alternates: { canonical: "/privacidad" },
};

export default function PrivacyPage() {
  const { contact } = siteConfig;
  return (
    <LegalPage title="Política de privacidad" notice="Texto provisional de demostración. Debe ser revisado por un profesional antes de publicar la web real; no garantiza el cumplimiento normativo.">
      <p>
        En {siteConfig.name} cuidamos tus datos personales conforme a la Ley N.º 19.628 sobre protección de la vida privada y su reforma por la Ley N.º 21.719, y a
        la Ley N.º 20.584 sobre derechos y deberes de los pacientes.
      </p>
      <h2>Qué datos recogemos</h2>
      <ul>
        <li>Nombre, teléfono y correo electrónico que nos entregas al solicitar una hora.</li>
        <li>Motivo de consulta y horario preferido.</li>
      </ul>
      <p>No solicitamos información clínica a través de la web. Tu ficha clínica se completa únicamente en la consulta.</p>
      <h2>Para qué los usamos</h2>
      <p>Solo para contactarte y coordinar tu atención. No vendemos ni cedemos tus datos a terceros.</p>
      <h2>Tus derechos</h2>
      <p>
        Puedes solicitar acceso, rectificación, supresión u oposición al tratamiento de tus datos escribiendo a{" "}
        {contact.email ? <a href={`mailto:${contact.email}`}>{contact.email}</a> : "nuestro correo de contacto"}.
      </p>
    </LegalPage>
  );
}
