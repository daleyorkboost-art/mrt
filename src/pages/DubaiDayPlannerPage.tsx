import { Map, WalletCards } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { SelectField } from '../components/FormControls';
import { PageShell } from '../components/PageShell';
import { SectionHeader } from '../components/SectionHeader';
import { dubaiTimeline, pageMeta } from '../data/mockData';

export function DubaiDayPlannerPage() {
  const [budget, setBudget] = useState('Premium');
  const [group, setGroup] = useState('Couple');
  const [time, setTime] = useState('Full day');
  const total = useMemo(() => dubaiTimeline.reduce((sum, item) => sum + Number(item.cost.replace('$', '')), 0), []);

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <SectionHeader {...pageMeta.dubai} align="center" />
        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="h-fit p-6">
            <div className="grid gap-5">
              <SelectField label="Budget" value={budget} options={['Smart', 'Premium', 'Ultra Luxury']} onChange={setBudget} />
              <SelectField label="Group" value={group} options={['Couple', 'Family', 'Friends', 'Solo']} onChange={setGroup} />
              <SelectField label="Available time" value={time} options={['Half day', 'Full day', 'Evening only']} onChange={setTime} />
              <Button>Plan Dubai day</Button>
            </div>
          </Card>

          <div className="grid gap-5">
            <Card className="p-5">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">{budget} / {group} / {time}</p>
                  <h2 className="mt-2 font-display text-3xl font-bold">Dubai signature schedule</h2>
                </div>
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-gold/16 px-4 py-2 text-sm font-bold text-gold">
                  <WalletCards aria-hidden className="h-4 w-4" />
                  ${total} estimate
                </span>
              </div>
            </Card>

            <div className="grid gap-4">
              {dubaiTimeline.map((item) => (
                <Card key={item.time} className="grid gap-4 p-5 sm:grid-cols-[80px_1fr_auto] sm:items-center">
                  <span className="font-display text-2xl font-bold text-gold">{item.time}</span>
                  <div className="flex items-center gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-gold">
                      <item.icon aria-hidden className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-2xl font-bold">{item.title}</h3>
                      <p className="text-sm text-mist">Private routing, low waiting time, premium timing.</p>
                    </div>
                  </div>
                  <span className="text-lg font-extrabold">{item.cost}</span>
                </Card>
              ))}
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <Card className="p-5">
                <h3 className="font-display text-2xl font-bold">Cost summary</h3>
                <div className="mt-4 space-y-3 text-sm text-mist">
                  <p>Attractions: $275</p>
                  <p>Dining: $265</p>
                  <p>Experiences: $210</p>
                  <p className="border-t border-white/10 pt-3 text-lg font-bold text-white">Total: ${total}</p>
                </div>
              </Card>
              <Card className="grid min-h-56 place-items-center overflow-hidden p-5">
                <div className="text-center">
                  <Map aria-hidden className="mx-auto h-10 w-10 text-gold" />
                  <h3 className="mt-4 font-display text-2xl font-bold">Map preview</h3>
                  <p className="mt-2 text-sm text-mist">Dubai Marina - Downtown - Jumeirah - Desert route</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
