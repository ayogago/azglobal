'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { SITE } from '@/lib/site';
import { CHROME, localeFromPath } from '@/lib/i18n';

/** Official WhatsApp glyph — lucide's MessageCircle is not the brand mark. */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.174.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.898 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

/**
 * Floating WhatsApp chat launcher.
 *
 * Deliberately not a real chat transport: the visitor drafts a message here and
 * we hand it to WhatsApp with the text prefilled, so the conversation lands in
 * the team's normal inbox on their phone. No third-party script, no cookies,
 * nothing stored in the browser.
 */
export default function WhatsAppWidget() {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const t = CHROME[locale].wa;

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const panelId = useId();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape, and hand focus back to the launcher so keyboard users
  // are not dropped at the top of the document.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (open) textareaRef.current?.focus();
  }, [open]);

  // A route change should not leave the panel hanging open over the new page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const send = useCallback(() => {
    const text = message.trim();
    const href = text ? `${SITE.whatsappHref}?text=${encodeURIComponent(text)}` : SITE.whatsappHref;
    window.open(href, '_blank', 'noopener,noreferrer');
    setMessage('');
    setOpen(false);
  }, [message]);

  return (
    <div
      className="fixed bottom-[72px] right-4 z-50 flex flex-col items-end gap-3 lg:bottom-6 lg:right-6"
      data-testid="whatsapp-widget"
    >
      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-modal="false"
          aria-label={t.title}
          lang={locale}
          className="w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-slate-200 motion-safe:animate-[fadeUp_.18s_ease-out]"
        >
          <div className="flex items-start gap-3 bg-[#075E54] px-4 py-3 text-white">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15">
              <WhatsAppIcon className="h-6 w-6" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-heading text-sm font-bold leading-tight">{t.title}</p>
              <p className="mt-0.5 text-xs leading-snug text-white/80">{t.status}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                buttonRef.current?.focus();
              }}
              aria-label={t.close}
              className="-mr-1 rounded-full p-1 text-white/80 transition hover:bg-white/15 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="bg-[#ECE5DD] px-4 py-4">
            <p className="max-w-[15rem] break-words rounded-xl rounded-tl-sm bg-white px-3 py-2 text-sm leading-relaxed text-dark shadow-sm">
              {t.greeting}
            </p>
          </div>

          <div className="border-t border-slate-200 p-3">
            <label htmlFor={`${panelId}-msg`} className="sr-only">
              {t.placeholder}
            </label>
            <textarea
              id={`${panelId}-msg`}
              ref={textareaRef}
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder={t.placeholder}
              className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm text-dark placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="button"
              onClick={send}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-bold text-[#052E23] transition hover:bg-[#1FBE5A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#075E54] focus-visible:ring-offset-2"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {t.send}
            </button>
          </div>
        </div>
      )}

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={t.open}
        title={t.open}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-[#052E23] shadow-lg transition hover:scale-105 hover:bg-[#1FBE5A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#075E54] focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:scale-100"
      >
        {open ? <X className="h-6 w-6" /> : <WhatsAppIcon className="h-7 w-7" />}
      </button>
    </div>
  );
}
