import {
  BadgeCheck,
  CalendarDays,
  Camera,
  CheckCircle2,
  Clock,
  Compass,
  Crown,
  FileCheck2,
  Gem,
  Globe2,
  Hotel,
  Landmark,
  MapPin,
  Plane,
  ShieldCheck,
  Sparkles,
  Star,
  Utensils,
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
    title: 'Dubai Royal Escape',
    location: 'Dubai, UAE',
    price: '$2,840',
    days: '5 nights',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    tags: ['Private transfers', 'Burj suite view', 'Desert dinner'],
  },
  {
    title: 'Maldives Overwater Retreat',
    location: 'Baa Atoll, Maldives',
    price: '$4,950',
    days: '6 nights',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    tags: ['Seaplane', 'Spa credit', 'Reef dining'],
  },
  {
    title: 'Swiss Alpine Luxe',
    location: 'Lucerne & Zermatt',
    price: '$5,320',
    days: '7 nights',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=80',
    tags: ['Glacier Express', 'Lake hotel', 'Concierge'],
  },
];

export const destinations: Destination[] = [
  {
    name: 'Santorini',
    country: 'Greece',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Kyoto',
    country: 'Japan',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Paris',
    country: 'France',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Bali',
    country: 'Indonesia',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80',
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

export const recommendations = [
  {
    title: 'Dubai + Maldives Signature',
    image: packages[0].image,
    highlights: ['Private yacht sunset cruise', 'Overwater villa upgrade', 'Fine-dining reservations'],
  },
  {
    title: 'Japan Golden Route Luxe',
    image: destinations[1].image,
    highlights: ['Ryokan with private onsen', 'Kyoto tea ceremony', 'Michelin dining trail'],
  },
  {
    title: 'Swiss Lakes & Peaks',
    image: packages[2].image,
    highlights: ['First-class rail', 'Matterhorn suite', 'Alpine spa circuit'],
  },
];

export const itineraryDays = [
  {
    day: 'Day 1',
    title: 'Arrival & Signature Welcome',
    icon: Hotel,
    items: ['VIP airport meet-and-assist', 'Check in to a skyline-view hotel', 'Chef-led welcome dinner'],
  },
  {
    day: 'Day 2',
    title: 'Icons, Culture & Private Access',
    icon: Landmark,
    items: ['Morning landmark tour', 'Museum or old-town walk', 'Private sunset viewpoint'],
  },
  {
    day: 'Day 3',
    title: 'Slow Luxury Day',
    icon: Gem,
    items: ['Spa breakfast', 'Curated shopping or beach club', 'Night market tasting route'],
  },
  {
    day: 'Day 4',
    title: 'Adventure Finale',
    icon: Camera,
    items: ['Scenic helicopter or yacht option', 'Golden-hour photography session', 'Farewell lounge transfer'],
  },
];

export const visaChecklist = [
  'Passport valid for at least 6 months',
  'Confirmed return flight reservation',
  'Hotel booking or invitation letter',
  'Recent passport-size photographs',
  'Travel insurance policy',
  'Bank statement or income proof',
];

export const packingGroups = [
  { title: 'Documents', items: ['Passport copy', 'Travel insurance', 'Hotel vouchers', 'Emergency contacts'] },
  { title: 'Smart Packing', items: ['Universal adapter', 'Evening wear', 'Comfort shoes', 'Medication kit'] },
  { title: 'Luxury Extras', items: ['Lounge access card', 'Preferred fragrance', 'Camera gear', 'Resort wear'] },
];

export const dubaiTimeline = [
  { time: '09:00', title: 'Private Marina Breakfast', cost: '$85', icon: Utensils },
  { time: '11:00', title: 'Museum of the Future Fast Track', cost: '$65', icon: Landmark },
  { time: '14:00', title: 'Jumeirah Beach Club', cost: '$140', icon: Crown },
  { time: '17:30', title: 'Desert Conservation Drive', cost: '$210', icon: MapPin },
  { time: '20:30', title: 'Skyline Dinner Reservation', cost: '$180', icon: Star },
];

export const captionIdeas = [
  'Golden hour, first-class state of mind.',
  'Some views deserve a passport stamp and a quiet table for two.',
  'Luxury is the art of arriving slowly.',
  'Out of office, into something unforgettable.',
];

export const footerLinks = [
  'Luxury Holidays',
  'Corporate Travel',
  'Visa Concierge',
  'Dubai Experiences',
  'AI Travel Tools',
];

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Trip AI', href: '/ai-trip-recommender' },
  { label: 'ARIA', href: '/aria-chatbot' },
  { label: 'Itinerary', href: '/itinerary-builder' },
  { label: 'Visa', href: '/visa-checklist' },
  { label: 'Dubai', href: '/dubai-day-planner' },
  { label: 'Captions', href: '/caption-generator' },
  { label: 'Quotes', href: '/internal-quote-generator' },
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
