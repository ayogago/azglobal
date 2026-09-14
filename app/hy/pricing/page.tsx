import type { Metadata } from 'next';
import NativePricing from '@/components/NativePricing';
import { CONTENT } from '@/lib/i18n-content';
import { PRICING_ALTERNATES } from '@/lib/i18n';
import { SITE } from '@/lib/site';

const c = CONTENT['hy'];

export const metadata: Metadata = {
  title: c.pricingMeta.title,
  description: c.pricingMeta.description,
  alternates: { canonical: '/hy/pricing', ...PRICING_ALTERNATES },
  openGraph: {
    title: `${c.pricingMeta.title} | ${SITE.name}`,
    description: c.pricingMeta.description,
    url: '/hy/pricing',
    siteName: SITE.name,
    type: 'website',
    locale: 'hy_AM',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: { card: 'summary_large_image', title: c.pricingMeta.title, description: c.pricingMeta.description, images: ['/opengraph-image.png'] },
};

export default function Page() {
  return <NativePricing locale="hy" />;
}
