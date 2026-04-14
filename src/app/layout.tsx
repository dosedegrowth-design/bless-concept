import type { Metadata } from "next";
import { Kalnia, Pontano_Sans } from "next/font/google";
import "./globals.css";

const kalnia = Kalnia({
  variable: "--font-kalnia",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const pontano = Pontano_Sans({
  variable: "--font-pontano",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Espaço Bless Concept | Salão Premium em São Paulo",
  description:
    "Beleza é uma arte e você é nossa obra-prima. Salão premium em São Paulo com serviços de cabelo, estética, maquiagem, massagem e pacotes exclusivos para noivas.",
  keywords: [
    "salão de beleza",
    "salão premium",
    "São Paulo",
    "cabelo",
    "estética",
    "maquiagem",
    "noivas",
    "massagem",
    "Bless Concept",
  ],
  openGraph: {
    title: "Espaço Bless Concept | Salão Premium em São Paulo",
    description:
      "Beleza é uma arte e você é nossa obra-prima. Serviços de cabelo, estética, maquiagem, massagem e pacotes exclusivos para noivas.",
    url: "https://espaçoblessconcept.com.br",
    siteName: "Espaço Bless Concept",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${kalnia.variable} ${pontano.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
