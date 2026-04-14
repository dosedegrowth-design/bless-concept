"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { NAV_ITEMS, getWhatsAppLink } from "@/lib/constants";
import { Container } from "./Container";

export function Header() {
  const { scrolled } = useScrollProgress();
  const [mobileOpen, setMobileOpen] = useState(false);

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
          <a href="/" className="flex items-center group">
            <span className="font-display text-xl md:text-2xl font-medium text-white group-hover:text-gold-light transition-colors">
              Espaço Bless<br />
              <span className="text-sm font-normal text-text-light">Concept</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-body text-base font-normal text-white/80 hover:text-white transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
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
          "fixed inset-0 z-40 bg-black/98 backdrop-blur-xl transition-transform duration-500 ease-out lg:hidden flex flex-col items-center justify-center",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col items-center gap-8">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="font-display text-3xl font-medium text-white hover:text-gold transition-colors"
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              {item.label}
            </a>
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
