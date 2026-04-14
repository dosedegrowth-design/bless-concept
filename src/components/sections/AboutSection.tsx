"use client";

import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatCounter } from "@/components/ui/StatCounter";
import { AnimateOnScroll } from "@/components/animation/AnimateOnScroll";
import { STATS, BUSINESS_INFO } from "@/lib/constants";

export function AboutSection() {
  return (
    <Section id="sobre" dark={false}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <AnimateOnScroll variant="fadeRight" className="order-1 lg:order-2">
            <div className="relative">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                <Image
                  src="/images/about/sobre-interior.webp"
                  alt="Interior do Espaço Bless Concept"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold/15 rounded-lg -z-10" />
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fadeLeft" className="order-2 lg:order-1">
            <SectionLabel dark={false}>Nossa História</SectionLabel>
            <SectionTitle dark={false}>
              Um espaço onde a beleza encontra a arte
            </SectionTitle>

            <div className="mt-8 space-y-4">
              <p className="font-body text-base text-[#4A4540] leading-7">
                A {BUSINESS_INFO.name} nasceu de uma nova gestão, com o compromisso de elevar o padrão da beleza na região. Aqui, cada detalhe importa — cabelos, estética, bem-estar e experiências exclusivas.
              </p>
              <p className="font-body text-base text-[#4A4540] leading-7">
                Mais que um salão, somos um espaço onde sua beleza é tratada com excelência e sofisticação. Acreditamos que beleza é mais do que aparência — é sobre se sentir poderosa, confiante e na sua melhor versão.
              </p>
            </div>

            <div className="w-16 h-0.5 bg-gold my-8" />

            <div className="grid grid-cols-3 gap-6">
              {STATS.map((stat) => (
                <StatCounter key={stat.label} stat={stat} />
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </Container>
    </Section>
  );
}
