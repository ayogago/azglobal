import type { Metadata } from 'next';
import CityLanding from '@/components/CityLanding';
import { cityBySlug } from '@/lib/cities';
import { pageMetadata } from '@/lib/seo';
import { segmentAlternates } from '@/lib/i18n';

const page = cityBySlug('burbank')!;

const base = pageMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  absoluteTitle: true,
  path: '/translation-services-burbank',
});

export const metadata: Metadata = {
  ...base,
  alternates: { ...base.alternates, ...segmentAlternates('translation-services-burbank') },
};

export default function Page() {
  return <CityLanding page={page} />;
}
