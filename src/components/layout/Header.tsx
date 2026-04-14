"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { NAV_ITEMS, SERVICES, getWhatsAppLink } from "@/lib/constants";
import { Container } from "./Container";

export function Header() {
  const { scrolled } = useScrollProgress();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-[400ms]",
          scrolled
            ? "bg-black/90 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        )}
      >
        <Container className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <span className="font-display text-xl md:text-2xl font-medium text-white group-hover:text-gold-light transition-colors">
              Espaço Bless<br />
              <span className="text-sm font-normal text-text-light">Concept</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) =>
              item.label === "Serviços" ? (
                /* Serviços com dropdown */
                <div
                  key={item.href}
                  className="relative group"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link
                    href={item.href}
                    className="font-body text-base font-normal text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-1"
                  >
                    {item.label}
                    <ChevronDown size={14} className={cn("transition-transform duration-200", servicesOpen && "rotate-180")} />
                  </Link>

                  {/* Dropdown */}
                  <div
                    className={cn(
                      "absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200",
                      servicesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                    )}
                  >
                    <div className="bg-charcoal border border-white/10 rounded-xl p-3 min-w-[220px] shadow-2xl">
                      {SERVICES.map((service) => (
                        <Link
                          key={service.id}
                          href={`/servicos/${service.slug}`}
                          className="block px-4 py-2.5 rounded-lg font-body text-sm text-text-light hover:text-white hover:bg-white/5 transition-colors"
                        >
                          {service.title}
                        </Link>
                      ))}
                      <div className="border-t border-white/5 mt-2 pt-2">
                        <Link
                          href="/noivas"
                          className="block px-4 py-2.5 rounded-lg font-body text-sm text-gold-light hover:text-gold hover:bg-gold/5 transition-colors"
                        >
                          ✦ Experiência Noivas
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-body text-base font-normal text-white/80 hover:text-white transition-colors duration-300"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href={getWhatsAppLink("header")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center px-6 py-2.5 bg-white text-black font-display text-base font-medium capitalize rounded-full hover:bg-gold-light transition-all duration-300"
            >
              Agendar
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white p-2"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/98 backdrop-blur-xl transition-transform duration-500 ease-out lg:hidden flex flex-col items-center justify-center overflow-y-auto",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col items-center gap-6 py-20">
          {/* Serviços com subcategorias no mobile */}
          <Link
            href="/servicos"
            onClick={() => setMobileOpen(false)}
            className="font-display text-3xl font-medium text-white hover:text-gold transition-colors"
          >
            Serviços
          </Link>
          <div className="flex flex-wrap justify-center gap-3 -mt-2 mb-2">
            {SERVICES.map((service) => (
              <Link
                key={service.id}
                href={`/servicos/${service.slug}`}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-1.5 rounded-full border border-white/10 font-body text-sm text-text-light hover:text-white hover:border-white/30 transition-colors"
              >
                {service.title}
              </Link>
            ))}
          </div>

          {/* Noivas */}
          <Link
            href="/noivas"
            onClick={() => setMobileOpen(false)}
            className="font-display text-3xl font-medium text-gold hover:text-gold-light transition-colors"
          >
            Noivas
          </Link>

          {/* Outros links */}
          {NAV_ITEMS.filter(i => i.label !== "Serviços" && i.label !== "Noivas").map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="font-display text-3xl font-medium text-white hover:text-gold transition-colors"
            >
              {item.label}
            </Link>
          ))}

          <a
            href={getWhatsAppLink("header")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="mt-4 inline-flex items-center px-10 py-3 bg-white text-black font-display text-base font-medium capitalize rounded-full"
          >
            Agendar Horário
          </a>
        </nav>
      </div>
    </>
  );
}
