import Link from 'next/link';
import { ArrowRight, BadgeCheck, Check, Clock, Stamp } from 'lucide-react';
import type { LanguagePage } from '@/lib/content';
import { LANGUAGES, SITE } from '@/lib/site';
import Flag from '@/components/Flag';
import JsonLd from '@/components/JsonLd';
import RequestForm from '@/components/RequestForm';
import { CtaBand, Faq, Rating, StatsBar } from '@/components/Sections';

export default function LanguageLanding({ page }: { page: LanguagePage }) {
  const lang = LANGUAGES.find((l) => l.slug === page.slug)!;
  const url = `${SITE.url}${lang.href}`;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: page.title,
        serviceType: `${page.name} translation`,
        description: page.metaDescription,
        url,
        provider: { '@id': `${SITE.url}/#business` },
        areaServed: [
          { '@type': 'City', name: 'Los Angeles' },
          { '@type': 'Country', name: 'United States' },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
          { '@type': 'ListItem', position: 2, name: `${page.name} translation`, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={schema} />

      <section className="bg-gradient-to-b from-primary-soft to-white">
        <div className="container-custom grid items-center gap-10 py-14 md:py-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <nav aria-label="Breadcrumb" className="text-sm text-dark-light">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>{' '}
              / <span className="text-dark">{page.name} translation</span>
            </nav>
            <div className="mt-5 flex items-center gap-3">
              <Flag code={lang.flag} className="h-6 w-9 rounded shadow-sm" />
              <span className="eyebrow">
                {page.name} ⇄ English · {lang.native}
              </span>
            </div>
            <h1 className="mt-4 text-4xl leading-tight md:text-5xl">{page.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-dark-light md:text-xl">{page.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#quote" className="btn-primary px-7 py-4 text-lg">
                Get a Free Quote
                <ArrowRight className="h-5 w-5" />
              </a>
              <a href={SITE.phoneHref} className="btn-outline px-7 py-4 text-lg">
                Call {SITE.phone}
              </a>
            </div>
            <div className="mt-6">
              <Rating />
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1">
            {[
              { icon: BadgeCheck, title: 'USCIS accepted', text: 'Signed certification of accuracy' },
              { icon: Clock, title: '12–48 hour delivery', text: 'For most documents' },
              { icon: Stamp, title: 'Notarization available', text: 'On request' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.title} className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-card">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-leaf-soft text-leaf-dark">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-dark">{item.title}</p>
                    <p className="text-sm text-dark-light">{item.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <StatsBar />

      <section className="section bg-white">
        <div className="container-custom grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="eyebrow">{page.name} translation</span>
            <h2 className="mt-3 text-3xl md:text-4xl">Translations you can submit with confidence</h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-dark-light">
              {page.about.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-slate-50 p-7">
              <h3 className="text-xl">{page.name} documents we translate</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {page.documents.map((doc) => (
                  <li key={doc} className="flex items-start gap-3 text-dark">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-leaf-dark" />
                    {doc}
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
            <span className="eyebrow">Free quote</span>
            <h2 className="mt-3 text-3xl md:text-4xl">Get a quote for your {page.name} document</h2>
            <p className="mt-4 text-lg text-dark-light">
              Upload a photo or scan and we&apos;ll email you a quote. No account, no obligation.
            </p>
          </div>
          <div className="lg:col-span-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              <RequestForm kind="quote" defaultLanguagePair={page.defaultPair} />
            </div>
          </div>
        </div>
      </section>

      <Faq items={page.faq} title={`${page.name} translation FAQ`} />

      <section className="border-t border-slate-200 bg-white">
        <div className="container-custom flex flex-wrap items-center gap-3 py-8 text-sm">
          <span className="font-semibold text-dark">Other languages:</span>
          {LANGUAGES.filter((l) => l.slug !== page.slug).map((l) => (
            <Link
              key={l.slug}
              href={l.href}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3.5 py-1.5 font-semibold text-dark hover:border-primary hover:text-primary"
            >
              <Flag code={l.flag} className="h-3.5 w-5 rounded-[2px]" />
              {l.name} translation
            </Link>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
