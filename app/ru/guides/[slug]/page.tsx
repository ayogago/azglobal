import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GuideArticle from '@/components/GuideArticle';
import { GUIDES } from '@/lib/guides';
import { translatedGuide } from '@/lib/i18n-guides';
import { segmentAlternates } from '@/lib/i18n';
import { SITE } from '@/lib/site';

const LOCALE = 'ru' as const;

export function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = translatedGuide(LOCALE, slug);
  if (!guide) return {};
  return {
    title: { absolute: guide.metaTitle },
    description: guide.metaDescription,
    alternates: { canonical: `/${LOCALE}/guides/${slug}`, ...segmentAlternates(`guides/${slug}`) },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: `/${LOCALE}/guides/${slug}`,
      siteName: SITE.name,
      type: 'article',
      locale: 'ru_RU',
      images: [{ url: '/az-global-icon.png', width: 500, height: 500, alt: SITE.name }],
    },
    twitter: { card: 'summary', title: guide.metaTitle, description: guide.metaDescription, images: ['/az-global-icon.png'] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = translatedGuide(LOCALE, slug);
  if (!guide) notFound();
  return <GuideArticle guide={guide} locale={LOCALE} />;
}
