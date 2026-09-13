import type { Guide } from '@/lib/guides';
import { GUIDES } from '@/lib/guides';
import type { NativeLocale } from '@/lib/i18n-content';
import { GUIDES_HY } from '@/lib/i18n-guides-hy';
import { GUIDES_RU } from '@/lib/i18n-guides-ru';

/**
 * Everything in a guide except the slug, the last-updated date and the source
 * list — those are shared across languages, since the sources are the same
 * official pages in every version.
 */
export type TranslatedGuide = Omit<Guide, 'slug' | 'updated' | 'sources'>;

const BY_LOCALE: Record<NativeLocale, Record<string, TranslatedGuide>> = {
  hy: GUIDES_HY,
  ru: GUIDES_RU,
};

export function translatedGuide(locale: NativeLocale, slug: string): Guide | undefined {
  const english = GUIDES.find((g) => g.slug === slug);
  const translated = english && BY_LOCALE[locale][slug];
  if (!english || !translated) return undefined;
  return { ...translated, slug: english.slug, updated: english.updated, sources: english.sources };
}

export function translatedGuides(locale: NativeLocale): Guide[] {
  return GUIDES.map((g) => ({
    ...BY_LOCALE[locale][g.slug],
    slug: g.slug,
    updated: g.updated,
    sources: g.sources,
  }));
}
