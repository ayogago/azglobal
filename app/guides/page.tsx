import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { CtaBand, PageHero } from '@/components/Sections';
import { GUIDES } from '@/lib/guides';
import { pageMetadata } from '@/lib/seo';
import { IMAGES } from '@/lib/images';

export const metadata: Metadata = pageMetadata({
  title: 'Translation Guides',
  description:
    'Plain-English guides to USCIS translation requirements, apostilles, and credential evaluation for foreign diplomas, from a certified translation company in Los Angeles.',
  path: '/guides',
});

export default function GuidesPage() {
  return (
    <>
      <PageHero
        image={IMAGES.documents}
        eyebrow="Guides"
        title="Answers to the questions we get asked most"
        intro="Short, practical explanations of the paperwork around certified translation — what offices actually require, and what trips people up."
      />
      <section className="section bg-white">
        <div className="container-custom grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {GUIDES.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
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
                  Read
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
