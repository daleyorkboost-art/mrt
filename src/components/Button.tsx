import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
};

const variants = {
  primary: 'bg-gradient-to-r from-gold to-[#1D4ED8] text-white shadow-glow hover:from-[#1D4ED8] hover:to-[#1E40AF]',
  secondary: 'border border-gold bg-white text-gold shadow-sm hover:bg-[#EFF6FF] hover:text-[#1D4ED8]',
  ghost: 'text-mist hover:bg-[#EFF6FF] hover:text-gold',
};

export function Button({ children, className = '', variant = 'primary', type = 'button', ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
