import { MessageCircle } from 'lucide-react';

export function WhatsappWidget() {
  return (
    <a
      aria-label="Open WhatsApp concierge"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-glow transition hover:-translate-y-1"
      href="https://wa.me/971500000000"
      rel="noreferrer"
      target="_blank"
    >
      <MessageCircle aria-hidden className="h-7 w-7" />
    </a>
  );
}
