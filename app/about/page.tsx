import type { Metadata } from 'next';
import { Heart, ShieldCheck, Target, Zap } from 'lucide-react';
import { CtaBand, PageHero, StatsBar } from '@/components/Sections';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'About Us',
  description:
    'AZ Global Translations is a Los Angeles based certified translation company specializing in Armenian, Russian and Ukrainian. 10,000+ documents translated for 1,000+ clients.',
  path: '/about',
});

const VALUES = [
  { icon: Target, title: 'Accuracy', text: 'Every translation is precise and faithful to the original — names, dates, stamps and all.' },
  { icon: Zap, title: 'Speed', text: 'Most documents are delivered in 12–48 hours, because deadlines matter.' },
  { icon: ShieldCheck, title: 'Confidentiality', text: 'Personal documents are handled privately and only by our team.' },
  { icon: Heart, title: 'Care', text: 'Real people answer your questions, with support available 24/7.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Translation that helps people move forward"
        intro="AZ Global Translations provides certified Armenian, Russian and Ukrainian translations for individuals, families, attorneys and businesses — from our base in Los Angeles."
      />

      <section className="section bg-white">
        <div className="container-custom grid gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Our mission</span>
            <h2 className="mt-3 text-3xl md:text-4xl">Precision in every word. Speed in every project.</h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-dark-light">
            <p>
              Accurate translation is more than converting words from one language to another. It&apos;s preserving meaning
              and context, and making sure every document meets the standards of the office that will receive it.
            </p>
            <p>
              We chose to specialize. By focusing on Armenian, Russian and Ukrainian, our professional translators bring
              deep familiarity with the documents, formats and terminology of these languages — whether it&apos;s a
              birth certificate for USCIS, a diploma for a university, or a contract for court.
            </p>
            <p>
              More than 1,000 clients have trusted us with over 10,000 documents. We&apos;d be glad to help you too.
            </p>
          </div>
        </div>
      </section>

      <StatsBar />

      <section className="section bg-slate-50">
        <div className="container-custom">
          <div className="max-w-2xl">
            <span className="eyebrow">Our values</span>
            <h2 className="mt-3 text-3xl md:text-4xl">What you can count on</h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="rounded-2xl bg-white p-7 shadow-card">
                  <Icon className="h-7 w-7 text-primary" />
                  <h3 className="mt-4 text-xl">{v.title}</h3>
                  <p className="mt-2 text-dark-light">{v.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
