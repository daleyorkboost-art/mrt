import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  ChevronRight,
  FileCheck2,
  Globe2,
  MapPin,
  Plane,
  Sailboat,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { PageShell } from '../components/PageShell';
import { homepageSections, catalogStats, type TravelCard } from '../data/homepageCatalog';
import { trackDestinationInterest, trackMicroConversion } from '../services/visitorIntelligence';

const heroImage = 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=2400&q=88';

const aiTools = [
  {
    title: 'AI Trip Recommender',
    description: 'Match travel style, group type, budget, and destination wishes to curated packages.',
    href: '/ai-trip-recommender',
    icon: Sparkles,
    accent: 'from-blue-500 to-cyan-400',
  },
  {
    title: 'Itinerary Builder',
    description: 'Generate polished day-by-day routes with share and print-ready planning support.',
    href: '/itinerary-builder',
    icon: MapPin,
    accent: 'from-emerald-500 to-teal-400',
  },
  {
    title: 'Visa Checklist Generator',
    description: 'Prepare visa documents, packing lists, and travel advisories before booking.',
    href: '/visa-checklist',
    icon: FileCheck2,
    accent: 'from-indigo-500 to-blue-400',
  },
  {
    title: 'AI Caption Generator',
    description: 'Turn trip images into premium social captions and destination-ready hashtags.',
    href: '/caption-generator',
    icon: Camera,
    accent: 'from-rose-500 to-orange-400',
  },
];

const catalogRows = [
  {
    id: 'world-tours',
    href: '/world-tour-packages',
    eyebrow: `${catalogStats.worldTours} curated packages`,
    title: 'World Tour Packages',
    description: 'Dynamic tour packages from the migrated catalog, covering Europe, Asia, islands, Africa, the Americas, and the Middle East.',
    items: homepageSections.worldTours,
    icon: Globe2,
  },
  {
    id: 'uae-attractions',
    href: '/uae-attractions',
    eyebrow: `${catalogStats.attractions} ticketed experiences`,
    title: 'UAE Attractions',
    description: 'Dubai and UAE attractions with pricing, ratings, highlights, and destination metadata imported from source content.',
    items: homepageSections.attractions,
    icon: BadgeCheck,
  },
  {
    id: 'cruise-packages',
    href: '/cruise-packages',
    eyebrow: `${catalogStats.cruises} cruise itineraries`,
    title: 'Cruise Packages',
    description: 'Ocean, river, expedition, luxury, Caribbean, Mediterranean, and Asia-Pacific cruise options.',
    items: homepageSections.cruises,
    icon: Sailboat,
  },
  {
    id: 'premium-experiences',
    href: '/premium-experiences',
    eyebrow: `${catalogStats.experiences} premium experiences`,
    title: 'Premium Experiences',
    description: 'VIP dhow cruises, yachts, limousines, helicopter tours, balloon flights, water sports, and desert safaris.',
    items: homepageSections.experiences,
    icon: Plane,
  },
];

function Rating({ value }: { value: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white/92 px-2.5 py-1 text-xs font-extrabold text-ink shadow-sm">
      <Star aria-hidden className="h-3.5 w-3.5 fill-gold text-gold" />
      {value}
    </span>
  );
}

function PackageCard({ item, index, href }: { item: TravelCard; index: number; href: string }) {
  return (
    <motion.article
      className="group relative flex min-h-[430px] w-full overflow-hidden rounded-[18px] border border-line bg-white shadow-glass transition hover:-translate-y-1 hover:shadow-2xl"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.42, delay: Math.min(index * 0.03, 0.18) }}
      onMouseEnter={() => trackDestinationInterest(item.title, { category: item.category, destination: item.destination })}
    >
      <div className="flex w-full flex-col">
        <div className="relative h-56 overflow-hidden">
          <img
            alt={item.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
            src={item.image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/12 to-transparent" />
          <div className="absolute left-4 top-4 flex max-w-[78%] flex-wrap gap-2">
            {item.badges.map((badge) => (
              <span key={badge} className="rounded-full bg-white/92 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-ink">
                {badge}
              </span>
            ))}
          </div>
          <div className="absolute bottom-4 right-4">
            <Rating value={item.rating} />
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-gold">{item.category}</p>
              <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-ink">{item.title}</h3>
            </div>
          </div>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-mist">{item.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {item.highlights.slice(0, 3).map((highlight) => (
              <span key={highlight} className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-bold text-mist">
                {highlight}
              </span>
            ))}
          </div>
          <div className="mt-auto flex items-end justify-between gap-4 pt-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-mist">{item.duration}</p>
              <p className="mt-1 text-xl font-black text-ink">{item.price}</p>
            </div>
            <Link
              aria-label={`Plan ${item.title}`}
              className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-r from-gold to-[#1D4ED8] text-white shadow-glow transition group-hover:scale-105"
              to={href}
              onClick={() => trackMicroConversion('Homepage catalog card selected', { package: item.title })}
            >
              <ChevronRight aria-hidden className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function CatalogCarousel({ row }: { row: (typeof catalogRows)[number] }) {
  return (
    <section id={row.id} className="py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.18em] text-gold shadow-sm">
              <row.icon aria-hidden className="h-4 w-4" />
              {row.eyebrow}
            </div>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-normal text-ink sm:text-5xl">{row.title}</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-mist">{row.description}</p>
          </div>
          <Link to={row.href} onClick={() => trackMicroConversion(`${row.title} page CTA`)}>
            <Button variant="secondary">
              View all <ArrowRight aria-hidden className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <Card className="overflow-hidden p-3 sm:p-4 lg:p-5">
          <div className="mb-4 flex items-center justify-between gap-4 rounded-[14px] border border-line bg-surface px-4 py-3">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-gold">Featured preview</p>
              <p className="mt-1 text-sm font-semibold text-mist">Showing 3 selected options from this catalog.</p>
            </div>
            <Link
              aria-label={`View all ${row.title}`}
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-gold shadow-sm transition hover:bg-[#EFF6FF] hover:text-[#1D4ED8]"
              to={row.href}
              onClick={() => trackMicroConversion(`${row.title} view all selected`)}
            >
              View all
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}>
                <ArrowRight aria-hidden className="h-4 w-4" />
              </motion.span>
            </Link>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {row.items.slice(0, 3).map((item, index) => (
              <PackageCard key={item.id} item={item} index={index} href={row.href} />
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}

export function HomePage() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('Dubai');
  const [travellers, setTravellers] = useState('Couple');
  const [style, setStyle] = useState('Luxury Escape');
  const [duration, setDuration] = useState('4 days');

  function buildItineraryFromSearch() {
    const params = new URLSearchParams({
      destination,
      duration,
      travellerType: travellers.toLowerCase(),
      interests: style.includes('Adventure') ? 'Adventure,Culture' : style.includes('Wellness') ? 'Wellness,Beaches' : 'Fine dining,Culture',
    });
    trackMicroConversion('Homepage itinerary search submitted', { destination, travellers, style, duration });
    navigate(`/itinerary-builder?${params.toString()}`);
  }

  return (
    <PageShell className="pt-0">
      <section className="relative min-h-[88vh] overflow-hidden">
        <img alt="Luxury overwater villas and turquoise travel escape" className="absolute inset-0 h-full w-full object-cover" src={heroImage} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/52 to-[#F8FAFC]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_28%,rgba(37,99,235,0.35),transparent_28rem)]" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-4 pb-16 pt-32 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="max-w-4xl">
            <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.28em] text-blue-100">MyGlobalTrips luxury travel desk</p>
            <h1 className="font-display text-5xl font-bold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              Luxury travel planning, powered by AI and curated by concierge experts.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-50">
              Discover world tours, UAE attractions, premium cruises, VIP experiences, and smart planning tools in one polished travel platform.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/ai-trip-recommender" onClick={() => trackMicroConversion('Hero AI recommender CTA')}>
                <Button className="w-full sm:w-auto">
                  Start with AI <Sparkles aria-hidden className="h-4 w-4" />
                </Button>
              </Link>
              <a href="#world-tours">
                <Button className="w-full sm:w-auto" variant="secondary">
                  View packages <ArrowRight aria-hidden className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </motion.div>

          <Card className="mt-12 p-4">
            <div className="grid gap-4 lg:grid-cols-[1.15fr_0.95fr_0.95fr_0.8fr_auto] lg:items-end">
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-gold">
                  <MapPin aria-hidden className="h-4 w-4" />
                  Destination
                </span>
                <select className="h-12 w-full rounded-[8px] border border-line px-4 text-sm font-bold" value={destination} onChange={(event) => setDestination(event.target.value)}>
                  {['Dubai', 'Maldives', 'Switzerland', 'Italy', 'Japan', 'Bali', 'Caribbean'].map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-gold">
                  <Users aria-hidden className="h-4 w-4" />
                  Travellers
                </span>
                <select className="h-12 w-full rounded-[8px] border border-line px-4 text-sm font-bold" value={travellers} onChange={(event) => setTravellers(event.target.value)}>
                  {['Couple', 'Family', 'Friends', 'Solo'].map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-gold">
                  <Sparkles aria-hidden className="h-4 w-4" />
                  Style
                </span>
                <select className="h-12 w-full rounded-[8px] border border-line px-4 text-sm font-bold" value={style} onChange={(event) => setStyle(event.target.value)}>
                  {['Luxury Escape', 'Adventure', 'Wellness', 'Culture & Food'].map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-2 text-xs font-extrabold uppercase tracking-[0.18em] text-gold">Duration</span>
                <select className="h-12 w-full rounded-[8px] border border-line px-4 text-sm font-bold" value={duration} onChange={(event) => setDuration(event.target.value)}>
                  {['3 days', '4 days', '5 days', '7 days', '10 days'].map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
              <Button className="h-12 rounded-[8px]" onClick={buildItineraryFromSearch} variant="secondary">
                Build itinerary
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-gold">AI tools section</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl">Plan faster with premium travel intelligence</h2>
          <p className="mt-4 text-base leading-7 text-mist">Four focused tools keep the original product capabilities visible at the top of the new client workflow.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {aiTools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.42, delay: index * 0.06 }}
            >
              <Link to={tool.href} onClick={() => trackMicroConversion('AI tool card selected', { tool: tool.title })}>
                <Card className="group h-full overflow-hidden p-5 hover:-translate-y-1">
                  <div className={`grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br ${tool.accent} text-white shadow-glow`}>
                    <tool.icon aria-hidden className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold text-ink">{tool.title}</h3>
                  <p className="mt-3 min-h-[96px] leading-7 text-mist">{tool.description}</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-gold">
                    Open tool <ArrowRight aria-hidden className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {catalogRows.map((row, index) => (
        <div key={row.id} className={index % 2 === 0 ? 'bg-white' : 'bg-surface'}>
          <CatalogCarousel row={row} />
        </div>
      ))}

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-[24px] bg-navy p-6 text-white shadow-2xl sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-blue-200">Group booking section</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">Planning for a family, company, wedding, or MICE group?</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-blue-100">
              MyGlobalTrips can package hotels, attractions, transport, cruises, visas, and concierge support into one managed proposal.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/internal-quote-generator" onClick={() => trackMicroConversion('Group booking quote CTA')}>
                <Button>Generate quote</Button>
              </Link>
              <a href="https://wa.me/971585566036?text=I%27d%20like%20help%20with%20a%20group%20booking%20for%20MyGlobalTrips" rel="noreferrer" target="_blank">
                <Button variant="secondary">WhatsApp concierge</Button>
              </a>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {[
              ['153+', 'dynamic travel records'],
              ['24/7', 'concierge support'],
              ['UAE + Global', 'single planning desk'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-[16px] border border-white/14 bg-white/10 p-5">
                <p className="font-display text-4xl font-bold text-white">{value}</p>
                <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.18em] text-blue-100">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
