import { Bot, MessageCircle, Send, Sparkles, UserRound } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { PageShell } from '../components/PageShell';
import { SectionHeader } from '../components/SectionHeader';
import { api } from '../services/api';
import { trackToolEngagement } from '../services/visitorIntelligence';

const suggestions = ['Plan 5 days in Dubai', 'What visa documents do I need?', 'Suggest Maldives for a couple', 'Create a luxury Europe route'];
const storageKey = 'mgt-aria-messages';

type Message = {
  role: 'assistant' | 'user';
  text: string;
};

export function AriaChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Hello, I am ARIA. Tell me your travel mood, dates, or dream destination and I will shape a premium plan.' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const stored = window.sessionStorage.getItem(storageKey);
    if (stored) {
      setMessages(JSON.parse(stored) as Message[]);
    }
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem(storageKey, JSON.stringify(messages));
  }, [messages]);

  async function send(text = input) {
    if (!text.trim()) return;
    setMessages((current) => [...current, { role: 'user', text }]);
    setInput('');
    setTyping(true);

    try {
      const response = await api.faq({ query: text });
      trackToolEngagement('Chatbot question asked', { query: text, category: response.category });
      const suggestionsText = response.follow_up_suggestions.length > 0 ? `\n\nTry next: ${response.follow_up_suggestions.join(' | ')}` : '';
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          text: `${response.answer}${suggestionsText}`,
        },
      ]);
    } catch (requestError) {
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          text: requestError instanceof Error ? requestError.message : 'ARIA could not reach the backend right now.',
        },
      ]);
    } finally {
      setTyping(false);
    }
  }

  return (
    <PageShell>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-20 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div>
          <SectionHeader
            eyebrow="ARIA chatbot"
            title="A premium travel assistant that feels like a concierge"
            description="Ask destination, visa, package, and planning questions through MyGlobalTrips' concierge knowledge base."
            icon={Sparkles}
          />
          <Card className="mt-8 p-5">
            <h2 className="font-display text-2xl font-bold">Suggested questions</h2>
            <div className="mt-5 grid gap-3">
              {suggestions.map((question) => (
                <button
                  key={question}
                  className="rounded-[8px] border border-white/12 bg-white/8 px-4 py-3 text-left text-sm font-semibold text-mist transition hover:border-gold/50 hover:text-white"
                  onClick={() => void send(question)}
                  type="button"
                >
                  {question}
                </button>
              ))}
            </div>
          </Card>
        </div>

        <Card className="relative min-h-[680px] overflow-hidden p-4 sm:p-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-gold text-navy">
                <Bot aria-hidden className="h-6 w-6" />
              </span>
              <div>
                <h1 className="font-display text-2xl font-bold">ARIA</h1>
                <p className="text-sm text-mist">Online travel concierge</p>
              </div>
            </div>
            <span className="rounded-full bg-teal/20 px-3 py-1 text-xs font-bold text-[#7dd3c7]">Online</span>
          </div>

          <div className="flex h-[500px] flex-col gap-4 overflow-y-auto py-6">
            {messages.map((message, index) => {
              const assistant = message.role === 'assistant';
              return (
                <div key={`${message.text}-${index}`} className={`flex gap-3 ${assistant ? '' : 'justify-end'}`}>
                  {assistant && (
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold text-navy">
                      <Bot aria-hidden className="h-4 w-4" />
                    </span>
                  )}
                  <div className={`max-w-[82%] rounded-[8px] px-4 py-3 text-sm leading-6 ${assistant ? 'bg-white/10 text-mist' : 'bg-gold text-navy'}`}>
                    {message.text}
                  </div>
                  {!assistant && (
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-white">
                      <UserRound aria-hidden className="h-4 w-4" />
                    </span>
                  )}
                </div>
              );
            })}
            {typing && (
              <div className="flex items-center gap-3 text-mist">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gold text-navy">
                  <Bot aria-hidden className="h-4 w-4" />
                </span>
                <span className="flex gap-1 rounded-full bg-white/10 px-4 py-3">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gold" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gold [animation-delay:120ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gold [animation-delay:240ms]" />
                </span>
              </div>
            )}
          </div>

          <form
            className="flex gap-3 border-t border-white/10 pt-4"
            onSubmit={(event) => {
              event.preventDefault();
              void send();
            }}
          >
            <input
              aria-label="Message ARIA"
              className="min-h-12 flex-1 rounded-full border border-white/14 bg-midnight/80 px-5 text-white placeholder:text-mist/70"
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask ARIA about a trip..."
              value={input}
            />
            <Button aria-label="Send message" className="px-4">
              <Send aria-hidden className="h-4 w-4" />
            </Button>
          </form>
          <div className="absolute bottom-24 right-7 grid h-14 w-14 place-items-center rounded-full bg-gold text-navy shadow-glow">
            <MessageCircle aria-hidden className="h-6 w-6" />
          </div>
        </Card>
      </section>
    </PageShell>
  );
}
