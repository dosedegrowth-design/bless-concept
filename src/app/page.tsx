import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { Hero } from "@/components/sections/Hero";
import { MarqueeTicker } from "@/components/ui/MarqueeTicker";
import { WhySection } from "@/components/sections/WhySection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { TeamSection } from "@/components/sections/TeamSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MarqueeTicker />
        <WhySection />
        <AboutSection />
        <ServicesSection />
        <GallerySection />
        <TeamSection />
        <TestimonialsSection />
        <LocationSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
