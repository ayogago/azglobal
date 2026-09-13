import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BadgeCheck, Clock, FileCheck2, Lock, MessageSquareText, Stamp, Upload } from 'lucide-react';
import { LANGUAGES, PRICING, SITE } from '@/lib/site';
import { DOCUMENT_PAGES, GENERAL_FAQ, SERVICES } from '@/lib/content';
import { SERVICE_ICONS } from '@/lib/service-icons';
import Flag from '@/components/Flag';
import { CtaBand, Faq, Rating, SectionHeading, StatsBar } from '@/components/Sections';
import { IMAGES } from '@/lib/images';

export const metadata = {
  alternates: { canonical: '/' },
};


const STEPS = [
  {
    icon: Upload,
    title: 'Send your document',
    text: 'Upload a photo or scan through our secure form — no account needed.',
  },
  {
    icon: MessageSquareText,
    title: 'Get your free quote',
    text: 'We review your document and reply with a quote and delivery time.',
  },
  {
    icon: FileCheck2,
    title: 'Receive your translation',
    text: 'Your certified translation is ready in 12–48 hours for most documents.',
  },
];

const ACCEPTED_BY = ['USCIS', 'Courts', 'Universities', 'Government agencies'];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-dark text-white">
        <Image
          src={IMAGES.hero.src}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={70}
          className="object-cover"
        />
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
            <Rating light />
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
              Certified translations, <span className="text-leaf">accepted by USCIS.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300 md:text-xl">
              Armenian, Russian and Ukrainian ⇄ English. Professional translators, Los Angeles based, delivered in 12–48
              hours.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/quote" className="btn bg-leaf px-7 py-4 text-lg text-dark hover:bg-[#9cc251]">
                Get a Free Quote
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a href={SITE.phoneHref} className="btn-ghost-light px-7 py-4 text-lg">
                Call {SITE.phone}
              </a>
            </div>

            <p className="mt-5 text-sm font-semibold text-leaf">{SITE.replyPromise}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {LANGUAGES.map((l) => (
                <Link
                  key={l.slug}
                  href={l.href}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-semibold text-white hover:bg-white/10"
                >
                  <Flag code={l.flag} className="h-3.5 w-5 rounded-[2px]" />
                  {l.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Certified translation illustration */}
          <div className="hidden lg:col-span-5 lg:block" aria-hidden="true">
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -left-6 top-6 h-full w-full -rotate-6 rounded-2xl bg-white/10" />
              <div className="relative rounded-2xl bg-white p-7 text-dark shadow-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">Certified translation</span>
                  <BadgeCheck className="h-6 w-6 text-leaf-dark" />
                </div>
                <p className="mt-4 font-heading text-xl font-bold">Certificate of Birth</p>
                <div className="mt-5 space-y-2.5">
                  {[92, 78, 85, 64, 88, 70].map((w, i) => (
                    <div key={i} className="h-2.5 rounded-full bg-slate-200" style={{ width: `${w}%` }} />
                  ))}
                </div>
                <div className="mt-7 flex items-end justify-between">
                  <div>
                    <div className="h-px w-32 bg-slate-300" />
                    <p className="mt-2 text-xs text-dark-light">Certification of accuracy</p>
                  </div>
                  <div className="flex h-20 w-20 rotate-12 items-center justify-center rounded-full border-4 border-primary/70 text-primary/80">
                    <Stamp className="h-8 w-8" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-5 -right-4 flex items-center gap-2 rounded-xl bg-leaf px-4 py-3 font-semibold text-dark shadow-xl">
                <Clock className="h-5 w-5" />
                Ready in 12–48h
              </div>
            </div>
          </div>
        </div>

        <div className="relative border-t border-white/10">
          <div className="container-custom flex flex-wrap items-center gap-x-8 gap-y-2 py-5 text-sm text-slate-300">
            <span className="font-semibold text-white">Accepted by:</span>
            {ACCEPTED_BY.map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-leaf" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <StatsBar />

      {/* Languages */}
      <section className="section bg-slate-50" id="languages">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Languages"
            title="Specialists in three languages"
            text="We focus on Armenian, Russian and Ukrainian, translating to and from English — so every document gets a translator who knows it well."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {LANGUAGES.map((l) => (
              <Link
                key={l.slug}
                href={l.href}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-card transition hover:-translate-y-0.5 hover:border-primary/40"
              >
                <div className="flex items-center gap-4">
                  <Flag code={l.flag} className="h-9 w-[54px] rounded-md shadow-sm" />
                  <div>
                    <h3 className="text-xl">{l.name}</h3>
                    <p className="text-sm text-dark-light">{l.native} ⇄ English</p>
                  </div>
                </div>
                <p className="mt-5 flex-1 text-dark-light">
                  Certified {l.name} translations of civil records, diplomas, legal and medical documents.
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-primary">
                  {l.name} translation services
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="What we translate"
              title="Documents for every situation"
              text="From a single birth certificate to a full immigration file."
            />
            <Link href="/services" className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline">
              All services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-2">
            {DOCUMENT_PAGES.map((doc) => (
              <Link
                key={doc.slug}
                href={doc.href}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-dark transition hover:border-primary hover:text-primary"
              >
                {doc.name}
              </Link>
            ))}
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => {
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
          <SectionHeading eyebrow="How it works" title="Three simple steps" center />
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
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
            <Link href="/quote" className="btn-primary px-8 py-4 text-lg">
              Start with a free quote
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Pricing"
              title="Flat rates, no surprises"
              text="You see the exact price in your quote before any work starts."
            />
            <Link href="/pricing" className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline">
              Full price list <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PRICING.map((tier) => (
              <div
                key={tier.key}
                className={`rounded-2xl border p-7 ${tier.featured ? 'border-primary bg-primary-soft' : 'border-slate-200'}`}
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
          <p className="mt-6 text-sm text-dark-light">
            Rush service +$30 · printed hard copy by mail +$20.{' '}
            <Link href="/pricing" className="font-semibold text-primary hover:underline">
              See what&apos;s included
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Why us */}
      <section className="section bg-white">
        <div className="container-custom grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Why AZ Global"
              title="Precision in every word. Speed in every project."
              text="Your documents matter — to your immigration case, your education and your family. We treat every one that way."
            />
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
            {[
              { icon: BadgeCheck, title: 'USCIS accepted', text: 'Signed certification of accuracy on every certified translation.' },
              { icon: Clock, title: '12–48 hour delivery', text: 'Fast turnaround for most documents, with support 24/7.' },
              { icon: Stamp, title: 'Clear, flat pricing', text: 'Certified documents from $25 per page — no surprises.' },
              { icon: Lock, title: 'Private & confidential', text: 'Documents are stored privately and only seen by our team.' },
            ].map((item) => {
              const Icon = item.icon;
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

      <Faq items={GENERAL_FAQ} />
      <CtaBand />
    </>
  );
}
