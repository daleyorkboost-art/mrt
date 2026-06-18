import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { Accordion } from '../components/Accordion';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { SelectField } from '../components/FormControls';
import { PageShell } from '../components/PageShell';
import { SectionHeader } from '../components/SectionHeader';
import { pageMeta } from '../data/mockData';
import { api, type VisaResponse } from '../services/api';
import { trackMicroConversion, trackToolEngagement } from '../services/visitorIntelligence';

export function VisaChecklistPage() {
  const [nationality, setNationality] = useState('Indian');
  const [destination, setDestination] = useState('UAE');
  const [month, setMonth] = useState('August 2026');
  const [checked, setChecked] = useState<string[]>([]);
  const [result, setResult] = useState<VisaResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function toggle(item: string) {
    setChecked((current) => (current.includes(item) ? current.filter((entry) => entry !== item) : [...current, item]));
  }

  async function generateChecklist() {
    setLoading(true);
    setError('');

    try {
      const response = await api.visa({
        passport: nationality,
        destination,
        month,
      });
      setResult(response);
      setChecked(response.required_documents.slice(0, 1));
      trackToolEngagement('Visa checklist generated', { nationality, destination, month });
    } catch (requestError) {
      setResult(null);
      setError(requestError instanceof Error ? requestError.message : 'Unable to generate visa checklist');
    } finally {
      setLoading(false);
    }
  }

  const documents = result?.required_documents || [];
  const badgeClass = result?.visa_type === 'Visa-Free' ? 'bg-teal/25 text-[#7dd3c7]' : result?.visa_type === 'Embassy Visa Required' ? 'bg-ruby/25 text-[#ffb4cf]' : 'bg-gold/16 text-gold';

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <SectionHeader {...pageMeta.visa} align="center" />
        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="h-fit p-6">
            <div className="grid gap-5">
              <SelectField label="Nationality" value={nationality} options={['Indian', 'US', 'UK', 'Singapore']} onChange={setNationality} />
              <SelectField label="Destination" value={destination} options={['UAE', 'Schengen', 'Japan', 'Maldives', 'UK']} onChange={setDestination} />
              <SelectField label="Travel month" value={month} options={['April 2026', 'July 2026', 'August 2026', 'September 2026', 'December 2026']} onChange={setMonth} />
              <div className="grid gap-3 sm:grid-cols-2">
                <Button disabled={loading} onClick={generateChecklist}>
                  {loading ? 'Generating...' : 'Generate checklist'}
                </Button>
                <Button onClick={() => { trackMicroConversion('Visa PDF saved', { nationality, destination }); window.print(); }} variant="secondary">
                  Print / PDF
                </Button>
              </div>
              {error && <p className="rounded-[8px] border border-ruby/40 bg-ruby/20 px-4 py-3 text-sm text-[#ffb4cf]">{error}</p>}
            </div>
          </Card>

          <div className="grid gap-5">
            <Card className="p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
                    {nationality} to {destination}
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-bold">{result?.visa_type || 'Visa checklist not generated yet'}</h2>
                  <p className="mt-2 text-sm text-mist">
                    {result ? `${result.processing_time} processing. Estimated fees: $${result.estimated_fees_usd}.` : `Generate an advisory for travel in ${month}.`}
                  </p>
                </div>
                <span className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${badgeClass}`}>
                  <AlertTriangle aria-hidden className="h-4 w-4" />
                  {result ? `${result.validity_days} days validity` : 'Check required'}
                </span>
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="font-display text-2xl font-bold">Interactive checklist</h3>
              <div className="mt-5 grid gap-3">
                {documents.length === 0 ? (
                  <p className="text-sm text-mist">Generate a checklist to see backend-required documents.</p>
                ) : (
                  documents.map((item) => {
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
                  })
                )}
              </div>
            </Card>

            <div className="grid gap-3">
              <Accordion title="Packing list">
                <ul className="space-y-2">
                  {(result?.packing_list || ['Generate a checklist to load packing guidance.']).map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </Accordion>
              <Accordion title="Important notices">
                <ul className="space-y-2">
                  {(result?.important_notices || ['Official visa rules can change.']).map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </Accordion>
            </div>

            <Card className="border-gold/30 p-5">
              <h3 className="font-display text-2xl font-bold">Advisory</h3>
              <p className="mt-3 leading-7 text-mist">
                {result?.month_specific_notes || 'Processing windows can change around holidays and peak travel months. Generate a checklist for month-specific guidance.'}
              </p>
            </Card>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
