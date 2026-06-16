import { Lock, Mail, Send } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { SelectField } from '../components/FormControls';
import { PageShell } from '../components/PageShell';
import { SectionHeader } from '../components/SectionHeader';
import { pageMeta } from '../data/mockData';

type QuoteForm = {
  name: string;
  travellers: string;
  destination: string;
  budget: string;
  dates: string;
};

export function InternalQuoteGeneratorPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState<QuoteForm>({
    name: 'Riya Sharma',
    travellers: '2 adults',
    destination: 'Dubai + Maldives',
    budget: '$6,000 - $8,000',
    dates: '12-18 September 2026',
  });

  const email = useMemo(
    () =>
      `Dear ${form.name},\n\nThank you for choosing MyGlobalTrips for your ${form.destination} holiday.\n\nBased on ${form.travellers}, travel dates ${form.dates}, and a preferred budget of ${form.budget}, we recommend a premium itinerary with handpicked 5-star stays, private transfers, curated experiences, and visa guidance.\n\nIndicative package inclusions:\n- Luxury hotel accommodation\n- Airport meet-and-assist\n- Private sightseeing experiences\n- Daily breakfast and selected dining reservations\n- Visa checklist support\n\nOur concierge team can refine hotels, flights, and experiences once you confirm your preferred pace.\n\nWarm regards,\nMyGlobalTrips Concierge`,
    [form],
  );

  if (!unlocked) {
    return (
      <PageShell>
        <section className="mx-auto grid min-h-[70vh] max-w-xl place-items-center px-4 pb-20 sm:px-6">
          <Card className="w-full p-7 text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold text-navy">
              <Lock aria-hidden className="h-7 w-7" />
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold">Internal quote desk</h1>
            <p className="mt-3 leading-7 text-mist">Enter the demo password to access consultant tools.</p>
            <form
              className="mt-7 grid gap-4"
              onSubmit={(event) => {
                event.preventDefault();
                if (password.trim().toLowerCase() === 'luxury') setUnlocked(true);
              }}
            >
              <input
                aria-label="Password"
                className="min-h-12 rounded-[8px] border border-white/14 bg-midnight/80 px-4 text-center text-white"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password: luxury"
                type="password"
                value={password}
              />
              <Button type="submit">Unlock</Button>
            </form>
          </Card>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <SectionHeader {...pageMeta.quote} align="center" />
        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="h-fit p-6">
            <div className="grid gap-5">
              <label className="grid gap-2 text-sm font-semibold text-white">
                Traveller name
                <input
                  className="min-h-12 rounded-[8px] border border-white/14 bg-midnight/80 px-4 text-white"
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  value={form.name}
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-white">
                Traveller details
                <input
                  className="min-h-12 rounded-[8px] border border-white/14 bg-midnight/80 px-4 text-white"
                  onChange={(event) => setForm((current) => ({ ...current, travellers: event.target.value }))}
                  value={form.travellers}
                />
              </label>
              <SelectField
                label="Destination"
                value={form.destination}
                options={['Dubai + Maldives', 'Swiss Alps', 'Japan Golden Route', 'Paris & Riviera']}
                onChange={(destination) => setForm((current) => ({ ...current, destination }))}
              />
              <SelectField
                label="Budget"
                value={form.budget}
                options={['$3,000 - $5,000', '$6,000 - $8,000', '$10,000 - $15,000', '$20,000+']}
                onChange={(budget) => setForm((current) => ({ ...current, budget }))}
              />
              <label className="grid gap-2 text-sm font-semibold text-white">
                Dates
                <input
                  className="min-h-12 rounded-[8px] border border-white/14 bg-midnight/80 px-4 text-white"
                  onChange={(event) => setForm((current) => ({ ...current, dates: event.target.value }))}
                  value={form.dates}
                />
              </label>
            </div>
          </Card>

          <Card className="p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Mail aria-hidden className="h-6 w-6 text-gold" />
                <h2 className="font-display text-3xl font-bold">Editable email preview</h2>
              </div>
              <Button
                onClick={() => {
                  setSent(true);
                  window.setTimeout(() => setSent(false), 1600);
                }}
              >
                <Send aria-hidden className="h-4 w-4" />
                {sent ? 'Sent' : 'Send'}
              </Button>
            </div>
            <textarea
              aria-label="Editable quote email"
              className="min-h-[520px] w-full resize-none rounded-[8px] border border-white/14 bg-midnight/80 p-5 leading-7 text-mist outline-none focus:border-gold"
              defaultValue={email}
              key={email}
            />
          </Card>
        </div>
      </section>
    </PageShell>
  );
}
