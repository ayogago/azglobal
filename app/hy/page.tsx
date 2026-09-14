import type { Metadata } from 'next';
import NativeHome from '@/components/NativeHome';
import { CONTENT } from '@/lib/i18n-content';
import { HOME_ALTERNATES } from '@/lib/i18n';
import { SITE } from '@/lib/site';

const c = CONTENT['hy'];

export const metadata: Metadata = {
  title: { absolute: c.meta.title },
  description: c.meta.description,
  alternates: { canonical: '/hy', ...HOME_ALTERNATES },
  openGraph: {
    title: c.meta.title,
    description: c.meta.description,
    url: '/hy',
    siteName: SITE.name,
    type: 'website',
    locale: 'hy_AM',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: { card: 'summary_large_image', title: c.meta.title, description: c.meta.description, images: ['/opengraph-image.png'] },
};

export default function Page() {
  return <NativeHome locale="hy" />;
}
