"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { AnimateOnScroll } from "@/components/animation/AnimateOnScroll";
import { TESTIMONIALS } from "@/lib/constants";

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const total = TESTIMONIALS.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <Section dark={false}>
      <Container>
        {/* Header */}
        <AnimateOnScroll className="text-center mb-16 md:mb-20">
          <SectionLabel dark={false}>Depoimentos</SectionLabel>
          <SectionTitle dark={false}>O que nossas clientes dizem</SectionTitle>
        </AnimateOnScroll>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Cards */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {TESTIMONIALS.map((t) => (
                <div key={t.id} className="w-full shrink-0 px-4">
                  <TestimonialCard testimonial={t} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-gold-dark hover:text-gold transition-colors"
            aria-label="Depoimento anterior"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={next}
            className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-gold-dark hover:text-gold transition-colors"
            aria-label="Próximo depoimento"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === current ? "bg-gold w-6" : "bg-pearl"
                }`}
                aria-label={`Depoimento ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
