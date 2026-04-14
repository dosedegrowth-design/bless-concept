import { NavItem, Service, TeamMember, Testimonial, Stat } from "@/types";
import { img } from "@/lib/supabase";

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

export function getWhatsAppServiceLink(serviceName: string): string {
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(`Olá! Tenho interesse no serviço de ${serviceName} no Espaço Bless Concept.`)}`;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Serviços", href: "/servicos" },
  { label: "Noivas", href: "/noivas" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Espaço", href: "/#espaco" },
  { label: "Contato", href: "/#contato" },
];

export const SERVICES: Service[] = [
  {
    id: "cabelos",
    title: "Cabelos",
    description: "Nossos profissionais são especializados em visagismo, proporcionando cortes, cores e tratamentos sob medida para valorizar seu estilo e a saúde dos seus fios.",
    image: img("images/services/cabelos.webp"),
    slug: "cabelos",
    longDescription: "Nossos profissionais são especializados em visagismo, proporcionando cortes, cores e tratamentos sob medida para valorizar seu estilo e a saúde dos seus fios. Trabalhamos com técnicas das principais escolas internacionais, garantindo resultados modernos e personalizados.",
    highlights: [
      "Cortes femininos, masculinos e infantis",
      "Escova e penteados",
      "Coloração, mechas e tonalização",
      "Hidratação, reconstrução e tratamentos capilares",
      "Relaxamento e alisamento",
      "Penteados para todas as ocasiões",
    ],
    gallery: [
      img("images/services/cabelos-01.webp"),
      img("images/services/cabelos-02.webp"),
      img("images/services/cabelos-03.webp"),
    ],
  },
  {
    id: "depilacao",
    title: "Depilação",
    description: "Para uma pele sempre macia e livre de pelos, oferecemos serviços de depilação com cera quente e técnicas seguras.",
    image: img("images/services/depilacao.webp"),
    slug: "depilacao",
    longDescription: "Para uma pele sempre macia e livre de pelos, oferecemos serviços de depilação com cera quente e técnicas seguras, proporcionando conforto, higiene e excelentes resultados.",
    highlights: [
      "Buço, axilas e rosto",
      "Pernas (inteira, meia-perna e coxas)",
      "Virilha (simples ou completa)",
      "Glúteos, costas, braços e abdômen",
      "Tratamentos progressivos e alisamentos",
      "Nariz e orelha",
    ],
    gallery: [
      img("images/services/depilacao-01.webp"),
      img("images/services/depilacao-02.webp"),
    ],
  },
  {
    id: "estetica-corporal",
    title: "Estética Corporal",
    description: "Tratamentos corporais que remodelam, rejuvenescem e melhoram a qualidade da pele, com protocolos exclusivos.",
    image: img("images/services/estetica-corporal.webp"),
    slug: "estetica-corporal",
    longDescription: "Cuidar do corpo é investir em bem-estar, autoestima e saúde. Oferecemos tratamentos corporais que remodelam, rejuvenescem e melhoram a qualidade da pele, com protocolos exclusivos e atendimento personalizado.",
    highlights: [
      "Massagem relaxante e terapêutica",
      "Massagem modeladora e drenagem linfática",
      "Bambuterapia",
      "Peeling corporal para estrias e renovação da pele",
      "Procedimentos para harmonização corporal (ex.: Glúteo Max)",
    ],
    gallery: [
      img("images/services/estetica-corporal-01.webp"),
      img("images/services/estetica-corporal-02.webp"),
    ],
  },
  {
    id: "estetica-facial",
    title: "Estética Facial",
    description: "Realce sua beleza natural e conquiste uma pele saudável e radiante com nossos protocolos personalizados.",
    image: img("images/services/estetica-facial.webp"),
    slug: "estetica-facial",
    longDescription: "Realce sua beleza natural e conquiste uma pele saudável e radiante. Nossos protocolos combinam tecnologia, expertise e produtos de alta performance para resultados visíveis e duradouros.",
    highlights: [
      "Limpeza de pele profunda",
      "Peelings químicos e mecânicos",
      "Design e henna de sobrancelhas",
      "Micropigmentação (sobrancelhas, lábios, olhos)",
      "Extensão de cílios (fio a fio, híbrida, volume russo)",
      "Procedimentos estéticos: Botox, preenchimentos, bioestimuladores de colágeno",
    ],
    gallery: [
      img("images/services/estetica-facial-01.webp"),
      img("images/services/estetica-facial-02.webp"),
      img("images/services/estetica-facial-03.webp"),
    ],
  },
  {
    id: "manicure",
    title: "Manicure e Pedicure",
    description: "Mãos e pés bem cuidados são um detalhe que faz toda a diferença. Técnicas modernas e produtos de alta qualidade.",
    image: img("images/services/manicure.webp"),
    slug: "manicure-pedicure",
    longDescription: "Mãos e pés bem cuidados são um detalhe que faz toda a diferença. Trabalhamos com técnicas modernas e produtos de alta qualidade para garantir beleza e saúde.",
    highlights: [
      "Esmaltação tradicional e em gel",
      "Blindagem de unhas",
      "Banho de gel",
      "Aplicação de fibra ou gel",
      "Spa dos pés e reflexologia",
      "Esmaltação decorativa",
    ],
    gallery: [
      img("images/services/manicure-01.webp"),
      img("images/services/manicure-02.webp"),
    ],
  },
  {
    id: "maquiagem",
    title: "Maquiagem",
    description: "Sua beleza realçada para qualquer ocasião. Técnicas modernas para valorizar seus traços.",
    image: img("images/services/maquiagem.webp"),
    slug: "maquiagem",
    longDescription: "Sua beleza realçada para qualquer ocasião. Nossos maquiadores trabalham técnicas modernas para valorizar seus traços, seja para o dia a dia ou eventos especiais.",
    highlights: [
      "Maquiagem casual",
      "Produções para eventos e festas",
      "Maquiagem para noivas",
      "Consultoria de maquiagem personalizada",
    ],
    gallery: [
      img("images/services/maquiagem-01.webp"),
      img("images/services/maquiagem-02.webp"),
    ],
  },
  {
    id: "massagem",
    title: "Massagem & Bem-Estar",
    description: "Equilibre corpo e mente com nossos protocolos exclusivos de relaxamento e terapia.",
    image: img("images/services/massagem.webp"),
    slug: "massagem-bem-estar",
    longDescription: "Equilibre corpo e mente com nossos protocolos exclusivos. Técnicas de relaxamento e abordagens terapêuticas que reduzem tensões, melhoram a circulação e proporcionam bem-estar imediato.",
    highlights: [
      "Massagem relaxante",
      "Massagem modeladora",
      "Drenagem linfática manual e facial",
      "Massagem com cristais, pedras quentes ou bambu",
      "Reflexologia e escalda-pés",
    ],
    gallery: [
      img("images/services/massagem-01.webp"),
      img("images/services/massagem-02.webp"),
    ],
  },
];

export const BRIDAL_SERVICE: Service = {
  id: "noivas",
  title: "Experiência Noivas",
  description:
    "Espaço exclusivo para noivas, com pacotes personalizados para o seu grande dia, incluindo cabelo, maquiagem e estética.",
  image: img("images/services/noivas.webp"),
  slug: "noivas",
  featured: true,
  longDescription: "O dia mais especial da sua vida merece um preparo à altura. No Espaço Bless Concept, oferecemos uma experiência completa para noivas, com espaço privativo, ambiente acolhedor e profissionais dedicados exclusivamente ao seu cuidado. Do cabelo à maquiagem, da estética facial aos últimos retoques, cada momento é pensado para que você se sinta a mais linda versão de si mesma.",
  highlights: [
    "Espaço privativo exclusivo para noivas",
    "Prova de penteado e maquiagem",
    "Cabelo e maquiagem no dia do casamento",
    "Protocolos de estética facial pré-casamento",
    "Tratamentos corporais preparatórios",
    "Manicure e pedicure especial noiva",
    "Pacotes personalizados para madrinhas",
    "Day bride — dia da noiva completo",
  ],
  gallery: [
    img("images/services/noivas-01.webp"),
    img("images/services/noivas-02.webp"),
    img("images/services/noivas-03.webp"),
  ],
};

export function getAllServices(): Service[] {
  return [...SERVICES, BRIDAL_SERVICE];
}

export function getServiceBySlug(slug: string): Service | undefined {
  return getAllServices().find((s) => s.slug === slug);
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "1",
    name: "Profissional 1",
    role: "Hair Stylist",
    specialty: "Coloração & Mechas",
    image: img("images/team/membro-01.webp"),
  },
  {
    id: "2",
    name: "Profissional 2",
    role: "Esteticista",
    specialty: "Estética Facial",
    image: img("images/team/membro-02.webp"),
  },
  {
    id: "3",
    name: "Profissional 3",
    role: "Nail Designer",
    specialty: "Nail Art & Spa",
    image: img("images/team/membro-03.webp"),
  },
  {
    id: "4",
    name: "Profissional 4",
    role: "Massoterapeuta",
    specialty: "Massagem Terapêutica",
    image: img("images/team/membro-04.webp"),
  },
  {
    id: "5",
    name: "Profissional 5",
    role: "Maquiadora",
    specialty: "Maquiagem Social & Noivas",
    image: img("images/team/membro-05.webp"),
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
  description: "Um salão de beleza, estética avançada e espaço exclusivo para noivas. Um novo padrão de cuidado, sofisticação e experiência.",
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
    description: "Trabalhamos com diversas linhas premium, incluindo opções veganas e cruelty-free.",
  },
  {
    icon: "heart",
    title: "Experiência",
    description: "Cada visita é uma jornada completa de cuidado, bem-estar e transformação pessoal.",
  },
];

export const FAQ = [
  {
    question: "Como faço para agendar um horário?",
    answer: "Você pode agendar pelo WhatsApp, pelo formulário do site ou diretamente na recepção do salão.",
  },
  {
    question: "Vocês trabalham com produtos veganos e cruelty-free?",
    answer: "Sim! Temos diversas linhas veganas e cruelty-free disponíveis. Basta informar sua preferência no agendamento.",
  },
  {
    question: "Tenho alergias ou sensibilidades. Como funciona?",
    answer: "Nosso atendimento é 100% personalizado. Fazemos uma avaliação prévia dos produtos para garantir sua segurança e conforto.",
  },
  {
    question: "Posso fazer mais de um serviço no mesmo dia?",
    answer: "Claro! Nossa agenda é flexível para você aproveitar ao máximo sua visita e combinar diferentes serviços.",
  },
  {
    question: "Quais formas de pagamento vocês aceitam?",
    answer: "Aceitamos Pix, débito, crédito e dinheiro. Para pacotes especiais como noivas, consulte nossas políticas de sinal.",
  },
];
