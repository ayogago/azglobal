'use client';

import { usePathname } from 'next/navigation';
import { MessageCircle, MessageSquare, Phone } from 'lucide-react';
import { SITE } from '@/lib/site';
import { CHROME, localeFromPath } from '@/lib/i18n';

/** Sticky call / WhatsApp bar, phones and small tablets only. */
export default function MobileCtaBar() {
  const copy = CHROME[localeFromPath(usePathname())];

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur lg:hidden">
      <div className="grid grid-cols-3 divide-x divide-slate-200">
        <a href={SITE.phoneHref} className="flex flex-col items-center gap-1 py-2.5 text-xs font-bold text-primary">
          <Phone className="h-5 w-5" />
          {copy.barCall}
        </a>
        <a
          href={SITE.whatsappHref}
          target="_blank"
          rel="noopener"
          className="flex flex-col items-center gap-1 py-2.5 text-xs font-bold text-leaf-dark"
        >
          <MessageCircle className="h-5 w-5" />
          WhatsApp
        </a>
        <a href={SITE.smsHref} className="flex flex-col items-center gap-1 py-2.5 text-xs font-bold text-dark">
          <MessageSquare className="h-5 w-5" />
          {copy.barText}
        </a>
      </div>
    </div>
  );
}
