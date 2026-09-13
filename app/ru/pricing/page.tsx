import type { Metadata } from 'next';
import NativePricing from '@/components/NativePricing';
import { CONTENT } from '@/lib/i18n-content';
import { PRICING_ALTERNATES } from '@/lib/i18n';
import { SITE } from '@/lib/site';

const c = CONTENT['ru'];

export const metadata: Metadata = {
  title: c.pricingMeta.title,
  description: c.pricingMeta.description,
  alternates: { canonical: '/ru/pricing', ...PRICING_ALTERNATES },
  openGraph: {
    title: `${c.pricingMeta.title} | ${SITE.name}`,
    description: c.pricingMeta.description,
    url: '/ru/pricing',
    siteName: SITE.name,
    type: 'website',
    locale: 'ru_RU',
    images: [{ url: '/az-global-icon.png', width: 500, height: 500, alt: SITE.name }],
  },
  twitter: { card: 'summary', title: c.pricingMeta.title, description: c.pricingMeta.description, images: ['/az-global-icon.png'] },
};

export default function Page() {
  return <NativePricing locale="ru" />;
}
