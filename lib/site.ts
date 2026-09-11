// Single source of truth for business details and shared content.

export const SITE = {
  name: 'AZ Global Translations',
  url: 'https://azglobaltranslations.com',
  email: 'info@azglobaltranslations.com',
  phone: '+1 (747) 895-4845',
  phoneHref: 'tel:+17478954845',
  phoneSchema: '+1-747-895-4845',
  location: 'Los Angeles, CA',
  tagline: 'Precision in Every Word. Speed in Every Project.',
  social: [
    'https://www.facebook.com/azglobaltranslations',
    'https://twitter.com/azglobaltrans',
    'https://www.linkedin.com/company/azglobaltranslations',
  ],
} as const;

export type LanguageSlug = 'armenian' | 'russian' | 'ukrainian';

export const LANGUAGES: {
  slug: LanguageSlug;
  name: string;
  native: string;
  flag: string; // ISO country code for the flag
  href: string;
}[] = [
  { slug: 'armenian', name: 'Armenian', native: 'Հայերեն', flag: 'am', href: '/armenian-translation' },
  { slug: 'russian', name: 'Russian', native: 'Русский', flag: 'ru', href: '/russian-translation' },
  { slug: 'ukrainian', name: 'Ukrainian', native: 'Українська', flag: 'ua', href: '/ukrainian-translation' },
];

export const LANGUAGE_PAIRS = [
  'Armenian → English',
  'English → Armenian',
  'Russian → English',
  'English → Russian',
  'Ukrainian → English',
  'English → Ukrainian',
  'Other / not sure',
] as const;

export const DOCUMENT_TYPES = [
  'Birth certificate',
  'Marriage or divorce certificate',
  'Passport, ID or driver’s license',
  'Diploma or transcript',
  'Court or legal document',
  'Police or criminal record',
  'Medical record',
  'Business or financial document',
  'Other',
] as const;

export const SERVICE_LEVELS = [
  'Certified translation',
  'Certified + notarized',
  'Standard translation (not certified)',
  'Not sure',
] as const;

export const TURNAROUND = ['Standard (12–48 hours)', 'As soon as possible', 'No rush'] as const;

export const STATS = [
  { value: '10,000+', label: 'Documents translated' },
  { value: '1,000+', label: 'Happy clients' },
  { value: '12–48h', label: 'Typical turnaround' },
  { value: '24/7', label: 'Support' },
] as const;
