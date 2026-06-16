import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { Accordion } from '../components/Accordion';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { SelectField } from '../components/FormControls';
import { PageShell } from '../components/PageShell';
import { SectionHeader } from '../components/SectionHeader';
import { packingGroups, pageMeta, visaChecklist } from '../data/mockData';

export function VisaChecklistPage() {
  const [nationality, setNationality] = useState('Indian');
  const [destination, setDestination] = useState('UAE');
  const [month, setMonth] = useState('August 2026');
  const [checked, setChecked] = useState<string[]>(['Passport valid for at least 6 months']);

  function toggle(item: string) {
    setChecked((current) => (current.includes(item) ? current.filter((entry) => entry !== item) : [...current, item]));
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <SectionHeader {...pageMeta.visa} align="center" />
        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="h-fit p-6">
            <div className="grid gap-5">
              <SelectField label="Nationality" value={nationality} options={['Indian', 'UAE Resident', 'US', 'UK', 'Singapore']} onChange={setNationality} />
              <SelectField label="Destination" value={destination} options={['UAE', 'Schengen', 'Japan', 'Maldives', 'UK']} onChange={setDestination} />
              <SelectField label="Travel month" value={month} options={['July 2026', 'August 2026', 'September 2026', 'December 2026']} onChange={setMonth} />
              <Button>Generate checklist</Button>
            </div>
          </Card>

          <div className="grid gap-5">
            <Card className="p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">{nationality} to {destination}</p>
                  <h2 className="mt-2 font-display text-3xl font-bold">Visa likely required</h2>
                  <p className="mt-2 text-sm text-mist">Mock advisory for travel in {month}. Verify official embassy rules before booking.</p>
                </div>
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-ruby/25 px-4 py-2 text-sm font-bold text-[#ffb4cf]">
                  <AlertTriangle aria-hidden className="h-4 w-4" />
                  Check required
                </span>
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="font-display text-2xl font-bold">Interactive checklist</h3>
              <div className="mt-5 grid gap-3">
                {visaChecklist.map((item) => {
                  const active = checked.includes(item);
                  return (
                    <button
                      key={item}
                      className={`flex items-center gap-3 rounded-[8px] border px-4 py-3 text-left text-sm font-semibold transition ${
                        active ? 'border-teal bg-teal/20 text-white' : 'border-white/12 bg-white/8 text-mist'
                      }`}
                      onClick={() => toggle(item)}
                      type="button"
                    >
                      <CheckCircle2 aria-hidden className={`h-5 w-5 ${active ? 'text-[#7dd3c7]' : 'text-mist'}`} />
                      {item}
                    </button>
                  );
                })}
              </div>
            </Card>

            <div className="grid gap-3">
              {packingGroups.map((group) => (
                <Accordion key={group.title} title={group.title}>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item}>- {item}</li>
                    ))}
                  </ul>
                </Accordion>
              ))}
            </div>

            <Card className="border-gold/30 p-5">
              <h3 className="font-display text-2xl font-bold">Advisory</h3>
              <p className="mt-3 leading-7 text-mist">
                Processing windows can change around holidays and peak travel months. Keep refundable bookings and submit documents at least 30 days before departure.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
