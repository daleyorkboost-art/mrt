import { ArrowUpRight, Plane } from 'lucide-react';
import { footerLinks } from '../data/mockData';

const footerHref: Record<string, string> = {
  'World Tour Packages': '/ai-trip-recommender',
  'Corporate Travel': '/internal-quote-generator',
  'Visa Concierge': '/visa-checklist',
  'UAE Attractions': '/dubai-day-planner',
  'Cruise Packages': '/ai-trip-recommender',
};

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-gold/25 bg-[#EFF6FF] text-gold">
              <Plane aria-hidden className="h-5 w-5" />
            </span>
            <span className="font-display text-2xl font-bold text-navy">MyGlobalTrips</span>
          </div>
          <p className="mt-5 max-w-md leading-7 text-mist">
            Premium AI-powered trip planning for luxury holidays, visa readiness, quote workflows, and concierge-grade travel content.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.22em] text-gold">Explore</h2>
          <div className="mt-5 grid gap-3 text-sm text-mist">
            {footerLinks.map((link) => (
              <a key={link} className="inline-flex items-center gap-2 transition hover:text-gold" href={footerHref[link] || '/'}>
                {link}
                <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.22em] text-gold">Contact</h2>
          <div className="mt-5 space-y-3 text-sm text-mist">
            <p>info@myglobaltrips.com</p>
            <p>Dubai, UAE</p>
            <p>Available 24/7 for premium travellers</p>
          </div>
        </div>
      </div>
      <div className="border-t border-line px-4 py-5 text-center text-xs text-mist">
        © 2026 MyGlobalTrips. Premium travel planning and concierge experiences.
      </div>
    </footer>
  );
}
