"use client";

import { ChevronDown } from "lucide-react";
import { getWhatsAppLink } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/hero/hero-bg.webp)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/80" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-[900px] mx-auto">
        <span className="inline-block px-5 py-2 rounded-full border border-white/15 font-body text-xs font-medium tracking-widest uppercase text-text-light">
          Casa Verde — Zona Norte
        </span>

        <h1 className="mt-8 font-display text-5xl md:text-6xl lg:text-7xl font-medium capitalize leading-tight text-white">
          Beleza É Uma Arte E Você É Nossa Obra-Prima
        </h1>

        <p className="mt-6 font-body text-base md:text-lg font-normal text-text-light max-w-[550px] mx-auto leading-7">
          Cada detalhe importa. Cabelos, estética, bem-estar e experiências exclusivas em um só lugar.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={getWhatsAppLink("hero")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3.5 bg-white text-black font-display text-base font-medium capitalize rounded-full hover:bg-gold-light hover:scale-[1.02] transition-all duration-300"
          >
            Agendar Horário
          </a>
          <a
            href="#servicos"
            className="inline-flex items-center px-8 py-3.5 border border-white/20 text-white font-display text-base font-medium capitalize rounded-full hover:bg-white/10 transition-all duration-300"
          >
            Conhecer Serviços
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#servicos"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted hover:text-white transition-colors"
      >
        <ChevronDown size={20} className="animate-bounce-gentle" />
      </a>
    </section>
  );
}
