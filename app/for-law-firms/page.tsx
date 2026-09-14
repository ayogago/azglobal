import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Download,
  FileCheck2,
  Inbox,
  Mail,
  Receipt,
  Scale,
} from 'lucide-react';
import { CtaBand, Faq, PageHero, type FaqItem } from '@/components/Sections';
import JsonLd from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { SITE, PRICING, PRICING_EXTRAS } from '@/lib/site';
import { DOCUMENT_PAGES } from '@/lib/content';
import { IMAGES } from '@/lib/images';

// Deliberately English-only: the buyer is a paralegal or office manager working
// in English, so there is no hy/ru alternate for this page.
export const metadata: Metadata = pageMetadata({
  title: 'Certified Translations for Immigration Law Firms | AZ Global',
  description:
    'Translation partner for LA immigration attorneys. Armenian, Russian, Ukrainian. One intake email, flat rates, USCIS-ready certification, monthly billing.',
  path: '/for-law-firms',
  absoluteTitle: true,
});

const INTAKE_MAILTO = `mailto:${SITE.email}?subject=${encodeURIComponent('Law firm translation — first document')}&body=${encodeURIComponent(
  'Firm name:\nContact name and role:\nLanguage of the document:\nDeadline (if any):\n\nDocument attached.',
)}`;

const RATE_SHEET = '/az-global-law-firm-rate-sheet.pdf';

// Prices come from the single source of truth so this page can never drift from /pricing.
const rate = (key: 'certified' | 'complex' | 'word') => {
  const tier = PRICING.find((p) => p.key === key);
  if (!tier) throw new Error(`Missing pricing tier: ${key}`);
  return tier;
};
const CERTIFIED = rate('certified');
const COMPLEX = rate('complex');
const WORD = rate('word');

const WHY = [
  {
    icon: Inbox,
    title: 'One intake email',
    text: `Send documents to ${SITE.email} and you are done. No portal, no account, no per-document checkout.`,
  },
  {
    icon: Receipt,
    title: 'Flat per-page rate',
    text: 'Quote the client before you send the document. Standard certificates are one price, every time.',
  },
  {
    icon: CalendarClock,
    title: 'Turnaround you can calendar',
    text: 'Most documents in 12–48 hours, with a rush option when a filing deadline moves.',
  },
  {
    icon: FileCheck2,
    title: 'Monthly invoicing',
    text: 'Firm accounts are billed on one monthly statement, itemised by client matter, rather than card payments per document.',
  },
];

const INCLUDED = [
  'A signed certification statement on every translation, meeting 8 CFR 103.2(b)(3).',
  'A complete, literal rendering — stamps, seals, marginal notes and handwriting included, never summarised.',
  'Formatting that mirrors the original, so an adjudicator can match the two side by side.',
  'PDF delivery, with a mailed hard copy on request.',
  'Free revisions if a name spelling or detail needs to match another document in the file.',
  'A translator you can reach if USCIS or the court raises a question about the translation.',
];

const IMMIGRATION_DOCS = [
  'birth-certificate',
  'marriage-certificate',
  'divorce-decree',
  'passport',
  'police-record',
  'military-record',
  'court-document',
  'medical-record',
  'diploma-transcript',
  'power-of-attorney',
];

const STEPS = [
  {
    title: 'Email the document',
    text: 'A scan or a clear phone photo is fine. Tell us the deadline and the client matter it belongs to.',
  },
  {
    title: 'Get the page count and price',
    text: `${SITE.replyPromise}. You will know the cost before we start, and the client can be quoted from your desk.`,
  },
  {
    title: 'Receive the certified PDF',
    text: 'Ready to attach to the filing. Hard copies are mailed on request, and everything is itemised on your monthly statement.',
  },
];

const FAQ: FaqItem[] = [
  {
    q: 'Is the certification accepted by USCIS and the immigration court?',
    a: 'Yes. Every translation carries a signed statement that it is complete and accurate and that the translator is competent in both languages, which is exactly what 8 CFR 103.2(b)(3) requires. The same certification is used for EOIR filings.',
  },
  {
    q: 'Do you notarize translations?',
    a: 'No, and USCIS does not require it — a certified translation is sufficient. If a specific court or consulate asks for notarization, we will tell you before you file rather than after.',
  },
  {
    q: 'How do you handle a large asylum packet?',
    a: 'Send the whole file at once and we will give you a page count, a price and a delivery date before starting. The packet is reviewed as one set, so names, places and terminology stay consistent from the first page to the last.',
  },
  {
    q: 'Can you keep spellings consistent across a client’s documents?',
    a: 'Yes. Tell us how the client’s name appears on their passport or prior USCIS documents and we will match it across every translation for that matter. Inconsistent transliteration is one of the commonest reasons a translation gets questioned.',
  },
  {
    q: 'What about handwritten or poor-quality documents?',
    a: 'Soviet-era records, handwritten registry extracts and faded stamps are routine for us. Anything genuinely illegible is marked as such in the translation rather than guessed.',
  },
  {
    q: 'How does firm pricing work?',
    a: `Standard certificates are ${CERTIFIED.price} ${CERTIFIED.unit}. Complex formatted documents are ${COMPLEX.price} ${COMPLEX.unit}, and text-heavy documents are ${WORD.price} ${WORD.unit}. Firms sending regular work get volume pricing — ask and we will set a rate for your account.`,
  },
  {
    q: 'How do we start?',
    a: 'Send us your next document free. If it goes through without a hitch, we set up your firm account with monthly invoicing. No contract, no minimum.',
  },
];

export default function ForLawFirmsPage() {
  const url = `${SITE.url}/for-law-firms`;
  const docs = IMMIGRATION_DOCS.map((slug) => DOCUMENT_PAGES.find((d) => d.slug === slug)).filter(
    (d): d is (typeof DOCUMENT_PAGES)[number] => Boolean(d),
  );

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: 'Certified translation for immigration law firms',
        serviceType: 'Certified document translation',
        description: String(metadata.description ?? ''),
        url,
        inLanguage: 'en',
        provider: { '@id': `${SITE.url}/#business` },
        audience: { '@type': 'BusinessAudience', name: 'Immigration law firms' },
        areaServed: [
          { '@type': 'City', name: 'Los Angeles' },
          { '@type': 'State', name: 'California' },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
          { '@type': 'ListItem', position: 2, name: 'For law firms', item: url },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={schema} />

      <PageHero
        image={IMAGES.courthouse}
        eyebrow="For immigration law firms"
        title="Certified translations your filings can rely on"
        intro="Armenian, Russian and Ukrainian, translated and certified for USCIS and the immigration court. Built for the way a firm works: one intake email, flat rates, turnaround you can calendar, and one statement a month."
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={INTAKE_MAILTO} className="btn-primary px-7 py-4 text-lg">
            <Mail className="h-5 w-5" />
            Send your first document free
          </a>
          <a href={RATE_SHEET} className="btn-outline px-7 py-4 text-lg" download>
            <Download className="h-5 w-5" />
            Rate sheet (PDF)
          </a>
        </div>
      </PageHero>

      <section className="section bg-white">
        <div className="container-custom">
          <div className="max-w-2xl">
            <span className="eyebrow">Why firms use us</span>
            <h2 className="mt-3 text-3xl md:text-4xl">Less back-and-forth on every file</h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-dark-light">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container-custom grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="eyebrow">What every delivery includes</span>
            <h2 className="mt-3 text-3xl md:text-4xl">Made to survive an adjudicator</h2>
            <p className="mt-4 text-lg leading-relaxed text-dark-light">
              A translation that gets an RFE costs you weeks and costs the client a filing fee. Everything below is
              standard on every document, not an upgrade.
            </p>
          </div>
          <ul className="space-y-4 lg:col-span-7">
            {INCLUDED.map((item) => (
              <li key={item} className="flex gap-3 rounded-xl bg-white p-4 shadow-card">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-leaf-dark" />
                <span className="text-dark-light">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="eyebrow">Firm rates</span>
            <h2 className="mt-3 text-3xl md:text-4xl">Quote the client from your desk</h2>
            <p className="mt-4 text-lg leading-relaxed text-dark-light">
              The same published rates as the rest of the site, so nothing changes between what you tell the client and
              what appears on the statement. Firms sending regular work get a volume rate for their account.
            </p>
            <a href={RATE_SHEET} className="btn-outline mt-6" download>
              <Download className="h-5 w-5" />
              Download the rate sheet
            </a>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 lg:col-span-7">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-slate-200">
                <Row label="Standard certificates and records" note="Birth, marriage, divorce, police, diploma" price={`${CERTIFIED.price} / page`} />
                <Row label="Complex formatted documents" note="Passports full of stamps, military books, court files" price={`${COMPLEX.price} / page`} />
                <Row label="Text-heavy documents" note="Declarations, statements, contracts, letters" price={`${WORD.price} / word`} />
                {PRICING_EXTRAS.map((extra) => (
                  <Row key={extra.name} label={extra.name} note={extra.note} price={extra.price} />
                ))}
                <Row label="Volume pricing" note="For firms sending regular work" price="Ask" highlight />
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container-custom">
          <div className="max-w-2xl">
            <span className="eyebrow">Documents</span>
            <h2 className="mt-3 text-3xl md:text-4xl">What we translate for immigration cases</h2>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {docs.map((doc) => (
              <li key={doc.slug}>
                <Link
                  href={doc.href}
                  className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-dark transition hover:border-primary hover:text-primary"
                >
                  {doc.name}
                  <ArrowRight className="h-4 w-4 shrink-0 text-primary" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <div className="max-w-2xl">
            <span className="eyebrow">How it works</span>
            <h2 className="mt-3 text-3xl md:text-4xl">Three steps, no portal</h2>
          </div>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.title} className="rounded-2xl border border-slate-200 p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-dark font-heading text-lg font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-dark-light">{step.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 flex items-start gap-3 rounded-xl bg-primary-soft p-4 text-sm text-dark">
            <Scale className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <span>
              Client documents are handled only by our translators, delivered over email to your firm, and never
              published or shared. Uploads sent through the website are deleted automatically after 90 days.
            </span>
          </p>
        </div>
      </section>

      <Faq
        items={FAQ}
        title="Questions firms ask"
        help={
          <>
            Something specific to your practice? Call{' '}
            <a href={SITE.phoneHref} className="font-semibold text-primary hover:underline">
              {SITE.phone}
            </a>{' '}
            or email{' '}
            <a href={`mailto:${SITE.email}`} className="font-semibold text-primary hover:underline">
              {SITE.email}
            </a>
            .
          </>
        }
      />

      <CtaBand
        title="Send us your next document free"
        text="One document, no charge, no contract. If it goes through cleanly, we set up your firm account with monthly invoicing."
        primary={{ href: INTAKE_MAILTO, label: 'Email your first document' }}
      />
    </>
  );
}

function Row({ label, note, price, highlight = false }: { label: string; note?: string; price: string; highlight?: boolean }) {
  return (
    <tr className={highlight ? 'bg-leaf-soft' : 'bg-white'}>
      <td className="px-5 py-4">
        <p className="font-semibold text-dark">{label}</p>
        {note && <p className="mt-0.5 text-xs text-dark-light">{note}</p>}
      </td>
      <td className="whitespace-nowrap px-5 py-4 text-right font-heading text-base font-bold text-primary">{price}</td>
    </tr>
  );
}
