import type { MetadataRoute } from 'next';
import { LANGUAGES, SITE } from '@/lib/site';
import { DOCUMENT_PAGES } from '@/lib/content';
import { GUIDES } from '@/lib/guides';
import { CITY_PAGES } from '@/lib/cities';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-09-11');
  const page = (path: string, priority: number, changeFrequency: 'weekly' | 'monthly' | 'yearly' = 'monthly') => ({
    url: `${SITE.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    page('', 1.0, 'weekly'),
    ...LANGUAGES.map((l) => page(l.href, 0.9)),
    page('/quote', 0.9),
    page('/pricing', 0.9),
    ...DOCUMENT_PAGES.map((doc) => page(doc.href, 0.85)),
    ...CITY_PAGES.map((city) => page(city.href, 0.8)),
    page('/services', 0.8),
    page('/guides', 0.7),
    ...GUIDES.map((guide) => page(`/guides/${guide.slug}`, 0.7)),
    page('/about', 0.6),
    page('/contact', 0.6),
    ...(['hy', 'ru'] as const).flatMap((locale) => [
      page(`/${locale}`, 0.9, 'weekly'),
      page(`/${locale}/quote`, 0.8),
      page(`/${locale}/pricing`, 0.8),
      page(`/${locale}/services`, 0.7),
      page(`/${locale}/guides`, 0.6),
      ...GUIDES.map((guide) => page(`/${locale}/guides/${guide.slug}`, 0.6)),
      page(`/${locale}/about`, 0.5),
      page(`/${locale}/contact`, 0.5),
      ...DOCUMENT_PAGES.map((doc) => page(`/${locale}${doc.href}`, 0.75)),
      ...CITY_PAGES.map((city) => page(`/${locale}${city.href}`, 0.7)),
    ]),
    page('/privacy-policy', 0.3, 'yearly'),
    page('/terms-and-conditions', 0.3, 'yearly'),
  ];
}
