"use client";

import Image from "next/image";
import Link from "next/link";
import { Crown, ArrowRight } from "lucide-react";
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

        {/* Grid 2 colunas — 7 serviços + 1 noivas = 8 items = 4 rows perfeitas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service, i) => (
            <AnimateOnScroll key={service.id} variant="scaleIn" delay={i * 0.06}>
              <ServiceCard service={service} />
            </AnimateOnScroll>
          ))}

          {/* Card Noivas — mesmo tamanho que os outros, dentro do grid */}
          <AnimateOnScroll variant="scaleIn" delay={0.5}>
            <Link href="/noivas" className="group block h-full">
              <div className="bg-charcoal border border-gold/30 rounded-lg overflow-hidden hover:border-gold/50 transition-all duration-300 h-full">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={BRIDAL_SERVICE.image}
                    alt={BRIDAL_SERVICE.title}
                    fill
                    className="object-cover transition-transform duration-[600ms] group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/15" />
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-2 mb-1">
                    <Crown size={18} className="text-gold" strokeWidth={1.5} />
                    <h3 className="font-display text-lg font-medium text-white">
                      {BRIDAL_SERVICE.title}
                    </h3>
                  </div>
                  <p className="mt-2 font-body text-sm text-text-light leading-relaxed">
                    {BRIDAL_SERVICE.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 font-body text-sm font-medium text-gold group-hover:text-gold-light transition-colors">
                    <span>Saiba mais</span>
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          </AnimateOnScroll>
        </div>
      </Container>
    </Section>
  );
}
