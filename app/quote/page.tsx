import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { BadgeCheck, Clock, Lock, Mail, Phone } from 'lucide-react';
import RequestForm from '@/components/RequestForm';
import { Rating } from '@/components/Sections';
import { SITE } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Get a Free Translation Quote',
  description:
    'Upload your Armenian, Russian or Ukrainian document and get a free quote for a certified English translation. USCIS accepted, 12–48 hour turnaround.',
  path: '/quote',
});

export default function QuotePage() {
  return (
    <section className="bg-gradient-to-b from-primary-soft to-white">
      <div className="container-custom grid gap-10 py-12 md:py-16 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-8">
        <div className="lg:col-span-5 lg:row-start-1">
          <span className="eyebrow">Free quote</span>
          <h1 className="mt-3 text-4xl leading-tight md:text-5xl">Request your free quote</h1>
          <p className="mt-5 text-lg leading-relaxed text-dark-light">
            Tell us what you need and upload your documents. We&apos;ll review them and email you a quote — no account,
            no obligation.
          </p>
          <div className="mt-6">
            <Rating />
          </div>
        </div>

        {/* Form comes right after the heading on mobile, and sits on the right on desktop */}
        <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <RequestForm kind="quote" />
          </div>
        </div>

        <div className="lg:col-span-5 lg:row-start-2">
          <ul className="space-y-5">
            {[
              { icon: BadgeCheck, title: 'USCIS-accepted certified translations', text: 'Also used for courts, universities and government agencies.' },
              { icon: Clock, title: '12–48 hour turnaround', text: 'For most documents. Tell us if you have a deadline.' },
              { icon: Lock, title: 'Private & secure', text: 'Your files are stored privately and only used for your request.' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.title} className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-card">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-dark">{item.title}</p>
                    <p className="text-dark-light">{item.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
            <p className="font-semibold text-dark">Prefer to talk to someone?</p>
            <div className="mt-3 space-y-2 text-dark-light">
              <a href={SITE.phoneHref} className="flex items-center gap-2 hover:text-primary">
                <Phone className="h-4 w-4 text-primary" /> {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 break-all hover:text-primary">
                <Mail className="h-4 w-4 text-primary" /> {SITE.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
