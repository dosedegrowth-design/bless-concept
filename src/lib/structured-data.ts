import { BUSINESS_INFO, SERVICES, BRIDAL_SERVICE, TESTIMONIALS, FAQ } from "./constants";

const SITE_URL = "https://dashboardsupervisao.vercel.app";

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": `${SITE_URL}/#business`,
    name: BUSINESS_INFO.name,
    description: BUSINESS_INFO.description,
    url: SITE_URL,
    telephone: "+5511989812898",
    email: BUSINESS_INFO.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_INFO.address,
      addressLocality: "São Paulo",
      addressRegion: "SP",
      postalCode: "02519-000",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -23.51,
      longitude: -46.65,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "20:00",
      },
    ],
    priceRange: "$$",
    image: `${SITE_URL}/images/hero/hero-bg.webp`,
    sameAs: [
      BUSINESS_INFO.social.instagram,
      BUSINESS_INFO.social.facebook,
    ],
    areaServed: {
      "@type": "City",
      name: "São Paulo",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: String(TESTIMONIALS.length),
      bestRating: "5",
      worstRating: "1",
    },
    review: TESTIMONIALS.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(t.rating),
        bestRating: "5",
      },
      reviewBody: t.text,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços de Beleza",
      itemListElement: [...SERVICES, BRIDAL_SERVICE].map((s, i) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.description,
          url: `${SITE_URL}/servicos/${s.slug}`,
          provider: {
            "@type": "BeautySalon",
            name: BUSINESS_INFO.name,
          },
        },
        position: i + 1,
      })),
    },
  };
}

export function getServiceSchema(service: typeof SERVICES[0]) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.longDescription || service.description,
    url: `${SITE_URL}/servicos/${service.slug}`,
    provider: {
      "@type": "BeautySalon",
      name: BUSINESS_INFO.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: BUSINESS_INFO.address,
        addressLocality: "São Paulo",
        addressRegion: "SP",
        addressCountry: "BR",
      },
      telephone: "+5511989812898",
    },
    areaServed: {
      "@type": "City",
      name: "São Paulo",
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BUSINESS_INFO.name,
    url: SITE_URL,
    description: BUSINESS_INFO.description,
    inLanguage: "pt-BR",
    publisher: {
      "@type": "Organization",
      name: BUSINESS_INFO.name,
      url: SITE_URL,
    },
  };
}
