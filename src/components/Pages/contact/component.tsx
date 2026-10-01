import { FormEvent, useState } from 'react';
import { PageComponentType } from '@/lib/types';
import { PageShell } from '@/components/Organisms/PageShell';
import { SectionIntro } from '@/components/Molecules/SectionIntro';
import { PageSection } from '@/components/Molecules/PageSection';
import { Button } from '@/components/Atoms/Button';
import { Photo, PhotoCredit } from '@/components/Atoms/Photo';
import {
  API_BASE_URL,
  CONTACT_EMAIL,
  mailtoHref,
  submitContact,
} from '@/lib/api';
import { cn } from '@/lib/utils';

type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error';

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

const fieldClass =
  'w-full border-[3px] border-ink bg-surface px-3 py-3 text-ink outline-none transition focus:bg-primary-soft focus:shadow-[3px_3px_0_0_hsl(var(--ink))]';

function validateEmail(value: string): string | undefined {
  if (!value.trim()) return 'Email is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
    return 'That email doesn’t look complete.';
  }
  return undefined;
}

function validateName(value: string): string | undefined {
  if (!value.trim()) return 'Name is required.';
  return undefined;
}

function validateMessage(value: string): string | undefined {
  if (!value.trim()) return 'Message is required.';
  if (value.trim().length < 10) {
    return 'A little more detail helps (a sentence or two is fine).';
  }
  return undefined;
}

export const ContactPage: PageComponentType = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  function setFieldError(field: keyof FieldErrors, error?: string) {
    setErrors((prev) => {
      const next = { ...prev };
      if (error) next[field] = error;
      else delete next[field];
      return next;
    });
  }

  function onBlur(field: keyof FieldErrors) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === 'name') setFieldError('name', validateName(name));
    if (field === 'email') setFieldError('email', validateEmail(email));
    if (field === 'message') setFieldError('message', validateMessage(message));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: FieldErrors = {
      name: validateName(name),
      email: validateEmail(email),
      message: validateMessage(message),
    };
    setTouched({ name: true, email: true, message: true });
    setErrors(
      Object.fromEntries(
        Object.entries(nextErrors).filter(([, v]) => v),
      ) as FieldErrors,
    );

    if (nextErrors.name || nextErrors.email || nextErrors.message) {
      setStatus('idle');
      return;
    }

    const payload = { name, email, message };
    setStatus('sending');

    const result = await submitContact(payload);

    if (result === 'api') {
      setStatus('sent');
      setName('');
      setEmail('');
      setMessage('');
      setTouched({});
      setErrors({});
      return;
    }

    // Keep their words; open mail as fallback
    if (result === 'mailto') {
      window.location.href = mailtoHref(payload);
      setStatus('mailto');
      return;
    }

    window.location.href = mailtoHref(payload);
    setStatus('error');
  }

  return (
    <PageShell>
      <PageSection className="grid items-start gap-8 md:grid-cols-2 md:gap-x-14 md:gap-y-8 md:py-20">
        <SectionIntro as="h1" eyebrow="Contact" title="Say hello">
          <p>
            Tell us what you need. Who it&apos;s for. What&apos;s true today.
            Messy is fine. Feel free to send the messy version.
          </p>
        </SectionIntro>

        <div className="panel bg-primary p-5 md:row-span-2 md:p-8">
          <form onSubmit={onSubmit} className="space-y-5" noValidate>
            <label className="block">
              <span className="mb-1.5 flex items-baseline justify-between gap-2 text-sm font-bold text-primary-fg">
                <span>Name</span>
                <span className="text-xs font-normal text-primary-fg/70">Required</span>
              </span>
              <input
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (touched.name) {
                    setFieldError('name', validateName(e.target.value));
                  }
                }}
                onBlur={() => onBlur('name')}
                className={cn(
                  fieldClass,
                  errors.name ? 'border-tertiary' : 'border-ink',
                )}
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name ? (
                <p id="name-error" className="mt-1.5 text-sm font-bold text-tertiary" role="alert">
                  {errors.name}
                </p>
              ) : null}
            </label>
            <label className="block">
              <span className="mb-1.5 flex items-baseline justify-between gap-2 text-sm font-bold text-primary-fg">
                <span>Email</span>
                <span className="text-xs font-normal text-primary-fg/70">Required</span>
              </span>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (touched.email) {
                    setFieldError('email', validateEmail(e.target.value));
                  }
                }}
                onBlur={() => onBlur('email')}
                className={cn(
                  fieldClass,
                  errors.email ? 'border-tertiary' : 'border-ink',
                )}
                autoComplete="email"
                autoCapitalize="none"
                spellCheck={false}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email ? (
                <p id="email-error" className="mt-1.5 text-sm font-bold text-tertiary" role="alert">
                  {errors.email}
                </p>
              ) : null}
            </label>
            <label className="block">
              <span className="mb-1.5 flex items-baseline justify-between gap-2 text-sm font-bold text-primary-fg">
                <span>Message</span>
                <span className="text-xs font-normal text-primary-fg/70">Required</span>
              </span>
              <textarea
                name="message"
                rows={7}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (touched.message) {
                    setFieldError('message', validateMessage(e.target.value));
                  }
                }}
                onBlur={() => onBlur('message')}
                className={cn(
                  fieldClass,
                  'resize-y',
                  errors.message ? 'border-tertiary' : 'border-ink',
                )}
                placeholder="What do you need? Who’s it for?"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message ? (
                <p
                  id="message-error"
                  className="mt-1.5 text-sm font-bold text-tertiary"
                  role="alert"
                >
                  {errors.message}
                </p>
              ) : null}
            </label>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:gap-4">
              <Button
                type="submit"
                disabled={status === 'sending'}
                variant="tertiary"
                className="no-underline"
              >
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </Button>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex min-h-tap items-center text-sm font-bold text-ink"
              >
                Or email {CONTACT_EMAIL}
              </a>
            </div>

            {status === 'sent' ? (
              <p className="text-sm font-bold text-ink" role="status">
                Got it. We&apos;ll read it soon.
              </p>
            ) : null}
            {status === 'mailto' ? (
              <p className="text-sm text-primary-fg/80" role="status">
                Opening your mail app
                {API_BASE_URL ? '.' : ' (no API set; mailto fallback).'} Your
                message is still in the form if you need to copy it.
              </p>
            ) : null}
            {status === 'error' ? (
              <p className="text-sm text-primary-fg/80" role="status">
                API didn&apos;t answer. Opened a mail draft instead. Your words
                are still here.
              </p>
            ) : null}
          </form>
        </div>

        <div>
          <div className="panel bg-secondary p-4 text-sm leading-relaxed text-secondary-fg md:text-base">
            <p className="font-display text-lg uppercase text-primary">What happens next</p>
            <p className="mt-2">
              We read every note. If the API is up, you&apos;ll see a quick
              “Got it.” If not, your mail app opens a draft to{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-primary hover:text-surface">
                {CONTACT_EMAIL}
              </a>
              . Either way, we&apos;ll reply when we can. No spam list. No bot
              gate.
            </p>
          </div>

          <ul className="mt-10 space-y-5 border-t-[3px] border-ink pt-8 text-sm leading-relaxed text-ink-muted md:text-base">
            <li>
              <span className="font-display text-lg uppercase text-ink">
                A site someone needs
              </span>
              <p className="mt-1">
                Elder care, workers&apos; rights, or another hard week where
                clear info would help. Ideas are fine. We haven&apos;t named
                dollars here.
              </p>
            </li>
            <li>
              <span className="font-display text-lg uppercase text-ink">
                Something that fits how we build
              </span>
              <p className="mt-1">
                One clear job. Same language through design, engineering, and
                testing. That&apos;s the Meanwhile habit.
              </p>
            </li>
            <li>
              <span className="font-display text-lg uppercase text-ink">
                Or just a question
              </span>
              <p className="mt-1">
                How we work, what Meanwhile is, whether this fits. Ask. “I
                don’t know yet” is allowed on our side too.
              </p>
            </li>
          </ul>

          <figure className="mt-10 hidden md:block">
            <div className="panel overflow-hidden">
              <Photo
                id="contactDesk"
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
            <PhotoCredit id="contactDesk" />
          </figure>
        </div>
      </PageSection>
    </PageShell>
  );
};

ContactPage.path = '/contact';
