import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BadgeCheck, Check, Clock, FileText, Lock, MessageCircle } from 'lucide-react';
import type { DocumentPage } from '@/lib/content';
import { DOCUMENT_PAGES } from '@/lib/content';
import { LANGUAGES, SITE } from '@/lib/site';
import { homeHref, type Locale, pricingHref } from '@/lib/i18n';
import { PAGE_UI } from '@/lib/i18n-pages';
import { CONTENT, type NativeLocale } from '@/lib/i18n-content';
import { translatedDocuments } from '@/lib/i18n-documents';
import Flag from '@/components/Flag';
import JsonLd from '@/components/JsonLd';
import RequestForm from '@/components/RequestForm';
import { CtaBand, Faq, Rating, StatsBar } from '@/components/Sections';
import NativeCtaBand from '@/components/NativeCtaBand';
import { documentImage } from '@/lib/images';

export default function DocumentLanding({ page, locale = 'en' }: { page: DocumentPage; locale?: Locale }) {
  const url = `${SITE.url}${page.href}`;
  const t = PAGE_UI[locale];
  const isEnglish = locale === 'en';
  const servicesHref = isEnglish ? '/services' : `/${locale}/services`;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: page.title,
        serviceType: 'Certified document translation',
        description: page.metaDescription,
        url,
        inLanguage: locale,
        provider: { '@id': `${SITE.url}/#business` },
        areaServed: [
          { '@type': 'City', name: 'Los Angeles' },
          { '@type': 'Country', name: 'United States' },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: t.home, item: `${SITE.url}${homeHref(locale)}` },
          { '@type': 'ListItem', position: 2, name: t.services, item: `${SITE.url}${servicesHref}` },
          { '@type': 'ListItem', position: 3, name: page.name, item: url },
        ],
      },
    ],
  };

  const all = isEnglish ? DOCUMENT_PAGES : translatedDocuments(locale);
  const others = all.filter((d) => d.slug !== page.slug);

  const body = (
    <>
      <JsonLd data={schema} />

      <section className="bg-gradient-to-b from-primary-soft to-white">
        <div className="container-custom grid items-start gap-10 py-14 md:py-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <nav aria-label="Breadcrumb" className="text-sm text-dark-light">
              <Link href={homeHref(locale)} className="hover:text-primary">
                {t.home}
              </Link>{' '}
              /{' '}
              <Link href={servicesHref} className="hover:text-primary">
                {t.services}
              </Link>{' '}
              / <span className="text-dark">{page.name}</span>
            </nav>
            <h1 className="mt-5 break-words text-[1.85rem] leading-tight sm:text-4xl md:text-5xl">{page.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-dark-light md:text-xl">{page.intro}</p>

            <p className="mt-5 inline-flex flex-wrap items-baseline gap-x-2 rounded-xl bg-white px-4 py-3 shadow-card">
              {page.priceNote ? (
                <span className="font-semibold text-dark">{page.priceNote}</span>
              ) : (
                <>
                  <span className="font-heading text-2xl font-extrabold text-primary">$25</span>
                  <span className="font-semibold text-dark">{t.perPage}</span>
                  <span className="text-dark-light">{t.complexNote}</span>
                </>
              )}
              <span className="text-dark-light">
                ·{' '}
                <Link href={pricingHref(locale)} className="font-semibold text-primary hover:underline">
                  {t.fullPricing}
                </Link>
              </span>
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#quote" className="btn-primary px-7 py-4 text-lg">
                {t.ctaQuote}
                <ArrowRight className="h-5 w-5" />
              </a>
              <a href={SITE.whatsappHref} className="btn-outline px-7 py-4 text-lg" target="_blank" rel="noopener">
                <MessageCircle className="h-5 w-5" />
                {t.ctaWhatsapp}
              </a>
            </div>
            {isEnglish && (
              <>
                <p className="mt-4 text-sm font-semibold text-leaf-dark">{SITE.replyPromise}</p>
                <div className="mt-6">
                  <Rating />
                </div>
              </>
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-white p-7 shadow-card">
              <h2 className="text-lg">{t.includesTitle}</h2>
              <ul className="mt-4 space-y-3">
                {page.included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-dark">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-leaf-dark" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-slate-200 pt-5 text-sm text-dark-light">
                <span className="inline-flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-primary" /> {t.badgeUscis}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" /> {t.badgeSpeed}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary" /> {t.badgePrivate}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsBar locale={locale} />

      <section className="section bg-white">
        <div className="container-custom grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="eyebrow">{t.whatToKnowEyebrow}</span>
            <h2 className="mt-3 text-3xl md:text-4xl">{t.whatToKnowTitle}</h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-dark-light">
              {page.about.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            {isEnglish && (
              <div className="mt-8 flex flex-wrap gap-2">
                {LANGUAGES.map((l) => (
                  <Link
                    key={l.slug}
                    href={l.href}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3.5 py-1.5 text-sm font-semibold text-dark hover:border-primary hover:text-primary"
                  >
                    <Flag code={l.flag} className="h-3.5 w-5 rounded-[2px]" />
                    {l.name} translation
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-2xl shadow-card">
              <Image
                src={documentImage(page.slug).src}
                alt={documentImage(page.slug).alt}
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 40vw"
                quality={70}
                className="object-cover"
              />
            </div>
            <div className="rounded-2xl bg-slate-50 p-7">
              <h2 className="text-xl">{t.submittedTo}</h2>
              <ul className="mt-5 space-y-3">
                {page.usedFor.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-dark">
                    <FileText className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="quote" className="section scroll-mt-20 bg-primary-soft">
        <div className="container-custom grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="eyebrow">{t.quoteEyebrow}</span>
            <h2 className="mt-3 text-3xl md:text-4xl">{t.quoteTitle}</h2>
            <p className="mt-4 text-lg text-dark-light">{t.quoteText}</p>
            {isEnglish && <p className="mt-4 text-sm font-semibold text-leaf-dark">{SITE.replyPromise}</p>}
          </div>
          <div className="lg:col-span-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              <RequestForm kind="quote" locale={locale} />
            </div>
          </div>
        </div>
      </section>

      <Faq items={page.faq} title={t.faqSuffix(page.name)}
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

      <section className="border-t border-slate-200 bg-white">
        <div className="container-custom py-10">
          <h2 className="text-sm font-bold uppercase tracking-wider text-dark-light">{t.otherDocuments}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {others.map((doc) => (
              <Link
                key={doc.slug}
                href={doc.href}
                className="rounded-full border border-slate-200 px-3.5 py-1.5 text-sm font-semibold text-dark hover:border-primary hover:text-primary"
              >
                {doc.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {isEnglish ? <CtaBand /> : <NativeCtaBand locale={locale} />}
    </>
  );

  return isEnglish ? body : <div lang={locale}>{body}</div>;
}
