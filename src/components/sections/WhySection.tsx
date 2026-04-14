"use client";

import { Award, Gem, Sparkles, Heart } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { AnimateOnScroll } from "@/components/animation/AnimateOnScroll";
import { PILLARS } from "@/lib/constants";

const iconMap: Record<string, React.ReactNode> = {
  award: <Award size={40} strokeWidth={1.2} />,
  gem: <Gem size={40} strokeWidth={1.2} />,
  sparkles: <Sparkles size={40} strokeWidth={1.2} />,
  heart: <Heart size={40} strokeWidth={1.2} />,
};

export function WhySection() {
  return (
    <Section>
      <Container>
        <AnimateOnScroll className="text-center mb-16 md:mb-20">
          <SectionLabel>Por que Bless Concept</SectionLabel>
          <SectionTitle>Onde cada detalhe é pensado para você</SectionTitle>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar, i) => (
            <AnimateOnScroll key={pillar.title} delay={i * 0.12}>
              <div className="border border-white/[0.08] rounded-lg p-8 md:p-10 text-center hover:border-gold/20 hover:bg-white/[0.02] transition-all duration-300">
                <div className="text-gold mx-auto w-fit">{iconMap[pillar.icon]}</div>
                <h3 className="mt-5 font-display text-lg font-medium text-white">
                  {pillar.title}
                </h3>
                <p className="mt-3 font-body text-sm text-text-light leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </Section>
  );
}
