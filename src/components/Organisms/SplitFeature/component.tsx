import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Photo, PhotoCredit } from '@/components/Atoms/Photo';
import { PhotoCreditKey } from '@/lib/photos';

type Props = {
  photo: PhotoCreditKey;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  reverse?: boolean;
  className?: string;
  priority?: boolean;
};

export function SplitFeature({
  photo,
  eyebrow,
  title,
  children,
  reverse,
  className,
  priority,
}: Props) {
  return (
    <div
      className={cn(
        'grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16',
        className,
      )}
    >
      <div className={cn(reverse && 'md:order-2')}>
        <figure>
          <div className="panel overflow-hidden bg-surface">
            <Photo
              id={photo}
              priority={priority}
              className="motion-safe-hover aspect-[4/3] w-full object-cover transition duration-700 hover:scale-[1.02]"
            />
          </div>
          <PhotoCredit id={photo} />
        </figure>
      </div>
      <div className={cn(reverse && 'md:order-1')}>
        {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
        <h2 className="font-display text-3xl uppercase tracking-tight text-ink md:text-4xl text-balance">
          {title}
        </h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-muted md:text-lg text-pretty">
          {children}
        </div>
      </div>
    </div>
  );
}
