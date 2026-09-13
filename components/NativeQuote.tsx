import { Check, MessageCircle, Phone } from 'lucide-react';
import { SITE } from '@/lib/site';
import { CONTENT, type NativeLocale } from '@/lib/i18n-content';
import RequestForm from '@/components/RequestForm';

export default function NativeQuote({ locale }: { locale: NativeLocale }) {
  const c = CONTENT[locale];

  return (
    <div lang={locale}>
      <section className="border-b border-slate-200 bg-gradient-to-b from-primary-soft to-white">
        <div className="container-custom grid gap-10 py-12 md:py-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="eyebrow">{c.quotePage.eyebrow}</span>
            <h1 className="mt-3 break-words text-[1.85rem] leading-tight sm:text-4xl md:text-5xl">{c.quotePage.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-dark-light">{c.quotePage.intro}</p>

            <div className="mt-8 rounded-2xl bg-white p-7 shadow-card">
              <h2 className="text-lg">{c.quotePage.asideTitle}</h2>
              <ul className="mt-4 space-y-3">
                {c.quotePage.aside.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-dark">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-leaf-dark" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-6 text-sm font-semibold text-leaf-dark">{c.hero.replyPromise}</p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a href={SITE.phoneHref} className="btn-outline">
                <Phone className="h-4 w-4" />
                {SITE.phone}
              </a>
              <a
                href={SITE.whatsappHref}
                target="_blank"
                rel="noopener"
                className="btn-outline border-leaf text-leaf-dark hover:bg-leaf hover:text-dark"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              <RequestForm kind="quote" locale={locale} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
