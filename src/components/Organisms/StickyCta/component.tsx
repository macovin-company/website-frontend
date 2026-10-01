import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/Atoms/Button';
import { cn } from '@/lib/utils';

/**
 * Thumb-zone primary action on phones. Appears after the first viewport so it
 * doesn’t stack on top of the hero CTAs. Hidden on Contact and desktop.
 */
export function StickyCta() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > Math.min(window.innerHeight * 0.55, 420));
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  if (pathname === '/contact') {
    return null;
  }

  const onWork = pathname === '/work';

  return (
    <div
      className={cn(
        'pointer-events-none fixed inset-x-0 bottom-0 z-40 transition duration-200 md:hidden',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0',
      )}
      aria-hidden={!visible}
    >
      <div className="pointer-events-auto border-t-[3px] border-ink bg-surface px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
        <Button
          to={onWork ? '/contact' : '/work'}
          className="w-full no-underline"
          tabIndex={visible ? 0 : -1}
        >
          {onWork ? 'Talk to us' : 'See what we can build'}
        </Button>
      </div>
    </div>
  );
}
