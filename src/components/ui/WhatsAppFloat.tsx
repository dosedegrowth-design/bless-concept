"use client";

import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/lib/constants";

export function WhatsAppFloat() {
  return (
    <a
      href={getWhatsAppLink("float")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-whatsapp text-white shadow-lg animate-pulse-whatsapp hover:scale-110 transition-transform duration-300"
      aria-label="Fale conosco pelo WhatsApp"
    >
      <MessageCircle size={26} fill="white" strokeWidth={0} />
    </a>
  );
}
