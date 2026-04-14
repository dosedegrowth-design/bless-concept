"use client";

import Image from "next/image";
import Link from "next/link";
import { Crown } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { AnimateOnScroll } from "@/components/animation/AnimateOnScroll";
import { SERVICES, BRIDAL_SERVICE } from "@/lib/constants";

export function ServicesSection() {
  return (
    <Section id="servicos">
      <Container>
        <AnimateOnScroll className="text-center mb-16 md:mb-20">
          <SectionLabel>Nossos Serviços</SectionLabel>
          <SectionTitle>Tratamentos para cada dimensão da sua beleza</SectionTitle>
        </AnimateOnScroll>

        {/* Grid 3 colunas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <AnimateOnScroll key={service.id} variant="scaleIn" delay={i * 0.08}>
              <ServiceCard service={service} />
            </AnimateOnScroll>
          ))}
        </div>

        {/* Card Noivas — full width, destaque */}
        <AnimateOnScroll variant="fadeUp" delay={0.2} className="mt-6">
          <Link href="/noivas" className="group block">
            <div className="relative bg-charcoal border border-gold/30 rounded-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 min-h-[320px]">
                <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
                  <Image
                    src={BRIDAL_SERVICE.image}
                    alt={BRIDAL_SERVICE.title}
                    fill
                    className="object-cover transition-transform duration-[600ms] group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <div className="p-10 md:p-14 flex flex-col justify-center">
                  <Crown size={28} className="text-gold mb-3" strokeWidth={1.2} />
                  <h3 className="font-display text-2xl md:text-3xl font-medium text-white">
                    {BRIDAL_SERVICE.title}
                  </h3>
                  <p className="mt-4 font-body text-sm md:text-base text-text-light leading-relaxed max-w-lg">
                    {BRIDAL_SERVICE.description}
                  </p>
                  <div className="mt-6">
                    <span className="inline-flex items-center px-6 py-2.5 border border-gold/40 text-gold font-display text-sm font-medium capitalize rounded-full group-hover:bg-gold/10 transition-all duration-300">
                      Saiba Mais
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </AnimateOnScroll>
      </Container>
    </Section>
  );
}
