import type { Metadata } from 'next';
import { NativeContact } from '@/components/NativeSimplePages';
import { CONTENT } from '@/lib/i18n-content';
import { segmentAlternates } from '@/lib/i18n';
import { SITE } from '@/lib/site';

const c = CONTENT['hy'].contactPage;

export const metadata: Metadata = {
  title: c.meta.title,
  description: c.meta.description,
  alternates: { canonical: '/hy/contact', ...segmentAlternates('contact') },
  openGraph: {
    title: `${c.meta.title} | ${SITE.name}`,
    description: c.meta.description,
    url: '/hy/contact',
    siteName: SITE.name,
    type: 'website',
    locale: 'hy_AM',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: { card: 'summary_large_image', title: c.meta.title, description: c.meta.description, images: ['/opengraph-image.png'] },
};

export default function Page() {
  return <NativeContact locale="hy" />;
}
