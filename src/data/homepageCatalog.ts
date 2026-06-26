import attractions from '../../data/attractions.json';
import cruises from '../../data/cruises.json';
import experiences from '../../data/experiences.json';
import worldTours from '../../data/worldTours.json';

export type TravelCard = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  destination: string;
  price: string;
  duration: string;
  rating: string;
  highlights: string[];
  badges: string[];
  image: string;
};

type RawTravelCard = Partial<TravelCard> & {
  region?: string;
  cruiseLine?: string;
  tags?: string[];
  vipFeatures?: string[];
};

function normalizeCard(item: RawTravelCard, fallbackCategory: string): TravelCard {
  return {
    id: item.id || item.slug || item.title || fallbackCategory,
    title: item.title || 'MyGlobalTrips experience',
    slug: item.slug || item.id || '',
    description: item.description || 'Premium MyGlobalTrips travel experience.',
    category: item.category || fallbackCategory,
    destination: item.destination || item.region || item.cruiseLine || fallbackCategory,
    price: item.price || 'On request',
    duration: item.duration || 'Flexible',
    rating: item.rating || '4.8',
    highlights: (item.highlights?.length ? item.highlights : item.tags || item.vipFeatures || []).slice(0, 4),
    badges: (item.badges?.length ? item.badges : item.tags || []).slice(0, 2),
    image: item.image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  };
}

export const homepageSections = {
  worldTours: (worldTours as RawTravelCard[]).map((item) => normalizeCard(item, 'World Tours')),
  attractions: (attractions as RawTravelCard[]).map((item) => normalizeCard(item, 'UAE Attractions')),
  cruises: (cruises as RawTravelCard[]).map((item) => normalizeCard(item, 'Cruise Packages')),
  experiences: (experiences as RawTravelCard[]).map((item) => normalizeCard(item, 'Premium Experiences')),
};

export const catalogStats = {
  worldTours: homepageSections.worldTours.length,
  attractions: homepageSections.attractions.length,
  cruises: homepageSections.cruises.length,
  experiences: homepageSections.experiences.length,
};
