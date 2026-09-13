import type { Metadata } from 'next';
import { NativeAbout } from '@/components/NativeSimplePages';
import { CONTENT } from '@/lib/i18n-content';
import { segmentAlternates } from '@/lib/i18n';
import { SITE } from '@/lib/site';

const c = CONTENT['ru'].aboutPage;

export const metadata: Metadata = {
  title: c.meta.title,
  description: c.meta.description,
  alternates: { canonical: '/ru/about', ...segmentAlternates('about') },
  openGraph: {
    title: `${c.meta.title} | ${SITE.name}`,
    description: c.meta.description,
    url: '/ru/about',
    siteName: SITE.name,
    type: 'website',
    locale: 'ru_RU',
    images: [{ url: '/az-global-icon.png', width: 500, height: 500, alt: SITE.name }],
  },
  twitter: { card: 'summary', title: c.meta.title, description: c.meta.description, images: ['/az-global-icon.png'] },
};

export default function Page() {
  return <NativeAbout locale="ru" />;
}
