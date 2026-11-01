import Image from "next/image";
import Link from "next/link";
import { BookingForm } from "@/components/BookingForm";
import { FixedImageBand } from "@/components/FixedImageBand";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { ArrowRight, Calendar, Check, Clock, Mail, MapPin, Phone, Plus, Shield, Star, Tooth } from "@/components/icons";
import { SectionHeader } from "@/components/SectionHeader";
import { siteConfig, telLink } from "@/config/site";
import { band, booking, coverage, doctor, faq, firstVisit, hero } from "@/content/copy";
import { images } from "@/content/images";
import { testimonials } from "@/content/testimonials";
import { treatments } from "@/content/treatments";

export default function HomePage() {
  const { contact, hours } = siteConfig;
  return (
    <>
      {/* ── Portada ── */}
      <section id="inicio" aria-labelledby="titulo-portada" className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top_left,var(--color-paper-2),var(--color-paper)_60%)] pb-16 pt-28 md:pb-24 md:pt-36">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-1.5 text-[0.8125rem] font-medium text-ink-soft">
              <span className="h-2 w-2 rounded-full bg-accent" />
              {hero.eyebrow}
            </p>
            <h1 id="titulo-portada" className="display-xl mt-6 max-w-[12ch] text-[clamp(2.9rem,7vw,5.6rem)]">
              {hero.title.before}
              <em className="text-accent">{hero.title.highlight}</em>
              {hero.title.after}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">{hero.intro}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="#agenda" className="btn btn-primary">
                <Calendar /> Agendar hora
              </Link>
              <Link href="#tratamientos" className="btn btn-ghost">
                Ver tratamientos
              </Link>
            </div>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-8">
              {hero.stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-title text-4xl text-ink md:text-5xl">{s.value}</dd>
                  <dd className="mt-1 text-[0.8125rem] leading-snug text-ink-mute">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/3.4] overflow-hidden rounded-[2rem] lg:aspect-[5/4.6]">
              <Image src={images.hero.src} alt={images.hero.alt} fill priority fetchPriority="high" sizes="(min-width: 1024px) 45vw, 100vw" placeholder="blur" className="object-cover object-[45%_center]" />
            </div>
            <div className="absolute -bottom-6 left-4 right-4 flex items-center gap-4 rounded-2xl border border-line bg-card/95 p-4 shadow-xl shadow-ink/5 backdrop-blur sm:left-auto sm:right-6 sm:w-80 lg:-left-10 lg:right-auto">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sage text-accent">
                <Shield />
              </span>
              <p className="text-sm leading-snug text-ink-soft">
                <strong className="block text-ink">Un solo tratante</strong>
                El Dr. Núñez te atiende en cada etapa de tu tratamiento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── El doctor ── */}
      <section id="doctor" aria-labelledby="titulo-doctor" className="overflow-x-clip py-24 md:py-32">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="relative mx-auto w-full max-w-md lg:max-w-none" data-reveal>
            <div className="absolute -inset-2 -z-10 translate-x-3 translate-y-3 rounded-[2rem] md:-inset-3 md:translate-x-6 md:translate-y-6 bg-sage" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image src={images.doctor.src} alt={images.doctor.alt} fill sizes="(min-width: 1024px) 40vw, 90vw" placeholder="blur" className="object-cover object-[42%_center]" />
            </div>
          </div>
          <div>
            <p className="eyebrow" data-reveal>
              {doctor.eyebrow}
            </p>
            <h2 id="titulo-doctor" className="display-lg mt-5" data-reveal>
              {doctor.title}
            </h2>
            <p className="mt-3 font-medium text-accent" data-reveal>
              {doctor.role}
            </p>
            <div className="mt-6 space-y-4 text-[1.0625rem] leading-relaxed text-ink-soft" data-reveal>
              {doctor.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2" data-reveal>
              {doctor.credentials.map((c) => (
                <li key={c} className="flex items-start gap-3 rounded-xl border border-line bg-card px-4 py-3 text-[0.9375rem]">
                  <Check className="mt-0.5 shrink-0 text-accent" width={18} height={18} />
                  {c}
                </li>
              ))}
            </ul>
            <blockquote className="mt-8 border-l-2 border-sage-mid pl-5 font-title text-2xl italic text-ink-soft" data-reveal>
              «{doctor.quote}»
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── Tratamientos ── */}
      <section id="tratamientos" aria-labelledby="titulo-tratamientos" className="bg-paper-2 py-24 md:py-32">
        <div className="container-x">
          <SectionHeader id="titulo-tratamientos" eyebrow="Tratamientos" title="Todo lo que tu sonrisa necesita" intro="Odontología integral para adolescentes y adultos, con un plan claro desde la primera consulta." />
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {treatments.map((t, i) => (
              <li key={t.id} id={t.id} className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-card" data-reveal style={{ "--reveal-delay": `${(i % 3) * 90}ms` } as React.CSSProperties}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={images[t.image].src} alt={images[t.image].alt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw" placeholder="blur" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <h3 className="font-title text-[1.85rem]">{t.name}</h3>
                  <p className="mt-2 text-ink-soft">{t.summary}</p>
                  <ul className="mt-5 space-y-2 text-[0.9375rem] text-ink-soft">
                    {t.points.map((p) => (
                      <li key={p} className="flex items-center gap-2.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Link href="#agenda" className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-accent">
                    Agendar evaluación <ArrowRight width={16} height={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Banda de imagen ── */}
      <FixedImageBand image={images.clinic.src} alt={images.clinic.alt} className="h-[60svh] min-h-[24rem]">
        <div className="container-x max-w-3xl">
          <h2 className="display-md">{band.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/90">{band.text}</p>
          {siteConfig.showContentNotices && <p className="mt-5 text-xs uppercase tracking-[0.14em] text-white/75">Imagen ilustrativa</p>}
        </div>
      </FixedImageBand>

      {/* ── Primera consulta: columna fija + línea de tiempo que se revela al hacer scroll ── */}
      <section id="primera-consulta" aria-labelledby="titulo-primera" className="py-24 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow">{firstVisit.eyebrow}</p>
            <h2 id="titulo-primera" className="display-lg mt-5">
              {firstVisit.title.lead}
              <span className="block text-accent">{firstVisit.title.highlight}</span>
            </h2>
            <p className="mt-5 max-w-sm text-lg text-ink-soft">{firstVisit.intro}</p>
            <Link href="#agenda" className="btn btn-primary mt-9">
              <Calendar /> Agendar evaluación
            </Link>
          </div>
          <ProcessTimeline steps={firstVisit.steps} />
        </div>
      </section>

      {/* ── Testimonios ── */}
      <section id="opiniones" aria-labelledby="titulo-opiniones" className="on-dark bg-deep py-24 text-white md:py-32">
        <div className="container-x">
          <SectionHeader
            id="titulo-opiniones"
            eyebrow="Opiniones"
            title="Lo que dicen nuestros pacientes"
            tag={siteConfig.showContentNotices && <span className="notice-tag text-metal">Opiniones ilustrativas</span>}
          />
          <ul className="no-scrollbar -mx-5 mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 xl:grid-cols-4">
            {testimonials.map((t) => (
              <li key={t.name} className="flex w-[80vw] max-w-sm shrink-0 snap-center flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-7 md:w-auto md:max-w-none" data-reveal>
                <div className="flex gap-1 text-metal" aria-label="5 de 5 estrellas">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} />
                  ))}
                </div>
                <blockquote className="mt-5 flex-1 leading-relaxed text-white/85">«{t.text}»</blockquote>
                <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                  <span aria-hidden className="grid h-10 w-10 place-items-center rounded-full bg-metal/15 font-title text-lg text-metal">
                    {t.name[0]}
                  </span>
                  <p className="text-sm">
                    <span className="block font-semibold text-white">{t.name}</span>
                    <span className="text-white/70">{t.treatment}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Previsión ── */}
      <section id="prevision" aria-labelledby="titulo-prevision" className="py-24 md:py-32">
        <div className="container-x">
          <SectionHeader id="titulo-prevision" eyebrow={coverage.eyebrow} title={coverage.title} intro={coverage.intro} />
          <ul className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {coverage.items.map((c) => (
              <li key={c.title} className="rounded-2xl border border-line bg-card p-6" data-reveal>
                <span className="grid h-11 w-11 place-items-center rounded-full bg-sage text-accent">
                  <Tooth width={20} height={20} />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{c.title}</h3>
                <p className="mt-1.5 text-[0.9375rem] text-ink-soft">{c.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Preguntas frecuentes ── */}
      <section id="preguntas" aria-labelledby="titulo-preguntas" className="bg-paper-2 py-24 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="eyebrow">Preguntas frecuentes</p>
            <h2 id="titulo-preguntas" className="display-lg mt-5">
              Resolvemos tus dudas
            </h2>
            <p className="mt-5 max-w-sm text-ink-soft">¿No encuentras lo que buscas? Escríbenos y te respondemos en el día.</p>
            {contact.phone && (
              <a href={telLink(contact.phone)} className="btn btn-ghost mt-8">
                <Phone /> {contact.phone}
              </a>
            )}
          </div>
          <div className="divide-y divide-line border-y border-line">
            {faq.map((item) => (
              <details key={item.q} className="group py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-medium [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-card text-accent transition-transform duration-300 group-open:rotate-45">
                    <Plus width={18} height={18} />
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 pr-12 leading-relaxed text-ink-soft">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Agenda ── */}
      <section id="agenda" aria-labelledby="titulo-agenda" className="py-24 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="eyebrow">{booking.eyebrow}</p>
            <h2 id="titulo-agenda" className="display-lg mt-5">
              {booking.title}
            </h2>
            <p className="mt-5 max-w-sm text-lg text-ink-soft">{booking.intro}</p>
            <ul className="mt-10 space-y-5 text-ink-soft">
              <li className="flex gap-4">
                <Clock className="mt-0.5 shrink-0 text-accent" />
                <span>Respuesta dentro del día hábil</span>
              </li>
              <li className="flex gap-4">
                <Shield className="mt-0.5 shrink-0 text-accent" />
                <span>Tus datos solo se usan para coordinar tu hora</span>
              </li>
              <li className="flex gap-4">
                <Calendar className="mt-0.5 shrink-0 text-accent" />
                <span>Urgencias: escríbenos por WhatsApp para atención el mismo día</span>
              </li>
            </ul>
          </div>
          <BookingForm />
        </div>
      </section>

      {/* ── Ubicación y contacto ── */}
      <section id="contacto" aria-labelledby="titulo-contacto" className="pb-24 md:pb-32">
        <div className="container-x">
          <div className="grid overflow-hidden rounded-[2rem] border border-line bg-card lg:grid-cols-[0.9fr_1.1fr]">
            <div className="p-8 md:p-12">
              <p className="eyebrow">Ubicación</p>
              <h2 id="titulo-contacto" className="display-md mt-5">
                Te esperamos en Vitacura
              </h2>
              <ul className="mt-8 space-y-6 text-ink-soft">
                <li className="flex gap-4">
                  <MapPin className="mt-0.5 shrink-0 text-accent" />
                  <span>
                    <span className="block text-ink">{contact.address}</span>
                    {contact.city}, {contact.region}
                    <span className="mt-1 block text-sm text-ink-mute">{contact.reference}</span>
                  </span>
                </li>
                <li className="flex gap-4">
                  <Clock className="mt-0.5 shrink-0 text-accent" />
                  <span className="grid gap-1">
                    {hours.map((h) => (
                      <span key={h.days}>
                        <span className="text-ink">{h.days}:</span> {h.time}
                      </span>
                    ))}
                  </span>
                </li>
                {contact.phone && (
                  <li className="flex gap-4">
                    <Phone className="mt-0.5 shrink-0 text-accent" />
                    <a href={telLink(contact.phone)} className="text-ink hover:text-accent">
                      {contact.phone}
                    </a>
                  </li>
                )}
                {contact.email && (
                  <li className="flex gap-4">
                    <Mail className="mt-0.5 shrink-0 text-accent" />
                    <a href={`mailto:${contact.email}`} className="break-all text-ink hover:text-accent">
                      {contact.email}
                    </a>
                  </li>
                )}
              </ul>
            </div>
            {contact.mapEmbedUrl && (
              <iframe title="Mapa de Vitacura, Región Metropolitana" src={contact.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-80 w-full border-0 grayscale-[0.4] lg:h-full lg:min-h-[28rem]" />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
