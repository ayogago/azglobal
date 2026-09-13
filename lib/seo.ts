import type { Metadata } from 'next';
import { SITE } from '@/lib/site';

// Next.js replaces (does not merge) nested openGraph/twitter objects, so every
// page builds the full set here.
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const fullTitle = `${title} | ${SITE.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE.name,
      type: 'website',
      locale: 'en_US',
      images: [{ url: '/az-global-icon.png', width: 500, height: 500, alt: 'AZ Global Translations logo' }],
    },
    twitter: {
      card: 'summary',
      title: fullTitle,
      description,
      images: ['/az-global-icon.png'],
    },
  };
}
