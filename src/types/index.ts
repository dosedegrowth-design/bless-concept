export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  featured?: boolean;
  longDescription?: string;
  highlights?: string[];
  gallery?: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  service: string;
  text: string;
  rating: number;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}
