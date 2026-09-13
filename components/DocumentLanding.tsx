import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BadgeCheck, Check, Clock, FileText, Lock, MessageCircle } from 'lucide-react';
import type { DocumentPage } from '@/lib/content';
import { DOCUMENT_PAGES } from '@/lib/content';
import { LANGUAGES, SITE } from '@/lib/site';
import Flag from '@/components/Flag';
import JsonLd from '@/components/JsonLd';
import RequestForm from '@/components/RequestForm';
import { CtaBand, Faq, Rating, StatsBar } from '@/components/Sections';
import { IMAGES } from '@/lib/images';

export default function DocumentLanding({ page }: { page: DocumentPage }) {
  const url = `${SITE.url}${page.href}`;

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
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE.url}/services` },
          { '@type': 'ListItem', position: 3, name: page.name, item: url },
        ],
      },
    ],
  };

  const others = DOCUMENT_PAGES.filter((d) => d.slug !== page.slug);

  return (
    <>
      <JsonLd data={schema} />

      <section className="bg-gradient-to-b from-primary-soft to-white">
        <div className="container-custom grid items-start gap-10 py-14 md:py-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <nav aria-label="Breadcrumb" className="text-sm text-dark-light">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>{' '}
              /{' '}
              <Link href="/services" className="hover:text-primary">
                Services
              </Link>{' '}
              / <span className="text-dark">{page.name}</span>
            </nav>
            <h1 className="mt-5 text-4xl leading-tight md:text-5xl">{page.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-dark-light md:text-xl">{page.intro}</p>

            <p className="mt-5 inline-flex flex-wrap items-baseline gap-x-2 rounded-xl bg-white px-4 py-3 shadow-card">
              <span className="font-heading text-2xl font-extrabold text-primary">$25</span>
              <span className="font-semibold text-dark">per page</span>
              <span className="text-dark-light">
                · complex formatted pages $60 ·{' '}
                <Link href="/pricing" className="font-semibold text-primary hover:underline">
                  full pricing
                </Link>
              </span>
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#quote" className="btn-primary px-7 py-4 text-lg">
                Get a Free Quote
                <ArrowRight className="h-5 w-5" />
              </a>
              <a href={SITE.whatsappHref} className="btn-outline px-7 py-4 text-lg" target="_blank" rel="noopener">
                <MessageCircle className="h-5 w-5" />
                WhatsApp us
              </a>
            </div>
            <p className="mt-4 text-sm font-semibold text-leaf-dark">{SITE.replyPromise}</p>
            <div className="mt-6">
              <Rating />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-white p-7 shadow-card">
              <h2 className="text-lg">Every certified translation includes</h2>
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
                  <BadgeCheck className="h-4 w-4 text-primary" /> USCIS accepted
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" /> 12–48 hours
                </span>
                <span className="inline-flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary" /> Private &amp; secure
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsBar />

      <section className="section bg-white">
        <div className="container-custom grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="eyebrow">What to know</span>
            <h2 className="mt-3 text-3xl md:text-4xl">Getting it right the first time</h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-dark-light">
              {page.about.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

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
          </div>

          <div className="lg:col-span-5">
            <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-2xl shadow-card">
              <Image
                src={page.slug === 'drivers-license' || page.slug === 'birth-certificate' ? IMAGES.passport.src : IMAGES.documents.src}
                alt={page.slug === 'drivers-license' || page.slug === 'birth-certificate' ? IMAGES.passport.alt : IMAGES.documents.alt}
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 40vw"
                quality={70}
                className="object-cover"
              />
            </div>
            <div className="rounded-2xl bg-slate-50 p-7">
              <h2 className="text-xl">Commonly submitted to</h2>
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
            <span className="eyebrow">Free quote</span>
            <h2 className="mt-3 text-3xl md:text-4xl">Send us your document</h2>
            <p className="mt-4 text-lg text-dark-light">
              Upload a photo or scan and we&apos;ll email you a quote. No account, no obligation.
            </p>
            <p className="mt-4 text-sm font-semibold text-leaf-dark">{SITE.replyPromise}</p>
          </div>
          <div className="lg:col-span-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              <RequestForm kind="quote" />
            </div>
          </div>
        </div>
      </section>

      <Faq items={page.faq} title={`${page.name} — questions we get`} />

      <section className="border-t border-slate-200 bg-white">
        <div className="container-custom py-10">
          <h2 className="text-sm font-bold uppercase tracking-wider text-dark-light">Other documents we translate</h2>
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

      <CtaBand />
    </>
  );
}
