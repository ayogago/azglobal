import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BadgeCheck, Clock, Lock, Mail, MessageCircle, Phone, Stamp } from 'lucide-react';
import { SITE } from '@/lib/site';
import { CONTENT, type NativeLocale } from '@/lib/i18n-content';
import { quoteHref } from '@/lib/i18n';
import { translatedDocuments } from '@/lib/i18n-documents';
import { translatedCities } from '@/lib/i18n-cities';
import { SERVICE_ICONS } from '@/lib/service-icons';
import { Faq, SectionHeading, StatsBar } from '@/components/Sections';
import NativeCtaBand from '@/components/NativeCtaBand';
import RequestForm from '@/components/RequestForm';
import { IMAGES } from '@/lib/images';

const WHY_ICONS = [BadgeCheck, Clock, Stamp, Lock];

function Hero({
  eyebrow,
  title,
  intro,
  image,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  image: { src: string; alt: string };
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-slate-200 bg-gradient-to-b from-primary-soft to-white">
      <div className="container-custom grid items-center gap-10 py-14 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="mt-3 break-words text-[1.85rem] leading-tight sm:text-4xl md:text-5xl">{title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-dark-light md:text-xl">{intro}</p>
          {children}
        </div>
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card">
            <Image
              src={image.src}
              alt={image.alt}
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
  );
}

function Chips({ title, items }: { title: string; items: { slug: string; href: string; name: string }[] }) {
  return (
    <>
      <h2 className="text-sm font-bold uppercase tracking-wider text-dark-light">{title}</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={item.href}
            className="rounded-full border border-slate-200 px-3.5 py-1.5 text-sm font-semibold text-dark hover:border-primary hover:text-primary"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </>
  );
}

export function NativeServices({ locale }: { locale: NativeLocale }) {
  const c = CONTENT[locale];

  return (
    <div lang={locale}>
      <Hero
        eyebrow={c.servicesPage.eyebrow}
        title={c.servicesPage.title}
        intro={c.servicesPage.intro}
        image={IMAGES.documents}
      >
        <div className="mt-8">
          <Link href={quoteHref(locale)} className="btn-primary px-7 py-3.5">
            {c.hero.ctaQuote} <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </Hero>

      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {c.services.items.map((service) => {
              const Icon = SERVICE_ICONS[service.key];
              return (
                <div key={service.key} className="rounded-2xl border border-slate-200 p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="mt-5 text-xl">{service.title}</h2>
                  <p className="mt-2 text-dark-light">{service.summary}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 border-t border-slate-200 pt-10">
            <Chips title={c.servicesPage.documentsTitle} items={translatedDocuments(locale)} />
            <div className="mt-8">
              <Chips title={c.servicesPage.citiesTitle} items={translatedCities(locale)} />
            </div>
          </div>
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

export function NativeAbout({ locale }: { locale: NativeLocale }) {
  const c = CONTENT[locale];

  return (
    <div lang={locale}>
      <Hero
        eyebrow={c.aboutPage.eyebrow}
        title={c.aboutPage.title}
        intro={c.aboutPage.intro}
        image={IMAGES.consultation}
      />

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

      <section className="section bg-white">
        <div className="container-custom grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="space-y-4 text-lg leading-relaxed text-dark-light">
              {c.aboutPage.body.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <h2 className="text-2xl">{c.aboutPage.valuesTitle}</h2>
            <ul className="mt-6 grid gap-5">
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
        </div>
      </section>

      <NativeCtaBand locale={locale} />
    </div>
  );
}

export function NativeContact({ locale }: { locale: NativeLocale }) {
  const c = CONTENT[locale];
  const p = c.contactPage;

  const methods = [
    { icon: Phone, title: p.callTitle, text: p.callText, value: SITE.phone, href: SITE.phoneHref },
    { icon: MessageCircle, title: p.whatsappTitle, text: p.whatsappText, value: 'WhatsApp', href: SITE.whatsappHref },
    { icon: Mail, title: p.emailTitle, text: p.emailText, value: SITE.email, href: `mailto:${SITE.email}` },
  ];

  return (
    <div lang={locale}>
      <section className="border-b border-slate-200 bg-gradient-to-b from-primary-soft to-white">
        <div className="container-custom grid gap-10 py-12 md:py-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="eyebrow">{p.eyebrow}</span>
            <h1 className="mt-3 break-words text-[1.85rem] leading-tight sm:text-4xl md:text-5xl">{p.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-dark-light">{p.intro}</p>

            <ul className="mt-8 space-y-4">
              {methods.map((m) => {
                const Icon = m.icon;
                return (
                  <li key={m.title}>
                    <a
                      href={m.href}
                      target={m.href.startsWith('http') ? '_blank' : undefined}
                      rel={m.href.startsWith('http') ? 'noopener' : undefined}
                      className="flex gap-4 rounded-2xl bg-white p-5 shadow-card transition hover:-translate-y-0.5"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-heading font-bold text-dark">{m.title}</span>
                        <span className="block break-all text-sm font-semibold text-primary">{m.value}</span>
                        <span className="mt-1 block text-sm text-dark-light">{m.text}</span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 rounded-2xl bg-white p-5 shadow-card">
              <p className="flex items-center gap-2 font-heading font-bold text-dark">
                <Clock className="h-5 w-5 text-primary" />
                {p.hoursTitle}
              </p>
              <p className="mt-1 text-sm text-dark-light">{p.hoursText}</p>
              <p className="mt-3 text-sm text-dark-light">{SITE.location}</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-2xl">{p.formTitle}</h2>
              <p className="mt-2 text-dark-light">{p.formText}</p>
              <div className="mt-6">
                <RequestForm kind="contact" locale={locale} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <NativeCtaBand locale={locale} />
    </div>
  );
}

export { SectionHeading, StatsBar };
