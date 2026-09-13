import type { Metadata } from 'next';
import CityLanding from '@/components/CityLanding';
import { cityBySlug } from '@/lib/cities';
import { pageMetadata } from '@/lib/seo';

const page = cityBySlug('north-hollywood')!;

export const metadata: Metadata = pageMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: '/translation-services-north-hollywood',
});

export default function Page() {
  return <CityLanding page={page} />;
}
