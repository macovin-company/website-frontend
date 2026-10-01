/** Photo credits for Unsplash assets in src/assets/photos (Unsplash License). */
export const photoCredits = {
  heroHome: {
    file: 'hero-home.jpg',
    alt: 'Person reviewing papers and a laptop at a kitchen table',
    photographer: 'Scott Graham',
    url: 'https://unsplash.com/photos/person-using-macbook-pro-1454165804606',
  },
  homeTogether: {
    file: 'home-together.jpg',
    alt: 'People working together around a table',
    photographer: 'Annie Spratt',
    url: 'https://unsplash.com/photos/people-sitting-beside-table-1522071820081',
  },
  workStars: {
    file: 'work-stars.jpg',
    alt: 'Person under a starry night sky',
    photographer: 'Greg Rakozy',
    url: 'https://unsplash.com/photos/person-under-starry-sky-Yj1M5riCKk4',
  },
  workElder: {
    file: 'work-elder.jpg',
    alt: 'Older adult and caregiver outdoors',
    photographer: 'Matt Bennett',
    url: 'https://unsplash.com/photos/man-and-woman-walking-on-pathway-during-daytime-1516733725897',
  },
  workNurses: {
    file: 'work-nurses.jpg',
    alt: 'Healthcare worker with a patient chart',
    photographer: 'National Cancer Institute',
    url: 'https://unsplash.com/photos/person-wearing-lavatory-gown-with-green-stethoscope-on-neck-using-phone-while-standing-1576091160399',
  },
  aboutPath: {
    file: 'about-path.jpg',
    alt: 'Sunlit path through tall trees',
    photographer: 'Casey Horner',
    url: 'https://unsplash.com/photos/green-trees-under-blue-sky-during-daytime-1441974231531',
  },
  contactDesk: {
    file: 'contact-desk.jpg',
    alt: 'Hands writing notes on paper at a desk',
    photographer: 'Scott Graham',
    url: 'https://unsplash.com/photos/person-writing-on-notebook-1450101499163',
  },
} as const;

export type PhotoCreditKey = keyof typeof photoCredits;
