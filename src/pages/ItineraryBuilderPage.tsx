import { Download, Share2 } from 'lucide-react';
import { useState } from 'react';
import { Accordion } from '../components/Accordion';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { MultiSelect, SelectField } from '../components/FormControls';
import { PageShell } from '../components/PageShell';
import { SectionHeader } from '../components/SectionHeader';
import { itineraryDays, pageMeta } from '../data/mockData';

const interests = ['Fine dining', 'Beaches', 'Culture', 'Shopping', 'Adventure', 'Wellness'];

export function ItineraryBuilderPage() {
  const [destination, setDestination] = useState('Dubai');
  const [duration, setDuration] = useState('4 days');
  const [selected, setSelected] = useState(['Fine dining', 'Culture']);

  function toggle(value: string) {
    setSelected((current) => (current.includes(value) ? current.filter((item) => item !== value) : [...current, value]));
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <SectionHeader {...pageMeta.itinerary} align="center" />
        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="h-fit p-6">
            <div className="grid gap-5">
              <SelectField label="Destination" value={destination} options={['Dubai', 'Bali', 'Paris', 'Japan', 'Maldives']} onChange={setDestination} />
              <SelectField label="Duration" value={duration} options={['3 days', '4 days', '5 days', '7 days', '10 days']} onChange={setDuration} />
              <div>
                <p className="mb-3 text-sm font-semibold text-white">Interests</p>
                <MultiSelect options={interests} selected={selected} onToggle={toggle} />
              </div>
            </div>
          </Card>

          <div>
            <Card className="mb-5 p-5">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">{destination} luxury route</p>
                  <h2 className="mt-2 font-display text-3xl font-bold">{duration} itinerary</h2>
                  <p className="mt-2 text-sm text-mist">Optimized for {selected.join(', ') || 'premium discovery'}.</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="secondary">
                    <Share2 aria-hidden className="h-4 w-4" />
                    Share
                  </Button>
                  <Button>
                    <Download aria-hidden className="h-4 w-4" />
                    PDF
                  </Button>
                </div>
              </div>
            </Card>
            <div className="relative grid gap-4">
              <div className="absolute bottom-0 left-6 top-0 hidden w-px bg-gold/35 sm:block" />
              {itineraryDays.map((day) => (
                <Card key={day.day} className="relative p-5 sm:ml-14">
                  <span className="absolute -left-[4.25rem] top-6 hidden h-10 w-10 place-items-center rounded-full bg-gold text-navy sm:grid">
                    <day.icon aria-hidden className="h-5 w-5" />
                  </span>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">{day.day}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold">{day.title}</h3>
                  <div className="mt-4">
                    <Accordion title="View day details" defaultOpen={day.day === 'Day 1'}>
                      <ul className="space-y-2">
                        {day.items.map((item) => (
                          <li key={item}>- {item}</li>
                        ))}
                      </ul>
                    </Accordion>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
