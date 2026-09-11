import type { Metadata } from 'next';
import LanguageLanding from '@/components/LanguageLanding';
import { LANGUAGE_PAGES } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

const page = LANGUAGE_PAGES.russian;

export const metadata: Metadata = pageMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: '/russian-translation',
});

export default function Page() {
  return <LanguageLanding page={page} />;
}
