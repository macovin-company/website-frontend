export const API_BASE_URL = process.env.MACOVIN_API_BASE_URL || '';

export const CONTACT_EMAIL = 'hello@macovin.com';

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  company?: string;
};

export type SiteExample = {
  id: string;
  title: string;
  summary: string;
  /** shipped = live MVP; idea = coming work. Defaults to idea when omitted. */
  status?: 'shipped' | 'idea';
};

/** Local fallback when /api/examples is unreachable. Same shape as the backend. */
export const FALLBACK_EXAMPLES: SiteExample[] = [
  {
    id: 'shimmering-stars',
    title: 'Shimmering Stars',
    status: 'shipped',
    summary:
      'A live astrology site we already run in the same factory. Birth charts and the product week around them. It shipped. Proof we can take something live, not a deck slide we’re still inventing.',
  },
  {
    id: 'elder-care',
    title: 'Elder care (end of life)',
    status: 'idea',
    summary:
      'One place with what you need to know when you’re caring for a family member at the end of life. Not a clinic. Not a sales funnel. The practical stuff people scramble for when nobody handed them a packet.',
  },
  {
    id: 'texas-workers-rights',
    title: 'Texas workers’ rights (nurses first)',
    status: 'idea',
    summary:
      'A Texas workers’ rights site with real answers for specific jobs, starting with nurses. What you’re allowed to refuse, what has to be in writing, who to call. Plain language. Not a law firm. Not a rant.',
  },
];

function apiUrl(path: string): string {
  return `${API_BASE_URL.replace(/\/$/, '')}${path}`;
}

/**
 * Posts to macovin-backend POST /api/contact when MACOVIN_API_BASE_URL is set.
 * Returns 'api' | 'mailto' | 'error' so the UI can fall back cleanly.
 */
export async function submitContact(
  payload: ContactPayload,
): Promise<'api' | 'mailto' | 'error'> {
  if (!API_BASE_URL) {
    return 'mailto';
  }

  try {
    const response = await fetch(apiUrl('/api/contact'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return 'error';
    }

    return 'api';
  } catch {
    return 'error';
  }
}

export type ExamplesResult = {
  examples: SiteExample[];
  source: 'api' | 'fallback';
};

/**
 * Loads GET /api/examples. Falls back to static blurbs if the API is down
 * or MACOVIN_API_BASE_URL is unset.
 */
export async function fetchExamples(): Promise<ExamplesResult> {
  if (!API_BASE_URL) {
    return { examples: FALLBACK_EXAMPLES, source: 'fallback' };
  }

  try {
    const response = await fetch(apiUrl('/api/examples'));
    if (!response.ok) {
      return { examples: FALLBACK_EXAMPLES, source: 'fallback' };
    }

    const data = (await response.json()) as { examples?: SiteExample[] };
    if (!Array.isArray(data.examples) || data.examples.length === 0) {
      return { examples: FALLBACK_EXAMPLES, source: 'fallback' };
    }

    return { examples: data.examples, source: 'api' };
  } catch {
    return { examples: FALLBACK_EXAMPLES, source: 'fallback' };
  }
}

export function mailtoHref(payload: ContactPayload): string {
  const subject = encodeURIComponent(`Macovin contact from ${payload.name}`);
  const body = encodeURIComponent(
    `${payload.message}\n\n- ${payload.name} <${payload.email}>`,
  );
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}
