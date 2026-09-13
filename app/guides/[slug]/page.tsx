import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GuideArticle from '@/components/GuideArticle';
import { GUIDES, getGuide } from '@/lib/guides';
import { pageMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return pageMetadata({
    title: guide.metaTitle,
    description: guide.metaDescription,
    path: `/guides/${guide.slug}`,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  return <GuideArticle guide={guide} />;
}
