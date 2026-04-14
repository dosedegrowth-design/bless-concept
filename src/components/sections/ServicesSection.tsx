"use client";

import Image from "next/image";
import { Crown } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { AnimateOnScroll } from "@/components/animation/AnimateOnScroll";
import { SERVICES, BRIDAL_SERVICE, getWhatsAppLink } from "@/lib/constants";

export function ServicesSection() {
  return (
    <Section id="servicos">
      <Container>
        <AnimateOnScroll className="text-center mb-16 md:mb-20">
          <SectionLabel>Nossos Serviços</SectionLabel>
          <SectionTitle>Tratamentos para cada dimensão da sua beleza</SectionTitle>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <AnimateOnScroll key={service.id} variant="scaleIn" delay={i * 0.08}>
              <ServiceCard service={service} />
            </AnimateOnScroll>
          ))}

          <AnimateOnScroll variant="scaleIn" delay={0.6} className="md:col-span-2 lg:col-span-2">
            <div className="group relative bg-charcoal border border-gold/30 rounded-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative aspect-[4/3] md:aspect-auto min-h-[280px] overflow-hidden">
                  <Image
                    src={BRIDAL_SERVICE.image}
                    alt={BRIDAL_SERVICE.title}
                    fill
                    className="object-cover transition-transform duration-[600ms] group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>

                <div className="p-10 md:p-12 flex flex-col justify-center">
                  <Crown size={28} className="text-gold mb-3" strokeWidth={1.2} />
                  <h3 className="font-display text-2xl font-medium text-white">
                    {BRIDAL_SERVICE.title}
                  </h3>
                  <p className="mt-4 font-body text-sm text-text-light leading-relaxed">
                    {BRIDAL_SERVICE.description}
                  </p>
                  <div className="mt-6">
                    <a
                      href={getWhatsAppLink("noivas")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-2.5 border border-gold/40 text-gold font-display text-sm font-medium capitalize rounded-full hover:bg-gold/10 transition-all duration-300"
                    >
                      Saiba Mais
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </Container>
    </Section>
  );
}
