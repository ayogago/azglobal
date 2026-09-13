import Link from 'next/link';
import Image from 'next/image';
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { LANGUAGES, SITE } from '@/lib/site';
import { DOCUMENT_PAGES } from '@/lib/content';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-slate-300">
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <div className="inline-block rounded-xl bg-white px-4 py-3">
              <Image src="/logo-mark.png" alt="AZ Global Translations" width={1200} height={282} sizes="180px" className="h-9 w-auto" />
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed">
              Certified Armenian, Russian and Ukrainian translations, accepted by USCIS, courts and universities.
            </p>
            <Link href="/quote" className="btn-light mt-6 px-5 py-2.5 text-sm">
              Get a Free Quote
            </Link>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">Languages</h2>
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
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">Documents</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {DOCUMENT_PAGES.map((doc) => (
                <li key={doc.slug}>
                  <Link href={doc.href} className="hover:text-white">
                    {doc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">Company</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { name: 'Services', href: '/services' },
                { name: 'Pricing', href: '/pricing' },
                { name: 'Guides', href: '/guides' },
                { name: 'About us', href: '/about' },
                { name: 'Contact', href: '/contact' },
                { name: 'Privacy policy', href: '/privacy-policy' },
                { name: 'Terms & conditions', href: '/terms-and-conditions' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">Contact</h2>
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
                Support available 24/7
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-slate-400">
          © {year} {SITE.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
