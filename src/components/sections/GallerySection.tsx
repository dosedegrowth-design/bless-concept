"use client";

import Image from "next/image";
import { img } from "@/lib/supabase";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { AnimateOnScroll } from "@/components/animation/AnimateOnScroll";

const GALLERY_IMAGES = [
  { src: img("images/gallery/espaco-01.webp"), alt: "Recepção", span: "col-span-2 row-span-2" },
  { src: img("images/gallery/espaco-02.webp"), alt: "Sala de corte", span: "" },
  { src: img("images/gallery/espaco-03.webp"), alt: "Espelho e iluminação", span: "" },
  { src: img("images/gallery/espaco-04.webp"), alt: "Área de estética", span: "" },
  { src: img("images/gallery/espaco-05.webp"), alt: "Detalhes do ambiente", span: "" },
  { src: img("images/gallery/espaco-06.webp"), alt: "Produtos premium", span: "col-span-2" },
  { src: img("images/gallery/espaco-07.webp"), alt: "Cadeira de atendimento", span: "" },
  { src: img("images/gallery/espaco-08.webp"), alt: "Ambiente relaxante", span: "" },
];

export function GallerySection() {
  return (
    <Section id="espaco" dark={false}>
      <Container>
        {/* Header */}
        <AnimateOnScroll className="text-center mb-16 md:mb-20">
          <SectionLabel dark={false}>Nosso Espaço</SectionLabel>
          <SectionTitle dark={false}>
            Um ambiente pensado para sua experiência
          </SectionTitle>
        </AnimateOnScroll>

        {/* Masonry-like grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {GALLERY_IMAGES.map((img, i) => (
            <AnimateOnScroll
              key={img.src}
              variant="fadeUp"
              delay={i * 0.08}
              className={img.span}
            >
              <div className="group relative aspect-square overflow-hidden bg-pearl cursor-pointer">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/15 transition-colors duration-300" />
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </Section>
  );
}
