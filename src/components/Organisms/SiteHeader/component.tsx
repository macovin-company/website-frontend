import { useEffect, useId, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/Atoms/Button';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const;

/**
 * Nav states (CTA stays yellow — menu must not):
 *   default — ink text, no chrome
 *   hover   — cyan underline + cyan text
 *   active  — ink underline only (no fill wash)
 */
function linkClass({ isActive }: { isActive: boolean }) {
  return cn(
    'relative block min-h-tap px-3 py-2.5 text-base font-bold uppercase tracking-wide no-underline transition md:inline-flex md:min-h-0 md:items-center md:px-2.5 md:py-2 md:text-xs',
    'after:absolute after:inset-x-2.5 after:bottom-1 after:h-[3px] after:origin-left after:transition',
    isActive
      ? 'text-ink after:scale-x-100 after:bg-ink hover:text-ink'
      : 'text-ink after:scale-x-0 after:bg-secondary hover:text-secondary hover:after:scale-x-100',
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-30">
      <div className="theme-rail h-1.5 w-full" aria-hidden />
      <div className="border-b-[3px] border-ink bg-surface">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:gap-6 md:px-8 md:py-3">
          <NavLink
            to="/"
            onClick={closeMenu}
            className="wordmark wordmark-nav relative z-40 text-[1.2rem] text-ink no-underline transition hover:text-ink md:text-[1.35rem]"
            aria-label="Macovin home"
          >
            Macovin
          </NavLink>

          <button
            type="button"
            className="relative z-40 inline-flex h-11 w-11 items-center justify-center border-[3px] border-ink bg-primary text-ink transition hover:bg-secondary hover:text-secondary-fg focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <span className="flex w-5 flex-col gap-1.5" aria-hidden>
              <span
                className={cn(
                  'block h-0.5 w-full origin-center bg-current transition',
                  open && 'translate-y-2 rotate-45',
                )}
              />
              <span
                className={cn(
                  'block h-0.5 w-full bg-current transition',
                  open && 'opacity-0',
                )}
              />
              <span
                className={cn(
                  'block h-0.5 w-full origin-center bg-current transition',
                  open && '-translate-y-2 -rotate-45',
                )}
              />
            </span>
          </button>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-0.5 md:flex"
          >
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={'end' in link ? link.end : false}
                className={linkClass}
              >
                {link.label}
              </NavLink>
            ))}
            <Button to="/work" className="ml-3 no-underline">
              See what we can build
            </Button>
          </nav>
        </div>
      </div>

      <div
        className={cn(
          'fixed inset-0 z-30 md:hidden',
          open ? 'pointer-events-auto' : 'pointer-events-none',
        )}
      >
        <button
          type="button"
          className={cn(
            'absolute inset-0 bg-ink/40 transition-opacity',
            open ? 'opacity-100' : 'opacity-0',
          )}
          aria-label="Close menu"
          tabIndex={open ? 0 : -1}
          onClick={closeMenu}
        />
        <nav
          id={menuId}
          aria-label="Primary"
          className={cn(
            'absolute inset-x-0 top-0 border-b-[3px] border-ink bg-surface px-4 pb-8 pt-20 transition-transform duration-200',
            open ? 'translate-y-0' : '-translate-y-full',
          )}
        >
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={'end' in link ? link.end : false}
                  className={linkClass}
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-5">
            <Button to="/work" className="w-full no-underline" onClick={closeMenu}>
              See what we can build
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
