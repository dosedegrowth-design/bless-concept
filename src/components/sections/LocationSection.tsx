"use client";

import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { AnimateOnScroll } from "@/components/animation/AnimateOnScroll";
import { BUSINESS_INFO } from "@/lib/constants";

export function LocationSection() {
  return (
    <Section id="contato">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-0">
          {/* Info */}
          <AnimateOnScroll variant="fadeLeft" className="lg:pr-16">
            <SectionLabel>Visite-nos</SectionLabel>
            <SectionTitle>Estamos esperando você</SectionTitle>

            <div className="mt-10 space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <MapPin size={20} className="text-gold mt-0.5 shrink-0" />
                <div>
                  <p className="font-body text-sm text-white">{BUSINESS_INFO.address}</p>
                  <p className="font-body text-sm text-text-light">{BUSINESS_INFO.complement}</p>
                  <p className="font-body text-sm text-text-light">{BUSINESS_INFO.city}</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <Clock size={20} className="text-gold mt-0.5 shrink-0" />
                <div className="font-body text-sm">
                  <div className="flex justify-between gap-8">
                    <span className="text-text-light">Segunda a Sábado</span>
                    <span className="text-white">{BUSINESS_INFO.hours.weekdays}</span>
                  </div>
                  <div className="flex justify-between gap-8 mt-1">
                    <span className="text-text-light">Domingo</span>
                    <span className="text-white">{BUSINESS_INFO.hours.sunday}</span>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4">
                <Phone size={20} className="text-gold shrink-0" />
                <a
                  href={`tel:+55${BUSINESS_INFO.phone.replace(/\D/g, "")}`}
                  className="font-body text-sm text-white hover:text-gold transition-colors"
                >
                  {BUSINESS_INFO.phone}
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <Mail size={20} className="text-gold shrink-0" />
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="font-body text-sm text-white hover:text-gold transition-colors"
                >
                  {BUSINESS_INFO.email}
                </a>
              </div>
            </div>

            {/* Como Chegar */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS_INFO.address + ", " + BUSINESS_INFO.city)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 font-body text-sm font-medium text-gold hover:text-gold-light transition-colors group"
            >
              <span>Como Chegar</span>
              <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </a>
          </AnimateOnScroll>

          {/* Map */}
          <AnimateOnScroll variant="fadeIn" delay={0.3}>
            <div className="relative w-full h-[400px] lg:h-full min-h-[400px] overflow-hidden">
              <iframe
                src={BUSINESS_INFO.mapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(1) contrast(1.1) sepia(0.3)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização do Espaço Bless Concept"
                className="absolute inset-0"
              />
            </div>
          </AnimateOnScroll>
        </div>
      </Container>
    </Section>
  );
}
