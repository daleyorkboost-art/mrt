import { Menu, Plane, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { navItems } from '../data/mockData';
import { Button } from './Button';

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-white/92 shadow-sm backdrop-blur-2xl">
      <nav aria-label="Primary navigation" className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <span className="grid h-11 w-11 place-items-center rounded-full border border-gold/25 bg-[#EFF6FF] text-gold">
            <Plane aria-hidden className="h-5 w-5" />
          </span>
          <span>
            <span className="block font-display text-xl font-bold leading-none text-navy">MyGlobalTrips</span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">Luxury AI Travel</span>
          </span>
        </NavLink>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `rounded-full px-3 py-2 text-sm font-semibold transition ${
                  isActive ? 'bg-[#EFF6FF] text-gold' : 'text-navy hover:bg-[#F1F5F9] hover:text-gold'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/internal-quote-generator">
            <Button variant="secondary" className="px-4">
              Get quote
            </Button>
          </Link>
        </div>

        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-navy shadow-sm lg:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-white/98 px-4 py-4 shadow-sm lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-[8px] px-4 py-3 text-sm font-semibold ${isActive ? 'bg-gold text-white' : 'bg-surface text-navy'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
