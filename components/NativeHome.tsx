import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BadgeCheck, Clock, FileCheck2, Lock, MessageSquareText, Stamp, Upload } from 'lucide-react';
import { LANGUAGES, SITE } from '@/lib/site';
import { SERVICE_ICONS } from '@/lib/service-icons';
import { CONTENT, type NativeLocale } from '@/lib/i18n-content';
import { pricingHref, quoteHref } from '@/lib/i18n';
import Flag from '@/components/Flag';
import JsonLd from '@/components/JsonLd';
import { Faq, SectionHeading } from '@/components/Sections';
import NativeCtaBand from '@/components/NativeCtaBand';
import { IMAGES } from '@/lib/images';

const STEP_ICONS = [Upload, MessageSquareText, FileCheck2];
const WHY_ICONS = [BadgeCheck, Clock, Stamp, Lock];

export default function NativeHome({ locale }: { locale: NativeLocale }) {
  const c = CONTENT[locale];

  return (
    <div lang={locale}>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${SITE.url}/${locale}#webpage`,
          url: `${SITE.url}/${locale}`,
          name: c.meta.title,
          description: c.meta.description,
          inLanguage: locale,
          isPartOf: { '@id': `${SITE.url}/#website` },
          about: { '@id': `${SITE.url}/#business` },
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-dark text-white">
        <Image src={IMAGES.hero.src} alt="" fill priority sizes="100vw" quality={70} className="object-cover" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(100deg, rgba(14,36,51,0.97) 0%, rgba(14,36,51,0.92) 40%, rgba(14,36,51,0.45) 100%), radial-gradient(55rem 28rem at 88% -10%, rgba(10,143,189,0.35), transparent 62%), radial-gradient(40rem 24rem at -10% 110%, rgba(139,177,65,0.22), transparent 60%)',
          }}
          aria-hidden="true"
        />
        <div className="container-custom relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-white">
              <BadgeCheck className="h-5 w-5 text-leaf" aria-hidden="true" />
              {c.hero.rating}
            </div>
            <h1 className="mt-5 break-words text-[1.85rem] font-extrabold leading-[1.2] text-white sm:text-4xl md:text-5xl lg:text-[3.4rem] lg:leading-[1.15]">
              {c.hero.title} <span className="text-leaf">{c.hero.accent}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300 md:text-xl">{c.hero.intro}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={quoteHref(locale)} className="btn bg-leaf px-7 py-4 text-lg text-dark hover:bg-[#9cc251]">
                {c.hero.ctaQuote}
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a href={SITE.phoneHref} className="btn-ghost-light px-7 py-4 text-lg">
                {c.hero.ctaCall} {SITE.phone}
              </a>
            </div>

            <p className="mt-5 text-sm font-semibold text-leaf">{c.hero.replyPromise}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {LANGUAGES.map((l) => (
                <span
                  key={l.slug}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-semibold text-white"
                >
                  <Flag code={l.flag} className="h-3.5 w-5 rounded-[2px]" />
                  <span lang={l.slug === 'armenian' ? 'hy' : l.slug === 'russian' ? 'ru' : 'uk'}>{l.native}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="hidden lg:col-span-5 lg:block" aria-hidden="true">
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -left-6 top-6 h-full w-full -rotate-6 rounded-2xl bg-white/10" />
              <div className="relative rounded-2xl bg-white p-7 text-dark shadow-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">AZ Global</span>
                  <BadgeCheck className="h-6 w-6 text-leaf-dark" />
                </div>
                <p className="mt-4 font-heading text-xl font-bold">{c.pricing.tiers[0].name}</p>
                <div className="mt-5 space-y-2.5">
                  {[92, 78, 85, 64, 88, 70].map((w, i) => (
                    <div key={i} className="h-2.5 rounded-full bg-slate-200" style={{ width: `${w}%` }} />
                  ))}
                </div>
                <div className="mt-7 flex items-end justify-between">
                  <div>
                    <div className="h-px w-32 bg-slate-300" />
                    <p className="mt-2 text-xs text-dark-light">{c.hero.certLabel}</p>
                  </div>
                  <div className="flex h-20 w-20 rotate-12 items-center justify-center rounded-full border-4 border-primary/70 text-primary/80">
                    <Stamp className="h-8 w-8" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-5 -right-4 flex items-center gap-2 rounded-xl bg-leaf px-4 py-3 font-semibold text-dark shadow-xl">
                <Clock className="h-5 w-5" />
                {c.stats[2].value}
              </div>
            </div>
          </div>
        </div>

        <div className="relative border-t border-white/10">
          <div className="container-custom flex flex-wrap items-center gap-x-8 gap-y-2 py-5 text-sm text-slate-300">
            <span className="font-semibold text-white">{c.hero.acceptedLabel}</span>
            {c.hero.acceptedBy.map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-leaf" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-200 bg-white">
        <dl className="container-custom grid grid-cols-2 divide-slate-200 py-8 md:grid-cols-4 md:divide-x">
          {c.stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse px-4 py-3 text-center">
              <dt className="mt-1 text-sm text-dark-light">{s.label}</dt>
              <dd className="font-heading text-3xl font-extrabold text-primary md:text-4xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Languages */}
      <section className="section bg-slate-50">
        <div className="container-custom">
          <SectionHeading eyebrow={c.languages.eyebrow} title={c.languages.title} text={c.languages.text} />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {LANGUAGES.map((l) => (
              <div key={l.slug} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-card">
                <div className="flex items-center gap-4">
                  <Flag code={l.flag} className="h-9 w-[54px] rounded-md shadow-sm" />
                  <div>
                    <h3 className="text-xl" lang={l.slug === 'armenian' ? 'hy' : l.slug === 'russian' ? 'ru' : 'uk'}>
                      {l.native}
                    </h3>
                    <p className="text-sm text-dark-light">{c.languages.pairSuffix}</p>
                  </div>
                </div>
                <p className="mt-5 flex-1 text-dark-light">{c.languages.cardText}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section bg-white">
        <div className="container-custom">
          <SectionHeading eyebrow={c.services.eyebrow} title={c.services.title} text={c.services.text} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {c.services.items.map((service) => {
              const Icon = SERVICE_ICONS[service.key];
              return (
                <div key={service.key} className="rounded-2xl border border-slate-200 p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl">{service.title}</h3>
                  <p className="mt-2 text-dark-light">{service.summary}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section bg-primary-soft">
        <div className="container-custom">
          <SectionHeading eyebrow={c.steps.eyebrow} title={c.steps.title} center />
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {c.steps.items.map((step, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <li key={step.title} className="relative rounded-2xl bg-white p-8 shadow-card">
                  <span className="absolute right-6 top-5 font-heading text-5xl font-extrabold text-primary/10">{i + 1}</span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl">{step.title}</h3>
                  <p className="mt-2 text-dark-light">{step.text}</p>
                </li>
              );
            })}
          </ol>
          <div className="mt-10 text-center">
            <Link href={quoteHref(locale)} className="btn-primary px-8 py-4 text-lg">
              {c.steps.cta}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow={c.pricing.eyebrow} title={c.pricing.title} text={c.pricing.text} />
            <Link
              href={pricingHref(locale)}
              className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
            >
              {c.pricing.link} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {c.pricing.tiers.map((tier, i) => (
              <div
                key={tier.key}
                className={`rounded-2xl border p-7 ${i === 0 ? 'border-primary bg-primary-soft' : 'border-slate-200'}`}
              >
                <p className="flex items-baseline gap-2">
                  <span className="font-heading text-3xl font-extrabold text-primary">{tier.price}</span>
                  <span className="text-dark-light">{tier.unit}</span>
                </p>
                <h3 className="mt-3 text-lg">{tier.name}</h3>
                <p className="mt-2 text-dark-light">{tier.summary}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-dark-light">{c.pricing.note}</p>
        </div>
      </section>

      {/* Why us */}
      <section className="section bg-white">
        <div className="container-custom grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow={c.why.eyebrow} title={c.why.title} text={c.why.text} />
            <div className="relative mt-8 hidden aspect-[4/3] overflow-hidden rounded-2xl shadow-card lg:block">
              <Image
                src={IMAGES.consultation.src}
                alt={IMAGES.consultation.alt}
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 45vw"
                quality={70}
                className="object-cover"
              />
            </div>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2">
            {c.why.items.map((item, i) => {
              const Icon = WHY_ICONS[i];
              return (
                <li key={item.title} className="rounded-2xl bg-slate-50 p-6">
                  <Icon className="h-6 w-6 text-leaf-dark" />
                  <h3 className="mt-3 text-lg">{item.title}</h3>
                  <p className="mt-1 text-dark-light">{item.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <Faq
        items={c.faq.items}
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
