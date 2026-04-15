import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = "https://dashboardsupervisao.vercel.app";
const SITE_NAME = "Espaço Bless Concept";
const SITE_DESCRIPTION =
  "Salão de beleza premium na Casa Verde, Zona Norte de São Paulo. Cabelos, estética facial e corporal, depilação, manicure, maquiagem, massagem e pacotes exclusivos para noivas. Agende seu horário.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Espaço Bless Concept | Salão de Beleza Premium na Casa Verde - SP",
    template: "%s | Espaço Bless Concept",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "salão de beleza Casa Verde",
    "salão de beleza Zona Norte SP",
    "salão premium São Paulo",
    "cabelo Casa Verde",
    "cabeleireiro Zona Norte",
    "estética facial São Paulo",
    "estética corporal Casa Verde",
    "depilação Zona Norte SP",
    "manicure pedicure Casa Verde",
    "maquiagem profissional SP",
    "massagem relaxante São Paulo",
    "noivas São Paulo",
    "dia da noiva SP",
    "salão para noivas Zona Norte",
    "Bless Concept",
    "Espaço Bless Concept",
    "salão de beleza São Paulo",
    "tratamento capilar Casa Verde",
    "limpeza de pele São Paulo",
    "micropigmentação São Paulo",
    "extensão de cílios SP",
    "visagismo São Paulo",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    title: "Espaço Bless Concept | Salão de Beleza Premium na Casa Verde - SP",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Espaço Bless Concept | Salão Premium na Casa Verde - SP",
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "beauty",
  other: {
    "geo.region": "BR-SP",
    "geo.placename": "São Paulo",
    "geo.position": "-23.51;-46.65",
    "ICBM": "-23.51, -46.65",
    "rating": "general",
    "distribution": "local",
    "revisit-after": "7 days",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${syne.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
