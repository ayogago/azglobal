import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { segmentAlternates } from '@/lib/i18n';
import { IMAGES } from '@/lib/images';
import { Clock, Mail, MapPin, MessageCircle, MessageSquare, Phone } from 'lucide-react';
import Link from 'next/link';
import RequestForm from '@/components/RequestForm';
import { PageHero } from '@/components/Sections';
import { SITE } from '@/lib/site';

const base = pageMetadata({
  title: 'Contact Us',
  description:
    'Contact AZ Global Translations in Los Angeles for certified Armenian, Russian and Ukrainian translations. Call +1 (747) 895-4845 or send us a message — support available 24/7.',
  path: '/contact',
});

export const metadata: Metadata = {
  ...base,
  alternates: { ...base.alternates, ...segmentAlternates('contact') },
};

const CHANNELS = [
  { icon: Phone, label: 'Phone', value: SITE.phone, href: SITE.phoneHref },
  { icon: MessageCircle, label: 'WhatsApp', value: 'Message us on WhatsApp', href: SITE.whatsappHref },
  { icon: MessageSquare, label: 'Text', value: SITE.phone, href: SITE.smsHref },
  { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: MapPin, label: 'Location', value: 'Los Angeles, CA — serving clients nationwide' },
  { icon: Clock, label: 'Hours', value: 'Support available 24/7' },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        image={IMAGES.losAngeles}
        eyebrow="Contact"
        title="We’re here to help"
        intro="Questions about a document, a deadline, or what kind of translation you need? Reach out any time."
      >
        <p className="mt-6 text-sm font-semibold text-leaf-dark">{SITE.replyPromise}</p>
      </PageHero>
      <section className="section bg-white">
        <div className="container-custom grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-2xl">Get in touch</h2>
            <ul className="mt-6 space-y-5">
              {CHANNELS.map((c) => {
                const Icon = c.icon;
                const content = (
                  <>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-dark-light">{c.label}</p>
                      <p className="break-words font-semibold text-dark">{c.value}</p>
                    </div>
                  </>
                );
                return (
                  <li key={c.label}>
                    {c.href ? (
                      <a href={c.href} className="flex items-center gap-4 hover:[&_p:last-child]:text-primary">
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="mt-10 rounded-2xl bg-leaf-soft p-6">
              <p className="font-semibold text-dark">Need a price for a document?</p>
              <p className="mt-1 text-dark-light">
                The fastest way is our{' '}
                <Link href="/quote" className="font-semibold text-primary hover:underline">
                  free quote form
                </Link>{' '}
                — upload your document and we&apos;ll reply with a quote.
              </p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              <h2 className="mb-6 text-2xl">Send us a message</h2>
              <RequestForm kind="contact" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
