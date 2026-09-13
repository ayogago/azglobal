import type { Metadata } from 'next';
import CityLanding from '@/components/CityLanding';
import { cityBySlug } from '@/lib/cities';
import { pageMetadata } from '@/lib/seo';
import { segmentAlternates } from '@/lib/i18n';

const page = cityBySlug('pasadena')!;

const base = pageMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  absoluteTitle: true,
  path: '/translation-services-pasadena',
});

export const metadata: Metadata = {
  ...base,
  alternates: { ...base.alternates, ...segmentAlternates('translation-services-pasadena') },
};

export default function Page() {
  return <CityLanding page={page} />;
}
