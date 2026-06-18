import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { EmptyState } from '../components/EmptyState';
import { PageShell } from '../components/PageShell';
import { SectionHeader } from '../components/SectionHeader';
import { inclusions, pageMeta, recommenderOptions } from '../data/mockData';
import { api, type TripRecommendation } from '../services/api';
import { trackToolEngagement } from '../services/visitorIntelligence';

const steps = [
  { key: 'style', label: 'Travel Style' },
  { key: 'group', label: 'Group Type' },
  { key: 'budget', label: 'Budget' },
  { key: 'destination', label: 'Preferred Destination' },
] as const;

type StepKey = (typeof steps)[number]['key'];
type Answers = Record<StepKey, string>;

export function RecommenderPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    style: '',
    group: '',
    budget: '',
    destination: '',
  });
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<TripRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const current = steps[step];
  const progress = ((showResults ? steps.length : step + 1) / steps.length) * 100;
  const selectedCount = useMemo(() => Object.values(answers).filter(Boolean).length, [answers]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nextAnswers = {
      style: params.get('style') || '',
      group: params.get('group') || '',
      budget: params.get('budget') || '',
      destination: params.get('wish') || '',
    };

    if (Object.values(nextAnswers).some(Boolean)) {
      setAnswers(nextAnswers);
      setStep(steps.length - 1);
    }
  }, []);

  function choose(value: string) {
    setAnswers((currentAnswers) => ({ ...currentAnswers, [current.key]: value }));
  }

  async function loadRecommendations() {
    setLoading(true);
    setError('');

    const styleMap: Record<string, string> = {
      'Luxury Escape': 'luxury',
      Adventure: 'adventure',
      Wellness: 'wellness',
      'Culture & Food': 'culture',
    };

    try {
      const response = await api.recommend({
        style: styleMap[answers.style] || answers.style,
        group: answers.group.toLowerCase(),
        budget: answers.budget,
        wish: answers.destination,
      });
      setResults(response.results);
      setShowResults(true);
      trackToolEngagement('Trip recommender completed', answers);
      const params = new URLSearchParams({
        style: answers.style,
        group: answers.group,
        budget: answers.budget,
        wish: answers.destination,
      });
      window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);
      window.sessionStorage.setItem('mgt-trip-preferences', JSON.stringify(answers));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to load recommendations');
    } finally {
      setLoading(false);
    }
  }

  function next() {
    if (step === steps.length - 1) {
      void loadRecommendations();
      return;
    }
    setStep((value) => value + 1);
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <SectionHeader {...pageMeta.recommender} align="center" />
        <div className="mx-auto mt-10 max-w-5xl">
          <Card className="p-5 sm:p-7">
            <div className="mb-7">
              <div className="mb-3 flex items-center justify-between text-sm font-bold text-mist">
                <span>{showResults ? 'Recommendations ready' : current.label}</span>
                <span>{selectedCount}/4 preferences</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gold transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {!showResults ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.key}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="font-display text-3xl font-bold text-white">{current.label}</h2>
                  <p className="mt-2 text-mist">Choose the option that best matches this traveller profile.</p>
                  <div className="mt-7 grid gap-4 sm:grid-cols-2">
                    {recommenderOptions[current.key].map((option) => {
                      const active = answers[current.key] === option;
                      return (
                        <button
                          key={option}
                          className={`rounded-[8px] border p-5 text-left transition ${
                            active ? 'border-gold bg-gold/16 shadow-glow' : 'border-white/12 bg-white/8 hover:border-gold/50'
                          }`}
                          onClick={() => choose(option)}
                          type="button"
                        >
                          <Sparkles aria-hidden className={`h-5 w-5 ${active ? 'text-gold' : 'text-mist'}`} />
                          <span className="mt-5 block font-display text-2xl font-bold text-white">{option}</span>
                          <span className="mt-2 block text-sm leading-6 text-mist">Curated suppliers, pacing, and destination logic will adapt around this choice.</span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-8 flex justify-between">
                    <Button disabled={step === 0 || loading} onClick={() => setStep((value) => Math.max(0, value - 1))} variant="secondary">
                      <ArrowLeft aria-hidden className="h-4 w-4" />
                      Back
                    </Button>
                    <Button disabled={!answers[current.key] || loading} onClick={next}>
                      {loading ? 'Loading...' : step === steps.length - 1 ? 'Show results' : 'Next'}
                      <ArrowRight aria-hidden className="h-4 w-4" />
                    </Button>
                  </div>
                  {error && <p className="mt-4 rounded-[8px] border border-ruby/40 bg-ruby/20 px-4 py-3 text-sm text-[#ffb4cf]">{error}</p>}
                </motion.div>
              </AnimatePresence>
            ) : (
              <div>
                {results.length === 0 ? (
                  <EmptyState title="No recommendations returned" description="Try changing your preferences or confirm the backend is running on port 5000." />
                ) : (
                  <>
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                      <div>
                        <h2 className="font-display text-3xl font-bold">Recommended journeys</h2>
                        <p className="mt-2 text-mist">
                          Based on {answers.style}, {answers.group}, {answers.budget}, {answers.destination}.
                        </p>
                      </div>
                      <Button onClick={() => setShowResults(false)} variant="secondary">
                        Refine
                      </Button>
                    </div>
                    <div className="mt-8 grid gap-5 lg:grid-cols-3">
                      {results.map((item) => (
                        <Card key={item.id} className="overflow-hidden">
                          <img alt={item.destination} className="h-48 w-full object-cover" src={item.image} />
                          <div className="p-5">
                            <div className="flex items-start justify-between gap-3">
                              <h3 className="font-display text-2xl font-bold">{item.destination}</h3>
                              <span className="rounded-full bg-gold/16 px-3 py-1 text-xs font-bold text-gold">Score {item.score}</span>
                            </div>
                            <ul className="mt-4 space-y-2 text-sm text-mist">
                              {item.highlights.map((highlight) => (
                                <li key={highlight}>- {highlight}</li>
                              ))}
                            </ul>
                            {item.fallback && <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-gold">Popular fallback</p>}
                            <Button className="mt-6 w-full">Get quote</Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </Card>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {inclusions.map((item) => (
              <div key={item.label} className="flex items-center gap-3 rounded-[8px] border border-white/10 bg-white/6 p-3 text-sm font-bold text-mist">
                <item.icon aria-hidden className="h-4 w-4 text-gold" />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
