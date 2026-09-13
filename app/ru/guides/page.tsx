import type { Metadata } from 'next';
import GuidesIndex from '@/components/GuidesIndex';
import { PAGE_UI } from '@/lib/i18n-pages';
import { segmentAlternates } from '@/lib/i18n';
import { SITE } from '@/lib/site';

const t = PAGE_UI['ru'];

export const metadata: Metadata = {
  title: t.guidesMetaTitle,
  description: t.guidesMetaDescription,
  alternates: { canonical: '/ru/guides', ...segmentAlternates('guides') },
  openGraph: {
    title: `${t.guidesMetaTitle} | ${SITE.name}`,
    description: t.guidesMetaDescription,
    url: '/ru/guides',
    siteName: SITE.name,
    type: 'website',
    locale: 'ru_RU',
    images: [{ url: '/az-global-icon.png', width: 500, height: 500, alt: SITE.name }],
  },
  twitter: { card: 'summary', title: t.guidesMetaTitle, description: t.guidesMetaDescription, images: ['/az-global-icon.png'] },
};

export default function Page() {
  return <GuidesIndex locale="ru" />;
}
