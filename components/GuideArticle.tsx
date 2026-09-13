import Link from 'next/link';
import { ArrowRight, Check, ExternalLink } from 'lucide-react';
import type { Guide } from '@/lib/guides';
import { GUIDES } from '@/lib/guides';
import { SITE } from '@/lib/site';
import { homeHref, type Locale, quoteHref } from '@/lib/i18n';
import { PAGE_UI } from '@/lib/i18n-pages';
import { CONTENT, type NativeLocale } from '@/lib/i18n-content';
import { translatedGuides } from '@/lib/i18n-guides';
import JsonLd from '@/components/JsonLd';
import { CtaBand, Faq } from '@/components/Sections';
import NativeCtaBand from '@/components/NativeCtaBand';

const DATE_LOCALE: Record<Locale, string> = { en: 'en-US', hy: 'hy-AM', ru: 'ru-RU' };

function formatDate(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(DATE_LOCALE[locale], { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(iso));
}

export default function GuideArticle({ guide, locale = 'en' }: { guide: Guide; locale?: Locale }) {
  const t = PAGE_UI[locale];
  const isEnglish = locale === 'en';
  const base = isEnglish ? '' : `/${locale}`;
  const url = `${SITE.url}${base}/guides/${guide.slug}`;
  const others = (isEnglish ? GUIDES : translatedGuides(locale)).filter((g) => g.slug !== guide.slug);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: guide.title,
        description: guide.metaDescription,
        datePublished: guide.updated,
        dateModified: guide.updated,
        inLanguage: locale,
        mainEntityOfPage: url,
        author: { '@id': `${SITE.url}/#organization` },
        publisher: { '@id': `${SITE.url}/#organization` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: t.home, item: `${SITE.url}${homeHref(locale)}` },
          { '@type': 'ListItem', position: 2, name: t.guides, item: `${SITE.url}${base}/guides` },
          { '@type': 'ListItem', position: 3, name: guide.title, item: url },
        ],
      },
    ],
  };

  const body = (
    <>
      <JsonLd data={schema} />

      <article>
        <section className="border-b border-slate-200 bg-gradient-to-b from-primary-soft to-white">
          <div className="container-custom py-12 md:py-16">
            <nav aria-label="Breadcrumb" className="text-sm text-dark-light">
              <Link href={homeHref(locale)} className="hover:text-primary">
                {t.home}
              </Link>{' '}
              /{' '}
              <Link href={`${base}/guides`} className="hover:text-primary">
                {t.guides}
              </Link>
            </nav>
            <h1 className="mt-5 max-w-3xl break-words text-[1.85rem] leading-tight sm:text-4xl md:text-5xl">{guide.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-dark-light md:text-xl">{guide.summary}</p>
            <p className="mt-5 text-sm text-dark-light">
              {t.updatedOn(formatDate(guide.updated, locale))} · {guide.readingTime}
            </p>
          </div>
        </section>

        <div className="container-custom grid gap-12 py-14 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-8">
            <div className="rounded-2xl bg-leaf-soft p-6 sm:p-7">
              <h2 className="text-sm font-bold uppercase tracking-wider text-leaf-dark">{t.inShort}</h2>
              <ul className="mt-4 space-y-2.5">
                {guide.keyPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-dark">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-leaf-dark" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {guide.sections.map((section) => (
              <section key={section.heading} className="mt-12">
                <h2 className="text-2xl md:text-3xl">{section.heading}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="mt-4 text-lg leading-relaxed text-dark-light">
                    {paragraph}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-5 space-y-3">
                    {section.list.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-lg text-dark-light">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <div className="mt-12 rounded-2xl border border-slate-200 p-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-dark-light">{t.sources}</h2>
              <ul className="mt-3 space-y-2">
                {guide.sources.map((source) => (
                  <li key={source.href}>
                    <a
                      href={source.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
                    >
                      {source.label}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-dark-light">{t.disclaimer}</p>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-2xl bg-dark p-7 text-white">
                <h2 className="text-xl text-white">{t.needTranslation}</h2>
                <p className="mt-3 text-slate-300">
                  {t.needTranslationText}{' '}
                  {isEnglish
                    ? `${SITE.replyPromise}.`
                    : `${CONTENT[locale as NativeLocale].hero.replyPromise}${locale === 'hy' ? '։' : '.'}`}
                </p>
                <Link href={quoteHref(locale)} className="btn bg-leaf mt-5 w-full text-dark hover:bg-[#9cc251]">
                  {t.ctaQuote}
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <a href={SITE.phoneHref} className="btn-ghost-light mt-3 w-full">
                  {SITE.phone}
                </a>
              </div>

              {others.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-dark-light">{t.moreGuides}</h2>
                  <ul className="mt-4 space-y-4">
                    {others.map((g) => (
                      <li key={g.slug}>
                        <Link href={`${base}/guides/${g.slug}`} className="group block">
                          <span className="font-heading font-bold text-dark group-hover:text-primary">{g.title}</span>
                          <span className="mt-1 block text-sm text-dark-light">{g.summary}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>
      </article>

      <Faq
        items={guide.faq}
        title={t.faqShort}
        help={
          isEnglish ? undefined : (
            <>
              {CONTENT[locale as NativeLocale].quotePage.orCall}{' '}
              <a href={SITE.phoneHref} className="font-semibold text-primary hover:underline">
                {SITE.phone}
              </a>
            </>
          )
        }
      />
      {isEnglish ? <CtaBand /> : <NativeCtaBand locale={locale} />}
    </>
  );

  return isEnglish ? body : <div lang={locale}>{body}</div>;
}
