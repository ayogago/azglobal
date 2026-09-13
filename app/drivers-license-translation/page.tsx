import type { Metadata } from 'next';
import DocumentLanding from '@/components/DocumentLanding';
import { DOCUMENT_PAGES } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { segmentAlternates } from '@/lib/i18n';

const page = DOCUMENT_PAGES.find((d) => d.slug === 'drivers-license')!;

const base = pageMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  absoluteTitle: true,
  path: '/drivers-license-translation',
});

export const metadata: Metadata = {
  ...base,
  alternates: { ...base.alternates, ...segmentAlternates('drivers-license-translation') },
};

export default function Page() {
  return <DocumentLanding page={page} />;
}
