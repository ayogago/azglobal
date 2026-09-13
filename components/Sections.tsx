import Link from 'next/link';
import { ArrowRight, ChevronDown, Phone, Star } from 'lucide-react';
import { SITE, STATS } from '@/lib/site';
import JsonLd from '@/components/JsonLd';

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-primary-soft to-white">
      <div className="container-custom py-14 md:py-20">
        <div className="max-w-3xl">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1 className="mt-3 text-4xl leading-tight md:text-5xl">{title}</h1>
          {intro && <p className="mt-5 text-lg leading-relaxed text-dark-light md:text-xl">{intro}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}

export function Rating({ light = false }: { light?: boolean }) {
  return (
    <div className={`inline-flex items-center gap-2 text-sm font-semibold ${light ? 'text-white' : 'text-dark'}`}>
      <span className="flex" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-sun text-sun" />
        ))}
      </span>
      Trusted by 1,000+ clients
    </div>
  );
}

export function StatsBar() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <dl className="container-custom grid grid-cols-2 divide-slate-200 py-8 md:grid-cols-4 md:divide-x">
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-col-reverse px-4 py-3 text-center">
            <dt className="mt-1 text-sm text-dark-light">{s.label}</dt>
            <dd className="font-heading text-3xl font-extrabold text-primary md:text-4xl">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function CtaBand({
  title = 'Get your free quote in minutes',
  text = 'Upload a photo or scan of your document and we’ll reply with a quote. No account, no obligation.',
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-dark">
      <div className="container-custom flex flex-col items-start gap-8 py-14 md:flex-row md:items-center md:justify-between md:py-16">
        <div className="max-w-2xl">
          <h2 className="text-3xl text-white md:text-4xl">{title}</h2>
          <p className="mt-3 text-lg text-slate-300">{text}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link href="/quote" className="btn bg-leaf text-dark hover:bg-[#9cc251]">
            Get a Free Quote
            <ArrowRight className="h-5 w-5" />
          </Link>
          <a href={SITE.phoneHref} className="btn-ghost-light">
            <Phone className="h-5 w-5" />
            {SITE.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

export type FaqItem = { q: string; a: string };

export function Faq({ items, title = 'Frequently asked questions' }: { items: FaqItem[]; title?: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <section className="section bg-white">
      <JsonLd data={schema} />
      <div className="container-custom grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <span className="eyebrow">FAQ</span>
          <h2 className="mt-3 text-3xl md:text-4xl">{title}</h2>
          <p className="mt-4 text-dark-light">
            Can’t find your answer? Call{' '}
            <a href={SITE.phoneHref} className="font-semibold text-primary hover:underline">
              {SITE.phone}
            </a>{' '}
            or{' '}
            <Link href="/contact" className="font-semibold text-primary hover:underline">
              send us a message
            </Link>
            .
          </p>
        </div>
        <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 lg:col-span-8">
          {items.map((item) => (
            <details key={item.q} className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-lg font-bold text-dark">
                {item.q}
                <ChevronDown className="h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 leading-relaxed text-dark-light">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="mt-3 text-3xl md:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-lg text-dark-light">{text}</p>}
    </div>
  );
}
