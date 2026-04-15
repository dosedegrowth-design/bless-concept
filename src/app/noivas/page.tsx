import Image from "next/image";
import Link from "next/link";
import { Crown, Sparkles, Heart, Star, ArrowLeft, Gift, Check } from "lucide-react";
import { img } from "@/lib/supabase";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { Container } from "@/components/layout/Container";
import { AnimateOnScroll } from "@/components/animation/AnimateOnScroll";
import { getWhatsAppLink } from "@/lib/constants";

export const metadata = {
  title: "Dia da Noiva — Pacotes Exclusivos para Noivas em SP",
  description:
    "Dia da noiva completo no Espaço Bless Concept, Casa Verde, Zona Norte de São Paulo. Três experiências exclusivas inspiradas na realeza: Kate Middleton, Lady Diana e Rainha Elizabeth. Cabelo, maquiagem, massagem e estética para o seu grande dia. Agende sua consultoria.",
  alternates: {
    canonical: "https://dashboardsupervisao.vercel.app/noivas",
  },
  openGraph: {
    title: "Dia da Noiva | Espaço Bless Concept",
    description: "Pacotes exclusivos para noivas inspirados na realeza britânica. Cabelo, maquiagem, massagem e estética.",
  },
};

const EXPERIENCES = [
  {
    name: "Experiência Kate Middleton",
    icon: <Crown size={32} strokeWidth={1.2} />,
    tagline: "Elegância Clássica",
    description:
      "Inspirada na elegância clássica, a Experiência Kate Middleton oferece um preparo sofisticado que une prova de cabelo e maquiagem, dia relaxante e finalização impecável. Um cuidado completo com massagem, revitalização e sala VIP privativa para que a noiva viva seu momento com tranquilidade e refinamento.",
    highlights: [
      "Prova de cabelo e maquiagem",
      "Dia relaxante com massagem",
      "Revitalização capilar",
      "Sala VIP privativa",
      "Finalização impecável no grande dia",
    ],
    image: img("images/noivas/experiencia-kate.webp"),
    price: "Valores sob consulta",
  },
  {
    name: "Experiência Lady Diana",
    icon: <Heart size={32} strokeWidth={1.2} />,
    tagline: "Delicadeza & Emoção",
    description:
      "Delicada e acolhedora, a Experiência Lady Diana foi criada para noivas que desejam leveza, bem-estar e emoção no grande dia. Combina preparação personalizada, terapias relaxantes, cuidados exclusivos e um ambiente sereno que transforma o processo em uma vivência inesquecível.",
    highlights: [
      "Preparação personalizada completa",
      "Terapias relaxantes",
      "Cuidados exclusivos de pele",
      "Ambiente sereno e acolhedor",
      "Vivência emocional inesquecível",
    ],
    image: img("images/noivas/experiencia-diana.webp"),
    price: "Valores sob consulta",
  },
  {
    name: "Experiência Rainha Elizabeth",
    icon: <Sparkles size={32} strokeWidth={1.2} />,
    tagline: "Luxo & Exclusividade Total",
    description:
      "A proposta mais completa e luxuosa da Bless. A Experiência Rainha Elizabeth oferece um ritual integral de beleza e bem-estar, com preparação antecipada, terapias premium e cuidados compartilhados com uma acompanhante. Um dia marcado por exclusividade, conforto e memórias dignas de realeza.",
    highlights: [
      "Ritual integral de beleza e bem-estar",
      "Preparação antecipada (semanas antes)",
      "Terapias premium exclusivas",
      "Acompanhante inclusa no pacote",
      "Experiência completa digna de realeza",
    ],
    image: img("images/noivas/experiencia-elizabeth.webp"),
    price: "Valores sob consulta",
    featured: true,
  },
];

const COURTESIES = [
  "1 hidratação capilar",
  "1 depilação de buço",
  "1 massagem relaxante de ombros e costas (30 min)",
];

export default function NoivasPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero — Full screen premium */}
        <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={img("images/noivas/noivas-hero.webp")}
              alt="Experiência Noivas — Espaço Bless Concept"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80" />
          </div>

          <Container className="relative z-10 text-center">
            <AnimateOnScroll variant="fadeUp">
              <Crown size={48} className="text-gold mx-auto mb-6" strokeWidth={1} />
              <p className="font-body text-sm font-medium tracking-widest uppercase text-gold-light mb-4">
                Bless Concept — London | São Paulo
              </p>
              <h1 className="font-display text-5xl md:text-6xl lg:text-8xl font-medium capitalize leading-[0.95] text-white">
                Experiência<br />Noivas
              </h1>
              <p className="mt-6 font-body text-lg md:text-xl text-white/80 italic max-w-lg mx-auto">
                Elegância, cuidado e sofisticação para o seu grande dia.
              </p>
              <div className="mt-10">
                <a
                  href={getWhatsAppLink("noivas")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-10 py-4 bg-white text-black font-display text-base font-medium capitalize rounded-full hover:bg-gold-light hover:scale-[1.02] transition-all duration-300"
                >
                  Agendar Consultoria
                </a>
              </div>
            </AnimateOnScroll>
          </Container>
        </section>

        {/* Intro */}
        <section className="bg-black py-24 md:py-32">
          <Container className="text-center max-w-3xl">
            <AnimateOnScroll>
              <p className="font-body text-lg md:text-xl text-text-light leading-8">
                Três propostas únicas, criadas para atender diferentes estilos, sempre com cuidado, personalização e alto padrão. Cada experiência foi inspirada em ícones da realeza britânica — porque no seu grande dia, você merece se sentir uma rainha.
              </p>
            </AnimateOnScroll>
          </Container>
        </section>

        {/* 3 Experiências */}
        {EXPERIENCES.map((exp, i) => (
          <section
            key={exp.name}
            className={i % 2 === 0 ? "bg-charcoal" : "bg-black"}
          >
            <div className={`grid grid-cols-1 lg:grid-cols-2 min-h-[600px] ${i % 2 !== 0 ? "lg:[direction:rtl]" : ""}`}>
              {/* Image */}
              <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
                <Image
                  src={exp.image}
                  alt={exp.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>

              {/* Content */}
              <div className={`flex flex-col justify-center px-8 py-16 md:px-16 lg:px-20 ${i % 2 !== 0 ? "lg:[direction:ltr]" : ""}`}>
                <AnimateOnScroll variant={i % 2 === 0 ? "fadeRight" : "fadeLeft"}>
                  <div className="text-gold mb-4">{exp.icon}</div>
                  <p className="font-body text-xs font-medium tracking-widest uppercase text-gold-light mb-2">
                    {exp.tagline}
                  </p>
                  <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium capitalize text-white leading-tight">
                    {exp.name}
                  </h2>
                  <p className="mt-6 font-body text-base text-text-light leading-7 max-w-lg">
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  <ul className="mt-8 space-y-3">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <Check size={16} className="text-gold mt-1 shrink-0" />
                        <span className="font-body text-sm text-text-light">{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex items-center gap-4">
                    <a
                      href={getWhatsAppLink("noivas")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-8 py-3.5 bg-white text-black font-display text-sm font-medium capitalize rounded-full hover:bg-gold-light hover:scale-[1.02] transition-all duration-300"
                    >
                      Quero essa experiência
                    </a>
                    <span className="font-body text-xs text-text-muted italic">
                      {exp.price}
                    </span>
                  </div>
                </AnimateOnScroll>
              </div>
            </div>
          </section>
        ))}

        {/* Cortesias */}
        <section className="bg-cream py-24 md:py-32">
          <Container className="text-center">
            <AnimateOnScroll>
              <Gift size={36} className="text-gold-dark mx-auto mb-4" strokeWidth={1.2} />
              <h2 className="font-display text-3xl md:text-4xl font-medium capitalize text-charcoal">
                Cortesias Especiais
              </h2>
              <p className="mt-3 font-body text-sm text-text-muted italic">
                Exclusivas para clientes novas
              </p>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                {COURTESIES.map((item, i) => (
                  <div key={i} className="bg-white border border-pearl rounded-lg p-6 text-center">
                    <Sparkles size={20} className="text-gold mx-auto mb-3" />
                    <p className="font-body text-sm text-charcoal font-medium">{item}</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 font-body text-xs text-text-muted">
                Venha nos conhecer e aproveite essas cortesias no seu primeiro atendimento.
              </p>
            </AnimateOnScroll>
          </Container>
        </section>

        {/* Galeria */}
        <section className="bg-black py-24 md:py-32">
          <Container>
            <AnimateOnScroll className="text-center mb-16">
              <p className="font-body text-sm font-medium tracking-wide text-gold mb-4">Galeria</p>
              <h2 className="font-display text-3xl md:text-4xl font-medium capitalize text-white">
                Momentos Que Ficam Para Sempre
              </h2>
            </AnimateOnScroll>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <AnimateOnScroll key={n} variant="scaleIn" delay={n * 0.05}>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg img-hover-zoom">
                    <Image
                      src={img(`images/noivas/galeria-${String(n).padStart(2, "0")}.webp`)}
                      alt={`Noivas — Galeria ${n}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA Final */}
        <section className="relative py-32 md:py-40 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${img("images/noivas/noivas-cta.webp")})` }}
          />
          <div className="absolute inset-0 bg-black/75" />

          <Container className="relative z-10 text-center">
            <Crown size={40} className="text-gold mx-auto mb-6" strokeWidth={1} />
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium capitalize leading-tight text-white">
              Seu Grande Dia Começa Aqui
            </h2>
            <p className="mt-6 font-body text-lg text-text-light max-w-lg mx-auto leading-7">
              Agende uma consultoria gratuita e descubra qual experiência é perfeita para você.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={getWhatsAppLink("noivas")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-10 py-4 bg-white text-black font-display text-base font-medium capitalize rounded-full hover:bg-gold-light hover:scale-[1.02] transition-all duration-300"
              >
                Agendar Consultoria
              </a>
              <Link
                href="/servicos"
                className="inline-flex items-center px-10 py-4 border border-white/20 text-white font-display text-base font-medium capitalize rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Ver Todos os Serviços
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
