import type { Metadata } from 'next';
import GuidesIndex from '@/components/GuidesIndex';
import { PAGE_UI } from '@/lib/i18n-pages';
import { segmentAlternates } from '@/lib/i18n';
import { SITE } from '@/lib/site';

const t = PAGE_UI['hy'];

export const metadata: Metadata = {
  title: t.guidesMetaTitle,
  description: t.guidesMetaDescription,
  alternates: { canonical: '/hy/guides', ...segmentAlternates('guides') },
  openGraph: {
    title: `${t.guidesMetaTitle} | ${SITE.name}`,
    description: t.guidesMetaDescription,
    url: '/hy/guides',
    siteName: SITE.name,
    type: 'website',
    locale: 'hy_AM',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: { card: 'summary_large_image', title: t.guidesMetaTitle, description: t.guidesMetaDescription, images: ['/opengraph-image.png'] },
};

export default function Page() {
  return <GuidesIndex locale="hy" />;
}
