"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/content/copy";
import { Logo } from "./Logo";
import { Close, Menu } from "./icons";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menú móvil: Escape cierra y el foco queda atrapado dentro del panel.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a,button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && panel) {
        const items = panel.querySelectorAll<HTMLElement>("a,button");
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const href = (hash: string) => (isHome ? hash : `/${hash}`);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow] duration-300 ${scrolled || !isHome ? "bg-paper/90 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md" : "bg-transparent"}`}>
      <div className="container-x flex h-[4.75rem] items-center justify-between gap-6">
        <Link href="/" aria-label="IIN Dental Care, inicio">
          <Logo />
        </Link>
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-[0.9375rem] text-ink-soft">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={href(item.href)} className="transition-colors hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Link href={href("#agenda")} className="btn btn-primary hidden sm:inline-flex">
            Agendar hora
          </Link>
          <button ref={toggleRef} type="button" className="grid h-11 w-11 place-items-center rounded-full border border-line bg-card lg:hidden" aria-expanded={open} aria-controls="menu-movil" aria-label={open ? "Cerrar menú" : "Abrir menú"} onClick={() => setOpen((v) => !v)}>
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div ref={panelRef} id="menu-movil" role="dialog" aria-modal="true" aria-label="Menú" className="fixed inset-x-0 bottom-0 top-[4.75rem] overflow-y-auto bg-paper lg:hidden">
          <nav aria-label="Menú móvil" className="container-x py-8">
            <ul className="divide-y divide-line border-y border-line">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={href(item.href)} className="block py-4 font-title text-3xl" onClick={() => setOpen(false)}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={href("#agenda")} className="btn btn-primary mt-8 w-full" onClick={() => setOpen(false)}>
              Agendar hora
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
