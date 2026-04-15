import type { MetadataRoute } from "next";
import { getAllServices } from "@/lib/constants";

const SITE_URL = "https://dashboardsupervisao.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const services = getAllServices();

  const servicePages = services.map((service) => ({
    url: `${SITE_URL}/servicos/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/servicos`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/noivas`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...servicePages,
  ];
}
