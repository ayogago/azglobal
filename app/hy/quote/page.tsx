import type { Metadata } from 'next';
import NativeQuote from '@/components/NativeQuote';
import { CONTENT } from '@/lib/i18n-content';
import { QUOTE_ALTERNATES } from '@/lib/i18n';
import { SITE } from '@/lib/site';

const c = CONTENT['hy'];

export const metadata: Metadata = {
  title: c.quoteMeta.title,
  description: c.quoteMeta.description,
  alternates: { canonical: '/hy/quote', ...QUOTE_ALTERNATES },
  openGraph: {
    title: `${c.quoteMeta.title} | ${SITE.name}`,
    description: c.quoteMeta.description,
    url: '/hy/quote',
    siteName: SITE.name,
    type: 'website',
    locale: 'hy_AM',
    images: [{ url: '/az-global-icon.png', width: 500, height: 500, alt: SITE.name }],
  },
  twitter: { card: 'summary', title: c.quoteMeta.title, description: c.quoteMeta.description, images: ['/az-global-icon.png'] },
};

export default function Page() {
  return <NativeQuote locale="hy" />;
}
