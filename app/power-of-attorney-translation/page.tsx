import type { Metadata } from 'next';
import DocumentLanding from '@/components/DocumentLanding';
import { DOCUMENT_PAGES } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

const page = DOCUMENT_PAGES.find((d) => d.slug === 'power-of-attorney')!;

export const metadata: Metadata = pageMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: '/power-of-attorney-translation',
});

export default function Page() {
  return <DocumentLanding page={page} />;
}
