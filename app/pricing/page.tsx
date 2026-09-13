import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { CtaBand, Faq, PageHero } from '@/components/Sections';
import { pageMetadata } from '@/lib/seo';
import { IMAGES } from '@/lib/images';
import { PRICING, PRICING_EXTRAS, SITE } from '@/lib/site';
import { PRICING_ALTERNATES } from '@/lib/i18n';

const base = pageMetadata({
  title: 'Pricing',
  description:
    'Certified translation pricing: $25 per page for standard documents, $60 per page for complex formatted documents, $0.10 per word for text-heavy material. Rush and mailed hard copies available.',
  path: '/pricing',
});

export const metadata: Metadata = {
  ...base,
  alternates: { ...base.alternates, ...PRICING_ALTERNATES },
};

const PRICING_FAQ = [
  {
    q: 'What counts as a page?',
    a: 'A page of the original document. A single-page birth certificate is one page, whether or not the translation runs slightly longer.',
  },
  {
    q: 'What makes a document “complex formatted”?',
    a: 'Pages that take significant extra work to reproduce faithfully — passport books with dozens of stamps, military books, and medical or official forms with dense tables and boxes. If your document is borderline, we tell you which rate applies in your quote, before any work starts.',
  },
  {
    q: 'When do I pay?',
    a: 'After you approve the quote and before the finished translation is delivered. You are never charged for a quote.',
  },
  {
    q: 'Do you charge for a quote?',
    a: 'No. Quotes are free and carry no obligation. Upload your document and we will reply with the exact price.',
  },
  {
    q: 'Can I get the translation faster?',
    a: 'Yes. Rush service is $30 on top of the translation price. Tell us your deadline in the request and we will confirm what is possible.',
  },
  {
    q: 'Do I get a printed copy?',
    a: 'Translations are delivered as PDFs by email, which is what most offices accept. A printed hard copy sent by mail is $20.',
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        image={IMAGES.meeting}
        eyebrow="Pricing"
        title="Straightforward rates, quoted before we start"
        intro="Most documents are priced per page. Longer written material is priced per word. You always see the exact price in your quote before any work begins."
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/quote" className="btn-primary px-7 py-3.5">
            Get a Free Quote <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </PageHero>

      <section className="section bg-white">
        <div className="container-custom grid gap-6 lg:grid-cols-3">
          {PRICING.map((tier) => (
            <div
              key={tier.key}
              className={`flex flex-col rounded-2xl border p-8 ${
                tier.featured ? 'border-primary bg-primary-soft shadow-card' : 'border-slate-200'
              }`}
            >
              {tier.featured && (
                <span className="mb-4 inline-block w-fit rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  Most common
                </span>
              )}
              <h2 className="text-xl">{tier.name}</h2>
              <p className="mt-4 flex items-baseline gap-2">
                <span className="font-heading text-4xl font-extrabold text-primary">{tier.price}</span>
                <span className="text-dark-light">{tier.unit}</span>
              </p>
              <p className="mt-4 text-dark-light">{tier.summary}</p>
              <ul className="mt-5 space-y-2.5">
                {tier.examples.map((example) => (
                  <li key={example} className="flex items-start gap-2.5 text-dark">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-leaf-dark" />
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="container-custom mt-12 grid gap-6 md:grid-cols-2">
          {PRICING_EXTRAS.map((extra) => (
            <div key={extra.name} className="flex items-start justify-between gap-6 rounded-2xl bg-slate-50 p-6">
              <div>
                <p className="font-heading text-lg font-bold text-dark">{extra.name}</p>
                <p className="mt-1 text-dark-light">{extra.note}</p>
              </div>
              <span className="shrink-0 font-heading text-2xl font-extrabold text-dark">{extra.price}</span>
            </div>
          ))}
        </div>

        <div className="container-custom mt-12 grid gap-8 lg:grid-cols-12">
          <div className="relative hidden aspect-[3/4] overflow-hidden rounded-2xl shadow-card lg:col-span-4 lg:block">
            <Image
              src={IMAGES.passport.src}
              alt={IMAGES.passport.alt}
              fill
              loading="lazy"
              sizes="33vw"
              quality={70}
              className="object-cover"
            />
          </div>
          <div className="rounded-2xl border border-slate-200 p-8 lg:col-span-8">
            <h2 className="text-2xl">Included in every certified translation</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                'Complete translation, laid out like the original',
                'Signed certificate of translation accuracy',
                'Names, dates, seals and stamps transcribed exactly',
                'Delivered as a PDF within 12–48 hours',
                'Free revision if we made an error',
                'Your documents stored privately, never shared',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-dark">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-leaf-dark" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-dark-light">
              Not sure which rate applies to your document? Send it over — the quote tells you the exact price, with no
              obligation. Questions:{' '}
              <a href={SITE.phoneHref} className="font-semibold text-primary hover:underline">
                {SITE.phone}
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <Faq items={PRICING_FAQ} title="Pricing questions" />
      <CtaBand title="Know the price before you commit" text="Upload your document and we'll send the exact cost and delivery time." />
    </>
  );
}
