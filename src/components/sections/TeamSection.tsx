"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TeamCard } from "@/components/ui/TeamCard";
import { AnimateOnScroll } from "@/components/animation/AnimateOnScroll";
import { TEAM_MEMBERS } from "@/lib/constants";

export function TeamSection() {
  return (
    <Section id="equipe">
      <Container>
        {/* Header */}
        <AnimateOnScroll className="text-center mb-16 md:mb-20">
          <SectionLabel>Nosso Time</SectionLabel>
          <SectionTitle>Artistas da beleza que cuidam de você</SectionTitle>
          <p className="mt-4 font-body text-base text-text-light max-w-lg mx-auto">
            Profissionais especializados, apaixonados pelo que fazem e em constante evolução.
          </p>
        </AnimateOnScroll>

        {/* Horizontal scroll carousel */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-8 pb-4 px-4 md:justify-center">
            {TEAM_MEMBERS.map((member, i) => (
              <AnimateOnScroll key={member.id} delay={i * 0.1} variant="fadeUp">
                <TeamCard member={member} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
