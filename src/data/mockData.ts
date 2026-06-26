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
import { legacyDestinations, legacyPackages } from './legacyContent';

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
  'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=2400&q=88';

export const packages: Package[] = legacyPackages;

export const destinations: Destination[] = legacyDestinations;

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
  'UAE Attractions',
  'Cruise Packages',
  'Premium Experiences',
  'Group Booking',
];

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'World Tour Packages', href: '/world-tour-packages' },
  { label: 'UAE Attractions', href: '/uae-attractions' },
  { label: 'Cruise Packages', href: '/cruise-packages' },
  { label: 'Premium Experiences', href: '/premium-experiences' },
  { label: 'Group Booking', href: '/group-booking' },
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
