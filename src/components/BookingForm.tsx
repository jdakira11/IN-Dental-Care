"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig, whatsappLink } from "@/config/site";
import { booking } from "@/content/copy";
import { treatments } from "@/content/treatments";
import { Check, WhatsAppIcon } from "./icons";

type Fields = { name: string; phone: string; email: string; reason: string; slot: string; consent: boolean };
type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = { name: "", phone: "", email: "", reason: "", slot: "", consent: false };
const reasons = ["Evaluación general", ...treatments.map((t) => t.name), "Urgencia"];
const slots = ["Mañana", "Tarde", "Sábado"];

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 3) e.name = "Escribe tu nombre y apellido.";
  if (f.phone.replace(/\D/g, "").length < 8) e.phone = "Ingresa un teléfono válido, p. ej. +56 9 1234 5678.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "Ingresa un correo válido.";
  if (!f.reason) e.reason = "Elige un motivo de consulta.";
  if (!f.slot) e.slot = "Elige un horario preferido.";
  if (!f.consent) e.consent = "Necesitamos tu autorización para contactarte.";
  return e;
}

const inputCls = "mt-2 w-full rounded-xl border border-line bg-card px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-ink-mute/70 focus:border-accent aria-[invalid=true]:border-[#b4472f]";

export function BookingForm() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<Fields | null>(null);

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const e = validate(fields);
    setErrors(e);
    const firstKey = Object.keys(e)[0];
    if (firstKey) {
      ev.currentTarget.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }
    setSent(fields);
  };

  if (sent) {
    return (
      <div role="status" className="rounded-3xl border border-line bg-card p-8 md:p-10">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-sage text-accent">
          <Check />
        </span>
        <h3 className="mt-6 font-title text-3xl">Solicitud de prueba registrada</h3>
        <p className="mt-3 text-ink-soft">
          Gracias, {sent.name.split(" ")[0]}. En la web real, te contactaríamos al {sent.phone} para confirmar una hora de {sent.slot.toLowerCase()} para «{sent.reason}».
        </p>
        <p className="mt-5 rounded-xl border border-dashed border-accent/50 bg-paper-2 px-4 py-3 text-sm text-ink-soft">Vista previa: no se ha enviado ningún dato ni se ha reservado una hora.</p>
        <button
          type="button"
          className="btn btn-ghost mt-8"
          onClick={() => {
            setFields(empty);
            setSent(null);
          }}
        >
          Nueva solicitud
        </button>
      </div>
    );
  }

  const err = (k: keyof Fields) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-1.5 text-sm text-[#a33f29]">
        {errors[k]}
      </p>
    ) : null;
  const a11y = (k: keyof Fields) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-error` : undefined });

  return (
    <form noValidate onSubmit={onSubmit} className="rounded-3xl border border-line bg-card p-6 md:p-10">
      <p className="notice-tag text-accent">Vista previa: no se envía nada</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium sm:col-span-2">
          Nombre y apellido
          <input name="name" autoComplete="name" className={inputCls} value={fields.name} onChange={(e) => set("name", e.target.value)} {...a11y("name")} />
          {err("name")}
        </label>
        <label className="block text-sm font-medium">
          Teléfono
          <input name="phone" type="tel" autoComplete="tel" placeholder="+56 9 1234 5678" className={inputCls} value={fields.phone} onChange={(e) => set("phone", e.target.value)} {...a11y("phone")} />
          {err("phone")}
        </label>
        <label className="block text-sm font-medium">
          Correo electrónico
          <input name="email" type="email" autoComplete="email" className={inputCls} value={fields.email} onChange={(e) => set("email", e.target.value)} {...a11y("email")} />
          {err("email")}
        </label>
        <label className="block text-sm font-medium sm:col-span-2">
          Motivo de consulta
          <select name="reason" className={inputCls} value={fields.reason} onChange={(e) => set("reason", e.target.value)} {...a11y("reason")}>
            <option value="">Selecciona una opción</option>
            {reasons.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
          {err("reason")}
        </label>
        <fieldset className="sm:col-span-2" {...a11y("slot")}>
          <legend className="text-sm font-medium">Horario preferido</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {slots.map((s) => (
              <label key={s} className={`cursor-pointer rounded-full border px-5 py-2.5 text-sm transition-colors has-focus-visible:outline-2 has-focus-visible:outline-accent ${fields.slot === s ? "border-accent bg-accent text-white" : "border-line bg-paper hover:border-accent"}`}>
                <input type="radio" name="slot" value={s} className="sr-only" checked={fields.slot === s} onChange={() => set("slot", s)} />
                {s}
              </label>
            ))}
          </div>
          {err("slot")}
        </fieldset>
      </div>
      <p className="mt-6 text-sm text-ink-mute">{booking.privacyNote}</p>
      <label className="mt-5 flex items-start gap-3 text-sm text-ink-soft">
        <input name="consent" type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-accent)]" checked={fields.consent} onChange={(e) => set("consent", e.target.checked)} {...a11y("consent")} />
        <span>
          Autorizo que me contacten para coordinar mi hora, según la{" "}
          <Link href="/privacidad" className="text-accent underline underline-offset-4">
            política de privacidad
          </Link>
          .
        </span>
      </label>
      {err("consent")}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button type="submit" className="btn btn-primary">
          Solicitar hora
        </button>
        {siteConfig.contact.whatsapp && (
          <a href={whatsappLink(siteConfig.contact.whatsapp, "Hola, quisiera agendar una hora con el Dr. Núñez.")} target="_blank" rel="noopener noreferrer" className="btn btn-ghost text-ink">
            <WhatsAppIcon /> Prefiero WhatsApp
          </a>
        )}
      </div>
    </form>
  );
}
