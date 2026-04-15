import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Crown } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { Container } from "@/components/layout/Container";
import { AnimateOnScroll } from "@/components/animation/AnimateOnScroll";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SERVICES, BRIDAL_SERVICE, getWhatsAppLink } from "@/lib/constants";

export const metadata = {
  title: "Serviços de Beleza e Estética — Salão Casa Verde SP",
  description:
    "Todos os serviços do Espaço Bless Concept na Casa Verde, Zona Norte de SP: corte e coloração de cabelos, depilação, estética facial e corporal, manicure e pedicure, maquiagem profissional, massagem relaxante e pacotes exclusivos para noivas. Agende pelo WhatsApp.",
  alternates: {
    canonical: "https://dashboardsupervisao.vercel.app/servicos",
  },
};

export default function ServicosPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-black pt-32 pb-20 md:pt-40 md:pb-28">
          <Container className="text-center">
            <SectionLabel>Nossos Serviços</SectionLabel>
            <SectionTitle>
              Tratamentos Para Cada Dimensão Da Sua Beleza
            </SectionTitle>
            <p className="mt-6 font-body text-base md:text-lg text-text-light max-w-2xl mx-auto leading-7">
              Um salão de beleza, estética avançada e espaço exclusivo para noivas. Um novo padrão de cuidado, sofisticação e experiência.
            </p>
          </Container>
        </section>

        {/* Services grid */}
        <section className="bg-black pb-20 md:pb-28">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SERVICES.map((service, i) => (
                <AnimateOnScroll key={service.id} variant="fadeUp" delay={i * 0.05}>
                  <Link href={`/servicos/${service.slug}`} className="group block">
                    <div className="relative bg-charcoal border border-white/[0.06] rounded-lg overflow-hidden hover:border-gold/20 transition-all duration-300">
                      <div className="grid grid-cols-1 sm:grid-cols-2 min-h-[240px]">
                        {/* Image */}
                        <div className="relative aspect-[4/3] sm:aspect-auto overflow-hidden">
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover transition-transform duration-[600ms] group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, 50vw"
                          />
                          <div className="absolute inset-0 bg-black/10" />
                        </div>

                        {/* Content */}
                        <div className="p-8 flex flex-col justify-center">
                          <h2 className="font-display text-2xl font-medium text-white">
                            {service.title}
                          </h2>
                          <p className="mt-3 font-body text-sm text-text-light leading-relaxed">
                            {service.description}
                          </p>
                          <div className="mt-4 inline-flex items-center gap-2 font-body text-sm font-medium text-gold group-hover:text-gold-light transition-colors">
                            <span>Ver detalhes</span>
                            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimateOnScroll>
              ))}
            </div>

            {/* Bridal — destaque */}
            <AnimateOnScroll variant="fadeUp" delay={0.1} className="mt-8">
              <Link href={`/servicos/${BRIDAL_SERVICE.slug}`} className="group block">
                <div className="relative bg-charcoal border border-gold/30 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 min-h-[360px]">
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
                      <h2 className="font-display text-3xl md:text-4xl font-medium text-white">
                        {BRIDAL_SERVICE.title}
                      </h2>
                      <p className="mt-4 font-body text-base text-text-light leading-relaxed max-w-lg">
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

            {/* CTA */}
            <div className="mt-16 text-center">
              <p className="font-body text-base text-text-light mb-6">
                Não encontrou o que procura? Fale conosco.
              </p>
              <a
                href={getWhatsAppLink("float")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3.5 bg-white text-black font-display text-base font-medium capitalize rounded-full hover:bg-gold-light hover:scale-[1.02] transition-all duration-300"
              >
                Fale pelo WhatsApp
              </a>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
