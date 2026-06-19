import type { LucideIcon } from 'lucide-react';

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  align?: 'left' | 'center';
};

export function SectionHeader({ eyebrow, title, description, icon: Icon, align = 'left' }: SectionHeaderProps) {
  return (
    <div className={`mx-auto max-w-3xl ${align === 'center' ? 'text-center' : ''}`}>
      {eyebrow && (
        <p className={`mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-gold ${align === 'center' ? 'justify-center' : ''}`}>
          {Icon && <Icon aria-hidden className="h-4 w-4" />}
          {eyebrow}
        </p>
      )}
      <h1 className="font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">{title}</h1>
      {description && <p className="mt-4 text-base leading-7 text-mist sm:text-lg">{description}</p>}
    </div>
  );
}
