import { cn } from '@/lib/utils';

export type FaqItem = {
  question: string;
  answer: string;
};

type Props = {
  items: readonly FaqItem[];
  className?: string;
};

export function FaqList({ items, className }: Props) {
  return (
    <div className={cn('space-y-3', className)}>
      {items.map((item) => (
        <details
          key={item.question}
          className="group panel-flat bg-surface open:bg-primary-soft"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-4 py-4 text-left font-display text-lg uppercase tracking-tight text-ink marker:content-none md:px-5 md:text-xl [&::-webkit-details-marker]:hidden">
            <span className="text-balance">{item.question}</span>
            <span
              aria-hidden
              className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center border-[2px] border-ink bg-secondary text-sm font-bold leading-none text-secondary-fg transition group-open:rotate-45 group-open:bg-tertiary"
            >
              +
            </span>
          </summary>
          <p className="measure border-t-[3px] border-ink px-4 pb-4 pt-3 text-base leading-relaxed text-ink-muted md:px-5 text-pretty">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
