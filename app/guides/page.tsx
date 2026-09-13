import type { Metadata } from 'next';
import GuidesIndex from '@/components/GuidesIndex';
import { PAGE_UI } from '@/lib/i18n-pages';
import { segmentAlternates } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';

const base = pageMetadata({
  title: PAGE_UI.en.guidesMetaTitle,
  description: PAGE_UI.en.guidesMetaDescription,
  path: '/guides',
});

export const metadata: Metadata = {
  ...base,
  alternates: { ...base.alternates, ...segmentAlternates('guides') },
};

export default function Page() {
  return <GuidesIndex />;
}
