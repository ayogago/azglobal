import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { CtaBand, Faq, PageHero } from '@/components/Sections';
import Flag from '@/components/Flag';
import { DOCUMENT_PAGES, GENERAL_FAQ, SERVICES } from '@/lib/content';
import { SERVICE_ICONS } from '@/lib/service-icons';
import { pageMetadata } from '@/lib/seo';
import { LANGUAGES } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Certified Translation Services',
  description:
    'Certified translation of immigration, legal, academic, medical and business documents between English and Armenian, Russian or Ukrainian. USCIS accepted, notarization available.',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Certified translation services"
        intro="Immigration, legal, academic, medical and business documents, translated between English and Armenian, Russian or Ukrainian — certified, and notarized on request."
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/quote" className="btn-primary px-7 py-3.5">
            Get a Free Quote <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </PageHero>

      <section className="section bg-white">
        <div className="container-custom grid gap-6 md:grid-cols-2">
          {SERVICES.map((service) => {
            const Icon = SERVICE_ICONS[service.key];
            return (
              <article key={service.key} id={service.key} className="scroll-mt-24 rounded-2xl border border-slate-200 p-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl">{service.title}</h2>
                </div>
                <p className="mt-4 text-dark-light">{service.summary}</p>
                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {service.documents.map((doc) => (
                    <li key={doc} className="flex items-start gap-2.5 text-dark">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-leaf-dark" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section bg-white pt-0">
        <div className="container-custom">
          <div className="max-w-2xl">
            <span className="eyebrow">By document</span>
            <h2 className="mt-3 text-3xl md:text-4xl">Pages for the documents we translate most</h2>
            <p className="mt-4 text-lg text-dark-light">What each office expects, and what you get back.</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DOCUMENT_PAGES.map((doc) => (
              <Link
                key={doc.slug}
                href={doc.href}
                className="group flex items-center justify-between gap-3 rounded-xl border border-slate-200 px-5 py-4 font-semibold text-dark hover:border-primary hover:text-primary"
              >
                {doc.name}
                <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container-custom">
          <div className="max-w-2xl">
            <span className="eyebrow">Languages</span>
            <h2 className="mt-3 text-3xl md:text-4xl">Every service, in three languages</h2>
            <p className="mt-4 text-lg text-dark-light">All services are available to and from English.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {LANGUAGES.map((l) => (
              <Link
                key={l.slug}
                href={l.href}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 hover:border-primary/40"
              >
                <Flag code={l.flag} className="h-8 w-12 rounded shadow-sm" />
                <div className="flex-1">
                  <p className="font-heading text-lg font-bold text-dark">{l.name} translation</p>
                  <p className="text-sm text-dark-light">{l.native} ⇄ English</p>
                </div>
                <ArrowRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Faq items={GENERAL_FAQ} />
      <CtaBand />
    </>
  );
}
