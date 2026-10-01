import { Link } from 'react-router-dom';

const nav = [
  { to: '/', label: 'Home' },
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t-[3px] border-ink bg-surface-inverse text-surface">
      <div className="theme-rail h-1.5 w-full" aria-hidden />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.5fr_1fr_1fr] md:px-8 md:py-16">
        <div>
          <p className="wordmark text-3xl text-primary">Macovin</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-surface/85 md:text-base">
            Clear apps and sites for people when life gets hard. Small family
            company. Meanwhile&apos;s the factory. We&apos;ll tell you when we
            don&apos;t know yet.
          </p>
        </div>
        <div>
          <p className="eyebrow text-primary">On this site</p>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="font-bold text-surface no-underline hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3 text-sm text-surface/80">
          <p className="eyebrow text-primary">Elsewhere</p>
          <p>
            <a
              href="https://github.com/MeanwhileJS/meanwhile"
              className="font-bold text-surface no-underline hover:text-primary"
              target="_blank"
              rel="noreferrer"
            >
              Meanwhile on GitHub
            </a>
          </p>
          <p>
            <a
              href="https://github.com/loraxx753/macovin"
              className="font-bold text-surface no-underline hover:text-primary"
              target="_blank"
              rel="noreferrer"
            >
              Company docs
            </a>
          </p>
          <p className="pt-2 text-xs text-surface/50">
            Photos via Unsplash (credited on each page).
          </p>
        </div>
      </div>
    </footer>
  );
}
