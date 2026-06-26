import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, Globe2, MessageCircle, Sailboat, Sparkles, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { PageShell } from '../components/PageShell';
import { homepageSections, type TravelCard } from '../data/homepageCatalog';
import { trackDestinationInterest, trackMicroConversion } from '../services/visitorIntelligence';

type CatalogConfig = {
  eyebrow: string;
  title: string;
  description: string;
  heroImage: string;
  items: TravelCard[];
  icon: typeof Globe2;
};

const configs = {
  worldTours: {
    eyebrow: 'Global holiday catalog',
    title: 'World Tour Packages',
    description: 'Explore premium world tour packages across Europe, Asia, islands, Africa, the Americas, and the Middle East.',
    heroImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=88',
    items: homepageSections.worldTours,
    icon: Globe2,
  },
  attractions: {
    eyebrow: 'UAE ticketed experiences',
    title: 'UAE Attractions',
    description: 'Browse Dubai and UAE attractions with imported pricing, ratings, highlights, and destination details.',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2200&q=88',
    items: homepageSections.attractions,
    icon: BadgeCheck,
  },
  cruises: {
    eyebrow: 'Ocean and river holidays',
    title: 'Cruise Packages',
    description: 'Discover Caribbean, Mediterranean, river, expedition, luxury, and Asia-Pacific cruise itineraries.',
    heroImage: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=2200&q=88',
    items: homepageSections.cruises,
    icon: Sailboat,
  },
  experiences: {
    eyebrow: 'VIP UAE concierge',
    title: 'Premium Experiences',
    description: 'Book yachts, dhow cruises, limousines, helicopter tours, balloons, water sports, and desert safari experiences.',
    heroImage: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=2200&q=88',
    items: homepageSections.experiences,
    icon: Sparkles,
  },
} satisfies Record<string, CatalogConfig>;

function CatalogHero({ config }: { config: CatalogConfig }) {
  return (
    <section className="relative overflow-hidden pt-28">
      <img alt={config.title} className="absolute inset-0 h-full w-full object-cover" src={config.heroImage} />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/84 via-navy/60 to-surface" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/12 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.18em] text-blue-100 backdrop-blur">
            <config.icon aria-hidden className="h-4 w-4" />
            {config.eyebrow}
          </div>
          <h1 className="mt-5 font-display text-5xl font-bold leading-tight text-white sm:text-6xl">{config.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-50">{config.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/ai-trip-recommender" onClick={() => trackMicroConversion(`${config.title} AI planner CTA`)}>
              <Button>
                Plan with AI <ArrowRight aria-hidden className="h-4 w-4" />
              </Button>
            </Link>
            <a href="https://wa.me/971585566036?text=I%27d%20like%20to%20enquire%20about%20MyGlobalTrips%20packages" rel="noreferrer" target="_blank">
              <Button variant="secondary">WhatsApp concierge</Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CatalogGrid({ items }: { items: TravelCard[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.38, delay: Math.min(index * 0.025, 0.18) }}
            onMouseEnter={() => trackDestinationInterest(item.title, { category: item.category, destination: item.destination })}
          >
            <Card className="group h-full overflow-hidden hover:-translate-y-1">
              <div className="relative h-64 overflow-hidden">
                <img alt={item.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" src={item.image} />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/68 via-transparent to-transparent" />
                <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/92 px-3 py-1 text-xs font-extrabold text-ink">
                  <Star aria-hidden className="h-3.5 w-3.5 fill-gold text-gold" />
                  {item.rating}
                </span>
              </div>
              <div className="p-5">
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-gold">{item.category}</p>
                <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-ink">{item.title}</h2>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-mist">{item.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.highlights.slice(0, 4).map((highlight) => (
                    <span key={highlight} className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-bold text-mist">
                      {highlight}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-mist">{item.duration}</p>
                    <p className="mt-1 text-xl font-black text-ink">{item.price}</p>
                  </div>
                  <Link to="/ai-trip-recommender" onClick={() => trackMicroConversion('Catalog package selected', { package: item.title })}>
                    <Button variant="secondary">Plan</Button>
                  </Link>
                </div>
              </div>
            </Card>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function CatalogPage({ config }: { config: CatalogConfig }) {
  return (
    <PageShell className="pt-0">
      <CatalogHero config={config} />
      <CatalogGrid items={config.items} />
    </PageShell>
  );
}

export function WorldTourPackagesPage() {
  return <CatalogPage config={configs.worldTours} />;
}

export function UAEAttractionsPage() {
  return <CatalogPage config={configs.attractions} />;
}

export function CruisePackagesPage() {
  return <CatalogPage config={configs.cruises} />;
}

export function PremiumExperiencesPage() {
  return <CatalogPage config={configs.experiences} />;
}

export function GroupBookingPage() {
  return (
    <PageShell className="pt-28">
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-gold">Group booking</p>
          <h1 className="mt-4 font-display text-5xl font-bold leading-tight text-ink sm:text-6xl">One travel desk for groups, events, families, and corporate trips.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-mist">
            Build a managed MyGlobalTrips proposal across hotels, transfers, attractions, cruises, visa support, and concierge service.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/internal-quote-generator" onClick={() => trackMicroConversion('Group booking page quote CTA')}>
              <Button>Generate internal quote</Button>
            </Link>
            <a href="https://wa.me/971585566036?text=I%27d%20like%20help%20with%20a%20group%20booking%20for%20MyGlobalTrips" rel="noreferrer" target="_blank">
              <Button variant="secondary">
                <MessageCircle aria-hidden className="h-4 w-4" />
                WhatsApp team
              </Button>
            </a>
          </div>
        </div>
        <Card className="p-6">
          <div className="grid gap-4">
            {[
              ['Families & weddings', 'Multi-room stays, private transfers, attractions, and celebration-ready add-ons.'],
              ['Corporate & MICE', 'Transport, experiences, gala evenings, team offsites, and custom quote support.'],
              ['School & leisure groups', 'Budget-aware planning, clear inclusions, and fast WhatsApp coordination.'],
            ].map(([title, description], index) => (
              <div key={title} className="rounded-[14px] border border-line bg-surface p-5">
                <div className="mb-3 grid h-10 w-10 place-items-center rounded-full bg-gold text-white">
                  <Users aria-hidden className="h-4 w-4" />
                </div>
                <p className="font-display text-2xl font-bold text-ink">{title}</p>
                <p className="mt-2 leading-7 text-mist">{description}</p>
                <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.18em] text-gold">Group flow {index + 1}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </PageShell>
  );
}
