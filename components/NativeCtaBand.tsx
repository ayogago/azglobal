import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { SITE } from '@/lib/site';
import { CONTENT, type NativeLocale } from '@/lib/i18n-content';
import { quoteHref } from '@/lib/i18n';
import { IMAGES } from '@/lib/images';

export default function NativeCtaBand({ locale }: { locale: NativeLocale }) {
  const c = CONTENT[locale];

  return (
    <section className="relative overflow-hidden bg-dark">
      <Image
        src={IMAGES.losAngeles.src}
        alt=""
        fill
        loading="lazy"
        sizes="100vw"
        quality={60}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/90 to-dark/40" aria-hidden="true" />
      <div className="container-custom relative flex flex-col items-start gap-8 py-14 md:flex-row md:items-center md:justify-between md:py-16">
        <div className="max-w-2xl">
          <h2 className="text-3xl text-white md:text-4xl">{c.cta.title}</h2>
          <p className="mt-3 text-lg text-slate-300">{c.cta.text}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link href={quoteHref(locale)} className="btn bg-leaf text-dark hover:bg-[#9cc251]">
            {c.hero.ctaQuote}
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
