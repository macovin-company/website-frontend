import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
  as?: 'section' | 'div';
};

export function PageSection({
  children,
  className,
  narrow,
  as: Tag = 'section',
}: Props) {
  return (
    <Tag
      className={cn(
        'mx-auto w-full px-4 py-[var(--space-section)] md:px-8',
        narrow ? 'max-w-3xl' : 'max-w-6xl',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
