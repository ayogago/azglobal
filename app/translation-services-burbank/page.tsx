import type { Metadata } from 'next';
import CityLanding from '@/components/CityLanding';
import { cityBySlug } from '@/lib/cities';
import { pageMetadata } from '@/lib/seo';

const page = cityBySlug('burbank')!;

export const metadata: Metadata = pageMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: '/translation-services-burbank',
});

export default function Page() {
  return <CityLanding page={page} />;
}
