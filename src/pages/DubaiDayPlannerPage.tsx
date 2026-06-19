import { Landmark, Map, WalletCards } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { MultiSelect, SelectField } from '../components/FormControls';
import { PageShell } from '../components/PageShell';
import { SectionHeader } from '../components/SectionHeader';
import { pageMeta } from '../data/mockData';
import { api, type DubaiPlanResponse } from '../services/api';
import { trackToolEngagement } from '../services/visitorIntelligence';

const interests = ['desert', 'luxury', 'culture', 'shopping', 'skyline', 'beach', 'food'];

export function DubaiDayPlannerPage() {
  const [budget, setBudget] = useState('Premium');
  const [group, setGroup] = useState('Couple');
  const [time, setTime] = useState('Full day');
  const [selected, setSelected] = useState(['desert', 'luxury']);
  const [result, setResult] = useState<DubaiPlanResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function toggle(value: string) {
    setSelected((current) => (current.includes(value) ? current.filter((item) => item !== value) : [...current, value]));
  }

  async function planDubaiDay() {
    setLoading(true);
    setError('');

    try {
      const response = await api.dubaiPlan({
        budget: budget.toLowerCase(),
        group: group.toLowerCase(),
        time: time.toLowerCase().replace(' only', ''),
        interests: selected,
      });
      setResult(response);
      trackToolEngagement('Dubai day planned', { budget, group, time, interests: selected });
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to plan Dubai day');
    } finally {
      setLoading(false);
    }
  }

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
              <div>
                <p className="mb-3 text-sm font-semibold text-white">Interests</p>
                <MultiSelect options={interests} selected={selected} onToggle={toggle} />
              </div>
              <Button disabled={loading} onClick={planDubaiDay}>
                {loading ? 'Planning...' : 'Plan Dubai day'}
              </Button>
              {error && <p className="rounded-[8px] border border-ruby/40 bg-ruby/20 px-4 py-3 text-sm text-[#ffb4cf]">{error}</p>}
            </div>
          </Card>

          <div className="grid gap-5">
            <Card className="p-5">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
                    {budget} / {group} / {time}
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-bold">Dubai signature schedule</h2>
                </div>
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-gold/16 px-4 py-2 text-sm font-bold text-gold">
                  <WalletCards aria-hidden className="h-4 w-4" />
                  AED {result?.estimatedCostAed || 0} estimate
                </span>
              </div>
            </Card>

            <div className="grid gap-4">
              {!result ? (
                <Card className="p-8 text-center text-mist">Choose your preferences to build a MyGlobalTrips Dubai plan.</Card>
              ) : (
                result.attractions.map((item, index) => (
                  <Card key={item.id} className="grid gap-4 p-5 sm:grid-cols-[80px_1fr_auto] sm:items-center">
                    <span className="font-display text-2xl font-bold text-gold">{index === 0 ? '9:00' : index === 1 ? '12:00' : index === 2 ? '15:30' : '18:30'}</span>
                    <div className="flex items-center gap-4">
                      <span className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-gold">
                        <Landmark aria-hidden className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-display text-2xl font-bold">{item.name}</h3>
                        <p className="text-sm text-mist">
                          {item.duration_hrs || 2} hrs / {item.interests.join(', ')}
                        </p>
                        {item.tip && <p className="mt-1 text-xs text-gold">Tip: {item.tip}</p>}
                      </div>
                    </div>
                    <span className="text-lg font-extrabold">AED {item.avg_cost_aed || Math.round(item.costUsd * 3.67)}</span>
                  </Card>
                ))
              )}
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <Card className="p-5">
                <h3 className="font-display text-2xl font-bold">Planning notes</h3>
                <div className="mt-4 space-y-3 text-sm text-mist">
                  {(result?.notes || ['Backend plan notes will appear here.']).map((note) => (
                    <p key={note}>- {note}</p>
                  ))}
                  <p className="border-t border-white/10 pt-3 text-lg font-bold text-white">Total: AED {result?.estimatedCostAed || 0}</p>
                </div>
              </Card>
              <Card className="grid min-h-56 place-items-center overflow-hidden p-5">
                <div className="text-center">
                  <Map aria-hidden className="mx-auto h-10 w-10 text-gold" />
                  <h3 className="mt-4 font-display text-2xl font-bold">Map preview</h3>
                  <p className="mt-2 text-sm text-mist">{result ? result.attractions.map((item) => item.name).join(' - ') : 'Route appears after planning'}</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
