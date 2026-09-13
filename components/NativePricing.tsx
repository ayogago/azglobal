import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { SITE } from '@/lib/site';
import { CONTENT, type NativeLocale } from '@/lib/i18n-content';
import { quoteHref } from '@/lib/i18n';
import { Faq } from '@/components/Sections';
import NativeCtaBand from '@/components/NativeCtaBand';
import { IMAGES } from '@/lib/images';

export default function NativePricing({ locale }: { locale: NativeLocale }) {
  const c = CONTENT[locale];

  return (
    <div lang={locale}>
      <section className="border-b border-slate-200 bg-gradient-to-b from-primary-soft to-white">
        <div className="container-custom grid items-center gap-10 py-14 md:py-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="eyebrow">{c.pricingPage.eyebrow}</span>
            <h1 className="mt-3 break-words text-[1.85rem] leading-tight sm:text-4xl md:text-5xl">{c.pricingPage.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-dark-light md:text-xl">{c.pricingPage.intro}</p>
            <div className="mt-8">
              <Link href={quoteHref(locale)} className="btn-primary px-7 py-3.5">
                {c.hero.ctaQuote} <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card">
              <Image
                src={IMAGES.meeting.src}
                alt={IMAGES.meeting.alt}
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

      <section className="section bg-white">
        <div className="container-custom grid gap-6 lg:grid-cols-3">
          {c.pricing.tiers.map((tier, i) => (
            <div
              key={tier.key}
              className={`flex flex-col rounded-2xl border p-8 ${
                i === 0 ? 'border-primary bg-primary-soft shadow-card' : 'border-slate-200'
              }`}
            >
              {i === 0 && (
                <span className="mb-4 inline-block w-fit rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  {c.pricing.mostCommon}
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
          {c.pricing.extras.map((extra) => (
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
            <h2 className="text-2xl">{c.pricingPage.includedTitle}</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {c.pricingPage.included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-dark">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-leaf-dark" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-dark-light">
              {c.pricingPage.closing}{' '}
              <a href={SITE.phoneHref} className="font-semibold text-primary hover:underline">
                {SITE.phone}
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <Faq
        items={c.pricingPage.faq}
        title={c.faq.title}
        help={
          <>
            {c.quotePage.orCall}{' '}
            <a href={SITE.phoneHref} className="font-semibold text-primary hover:underline">
              {SITE.phone}
            </a>
          </>
        }
      />

      <NativeCtaBand locale={locale} />
    </div>
  );
}
