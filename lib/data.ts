import type { LucideIcon } from 'lucide-react';
import {
  Plane,
  Hotel,
  Car,
  Stamp,
  Globe2,
  ShieldCheck,
  Clock,
  Headset,
} from 'lucide-react';

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  cta: { label: string; href: string };
};

export const services: Service[] = [
  {
    id: 'visa',
    title: 'Visa Assistance',
    description:
      'End-to-end visa support — document checklists, application reviews, and embassy liaison for tourist, business, and transit visas across 80+ countries.',
    icon: Stamp,
    features: ['80+ countries', 'Document review', 'Embassy liaison'],
    cta: { label: 'Start visa application', href: '/contact' },
  },
  {
    id: 'flights',
    title: 'Flight Reservations',
    description:
      'Curated flight options across every major carrier, with flexible fare classes, seat selection, and real-time price monitoring to lock in the best rate.',
    icon: Plane,
    features: ['All major carriers', 'Flexible fares', 'Price monitoring'],
    cta: { label: 'Search flights', href: '/contact' },
  },
  {
    id: 'hotels',
    title: 'Hotel Booking',
    description:
      'Hand-picked stays from boutique riads to five-star resorts, with exclusive member rates and complimentary upgrades when available.',
    icon: Hotel,
    features: ['Boutique & luxury', 'Member rates', 'Free upgrades'],
    cta: { label: 'Find your stay', href: '/contact' },
  },
  {
    id: 'cars',
    title: 'Car Rental',
    description:
      'Reliable vehicles with transparent pricing, full insurance options, and door-to-door delivery in 120+ cities worldwide.',
    icon: Car,
    features: ['120+ cities', 'Full insurance', 'Door-to-door delivery'],
    cta: { label: 'Reserve a car', href: '/contact' },
  },
];

export type Destination = {
  id: string;
  name: string;
  country: string;
  image: string;
  alt: string;
  tagline: string;
  description: string;
  priceFrom: number;
  duration: string;
  rating: number;
  tags: string[];
};

export const destinations: Destination[] = [
  {
    id: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    image:
      'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400',
    alt: 'Blue-domed churches of Oia above the Aegean Sea in Santorini, Greece',
    tagline: 'Cliffside villages above the Aegean',
    description:
      'Whitewashed terraces, indigo domes, and sunsets that melt into the caldera — Santorini is the Cyclades at their most cinematic.',
    priceFrom: 1480,
    duration: '7 nights',
    rating: 4.9,
    tags: ['Islands', 'Romance', 'Sunsets'],
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    image:
      'https://images.pexels.com/photos/39472103/pexels-photo-39472103.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400',
    alt: 'Lush green terraced rice fields of Ubud, Bali, Indonesia',
    tagline: 'Rice terraces and temple mornings',
    description:
      'Dawn rituals at jungle temples, surf at midday, and evenings among Ubud’s emerald rice terraces — Bali moves at its own soulful rhythm.',
    priceFrom: 1190,
    duration: '10 nights',
    rating: 4.8,
    tags: ['Jungle', 'Wellness', 'Culture'],
  },
  {
    id: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    image:
      'https://images.pexels.com/photos/16226231/pexels-photo-16226231.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400',
    alt: 'A Japanese pagoda framed by cherry blossoms in springtime Kyoto',
    tagline: 'Ancient capitals in bloom',
    description:
      'Lantern-lit lanes, raked Zen gardens, and a thousand torii gates — Kyoto distills a thousand years of Japanese craft into a single walkable city.',
    priceFrom: 2150,
    duration: '8 nights',
    rating: 4.9,
    tags: ['Heritage', 'Gardens', 'Cuisine'],
  },
  {
    id: 'swiss-alps',
    name: 'Swiss Alps',
    country: 'Switzerland',
    image:
      'https://images.pexels.com/photos/6899674/pexels-photo-6899674.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400',
    alt: 'Snow-capped alpine mountains reflected on a calm Swiss lake',
    tagline: 'Peaks, lakes, and glacier air',
    description:
      'Cog-railways to jagged summits, lakeside chalets, and valleys that turn golden at dusk — the Swiss Alps are engineered for wonder.',
    priceFrom: 2680,
    duration: '6 nights',
    rating: 4.9,
    tags: ['Mountains', 'Adventure', 'Scenic rail'],
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'UAE',
    image:
      'https://images.pexels.com/photos/1619569/pexels-photo-1619569.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400',
    alt: "Dubai's skyline glowing at golden hour over the waterfront",
    tagline: 'Golden hour at the Gulf',
    description:
      'From desert dunes at dawn to the world’s tallest skyline at dusk — Dubai pairs futurist architecture with warm Arabian hospitality.',
    priceFrom: 1750,
    duration: '5 nights',
    rating: 4.7,
    tags: ['City', 'Luxury', 'Desert'],
  },
];

export type Stat = {
  id: string;
  value: number;
  suffix: string;
  label: string;
  icon: LucideIcon;
};

export const stats: Stat[] = [
  { id: 'travelers', value: 48000, suffix: '+', label: 'Happy travellers', icon: Globe2 },
  { id: 'countries', value: 80, suffix: '+', label: 'Countries served', icon: ShieldCheck },
  { id: 'years', value: 15, suffix: '', label: 'Years of expertise', icon: Clock },
  { id: 'support', value: 24, suffix: '/7', label: 'Concierge support', icon: Headset },
];

export type Highlight = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const highlights: Highlight[] = [
  {
    id: 'concierge',
    title: 'Personal trip concierge',
    description:
      'A dedicated advisor plans, books, and adjusts your journey around the clock — one name, one number, every time zone.',
    icon: Headset,
  },
  {
    id: 'best-price',
    title: 'Best-price guarantee',
    description:
      'Find a lower published rate within 24 hours and we match it — plus a travel credit for the trouble.',
    icon: ShieldCheck,
  },
  {
    id: 'local',
    title: 'Local experts on the ground',
    description:
      'Our partners live where you’re going. Guides, drivers, and hosts who open doors no algorithm can.',
    icon: Globe2,
  },
];

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  rating: number;
  initials: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Amara Okafor',
    role: 'Architect',
    location: 'Lagos, Nigeria',
    initials: 'AO',
    rating: 5,
    quote:
      'WAYFARER handled our Schengen visa in nine days and re-routed a cancelled flight without me lifting a finger. The whole trip felt effortless — that’s the luxury.',
  },
  {
    id: 't2',
    name: 'Daniel Reyes',
    role: 'Photographer',
    location: 'Mexico City, Mexico',
    initials: 'DR',
    rating: 5,
    quote:
      'Their Kyoto itinerary was uncanny — the right temple at the right hour, a tea house I’d never have found. I’ve travelled with planners before; none cared like this.',
  },
  {
    id: 't3',
    name: 'Priya Nair',
    role: 'Cardiologist',
    location: 'Mumbai, India',
    initials: 'PN',
    rating: 5,
    quote:
      'I had two weeks of leave and a five-page wishlist. WAYFARER turned it into one seamless Swiss rail journey. Every transfer was waiting, every hotel exceeded brief.',
  },
];

export const heroImage =
  'https://images.pexels.com/photos/824512/pexels-photo-824512.jpeg?auto=compress&cs=tinysrgb&h=1400&w=2400';

export const contactServices = [
  'Visa Assistance',
  'Flight Reservations',
  'Hotel Booking',
  'Car Rental',
  'Tailor-made itinerary',
  'Group & corporate travel',
] as const;
