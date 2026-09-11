import type { Metadata } from 'next';
import LanguageLanding from '@/components/LanguageLanding';
import { LANGUAGE_PAGES } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

const page = LANGUAGE_PAGES.ukrainian;

export const metadata: Metadata = pageMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: '/ukrainian-translation',
});

export default function Page() {
  return <LanguageLanding page={page} />;
}
