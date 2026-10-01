import heroHome from '@/assets/photos/hero-home.jpg';
import homeTogether from '@/assets/photos/home-together.jpg';
import workStars from '@/assets/photos/work-stars.jpg';
import workElder from '@/assets/photos/work-elder.jpg';
import workNurses from '@/assets/photos/work-nurses.jpg';
import aboutPath from '@/assets/photos/about-path.jpg';
import contactDesk from '@/assets/photos/contact-desk.jpg';
import { photoCredits, PhotoCreditKey } from '@/lib/photos';
import { cn } from '@/lib/utils';

const images = {
  heroHome,
  homeTogether,
  workStars,
  workElder,
  workNurses,
  aboutPath,
  contactDesk,
} as const;

type PhotoProps = {
  id: PhotoCreditKey;
  className?: string;
  priority?: boolean;
};

export function Photo({ id, className, priority }: PhotoProps) {
  const credit = photoCredits[id];
  return (
    <img
      src={images[id]}
      alt={credit.alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}

export function PhotoCredit({
  id,
  className,
}: {
  id: PhotoCreditKey;
  className?: string;
}) {
  const credit = photoCredits[id];
  return (
    <p className={cn('mt-2 text-xs tracking-wide text-ink-muted', className)}>
      Photo:{' '}
      <a
        href={credit.url}
        target="_blank"
        rel="noreferrer"
        className="text-inherit no-underline underline-offset-2 hover:underline"
      >
        {credit.photographer}
      </a>{' '}
      / Unsplash
    </p>
  );
}
