import type { MetadataRoute } from 'next';
import { LANGUAGES, SITE } from '@/lib/site';

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
    page('/services', 0.8),
    page('/about', 0.6),
    page('/contact', 0.6),
    page('/privacy-policy', 0.3, 'yearly'),
    page('/terms-and-conditions', 0.3, 'yearly'),
  ];
}
