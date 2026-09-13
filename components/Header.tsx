'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, Globe, Menu, MessageCircle, Phone, X } from 'lucide-react';
import { LANGUAGES, SITE } from '@/lib/site';
import { CHROME, homeHref, localeFromPath, LOCALES, quoteHref } from '@/lib/i18n';
import Flag from '@/components/Flag';

export default function Header() {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const copy = CHROME[locale];
  const isEnglish = locale === 'en';

  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [localeOpen, setLocaleOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const localeRef = useRef<HTMLDivElement>(null);

  // Close menus on navigation.
  useEffect(() => {
    setMobileOpen(false);
    setLangOpen(false);
    setLocaleOpen(false);
  }, [pathname]);

  // Close the dropdowns on outside click / Escape.
  useEffect(() => {
    if (!langOpen && !localeOpen) return;
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
      if (localeRef.current && !localeRef.current.contains(e.target as Node)) setLocaleOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setLangOpen(false);
      setLocaleOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [langOpen, localeOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isActive = (href: string) => pathname === href;
  const langActive = LANGUAGES.some((l) => pathname === l.href);
  const currentLocale = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  const linkClass = (active: boolean) =>
    `rounded-md px-3 py-2 text-[15px] font-semibold transition-colors ${
      active ? 'text-primary' : 'text-dark hover:text-primary'
    }`;

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
        <nav className="container-custom flex h-[72px] items-center justify-between gap-4" aria-label="Main">
          <Link href={homeHref(locale)} className="flex shrink-0 items-center" aria-label={SITE.name}>
            <Image
              src="/logo-mark.png"
              alt={SITE.name}
              width={1200}
              height={282}
              priority
              sizes="(min-width: 640px) 200px, 170px"
              className="h-10 w-auto sm:h-11"
            />
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {isEnglish && (
              <>
                <Link href="/services" className={linkClass(isActive('/services'))}>
                  Services
                </Link>

                <div className="relative" ref={langRef}>
                  <button
                    type="button"
                    className={`${linkClass(langActive)} inline-flex items-center gap-1`}
                    aria-expanded={langOpen}
                    aria-haspopup="true"
                    onClick={() => setLangOpen((v) => !v)}
                  >
                    Languages
                    <ChevronDown className={`h-4 w-4 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {langOpen && (
                    <div className="absolute left-0 top-full mt-2 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-card">
                      {LANGUAGES.map((l) => (
                        <Link
                          key={l.slug}
                          href={l.href}
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-primary-soft"
                        >
                          <Flag code={l.flag} className="h-4 w-6 rounded-sm" />
                          <span>
                            <span className="block text-sm font-semibold text-dark">{l.name} translation</span>
                            <span className="block text-xs text-dark-light">{l.native} ⇄ English</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {(isEnglish ? copy.nav.slice(1) : copy.nav).map((item) => (
              <Link key={item.href} href={item.href} className={linkClass(isActive(item.href))}>
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <div className="relative" ref={localeRef}>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-2 text-[15px] font-semibold text-dark hover:text-primary"
                aria-expanded={localeOpen}
                aria-haspopup="true"
                aria-label={copy.languageLabel}
                onClick={() => setLocaleOpen((v) => !v)}
              >
                <Globe className="h-4 w-4 text-primary" />
                {currentLocale.short}
                <ChevronDown className={`h-4 w-4 transition-transform ${localeOpen ? 'rotate-180' : ''}`} />
              </button>
              {localeOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-slate-200 bg-white p-2 shadow-card">
                  {LOCALES.map((l) => (
                    <Link
                      key={l.code}
                      href={l.href}
                      hrefLang={l.code}
                      lang={l.code}
                      className={`block rounded-lg px-3 py-2.5 text-sm font-semibold hover:bg-primary-soft ${
                        l.code === locale ? 'text-primary' : 'text-dark'
                      }`}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-dark hover:text-primary"
            >
              <Phone className="h-4 w-4 text-primary" />
              {SITE.phone}
            </a>
            <Link href={quoteHref(locale)} className="btn-primary px-5 py-2.5 text-[15px]">
              {copy.quoteCta}
            </Link>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <a
              href={SITE.phoneHref}
              className="rounded-lg p-2.5 text-primary hover:bg-primary-soft"
              aria-label={`${SITE.phone}`}
            >
              <Phone className="h-5 w-5" />
            </a>
            <button
              type="button"
              className="rounded-lg p-2.5 text-dark hover:bg-slate-100"
              aria-label={copy.menu}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[55] bg-dark/50 transition-opacity lg:hidden ${
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />
      <div
        className={`fixed inset-y-0 right-0 z-[56] flex w-80 max-w-[88vw] flex-col bg-white shadow-2xl transition-transform duration-300 lg:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={copy.languageLabel}
        inert={!mobileOpen}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <Image src="/logo-mark.png" alt={SITE.name} width={1200} height={282} sizes="150px" className="h-8 w-auto" />
          <button
            type="button"
            className="rounded-lg p-2 text-dark hover:bg-slate-100"
            aria-label={copy.closeMenu}
            onClick={() => setMobileOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-4">
          {[{ name: isEnglish ? 'Home' : currentLocale.label, href: homeHref(locale) }, ...copy.nav].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-lg px-3 py-3 font-semibold ${
                isActive(item.href) ? 'bg-primary-soft text-primary' : 'text-dark hover:bg-slate-50'
              }`}
            >
              {item.name}
            </Link>
          ))}

          {isEnglish && (
            <>
              <p className="mt-5 px-3 text-xs font-bold uppercase tracking-wider text-dark-light">Languages</p>
              {LANGUAGES.map((l) => (
                <Link
                  key={l.slug}
                  href={l.href}
                  className={`mt-1 flex items-center gap-3 rounded-lg px-3 py-3 font-semibold ${
                    isActive(l.href) ? 'bg-primary-soft text-primary' : 'text-dark hover:bg-slate-50'
                  }`}
                >
                  <Flag code={l.flag} className="h-4 w-6 rounded-sm" />
                  {l.name} translation
                </Link>
              ))}
            </>
          )}

          <p className="mt-5 px-3 text-xs font-bold uppercase tracking-wider text-dark-light">{copy.languageLabel}</p>
          {LOCALES.map((l) => (
            <Link
              key={l.code}
              href={l.href}
              hrefLang={l.code}
              lang={l.code}
              className={`mt-1 flex items-center gap-3 rounded-lg px-3 py-3 font-semibold ${
                l.code === locale ? 'bg-primary-soft text-primary' : 'text-dark hover:bg-slate-50'
              }`}
            >
              <Globe className="h-4 w-4" />
              {l.label}
            </Link>
          ))}
        </div>
        <div className="space-y-3 border-t border-slate-100 p-5">
          <Link href={quoteHref(locale)} className="btn-primary w-full">
            {copy.quoteCta}
          </Link>
          <a href={SITE.phoneHref} className="btn-outline w-full">
            <Phone className="h-4 w-4" />
            {SITE.phone}
          </a>
          <a
            href={SITE.whatsappHref}
            target="_blank"
            rel="noopener"
            className="btn-outline w-full border-leaf text-leaf-dark hover:bg-leaf hover:text-dark"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
