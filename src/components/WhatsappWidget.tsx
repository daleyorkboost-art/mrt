import { MessageCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { trackMicroConversion } from '../services/visitorIntelligence';

const phone = (import.meta.env.VITE_WHATSAPP_NUMBER || '971585566036').replace(/\D/g, '');
const dismissedKey = 'mgt-whatsapp-dismissed';

export function WhatsappWidget() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(() => window.sessionStorage.getItem(dismissedKey) === 'true');

  useEffect(() => {
    if (dismissed) return undefined;
    const timer = window.setTimeout(() => setOpen(true), 30000);
    return () => window.clearTimeout(timer);
  }, [dismissed]);

  const message = (() => {
    const base = "Hi! I'm interested in travel packages with MyGlobalTrips. Please help me plan my trip.";
    const stored = window.sessionStorage.getItem('mgt-trip-preferences');
    if (!stored) return base;

    try {
      const preferences = JSON.parse(stored) as { style?: string; group?: string; budget?: string; destination?: string };
      return `${base} Preferences: ${preferences.style || 'Any style'}, ${preferences.group || 'Any group'}, ${preferences.budget || 'Flexible budget'}, ${preferences.destination || 'Open destination'}.`;
    } catch {
      return base;
    }
  })();

  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  function dismiss() {
    window.sessionStorage.setItem(dismissedKey, 'true');
    setDismissed(true);
    setOpen(false);
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 grid justify-items-end gap-3">
      {open && (
        <Card className="w-[min(22rem,calc(100vw-2rem))] p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-white">Plan with MyGlobalTrips</h2>
              <p className="mt-2 text-sm leading-6 text-mist">Chat with our travel concierge on WhatsApp for quotes, visas, and curated trip ideas.</p>
            </div>
            <button aria-label="Dismiss WhatsApp popup" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-mist" onClick={dismiss}>
              <X aria-hidden className="h-4 w-4" />
            </button>
          </div>
          <a href={href} rel="noreferrer" target="_blank">
            <Button className="mt-5 w-full" onClick={() => trackMicroConversion('WhatsApp chat clicked', { message })}>
              <MessageCircle aria-hidden className="h-4 w-4" />
              Chat on WhatsApp
            </Button>
          </a>
        </Card>
      )}
      <button
        aria-label="Open WhatsApp concierge"
        className="grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-glow transition hover:-translate-y-1"
        onClick={() => setOpen((value) => !value)}
      >
        <MessageCircle aria-hidden className="h-7 w-7" />
      </button>
    </div>
  );
}
