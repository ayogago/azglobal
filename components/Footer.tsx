'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { LANGUAGES, SITE } from '@/lib/site';
import { DOCUMENT_PAGES } from '@/lib/content';
import { CITY_PAGES } from '@/lib/cities';
import { CHROME, localeFromPath, quoteHref } from '@/lib/i18n';

const ENGLISH_COMPANY = [
  { name: 'Services', href: '/services' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Guides', href: '/guides' },
  { name: 'For law firms', href: '/for-law-firms' },
  { name: 'About us', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Privacy policy', href: '/privacy-policy' },
  { name: 'Terms & conditions', href: '/terms-and-conditions' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const locale = localeFromPath(usePathname());
  const copy = CHROME[locale];
  const isEnglish = locale === 'en';

  const company = isEnglish
    ? ENGLISH_COMPANY
    : [
        ...copy.nav,
        { name: copy.quoteCta, href: quoteHref(locale) },
        { name: 'English site', href: '/' },
        { name: 'Privacy policy', href: '/privacy-policy' },
        { name: 'Terms & conditions', href: '/terms-and-conditions' },
      ];

  return (
    <footer className="bg-dark text-slate-300">
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className={isEnglish ? 'lg:col-span-3' : 'lg:col-span-5'}>
            <div className="inline-block rounded-xl bg-white px-4 py-3">
              <Image src="/logo-mark.png" alt={SITE.name} width={1200} height={282} sizes="180px" className="h-9 w-auto" />
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed">{copy.footerBlurb}</p>
            <Link href={quoteHref(locale)} className="btn-light mt-6 px-5 py-2.5 text-sm">
              {copy.quoteCta}
            </Link>
          </div>

          {isEnglish && (
            <>
              <div className="lg:col-span-2">
                <h2 className="text-sm font-bold uppercase tracking-wider text-white">{copy.languagesHeading}</h2>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {LANGUAGES.map((l) => (
                    <li key={l.slug}>
                      <Link href={l.href} className="hover:text-white">
                        {l.name} translation
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-2">
                <h2 className="text-sm font-bold uppercase tracking-wider text-white">{copy.documentsHeading}</h2>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {DOCUMENT_PAGES.slice(0, 8).map((doc) => (
                    <li key={doc.slug}>
                      <Link href={doc.href} className="hover:text-white">
                        {doc.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/services" className="font-semibold text-white hover:underline">
                      All documents →
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          )}

          <div className={isEnglish ? 'lg:col-span-2' : 'lg:col-span-3'}>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">{copy.companyHeading}</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {company.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={isEnglish ? 'lg:col-span-3' : 'lg:col-span-4'}>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">{copy.contactHeading}</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={SITE.phoneHref} className="flex items-center gap-3 hover:text-white">
                  <Phone className="h-4 w-4 shrink-0 text-leaf" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a href={SITE.whatsappHref} target="_blank" rel="noopener" className="flex items-center gap-3 hover:text-white">
                  <MessageCircle className="h-4 w-4 shrink-0 text-leaf" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 break-all hover:text-white">
                  <Mail className="h-4 w-4 shrink-0 text-leaf" />
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-leaf" />
                {SITE.location}
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 shrink-0 text-leaf" />
                {copy.support}
              </li>
            </ul>
          </div>
        </div>

        {isEnglish && (
          <div className="mt-12 border-t border-white/10 pt-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">Areas we serve</h2>
            <p className="mt-3 text-sm">
              Los Angeles ·{' '}
              {CITY_PAGES.map((city, i) => (
                <span key={city.slug}>
                  {i > 0 && ' · '}
                  <Link href={city.href} className="hover:text-white hover:underline">
                    {city.name}
                  </Link>
                </span>
              ))}
            </p>
          </div>
        )}

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-slate-400">
          © {year} {SITE.name}. {copy.rights}
        </div>
      </div>
    </footer>
  );
}
