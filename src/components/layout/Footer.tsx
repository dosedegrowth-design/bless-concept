import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { Container } from "./Container";
import { NAV_ITEMS, SERVICES, BUSINESS_INFO, getWhatsAppLink } from "@/lib/constants";
import { img } from "@/lib/supabase";

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-charcoal border-t border-white/5">
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-1">
            <Link href="/">
              <Image
                src={img("images/logo/logo.png")}
                alt="Espaço Bless Concept"
                width={160}
                height={56}
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 font-body text-sm text-text-light leading-relaxed">
              {BUSINESS_INFO.tagline}
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href={BUSINESS_INFO.social.instagram} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-gold transition-colors" aria-label="Instagram">
                <InstagramIcon size={20} />
              </a>
              <a href={BUSINESS_INFO.social.facebook} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-gold transition-colors" aria-label="Facebook">
                <FacebookIcon size={20} />
              </a>
              <a href={getWhatsAppLink("float")} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-gold transition-colors" aria-label="WhatsApp">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-base font-medium text-gold mb-5">Menu</h4>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="font-body text-sm text-text-light hover:text-white transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base font-medium text-gold mb-5">Serviços</h4>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link href={`/servicos/${service.slug}`} className="font-body text-sm text-text-light hover:text-white transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/noivas" className="font-body text-sm text-gold-light hover:text-gold transition-colors">
                  Experiência Noivas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base font-medium text-gold mb-5">Contato</h4>
            <div className="space-y-3 font-body text-sm text-text-light">
              <p>{BUSINESS_INFO.address}</p>
              <p>{BUSINESS_INFO.complement}</p>
              <p>{BUSINESS_INFO.city}</p>
              <p className="mt-4">
                <a href={`tel:+55${BUSINESS_INFO.phone.replace(/\D/g, "")}`} className="hover:text-white transition-colors">
                  {BUSINESS_INFO.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-white transition-colors">
                  {BUSINESS_INFO.email}
                </a>
              </p>
              <div className="mt-4 pt-4 border-t border-white/5">
                <p className="text-text-muted text-xs">Seg-Sáb: {BUSINESS_INFO.hours.weekdays}</p>
                <p className="text-text-muted text-xs">Dom: {BUSINESS_INFO.hours.sunday}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/5">
        <Container className="py-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="font-body text-xs text-text-muted">
            &copy; {new Date().getFullYear()} {BUSINESS_INFO.name}. Todos os direitos reservados.
          </p>
          <p className="font-body text-xs text-text-muted">
            Desenvolvido por{" "}
            <a href="https://dosedegrowth.com" target="_blank" rel="noopener noreferrer" className="text-gold-dark hover:text-gold transition-colors">
              Dose de Growth
            </a>
          </p>
        </Container>
      </div>
    </footer>
  );
}
