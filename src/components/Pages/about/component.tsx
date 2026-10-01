import { PageComponentType } from '@/lib/types';
import { PageShell } from '@/components/Organisms/PageShell';
import { SectionIntro } from '@/components/Molecules/SectionIntro';
import { PageSection } from '@/components/Molecules/PageSection';
import { Button } from '@/components/Atoms/Button';
import { Photo, PhotoCredit } from '@/components/Atoms/Photo';
import { SplitFeature } from '@/components/Organisms/SplitFeature';
import { FaqList } from '@/components/Molecules/FaqList';

const habits = [
  {
    title: 'Name it once',
    body: 'Design, engineering, and testing use the same words for the same thing. That’s how you stop playing telephone.',
    tone: 'bg-primary text-primary-fg',
    span: 'md:col-span-2',
  },
  {
    title: 'Write it plain first',
    body: 'What should happen, in language a normal person can read. Tickets and docs follow. They’re leftovers, not the main event.',
    tone: 'bg-secondary text-secondary-fg',
    span: 'md:col-span-1',
  },
  {
    title: 'Ship it',
    body: 'Talk without a live site is just talk. We care what actually went out and how long it took.',
    tone: 'bg-tertiary text-tertiary-fg',
    span: 'md:col-span-1',
  },
] as const;

const faqs = [
  {
    question: 'Is Macovin a big agency?',
    answer:
      'Nah. Small family company. Meanwhile is the factory. We build websites and apps and try not to spend the week re-explaining the same banner.',
  },
  {
    question: 'Why the shared names?',
    answer:
      'So every seat stays in the same weather. The person pointing, the people in the middle, and the people building all get to say “I don’t know yet.” Including whoever has to report up.',
  },
] as const;

export const AboutPage: PageComponentType = () => {
  return (
    <PageShell>
      <section className="relative min-h-[48vh] overflow-hidden border-b-[3px] border-ink md:min-h-[56vh]">
        <Photo
          id="aboutPath"
          priority
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="absolute inset-0 bg-halftone opacity-35 mix-blend-overlay" />
        <div className="relative z-10 mx-auto flex min-h-[48vh] max-w-6xl flex-col justify-end px-4 pb-12 pt-10 md:min-h-[56vh] md:px-8 md:pb-16">
          <p className="eyebrow text-primary">About</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl uppercase tracking-tight text-surface md:text-5xl text-balance">
            How we work
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-surface/85 md:text-lg text-pretty">
            Macovin&apos;s a small family company. Meanwhile&apos;s the factory.
            We build sites and apps. We try not to spend the week re-explaining
            the same banner. (You&apos;ve been in that meeting. We know.)
          </p>
          <PhotoCredit id="aboutPath" className="text-surface/50" />
        </div>
      </section>

      <PageSection>
        <SectionIntro title="You’ve been in that meeting">
          <p>
            Everyone&apos;s tired. You&apos;re talking about the same thing for
            the tenth time and it still isn&apos;t clear. That&apos;s telephone
            with a paycheck.
          </p>
        </SectionIntro>
        <div className="mt-10 max-w-3xl space-y-5 text-base leading-relaxed text-ink-muted md:text-lg text-pretty">
          <p>
            Someone means a thing. The ticket says something else. Design hears
            a third version. Engineering builds a fourth. QA checks a fifth.
            Standup repeats it so everyone can pretend they&apos;re aligned.
          </p>
          <p>
            Real talk: we&apos;re not trying to guess better. We&apos;re trying
            to keep what was meant in the room. If we don&apos;t know yet, we
            say that.
          </p>
        </div>
      </PageSection>

      <section className="border-y-[3px] border-ink bg-surface-2">
        <PageSection>
          <p className="eyebrow">Three habits</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {habits.map((habit) => (
              <div
                key={habit.title}
                className={`panel p-6 ${habit.tone} ${habit.span}`}
              >
                <h2 className="font-display text-2xl uppercase">{habit.title}</h2>
                <p className="mt-3 max-w-prose text-sm leading-relaxed md:text-base">
                  {habit.body}
                </p>
              </div>
            ))}
          </div>
        </PageSection>
      </section>

      <PageSection>
        <SplitFeature
          photo="homeTogether"
          eyebrow="Who’s in the room"
          title="Same standard for every seat"
        >
          <p>
            The person pointing, the people in the middle, and the people
            building all get to say “I don’t know yet.” Including whoever has to
            report up.
          </p>
          <p>
            Have you ever sat through a second meeting that was just a retelling
            of the first? Yeah. If the ticket is the story, you can skip that.
          </p>
        </SplitFeature>
      </PageSection>

      <PageSection>
        <h2 className="font-display text-3xl uppercase tracking-tight md:text-4xl text-balance">
          Quick answers
        </h2>
        <FaqList items={faqs} className="mt-8" />
      </PageSection>

      <section className="border-t-[3px] border-ink bg-band-dusk text-surface">
        <PageSection>
          <h2 className="max-w-2xl font-display text-3xl uppercase tracking-tight text-primary md:text-4xl text-balance">
            Want more detail?
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-surface/80 md:text-lg text-pretty">
            Company docs are on GitHub. The factory is Meanwhile. This site is
            the front door. If that fits, tell us.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              href="https://github.com/loraxx753/macovin"
              target="_blank"
              rel="noreferrer"
              className="no-underline"
            >
              Company docs
            </Button>
            <Button
              href="https://github.com/MeanwhileJS/meanwhile"
              target="_blank"
              rel="noreferrer"
              variant="secondary"
              className="no-underline"
            >
              Meanwhile factory
            </Button>
            <Button to="/contact" variant="ghost" className="text-surface no-underline hover:text-ink">
              Talk to us
            </Button>
          </div>
        </PageSection>
      </section>
    </PageShell>
  );
};

AboutPage.path = '/about';
