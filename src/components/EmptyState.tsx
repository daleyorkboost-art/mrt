import { SearchX } from 'lucide-react';
import { Card } from './Card';

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <Card className="grid place-items-center px-6 py-12 text-center">
      <SearchX aria-hidden className="h-10 w-10 text-gold" />
      <h2 className="mt-4 font-display text-2xl font-bold text-ink">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-mist">{description}</p>
    </Card>
  );
}
