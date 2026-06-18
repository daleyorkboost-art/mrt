import { CalendarDays, Download, Share2 } from 'lucide-react';
import { useState } from 'react';
import { Accordion } from '../components/Accordion';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { MultiSelect, SelectField } from '../components/FormControls';
import { PageShell } from '../components/PageShell';
import { SectionHeader } from '../components/SectionHeader';
import { pageMeta } from '../data/mockData';
import { api, type ItineraryResponse } from '../services/api';

const interests = ['Fine dining', 'Beaches', 'Culture', 'Shopping', 'Adventure', 'Wellness', 'Desert', 'Food'];

export function ItineraryBuilderPage() {
  const [destination, setDestination] = useState('Dubai');
  const [duration, setDuration] = useState('4 days');
  const [travellerType, setTravellerType] = useState('couple');
  const [selected, setSelected] = useState(['Fine dining', 'Culture']);
  const [result, setResult] = useState<ItineraryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function toggle(value: string) {
    setSelected((current) => (current.includes(value) ? current.filter((item) => item !== value) : [...current, value]));
  }

  async function generateItinerary() {
    setLoading(true);
    setError('');

    try {
      const response = await api.itinerary({
        destination,
        nights: Number.parseInt(duration, 10),
        travellerType,
        interests: selected,
      });
      setResult(response);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to build itinerary');
    } finally {
      setLoading(false);
    }
  }

  async function shareItinerary() {
    const params = new URLSearchParams({
      destination,
      duration,
      travellerType,
      interests: selected.join(','),
    });
    await navigator.clipboard?.writeText(`${window.location.origin}${window.location.pathname}?${params.toString()}`);
  }

  const days = result?.itinerary.days || [];

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <SectionHeader {...pageMeta.itinerary} align="center" />
        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="h-fit p-6">
            <div className="grid gap-5">
              <SelectField label="Destination" value={destination} options={['Dubai', 'Bali', 'Paris', 'Japan', 'Maldives']} onChange={setDestination} />
              <SelectField label="Duration" value={duration} options={['3 days', '4 days', '5 days', '7 days', '10 days']} onChange={setDuration} />
              <SelectField label="Traveller type" value={travellerType} options={['couple', 'family', 'friends', 'solo']} onChange={setTravellerType} />
              <div>
                <p className="mb-3 text-sm font-semibold text-white">Interests</p>
                <MultiSelect options={interests} selected={selected} onToggle={toggle} />
              </div>
              <Button disabled={loading || selected.length === 0} onClick={generateItinerary}>
                {loading ? 'Building...' : 'Build itinerary'}
              </Button>
              {error && <p className="rounded-[8px] border border-ruby/40 bg-ruby/20 px-4 py-3 text-sm text-[#ffb4cf]">{error}</p>}
            </div>
          </Card>

          <div>
            <Card className="mb-5 p-5">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">{destination} luxury route</p>
                  <h2 className="mt-2 font-display text-3xl font-bold">{result ? `${result.itinerary.duration} day itinerary` : `${duration} itinerary`}</h2>
                  <p className="mt-2 text-sm text-mist">{result?.notice || `Optimized for ${selected.join(', ') || 'premium discovery'}.`}</p>
                </div>
                <div className="flex gap-3">
                  <Button onClick={() => void shareItinerary()} variant="secondary">
                    <Share2 aria-hidden className="h-4 w-4" />
                    Share
                  </Button>
                  <Button onClick={() => window.print()}>
                    <Download aria-hidden className="h-4 w-4" />
                    PDF
                  </Button>
                </div>
              </div>
            </Card>
            <div className="relative grid gap-4">
              <div className="absolute bottom-0 left-6 top-0 hidden w-px bg-gold/35 sm:block" />
              {days.length === 0 ? (
                <Card className="p-8 text-center text-mist">Choose your preferences and build an itinerary from the backend.</Card>
              ) : (
                days.map((day) => (
                  <Card key={day.day} className="relative p-5 sm:ml-14">
                    <span className="absolute -left-[4.25rem] top-6 hidden h-10 w-10 place-items-center rounded-full bg-gold text-navy sm:grid">
                      <CalendarDays aria-hidden className="h-5 w-5" />
                    </span>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Day {day.day}</p>
                    <h3 className="mt-2 font-display text-2xl font-bold">{day.title}</h3>
                    <div className="mt-4">
                      <Accordion title="View day details" defaultOpen={day.day === 1}>
                        <ul className="space-y-2">
                          {day.morning && <li>Morning: {day.morning.activity} - {day.morning.description} ({day.morning.duration_hrs} hrs, {day.morning.cost_note})</li>}
                          {day.afternoon && <li>Afternoon: {day.afternoon.activity} - {day.afternoon.description} ({day.afternoon.duration_hrs} hrs, {day.afternoon.cost_note})</li>}
                          {day.evening && <li>Evening: {day.evening.activity} - {day.evening.description} ({day.evening.duration_hrs} hrs, {day.evening.cost_note})</li>}
                          {day.tip && <li>Tip: {day.tip}</li>}
                          {!day.morning &&
                            day.activities.map((item) => (
                              <li key={item}>- {item}</li>
                            ))}
                        </ul>
                      </Accordion>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
