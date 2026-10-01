import { PageComponentType } from '@/lib/types';
import { PageShell } from '@/components/Organisms/PageShell';
import { Button } from '@/components/Atoms/Button';
import { Photo, PhotoCredit } from '@/components/Atoms/Photo';
import { SplitFeature } from '@/components/Organisms/SplitFeature';
import { PageSection } from '@/components/Molecules/PageSection';
import { FaqList } from '@/components/Molecules/FaqList';

const faqs = [
  {
    question: 'What do you actually sell?',
    answer:
      'Sites and apps people can use when life gets hard. Clear info, plain language, one job per page. Not a feature buffet. Honestly, that’s the whole pitch.',
  },
  {
    question: 'Is anything live yet?',
    answer:
      'Ideas / coming work. Not live products. If we build them, they get the same clear treatment. We’re not pretending a mockup is a launch.',
  },
  {
    question: 'What’s Meanwhile?',
    answer:
      'Meanwhile is the factory. Macovin is the company. Same tooling and habits so the next site feels like an afternoon, not a custom month.',
  },
  {
    question: 'How do we start?',
    answer:
      'Tell us what you need. Who it’s for. What’s true today. Messy is fine. Feel free to send the messy version. We’ll read it and say what fits.',
  },
] as const;

export const IndexPage: PageComponentType = () => {
  return (
    <PageShell>
      <section className="relative min-h-[min(100svh,52rem)] overflow-hidden border-b-[3px] border-ink md:min-h-[min(100svh,44rem)]">
        <div className="absolute inset-0">
          <Photo
            id="heroHome"
            priority
            className="h-full w-full object-cover animate-ken-slow"
          />
          <div className="absolute inset-0 bg-ink/75" />
          <div className="absolute inset-0 bg-halftone opacity-40 mix-blend-overlay" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-primary/40 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto flex min-h-[min(100svh,52rem)] max-w-6xl flex-col justify-end px-4 pb-16 pt-10 md:min-h-[min(100svh,44rem)] md:px-8 md:pb-20">
          <p className="animate-fade-up wordmark text-hero leading-none text-primary drop-shadow-[3px_3px_0_hsl(var(--ink))]">
            Macovin
          </p>
          <h1 className="animate-fade-up-delay mt-5 max-w-2xl font-display text-2xl uppercase leading-tight text-surface md:text-3xl text-balance">
            Clear apps and sites for people when life gets hard.
          </h1>
          <p className="animate-fade-up-late mt-4 max-w-lg text-base leading-relaxed text-surface/85 md:text-lg text-pretty">
            The packet you wish someone had handed you. No sales funnel.
            Meanwhile is how we ship it.
          </p>
          <div className="animate-fade-up-late mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button to="/work" className="no-underline">
              See what we can build
            </Button>
            <Button to="/contact" variant="secondary" className="no-underline">
              Talk to us
            </Button>
          </div>
          <div className="mt-8">
            <PhotoCredit id="heroHome" className="text-surface/55" />
          </div>
        </div>
      </section>

      <PageSection>
        <SplitFeature
          photo="homeTogether"
          eyebrow="Who it’s for"
          title="Real talk: who this is for"
        >
          <p>
            What are you actually trying to get done this week? Someone in the
            family is dying and nobody handed you the packet. Relatives keep
            talking past each other. You need a straight answer about work,
            care, or the next form, and you&apos;re wiped.
          </p>
          <p>
            That&apos;s who we build for. Clear info for a hard week. If we
            don&apos;t know something yet, we say so. Guessing just to sound
            sure is a silly way to run a week.
          </p>
        </SplitFeature>
      </PageSection>

      <section className="border-y-[3px] border-ink bg-band-dusk text-surface">
        <PageSection>
          <p className="eyebrow text-primary">How we work</p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl uppercase tracking-tight md:text-4xl text-balance">
            Most teams burn a week re-explaining the same thing.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-surface/80 md:text-lg">
            We name a thing once so design, engineering, and testing aren&apos;t
            playing telephone. Kudos if your standup already does this. Ours
            does.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-6">
            <div className="panel bg-primary p-6 text-primary-fg md:col-span-3 md:row-span-2 md:p-8">
              <h3 className="font-display text-2xl uppercase md:text-3xl">
                Same words
              </h3>
              <p className="mt-4 text-base leading-relaxed md:text-lg">
                Design, engineering, and testing use the same names. Less
                telephone. Less “wait, which banner was that again?”
              </p>
            </div>
            <div className="panel bg-secondary p-6 text-secondary-fg md:col-span-3">
              <h3 className="font-display text-xl uppercase">Write it plain first</h3>
              <p className="mt-3 text-sm leading-relaxed md:text-base">
                What should happen, in language a normal person can read.
                Tickets and docs come after. They&apos;re not the point.
              </p>
            </div>
            <div className="panel bg-tertiary p-6 text-tertiary-fg md:col-span-3">
              <h3 className="font-display text-xl uppercase">Ship it</h3>
              <p className="mt-3 text-sm leading-relaxed md:text-base">
                Process talk without a live site is just talk. We care what
                actually went out.
              </p>
            </div>
          </div>
        </PageSection>
      </section>

      <PageSection>
        <SplitFeature
          photo="aboutPath"
          reverse
          eyebrow="Meanwhile"
          title="Macovin builds it. Meanwhile is the shop."
        >
          <p>
            Same tooling, same habits. Want the longer version? About page and
            the company docs. Or just ask. Curious beats a brochure every time.
          </p>
          <p>
            Factory code:{' '}
            <a
              href="https://github.com/MeanwhileJS/meanwhile"
              target="_blank"
              rel="noreferrer"
            >
              Meanwhile on GitHub
            </a>
            .
          </p>
          <div className="pt-2">
            <Button to="/about" variant="secondary" className="no-underline">
              How we work
            </Button>
          </div>
        </SplitFeature>
      </PageSection>

      <section className="border-y-[3px] border-ink bg-atmosphere">
        <PageSection>
          <div className="panel flex flex-col gap-6 bg-primary p-6 md:flex-row md:items-end md:justify-between md:p-10">
            <div className="max-w-2xl text-primary-fg">
              <p className="eyebrow text-ink">Work</p>
              <h2 className="mt-3 font-display text-3xl uppercase tracking-tight md:text-4xl text-balance">
                One shipped. More ideas.
              </h2>
              <p className="mt-4 text-base leading-relaxed md:text-lg text-pretty">
                Shimmering Stars is live (astrology, birth charts, same
                factory). Still ideas: an elder care end-of-life packet, a
                Texas workers&apos; rights site (nurses first). If that fits
                someone you know, tell us. We haven&apos;t named dollars.
              </p>
            </div>
            <Button to="/work" variant="tertiary" className="no-underline shrink-0">
              See what we can build
            </Button>
          </div>
        </PageSection>
      </section>

      <PageSection>
        <p className="eyebrow">Straight answers</p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl uppercase tracking-tight md:text-4xl text-balance">
          Questions we get
        </h2>
        <FaqList items={faqs} className="mt-8" />
      </PageSection>
    </PageShell>
  );
};

IndexPage.path = '/';
