import type { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
  as?: 'article' | 'div' | 'section';
};

export function Card({ children, className = '', as: Element = 'div' }: CardProps) {
  return <Element className={`glass-panel rounded-[8px] ${className}`}>{children}</Element>;
}
