import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Card } from './Card';

type AccordionProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Card>
      <button
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-bold text-white"
        onClick={() => setOpen((value) => !value)}
      >
        {title}
        <ChevronDown aria-hidden className={`h-5 w-5 shrink-0 text-gold transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="border-t border-white/10 px-5 py-4 text-sm leading-7 text-mist">{children}</div>}
    </Card>
  );
}
