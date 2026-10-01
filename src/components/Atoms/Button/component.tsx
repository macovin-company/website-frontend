import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { cn } from '@/lib/utils';

const base =
  'inline-flex min-h-tap items-center justify-center gap-2 border-[3px] border-ink px-5 py-3 text-sm font-bold tracking-wide shadow-[3px_3px_0_0_hsl(var(--ink))] transition duration-press focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:pointer-events-none disabled:opacity-60';

const variants = {
  primary: 'bg-primary text-primary-fg hover:bg-secondary hover:text-secondary-fg',
  secondary: 'bg-surface text-ink hover:bg-secondary-soft',
  tertiary: 'bg-tertiary text-tertiary-fg hover:bg-primary hover:text-primary-fg',
  ghost: 'border-ink bg-transparent text-ink shadow-none hover:bg-primary',
} as const;

type Variant = keyof typeof variants;

type Common = {
  variant?: Variant;
  className?: string;
};

type ButtonAsButton = Common &
  ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined; href?: undefined };

type ButtonAsLink = Common & LinkProps & { href?: undefined };

type ButtonAsAnchor = Common &
  AnchorHTMLAttributes<HTMLAnchorElement> & { to?: undefined; href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

export function Button(props: ButtonProps) {
  const { variant = 'primary', className, children, ...rest } = props;
  const classes = cn(base, variants[variant], className);

  if ('to' in rest && rest.to !== undefined) {
    const { to, ...linkRest } = rest as ButtonAsLink;
    return (
      <Link to={to} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }

  if ('href' in rest && rest.href) {
    const { href, ...anchorRest } = rest as ButtonAsAnchor;
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }

  const buttonRest = rest as ButtonAsButton;
  return (
    <button type={buttonRest.type ?? 'button'} className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
