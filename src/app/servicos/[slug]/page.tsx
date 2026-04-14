import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { Container } from "@/components/layout/Container";
import { getAllServices, getServiceBySlug, getWhatsAppServiceLink } from "@/lib/constants";

export function generateStaticParams() {
  return getAllServices().map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Serviço não encontrado" };
  return {
    title: `${service.title} | Espaço Bless Concept`,
    description: service.description,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const allServices = getAllServices();
  const currentIndex = allServices.findIndex((s) => s.slug === slug);
  const prevService = currentIndex > 0 ? allServices[currentIndex - 1] : null;
  const nextService = currentIndex < allServices.length - 1 ? allServices[currentIndex + 1] : null;
  const otherServices = allServices.filter((s) => s.slug !== slug).slice(0, 4);

  return (
    <>
      <Header />
      <main>
        {/* Hero Banner */}
        <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          </div>
          <Container className="relative z-10 pb-12">
            <Link
              href="/servicos"
              className="inline-flex items-center gap-2 font-body text-sm text-text-light hover:text-white transition-colors mb-6"
            >
              <ArrowLeft size={16} />
              <span>Voltar aos serviços</span>
            </Link>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium capitalize text-white">
              {service.title}
            </h1>
          </Container>
        </section>

        {/* Content */}
        <section className="bg-black py-20 md:py-28">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
              {/* Main content */}
              <div className="lg:col-span-3">
                <p className="font-body text-lg text-text-light leading-8">
                  {service.longDescription || service.description}
                </p>

                {/* Highlights */}
                {service.highlights && service.highlights.length > 0 && (
                  <div className="mt-12">
                    <h2 className="font-display text-2xl font-medium text-white mb-6">
                      O que oferecemos
                    </h2>
                    <ul className="space-y-4">
                      {service.highlights.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check size={18} className="text-gold mt-1 shrink-0" />
                          <span className="font-body text-base text-text-light">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Gallery */}
                {service.gallery && service.gallery.length > 0 && (
                  <div className="mt-16">
                    <h2 className="font-display text-2xl font-medium text-white mb-6">
                      Galeria
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {service.gallery.map((img, i) => (
                        <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg img-hover-zoom">
                          <Image
                            src={img}
                            alt={`${service.title} - Foto ${i + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-2">
                <div className="sticky top-24 space-y-8">
                  {/* CTA Card */}
                  <div className="bg-charcoal border border-white/[0.06] rounded-lg p-8">
                    <h3 className="font-display text-xl font-medium text-white mb-3">
                      Agende seu horário
                    </h3>
                    <p className="font-body text-sm text-text-light mb-6">
                      Entre em contato para agendar seu {service.title.toLowerCase()} com nossos profissionais.
                    </p>
                    <a
                      href={getWhatsAppServiceLink(service.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center px-6 py-3.5 bg-white text-black font-display text-base font-medium capitalize rounded-full hover:bg-gold-light hover:scale-[1.02] transition-all duration-300"
                    >
                      Agendar pelo WhatsApp
                    </a>
                  </div>

                  {/* Other Services */}
                  <div className="bg-charcoal border border-white/[0.06] rounded-lg p-8">
                    <h3 className="font-display text-lg font-medium text-white mb-4">
                      Outros serviços
                    </h3>
                    <ul className="space-y-3">
                      {otherServices.map((s) => (
                        <li key={s.id}>
                          <Link
                            href={`/servicos/${s.slug}`}
                            className="flex items-center justify-between font-body text-sm text-text-light hover:text-white transition-colors group"
                          >
                            <span>{s.title}</span>
                            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Prev / Next Navigation */}
            <div className="mt-20 pt-12 border-t border-white/5 grid grid-cols-2 gap-8">
              {prevService ? (
                <Link href={`/servicos/${prevService.slug}`} className="group">
                  <span className="font-body text-xs text-text-muted">Anterior</span>
                  <p className="font-display text-lg font-medium text-white group-hover:text-gold transition-colors mt-1">
                    {prevService.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
              {nextService ? (
                <Link href={`/servicos/${nextService.slug}`} className="group text-right">
                  <span className="font-body text-xs text-text-muted">Próximo</span>
                  <p className="font-display text-lg font-medium text-white group-hover:text-gold transition-colors mt-1">
                    {nextService.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
