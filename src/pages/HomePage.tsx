import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, MapPin, Search, ShieldCheck, Star, Users } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { PageShell } from '../components/PageShell';
import { SectionHeader } from '../components/SectionHeader';
import { destinations, heroImage, howItWorks, packages, testimonials, trustMetrics } from '../data/mockData';
import { trackDestinationInterest, trackMicroConversion } from '../services/visitorIntelligence';

export function HomePage() {
  const [region, setRegion] = useState('All');
  const filteredPackages = packages.filter((item) => region === 'All' || item.location.toLowerCase().includes(region.toLowerCase()));

  return (
    <PageShell className="pt-0">
      <section className="relative min-h-[92vh] overflow-hidden">
        <img alt="Cinematic luxury travel coastline" className="absolute inset-0 h-full w-full object-cover" src={heroImage} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/72 via-navy/58 to-navy" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_22%,rgba(201,168,76,0.22),transparent_28rem)]" />
        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-4 pb-16 pt-32 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="max-w-4xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-gold">Bespoke journeys. AI precision. Human concierge.</p>
            <h1 className="font-display text-5xl font-bold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              Luxury travel planning for a world that deserves your best arrival.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-mist">
              MyGlobalTrips curates premium holidays, Dubai experiences, visa readiness, and quote workflows with a polished AI travel desk.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/ai-trip-recommender" onClick={() => trackMicroConversion('Hero plan my trip CTA')}>
                <Button className="w-full sm:w-auto">
                  Plan my trip <ArrowRight aria-hidden className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/itinerary-builder" onClick={() => trackMicroConversion('Hero build itinerary CTA')}>
                <Button className="w-full sm:w-auto" variant="secondary">
                  Build itinerary
                </Button>
              </Link>
            </div>
          </motion.div>

          <Card className="mt-12 grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_auto]">
            {[
              { icon: MapPin, label: 'Destination', value: 'Dubai, Maldives, Europe' },
              { icon: CalendarDays, label: 'Dates', value: 'Flexible luxury window' },
              { icon: Users, label: 'Travellers', value: '2 adults' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 rounded-[8px] border border-white/10 bg-white/8 px-4 py-3">
                <item.icon aria-hidden className="h-5 w-5 text-gold" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mist">{item.label}</p>
                  <p className="text-sm font-bold text-white">{item.value}</p>
                </div>
              </div>
            ))}
            <Link to="/ai-trip-recommender" onClick={() => trackMicroConversion('Homepage search triggered')}>
              <Button className="h-full w-full rounded-[8px]">
                <Search aria-hidden className="h-4 w-4" />
                Search
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Featured packages" title="Curated escapes with first-class details" description="Client-ready packages with realistic inclusions, luxury positioning, and premium travel economics." />
        <div className="mt-8 flex flex-wrap gap-3">
          {['All', 'Dubai', 'Maldives', 'Japan', 'Paris', 'Bali'].map((item) => (
            <button
              key={item}
              className={`rounded-full border px-4 py-2 text-sm font-bold transition ${region === item ? 'border-gold bg-gold text-navy' : 'border-white/14 bg-white/8 text-mist hover:text-white'}`}
              onClick={() => setRegion(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {filteredPackages.map((item) => (
            <Card key={item.title} as="article" className="overflow-hidden" >
              <img alt={item.title} className="h-64 w-full object-cover" src={item.image} />
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-display text-2xl font-bold">{item.title}</h2>
                    <p className="mt-1 text-sm text-mist">{item.location}</p>
                  </div>
                  <span className="rounded-full bg-gold/16 px-3 py-1 text-sm font-bold text-gold">{item.days}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/12 px-3 py-1 text-xs font-semibold text-mist">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm text-mist">
                    From <span className="text-xl font-extrabold text-white">{item.price}</span>
                  </p>
                  <Link to="/ai-trip-recommender" onClick={() => trackMicroConversion('Package viewed', { package: item.title })}>
                    <Button variant="secondary">View</Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-midnight/70 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader align="center" eyebrow="Popular destinations" title="Where premium travellers are going next" />
          <div className="no-scrollbar mt-10 flex gap-5 overflow-x-auto pb-4">
            {destinations.map((item) => (
              <Card key={item.name} className="min-w-[260px] overflow-hidden">
                <div onMouseEnter={() => trackDestinationInterest(item.name, { country: item.country })}>
                <img alt={`${item.name}, ${item.country}`} className="h-72 w-full object-cover" src={item.image} />
                <div className="flex items-center justify-between p-4">
                  <div>
                    <h2 className="font-display text-2xl font-bold">{item.name}</h2>
                    <p className="text-sm text-mist">{item.country}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-sm font-bold">
                    <Star aria-hidden className="h-4 w-4 fill-gold text-gold" />
                    {item.rating}
                  </span>
                </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <SectionHeader eyebrow="How it works" title="From inspiration to a polished proposal" description="The platform works as a connected travel operating system, not just a booking page." />
        <div className="grid gap-4">
          {howItWorks.map((item, index) => (
            <Card key={item.title} className="flex gap-4 p-5">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold text-navy">
                <item.icon aria-hidden className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Step {index + 1}</p>
                <h2 className="mt-1 font-display text-2xl font-bold">{item.title}</h2>
                <p className="mt-2 leading-7 text-mist">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
          <Card className="p-7">
            <ShieldCheck aria-hidden className="h-10 w-10 text-gold" />
            <h2 className="mt-5 font-display text-3xl font-bold">Trusted by premium travellers</h2>
            <p className="mt-4 leading-7 text-mist">Concierge workflows, destination intelligence, and share-ready quote tools built for high-value holiday decisions.</p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {trustMetrics.map((metric) => (
                <div key={metric.label} className="rounded-[8px] border border-white/10 bg-white/8 p-4">
                  <p className="font-display text-3xl font-bold text-gold">{metric.value}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-mist">{metric.label}</p>
                </div>
              ))}
            </div>
          </Card>
          <div className="grid gap-4">
            {testimonials.map((item) => (
              <Card key={item.name} className="p-6">
                <p className="font-display text-2xl leading-9 text-white">“{item.quote}”</p>
                <p className="mt-5 font-bold text-gold">{item.name}</p>
                <p className="text-sm text-mist">{item.role}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
