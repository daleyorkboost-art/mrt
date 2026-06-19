import {
  BadgeCheck,
  CalendarDays,
  Camera,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck2,
  Globe2,
  Hotel,
  Plane,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type Package = {
  title: string;
  location: string;
  price: string;
  days: string;
  image: string;
  tags: string[];
};

export type Destination = {
  name: string;
  country: string;
  image: string;
  rating: string;
};

export type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const heroImage =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2400&q=85';

export const packages: Package[] = [
  {
    title: 'Switzerland — The Alpine Crown Jewel',
    location: 'Western Europe',
    price: 'AED 5,500',
    days: '7-14 nights',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=80',
    tags: ['Jungfraujoch', 'Lucerne', 'Swiss Rail Pass'],
  },
  {
    title: 'Italy — La Dolce Vita in Every Piazza',
    location: 'Southern Europe',
    price: 'AED 5,200',
    days: '7-12 nights',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1200&q=80',
    tags: ['Rome', 'Venice', 'Amalfi Coast'],
  },
  {
    title: 'Dubai Marina Dhow Dinner Cruise',
    location: 'Dubai, UAE',
    price: 'AED 120',
    days: '2 hours',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    tags: ['Buffet included', 'Live Tanoura Show', 'Daily 8:30-10:30PM'],
  },
  {
    title: 'Royal Caribbean — 7-Night Western Caribbean Adventure',
    location: 'Caribbean Cruise',
    price: 'AED 3,200',
    days: '7 nights',
    image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1200&q=80',
    tags: ['Miami', 'Cozumel', 'CocoCay'],
  },
  {
    title: 'Museum of the Future — A Postcard from 2071',
    location: 'Dubai, UAE',
    price: 'AED 155',
    days: 'Half day',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    tags: ['Future Technology', 'Sheikh Zayed Road', '9AM-6PM'],
  },
  {
    title: 'Sunrise Desert Balloon Flight + Bedouin Breakfast',
    location: 'Dubai Desert Conservation Reserve',
    price: 'AED 649',
    days: '~5 hours',
    image: 'https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&w=1200&q=80',
    tags: ['Sunrise departure', 'Breakfast included', 'Falconry show'],
  },
];

export const destinations: Destination[] = [
  {
    name: 'Switzerland',
    country: 'Western Europe',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Dubai',
    country: 'UAE',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Caribbean',
    country: 'Cruise Packages',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Italy',
    country: 'Southern Europe',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1000&q=80',
  },
];

export const howItWorks: Feature[] = [
  {
    title: 'Tell us your style',
    description: 'Share the way you like to travel, from secluded wellness to city icons.',
    icon: Compass,
  },
  {
    title: 'AI meets concierge',
    description: 'ARIA blends smart recommendations with curated luxury supplier intelligence.',
    icon: Sparkles,
  },
  {
    title: 'Travel beautifully',
    description: 'Receive polished itineraries, quotes, visa checklists, and support in one place.',
    icon: Plane,
  },
];

export const testimonials = [
  {
    quote: 'MyGlobalTrips turned a vague anniversary idea into the smoothest Maldives and Dubai itinerary we have ever taken.',
    name: 'Aarav Mehta',
    role: 'Founder, Mumbai',
  },
  {
    quote: 'The quote generator and visa checklist made our family Europe trip feel effortless. It looked like a private travel desk.',
    name: 'Nisha Kapoor',
    role: 'Family traveller',
  },
  {
    quote: 'Premium, fast, and detail obsessed. The Dubai day plan had exactly the right pace and restaurant picks.',
    name: 'Rohan Shah',
    role: 'Luxury explorer',
  },
];

export const trustMetrics = [
  { value: '62+', label: 'countries curated' },
  { value: '4.9/5', label: 'traveller rating' },
  { value: '18k+', label: 'premium guests' },
  { value: '24/7', label: 'concierge support' },
];

export const recommenderOptions = {
  style: ['Luxury Escape', 'Adventure', 'Wellness', 'Culture & Food'],
  group: ['Couple', 'Family', 'Friends', 'Solo'],
  budget: ['$1k-$3k', '$3k-$6k', '$6k-$10k', '$10k+'],
  destination: ['Dubai', 'Maldives', 'Europe', 'Japan', 'Surprise me'],
};

export const footerLinks = [
  'World Tour Packages',
  'Corporate Travel',
  'Visa Concierge',
  'UAE Attractions',
  'Cruise Packages',
];

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Trip AI', href: '/ai-trip-recommender' },
  { label: 'ARIA', href: '/aria-chatbot' },
  { label: 'Itinerary', href: '/itinerary-builder' },
  { label: 'Visa', href: '/visa-checklist' },
  { label: 'Dubai', href: '/dubai-day-planner' },
  { label: 'Captions', href: '/caption-generator' },
];

export const pageMeta: Record<string, { title: string; eyebrow: string; description: string; icon: LucideIcon }> = {
  recommender: {
    title: 'AI Trip Recommender',
    eyebrow: 'Personalized luxury intelligence',
    description: 'A guided planning flow that turns travel preferences into tailored destination recommendations.',
    icon: Sparkles,
  },
  itinerary: {
    title: 'Itinerary Builder',
    eyebrow: 'Beautiful plans in minutes',
    description: 'Design a day-by-day luxury itinerary with polished activities, timing, and share-ready actions.',
    icon: CalendarDays,
  },
  visa: {
    title: 'Visa Checklist Generator',
    eyebrow: 'Travel documents, simplified',
    description: 'Generate a realistic visa status, document checklist, packing guide, and advisory note.',
    icon: FileCheck2,
  },
  dubai: {
    title: 'Dubai Day Planner',
    eyebrow: 'Concierge-ready Dubai routes',
    description: 'Build a premium one-day Dubai schedule around your budget, group, and available time.',
    icon: Clock,
  },
  captions: {
    title: 'AI Caption Generator',
    eyebrow: 'Social content for premium trips',
    description: 'Upload a travel moment and generate polished captions by style and mood.',
    icon: Camera,
  },
  quote: {
    title: 'Internal Quote Generator',
    eyebrow: 'Private travel desk workflow',
    description: 'Password-gated quote drafting for consultant-ready luxury travel emails.',
    icon: ShieldCheck,
  },
};

export const inclusions = [
  { label: 'Visa-aware planning', icon: BadgeCheck },
  { label: 'Premium hotels', icon: Hotel },
  { label: 'Smart budgeting', icon: WalletCards },
  { label: 'Global concierge', icon: Globe2 },
  { label: 'Verified suppliers', icon: CheckCircle2 },
];
