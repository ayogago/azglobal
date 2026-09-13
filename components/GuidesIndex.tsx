import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { GUIDES } from '@/lib/guides';
import { type Locale } from '@/lib/i18n';
import { PAGE_UI } from '@/lib/i18n-pages';
import { translatedGuides } from '@/lib/i18n-guides';
import { CtaBand, PageHero } from '@/components/Sections';
import NativeCtaBand from '@/components/NativeCtaBand';
import { IMAGES } from '@/lib/images';

export default function GuidesIndex({ locale = 'en' }: { locale?: Locale }) {
  const t = PAGE_UI[locale];
  const isEnglish = locale === 'en';
  const base = isEnglish ? '' : `/${locale}`;
  const guides = isEnglish ? GUIDES : translatedGuides(locale);

  const body = (
    <>
      <PageHero image={IMAGES.office} eyebrow={t.guides} title={t.guidesTitle} intro={t.guidesIntro} />
      <section className="section bg-white">
        <div className="container-custom grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`${base}/guides/${guide.slug}`}
              className="group flex flex-col rounded-2xl border border-slate-200 p-7 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card"
            >
              <h2 className="text-xl group-hover:text-primary">{guide.title}</h2>
              <p className="mt-3 flex-1 text-dark-light">{guide.summary}</p>
              <span className="mt-6 flex items-center justify-between text-sm">
                <span className="inline-flex items-center gap-1.5 text-dark-light">
                  <Clock className="h-4 w-4" />
                  {guide.readingTime}
                </span>
                <span className="inline-flex items-center gap-1.5 font-semibold text-primary">
                  {t.read}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>
      {isEnglish ? <CtaBand /> : <NativeCtaBand locale={locale} />}
    </>
  );

  return isEnglish ? body : <div lang={locale}>{body}</div>;
}
