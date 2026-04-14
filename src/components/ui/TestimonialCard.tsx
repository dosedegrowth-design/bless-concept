import { Star } from "lucide-react";
import type { Testimonial } from "@/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white border border-pearl rounded-lg p-10 md:p-12 h-full flex flex-col">
      {/* Quote icon */}
      <svg
        className="w-8 h-8 text-gold/30 mb-4 shrink-0"
        viewBox="0 0 40 40"
        fill="currentColor"
      >
        <path d="M8.5 20.5c0-4.4 3.6-8 8-8v-4c-6.6 0-12 5.4-12 12v12h12v-12h-8zm20 0c0-4.4 3.6-8 8-8v-4c-6.6 0-12 5.4-12 12v12h12v-12h-8z" />
      </svg>

      {/* Text */}
      <p className="font-body text-base italic text-charcoal/80 leading-relaxed flex-1">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      {/* Divider */}
      <div className="w-10 h-px bg-gold mt-6 mb-4" />

      {/* Author */}
      <div>
        <p className="font-display text-base font-semibold text-charcoal">
          {testimonial.name}
        </p>
        <p className="font-body text-xs text-text-muted mt-1">{testimonial.service}</p>
        <div className="flex gap-1 mt-2">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} size={14} className="text-gold fill-gold" />
          ))}
        </div>
      </div>
    </div>
  );
}
