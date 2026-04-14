import { NavItem, Service, TeamMember, Testimonial, Stat } from "@/types";

export const WHATSAPP_NUMBER = "5511989812898";
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const WHATSAPP_MESSAGES = {
  header: "Olá! Gostaria de agendar um horário.",
  hero: "Olá! Gostaria de agendar um horário no Espaço Bless Concept.",
  float: "Olá! Preciso de ajuda.",
  cta: "Olá! Gostaria de agendar minha transformação no Espaço Bless Concept.",
  noivas: "Olá! Gostaria de saber sobre o pacote exclusivo para noivas.",
} as const;

export function getWhatsAppLink(context: keyof typeof WHATSAPP_MESSAGES): string {
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(WHATSAPP_MESSAGES[context])}`;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Serviços", href: "#servicos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Equipe", href: "#equipe" },
  { label: "Espaço", href: "#espaco" },
  { label: "Contato", href: "#contato" },
];

export const SERVICES: Service[] = [
  {
    id: "cabelos",
    title: "Beleza & Cabelos",
    description: "Corte, coloração, mechas, tratamentos capilares e reconstrução com produtos premium.",
    image: "/images/services/cabelos.webp",
    slug: "beleza-cabelos",
  },
  {
    id: "depilacao",
    title: "Depilação",
    description: "Depilação com cera, linha e técnicas avançadas para pele sensível.",
    image: "/images/services/depilacao.webp",
    slug: "depilacao",
  },
  {
    id: "estetica-corporal",
    title: "Estética Corporal",
    description: "Drenagem linfática, modelagem corporal e tratamentos redutores.",
    image: "/images/services/estetica-corporal.webp",
    slug: "estetica-corporal",
  },
  {
    id: "estetica-facial",
    title: "Estética Facial",
    description: "Limpeza de pele, peeling, harmonização e protocolos anti-idade.",
    image: "/images/services/estetica-facial.webp",
    slug: "estetica-facial",
  },
  {
    id: "manicure",
    title: "Manicure & Pedicure",
    description: "Esmaltação em gel, spa dos pés, nail art e cuidados completos.",
    image: "/images/services/manicure.webp",
    slug: "manicure-pedicure",
  },
  {
    id: "maquiagem",
    title: "Maquiagem",
    description: "Maquiagem social, editorial e para noivas com produtos de alta performance.",
    image: "/images/services/maquiagem.webp",
    slug: "maquiagem",
  },
  {
    id: "massagem",
    title: "Massagem & Bem-Estar",
    description: "Massagem relaxante, pedras quentes, aromaterapia e reflexologia.",
    image: "/images/services/massagem.webp",
    slug: "massagem-bem-estar",
  },
];

export const BRIDAL_SERVICE: Service = {
  id: "noivas",
  title: "Experiência Noivas",
  description:
    "Um dia especial merece um atendimento à altura. Pacotes exclusivos com espaço privativo, cabelo, maquiagem, estética facial e corporal. Cuidamos de cada detalhe para que você brilhe no seu grande dia.",
  image: "/images/services/noivas.webp",
  slug: "noivas",
  featured: true,
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "1",
    name: "Profissional 1",
    role: "Hair Stylist",
    specialty: "Coloração & Mechas",
    image: "/images/team/membro-01.webp",
  },
  {
    id: "2",
    name: "Profissional 2",
    role: "Esteticista",
    specialty: "Estética Facial",
    image: "/images/team/membro-02.webp",
  },
  {
    id: "3",
    name: "Profissional 3",
    role: "Nail Designer",
    specialty: "Nail Art & Spa",
    image: "/images/team/membro-03.webp",
  },
  {
    id: "4",
    name: "Profissional 4",
    role: "Massoterapeuta",
    specialty: "Massagem Terapêutica",
    image: "/images/team/membro-04.webp",
  },
  {
    id: "5",
    name: "Profissional 5",
    role: "Maquiadora",
    specialty: "Maquiagem Social & Noivas",
    image: "/images/team/membro-05.webp",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Ana Clara M.",
    service: "Coloração & Mechas",
    text: "O atendimento é impecável. Saí do salão me sentindo outra pessoa. Os profissionais realmente entendem o que você quer e entregam além das expectativas.",
    rating: 5,
  },
  {
    id: "2",
    name: "Beatriz S.",
    service: "Estética Facial",
    text: "Ambiente sofisticado e acolhedor. O protocolo de limpeza de pele foi incrível, minha pele nunca esteve tão bonita. Recomendo de olhos fechados.",
    rating: 5,
  },
  {
    id: "3",
    name: "Carolina R.",
    service: "Pacote Noiva",
    text: "Fiz todo o meu pacote de noiva na Bless e foi a melhor decisão. Desde a prova de maquiagem até o dia do casamento, tudo perfeito. Me senti uma princesa.",
    rating: 5,
  },
  {
    id: "4",
    name: "Débora L.",
    service: "Massagem Relaxante",
    text: "A massagem relaxante é divina. O ambiente, os aromas, a técnica — tudo pensado nos mínimos detalhes. Virou meu ritual mensal de autocuidado.",
    rating: 5,
  },
];

export const STATS: Stat[] = [
  { value: 10, suffix: "+", label: "Anos de experiência" },
  { value: 5000, suffix: "+", label: "Clientes atendidas" },
  { value: 7, suffix: "", label: "Especialidades" },
];

export const BUSINESS_INFO = {
  name: "Espaço Bless Concept",
  tagline: "Beleza é uma arte e você é nossa obra-prima",
  address: "Av. Casa Verde, nº 162, Piso Superior",
  complement: "Acima do restaurante",
  city: "São Paulo - SP",
  phone: "(11) 98981-2898",
  email: "atendimento@blessconcept.com.br",
  hours: {
    weekdays: "9h às 20h",
    saturday: "9h às 20h",
    sunday: "Fechado",
  },
  social: {
    instagram: "https://instagram.com/espacoblessconcept",
    facebook: "https://facebook.com/espacoblessconcept",
  },
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.1!2d-46.65!3d-23.51!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMwJzM2LjAiUyA0NsKwMzknMDAuMCJX!5e0!3m2!1spt-BR!2sbr",
} as const;

export const MARQUEE_ITEMS = [
  "CABELOS",
  "DEPILAÇÃO",
  "ESTÉTICA FACIAL",
  "ESTÉTICA CORPORAL",
  "MANICURE",
  "MAQUIAGEM",
  "MASSAGEM",
  "NOIVAS",
];

export const PILLARS = [
  {
    icon: "award",
    title: "Excelência",
    description: "Profissionais com formação internacional e atualização constante nas últimas tendências.",
  },
  {
    icon: "gem",
    title: "Exclusividade",
    description: "Atendimento personalizado em ambiente privativo e sofisticado, pensado para você.",
  },
  {
    icon: "sparkles",
    title: "Produtos Premium",
    description: "Trabalhamos apenas com as melhores marcas do mercado para resultados excepcionais.",
  },
  {
    icon: "heart",
    title: "Experiência",
    description: "Cada visita é uma jornada completa de cuidado, bem-estar e transformação pessoal.",
  },
];
