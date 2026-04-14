import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="group bg-charcoal border border-white/[0.06] rounded-lg overflow-hidden hover:border-gold/30 transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-[600ms] group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/15" />
      </div>

      {/* Content */}
      <div className="p-7">
        <h3 className="font-display text-lg font-medium text-white">
          {service.title}
        </h3>
        <p className="mt-2 font-body text-sm text-text-light leading-relaxed">
          {service.description}
        </p>
        <Link
          href={`/servicos/${service.slug}`}
          className="mt-4 inline-flex items-center gap-2 font-body text-sm font-medium text-gold hover:text-gold-light transition-colors group/link"
        >
          <span>Ver detalhes</span>
          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover/link:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
}
