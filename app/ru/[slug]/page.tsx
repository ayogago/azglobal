import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DocumentLanding from '@/components/DocumentLanding';
import CityLanding from '@/components/CityLanding';
import { DOCUMENT_SEGMENTS, translatedDocument } from '@/lib/i18n-documents';
import { CITY_SEGMENTS, translatedCity } from '@/lib/i18n-cities';
import { segmentAlternates } from '@/lib/i18n';
import { SITE } from '@/lib/site';

const LOCALE = 'ru' as const;
const OG_LOCALE = 'ru_RU';

export function generateStaticParams() {
  return [...DOCUMENT_SEGMENTS, ...CITY_SEGMENTS].map((slug) => ({ slug }));
}

export const dynamicParams = false;

function load(slug: string) {
  return translatedDocument(LOCALE, slug) ?? translatedCity(LOCALE, slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = load(slug);
  if (!page) return {};
  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: { canonical: `/${LOCALE}/${slug}`, ...segmentAlternates(slug) },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `/${LOCALE}/${slug}`,
      siteName: SITE.name,
      type: 'website',
      locale: OG_LOCALE,
      images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: { card: 'summary_large_image', title: page.metaTitle, description: page.metaDescription, images: ['/opengraph-image.png'] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const document = translatedDocument(LOCALE, slug);
  if (document) return <DocumentLanding page={document} locale={LOCALE} />;
  const city = translatedCity(LOCALE, slug);
  if (city) return <CityLanding page={city} locale={LOCALE} />;
  notFound();
}
