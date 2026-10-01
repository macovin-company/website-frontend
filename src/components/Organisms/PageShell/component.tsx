import { ReactNode } from 'react';
import { SiteHeader } from '@/components/Organisms/SiteHeader';
import { SiteFooter } from '@/components/Organisms/SiteFooter';
import { StickyCta } from '@/components/Organisms/StickyCta';

type PageShellProps = {
  children: ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-surface text-ink">
      <SiteHeader />
      <main className="flex-1 pb-24 md:pb-0">{children}</main>
      <SiteFooter />
      <StickyCta />
    </div>
  );
}
