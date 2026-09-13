import Link from 'next/link';
import { ArrowRight, Check, ExternalLink } from 'lucide-react';
import type { Guide } from '@/lib/guides';
import { GUIDES } from '@/lib/guides';
import { SITE } from '@/lib/site';
import JsonLd from '@/components/JsonLd';
import { CtaBand, Faq } from '@/components/Sections';

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(iso));
}

export default function GuideArticle({ guide }: { guide: Guide }) {
  const url = `${SITE.url}/guides/${guide.slug}`;
  const others = GUIDES.filter((g) => g.slug !== guide.slug);

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
        inLanguage: 'en-US',
        mainEntityOfPage: url,
        author: { '@id': `${SITE.url}/#organization` },
        publisher: { '@id': `${SITE.url}/#organization` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE.url}/guides` },
          { '@type': 'ListItem', position: 3, name: guide.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={schema} />

      <article>
        <section className="border-b border-slate-200 bg-gradient-to-b from-primary-soft to-white">
          <div className="container-custom py-12 md:py-16">
            <nav aria-label="Breadcrumb" className="text-sm text-dark-light">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>{' '}
              /{' '}
              <Link href="/guides" className="hover:text-primary">
                Guides
              </Link>
            </nav>
            <h1 className="mt-5 max-w-3xl text-4xl leading-tight md:text-5xl">{guide.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-dark-light md:text-xl">{guide.summary}</p>
            <p className="mt-5 text-sm text-dark-light">
              Updated {formatDate(guide.updated)} · {guide.readingTime}
            </p>
          </div>
        </section>

        <div className="container-custom grid gap-12 py-14 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-8">
            <div className="rounded-2xl bg-leaf-soft p-6 sm:p-7">
              <h2 className="text-sm font-bold uppercase tracking-wider text-leaf-dark">In short</h2>
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
              <h2 className="text-sm font-bold uppercase tracking-wider text-dark-light">Sources</h2>
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
              <p className="mt-4 text-sm text-dark-light">
                General information, not legal advice. Requirements change and vary by office — confirm with the agency
                receiving your documents.
              </p>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-2xl bg-dark p-7 text-white">
                <h2 className="text-xl text-white">Need a certified translation?</h2>
                <p className="mt-3 text-slate-300">
                  Armenian, Russian and Ukrainian ⇄ English, accepted by USCIS. {SITE.replyPromise}.
                </p>
                <Link href="/quote" className="btn bg-leaf mt-5 w-full text-dark hover:bg-[#9cc251]">
                  Get a Free Quote
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <a href={SITE.phoneHref} className="btn-ghost-light mt-3 w-full">
                  {SITE.phone}
                </a>
              </div>

              {others.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-dark-light">More guides</h2>
                  <ul className="mt-4 space-y-4">
                    {others.map((g) => (
                      <li key={g.slug}>
                        <Link href={`/guides/${g.slug}`} className="group block">
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

      <Faq items={guide.faq} title="Frequently asked" />
      <CtaBand />
    </>
  );
}
