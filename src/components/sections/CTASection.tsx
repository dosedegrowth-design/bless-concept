"use client";

import { getWhatsAppLink } from "@/lib/constants";
import { img } from "@/lib/supabase";

export function CTASection() {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${img("images/cta/cta-bg.webp")})` }}
      />
      <div className="absolute inset-0 bg-black/75" />

      <div className="relative z-10 text-center px-6 max-w-[700px] mx-auto">
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium capitalize leading-tight text-white">
          Pronta para se transformar?
        </h2>
        <p className="mt-6 font-body text-base md:text-lg font-normal text-text-light leading-7">
          Agende seu horário e viva a experiência Espaço Bless Concept.
        </p>
        <div className="mt-10">
          <a
            href={getWhatsAppLink("cta")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-10 py-4 bg-white text-black font-display text-base font-medium capitalize rounded-full hover:bg-gold-light hover:scale-[1.02] transition-all duration-300"
          >
            Agendar pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
