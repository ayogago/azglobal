import type { DocumentPage, DocumentSlug } from '@/lib/content';
import { DOCUMENT_PAGES } from '@/lib/content';
import type { NativeLocale } from '@/lib/i18n-content';
import { DOCUMENTS_HY } from '@/lib/i18n-documents-hy';
import { DOCUMENTS_RU } from '@/lib/i18n-documents-ru';

/** Everything on a document page except the slug and URL, which are shared. */
export type TranslatedDocument = Omit<DocumentPage, 'slug' | 'href'>;

const BY_LOCALE: Record<NativeLocale, Record<DocumentSlug, TranslatedDocument>> = {
  hy: DOCUMENTS_HY,
  ru: DOCUMENTS_RU,
};

/** English path segment (no leading slash) → document, e.g. "birth-certificate-translation". */
export const DOCUMENT_SEGMENTS = DOCUMENT_PAGES.map((d) => d.href.slice(1));

export function documentBySegment(segment: string): DocumentPage | undefined {
  return DOCUMENT_PAGES.find((d) => d.href === `/${segment}`);
}

/** The same document, in the given language, with a locale-prefixed URL. */
export function translatedDocument(locale: NativeLocale, segment: string): DocumentPage | undefined {
  const english = documentBySegment(segment);
  if (!english) return undefined;
  const translated = BY_LOCALE[locale][english.slug];
  return { ...translated, slug: english.slug, href: `/${locale}/${segment}` };
}

/** All documents in a language, for "other documents" link lists. */
export function translatedDocuments(locale: NativeLocale): DocumentPage[] {
  return DOCUMENT_PAGES.map((d) => ({
    ...BY_LOCALE[locale][d.slug],
    slug: d.slug,
    href: `/${locale}${d.href}`,
  }));
}
