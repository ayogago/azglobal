import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, MapPin, MessageCircle } from 'lucide-react';
import type { CityPage } from '@/lib/cities';
import { CITY_PAGES } from '@/lib/cities';
import { DOCUMENT_PAGES } from '@/lib/content';
import { LANGUAGES, SITE } from '@/lib/site';
import { homeHref, type Locale, pricingHref } from '@/lib/i18n';
import { PAGE_UI } from '@/lib/i18n-pages';
import { CONTENT, type NativeLocale } from '@/lib/i18n-content';
import { translatedDocuments } from '@/lib/i18n-documents';
import { translatedCities } from '@/lib/i18n-cities';
import Flag from '@/components/Flag';
import JsonLd from '@/components/JsonLd';
import RequestForm from '@/components/RequestForm';
import { CtaBand, Faq, StatsBar } from '@/components/Sections';
import NativeCtaBand from '@/components/NativeCtaBand';
import { IMAGES } from '@/lib/images';

export default function CityLanding({ page, locale = 'en' }: { page: CityPage; locale?: Locale }) {
  const url = `${SITE.url}${page.href}`;
  const t = PAGE_UI[locale];
  const isEnglish = locale === 'en';
  const servicesHref = isEnglish ? '/services' : `/${locale}/services`;
  const others = (isEnglish ? CITY_PAGES : translatedCities(locale)).filter((c) => c.slug !== page.slug);
  const documents = isEnglish ? DOCUMENT_PAGES : translatedDocuments(locale);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: `Certified translation in ${page.name}, CA`,
        serviceType: 'Certified document translation',
        description: page.metaDescription,
        url,
        provider: { '@id': `${SITE.url}/#business` },
        areaServed: [
          { '@type': 'City', name: page.name, address: { '@type': 'PostalAddress', addressRegion: 'CA', addressCountry: 'US' } },
          ...page.nearby.map((n) => ({ '@type': 'Place', name: n })),
        ],
        availableLanguage: LANGUAGES.map((l) => l.name).concat('English'),
        inLanguage: locale,
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

  const body = (
    <>
      <JsonLd data={schema} />

      <section className="border-b border-slate-200 bg-gradient-to-b from-primary-soft to-white">
        <div className="container-custom grid items-center gap-10 py-14 md:py-20 lg:grid-cols-12">
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

            <p className="mt-5 inline-flex flex-wrap items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm shadow-card">
              <MapPin className="h-4 w-4 shrink-0 text-primary" />
              <span className="text-dark-light">{t.alsoServing(page.nearby.join(', '))}</span>
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
            {isEnglish && <p className="mt-4 text-sm font-semibold text-leaf-dark">{SITE.replyPromise}</p>}
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card">
              <Image
                src={IMAGES.losAngeles.src}
                alt={IMAGES.losAngeles.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                quality={70}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <StatsBar locale={locale} />

      <section className="section bg-white">
        <div className="container-custom grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="eyebrow">{page.name}</span>
            <h2 className="mt-3 text-3xl md:text-4xl">{t.workingWith(page.name)}</h2>
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
            <div className="rounded-2xl bg-slate-50 p-7">
              <h2 className="text-xl">{t.sendsUsMost(page.name)}</h2>
              <ul className="mt-5 space-y-3">
                {page.common.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-dark">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-leaf-dark" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-slate-200 pt-5 text-sm text-dark-light">
                {t.priceSummary}{' '}
                <Link href={pricingHref(locale)} className="font-semibold text-primary hover:underline">
                  {t.fullPricing}
                </Link>
                .
              </p>
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

      <Faq items={page.faq} title={t.cityFaqTitle(page.name)}
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
          <h2 className="text-sm font-bold uppercase tracking-wider text-dark-light">{t.documentsWeTranslate}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {documents.map((doc) => (
              <Link
                key={doc.slug}
                href={doc.href}
                className="rounded-full border border-slate-200 px-3.5 py-1.5 text-sm font-semibold text-dark hover:border-primary hover:text-primary"
              >
                {doc.name}
              </Link>
            ))}
          </div>

          <h2 className="mt-8 text-sm font-bold uppercase tracking-wider text-dark-light">{t.otherAreas}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {others.map((city) => (
              <Link
                key={city.slug}
                href={city.href}
                className="rounded-full border border-slate-200 px-3.5 py-1.5 text-sm font-semibold text-dark hover:border-primary hover:text-primary"
              >
                {city.name}
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
