import type { FaqItem } from '@/components/Sections';

/**
 * City landing pages.
 *
 * AZ Global Translations is based in Los Angeles and works with clients by
 * upload and email, so these pages describe the areas we serve — they never
 * claim a walk-in office in each city.
 */
export type CityPage = {
  slug: string;
  href: string;
  name: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  /** Neighbourhoods and adjacent areas covered by the same page. */
  nearby: string[];
  /** What people in this city most often send us. */
  common: string[];
  about: string[];
  faq: FaqItem[];
};

const HOW_IT_WORKS_FAQ = (city: string): FaqItem[] => [
  {
    q: `Do I have to come to an office in ${city}?`,
    a: 'No. Everything is handled online: you upload a photo or scan of your document, we email the quote, and the finished certified translation arrives as a PDF you can print or upload. Most people never need to meet anyone in person.',
  },
  {
    q: 'Can I get a printed copy mailed to me?',
    a: `Yes. Translations are delivered as PDFs by email, which is what most offices accept. If you want a printed hard copy mailed to a ${city} address, that is $20 extra — ask for it in your request.`,
  },
  {
    q: 'How long does it take?',
    a: 'Most documents are ready within 12–48 hours. If you have a filing date or an interview coming up, say so in the request and we will confirm straight away whether we can meet it.',
  },
];

export const CITY_PAGES: CityPage[] = [
  {
    slug: 'glendale',
    href: '/translation-services-glendale',
    name: 'Glendale',
    title: 'Certified Translation Services in Glendale, CA',
    metaTitle: 'Certified Translation in Glendale, CA | Armenian & Russian',
    metaDescription:
      'Certified Armenian, Russian and Ukrainian translation for Glendale, CA. USCIS-accepted, 12–48 hours. Birth certificates, diplomas, passports.',
    intro:
      'Certified Armenian, Russian and Ukrainian translation for Glendale — accepted by USCIS, courts and universities, with no trip across town.',
    nearby: ['Montrose', 'La Crescenta', 'Verdugo City', 'Atwater Village', 'Eagle Rock'],
    common: [
      'Birth and marriage certificates for USCIS filings',
      'Armenian diplomas and transcripts for credential evaluation',
      'Passports and national ID cards',
      'Police clearance certificates for consular processing',
    ],
    about: [
      'Glendale has one of the largest Armenian communities in the United States, and the paperwork that comes with that is the everyday work of this business: a birth certificate from Yerevan for a green card file, a diploma that a licensing board needs to read, a marriage certificate for a spousal petition.',
      'Because we work only with Armenian, Russian and Ukrainian, your document goes to someone who reads the original script fluently and has seen that form before — the old Soviet-era certificates as well as the current Republic of Armenia ones. That is what keeps names, patronymics and place names consistent with the rest of your file.',
      'We are based in Los Angeles and everything runs by upload and email, so from Glendale there is nothing to drop off. Photograph the document on your phone, send it, and the certified PDF comes back the same way.',
    ],
    faq: [
      ...HOW_IT_WORKS_FAQ('Glendale'),
      {
        q: 'Will Glendale Community College accept your transcript translation?',
        a: 'Schools normally ask for a certified translation, which is what we provide, and many also want a separate credential evaluation from an approved agency. Check what the admissions office asked for — if they want an evaluation, our translation is the document you give the evaluator.',
      },
    ],
  },
  {
    slug: 'burbank',
    href: '/translation-services-burbank',
    name: 'Burbank',
    title: 'Certified Translation Services in Burbank, CA',
    metaTitle: 'Certified Translation in Burbank, CA | Armenian & Russian',
    metaDescription:
      'Certified Armenian, Russian and Ukrainian translation for Burbank, CA. USCIS-accepted, 12–48 hours. Immigration, academic and legal documents.',
    intro:
      'Certified Armenian, Russian and Ukrainian translation for Burbank — immigration, academic, legal and business documents, delivered by email.',
    nearby: ['Toluca Lake', 'Magnolia Park', 'Sun Valley', 'Studio City'],
    common: [
      'Birth certificates and family records for immigration filings',
      'Diplomas and transcripts for employers and universities',
      'Bank statements and financial records for visa applications',
      'Contracts and business documents',
    ],
    about: [
      'Burbank households and businesses send us the full range: the family paperwork behind an immigration case, and the contracts and corporate records that come with working across borders.',
      'Certified means the translation is complete and word-for-word, with a signed statement of accuracy attached. That is the form USCIS requires, and it is also what courts, universities and most employers ask for when a document is not in English.',
      'Nothing has to be dropped off. Upload photos or scans, get a quote by email, and receive the certified PDF — usually within 12–48 hours, with rush available if a deadline is tight.',
    ],
    faq: [
      ...HOW_IT_WORKS_FAQ('Burbank'),
      {
        q: 'Can you handle business and contract translation as well?',
        a: 'Yes. Longer written material — contracts, manuals, employee handbooks, websites — is priced per word at $0.10 rather than per page, which is usually cheaper for documents that run long.',
      },
    ],
  },
  {
    slug: 'pasadena',
    href: '/translation-services-pasadena',
    name: 'Pasadena',
    title: 'Certified Translation Services in Pasadena, CA',
    metaTitle: 'Certified Translation in Pasadena, CA | Armenian & Russian',
    metaDescription:
      'Certified Armenian, Russian and Ukrainian translation for Pasadena, CA. Diplomas, transcripts, immigration and court documents. USCIS-accepted, 12–48 hours.',
    intro:
      'Certified Armenian, Russian and Ukrainian translation for Pasadena — academic records, immigration filings and court documents.',
    nearby: ['Altadena', 'South Pasadena', 'San Marino', 'Sierra Madre', 'Arcadia'],
    common: [
      'Diplomas and academic transcripts for university admissions',
      'Credential evaluation packets for licensing boards',
      'Birth and marriage certificates for USCIS',
      'Court judgments and legal filings',
    ],
    about: [
      'Pasadena sends us more academic paperwork than anywhere else we serve — transcripts, diplomas and course lists headed for admissions offices, licensing boards and credential evaluation agencies.',
      'Academic records are unforgiving about detail. Course titles, hours, grades and the grading scale itself all have to carry over exactly, because an evaluator converts from what your translation says. We reproduce the original scale rather than converting it to a US GPA, which is the evaluator’s job and not the translator’s.',
      'Everything is handled online, so there is no trip to make. Send photos or scans of every page, including the reverse side where the grading scale is usually printed, and we will quote the whole set at once.',
    ],
    faq: [
      ...HOW_IT_WORKS_FAQ('Pasadena'),
      {
        q: 'Is a certified translation the same as a credential evaluation?',
        a: 'No — they are two different things, and many universities want both. The translation renders your diploma and transcript in English; the evaluation is an agency’s opinion of the US equivalent. Our translation is what you hand to the evaluator.',
      },
    ],
  },
  {
    slug: 'north-hollywood',
    href: '/translation-services-north-hollywood',
    name: 'North Hollywood',
    title: 'Certified Translation Services in North Hollywood, CA',
    metaTitle: 'North Hollywood Certified Translation | Armenian & Russian',
    metaDescription:
      'Certified Armenian, Russian and Ukrainian translation for North Hollywood and the East Valley. USCIS-accepted, 12–48 hour turnaround, upload from your phone.',
    intro:
      'Certified Armenian, Russian and Ukrainian translation for North Hollywood and the East Valley, accepted by USCIS and the courts.',
    nearby: ['Valley Village', 'Valley Glen', 'Sun Valley', 'Toluca Lake', 'Studio City'],
    common: [
      'Birth, marriage and divorce certificates',
      'Passports and national ID cards',
      'Work books and employment records',
      'Medical records and vaccination cards',
    ],
    about: [
      'North Hollywood and the surrounding East Valley have long-established Armenian and Russian-speaking communities, and the documents that come with that are the ones we handle every day — civil records, work books, medical files and the occasional military book.',
      'Post-Soviet paperwork has its own habits: handwritten entries, overlapping stamps, forms that changed between the Soviet era and the current republics. Having seen the same forms repeatedly is what makes the translation quick and the details right.',
      'We are Los Angeles based and work entirely by upload and email — a clear phone photo is usually all we need to quote and to translate.',
    ],
    faq: [
      ...HOW_IT_WORKS_FAQ('North Hollywood'),
      {
        q: 'My document is old and hard to read — can you still translate it?',
        a: 'Usually yes. Faded Soviet-era certificates and handwritten entries are routine for us. Where a word genuinely cannot be read, we mark it illegible rather than guessing — that is the correct way to handle it and it is what officers expect.',
      },
    ],
  },
  {
    slug: 'van-nuys',
    href: '/translation-services-van-nuys',
    name: 'Van Nuys',
    title: 'Certified Translation Services in Van Nuys, CA',
    metaTitle: 'Certified Translation in Van Nuys, CA | Armenian & Russian',
    metaDescription:
      'Certified Armenian, Russian and Ukrainian translation for Van Nuys and the San Fernando Valley. Court, DMV and USCIS documents. 12–48 hour turnaround.',
    intro:
      'Certified Armenian, Russian and Ukrainian translation for Van Nuys and the San Fernando Valley — court, government and immigration documents.',
    nearby: ['Sherman Oaks', 'Panorama City', 'Lake Balboa', 'Reseda', 'North Hills'],
    common: [
      'Court documents and judgments',
      'Driver’s licences and national ID cards',
      'Birth and marriage certificates for USCIS',
      'Police clearance certificates',
    ],
    about: [
      'Van Nuys is where a lot of the Valley’s official business happens, and documents headed for a courthouse or a government counter are the ones that get read most carefully. A certified translation has to be complete and exact, with the signed certification attached, or it comes back.',
      'For court filings the operative wording matters more than anything: who the parties were, what was ordered, on what date, and whether the decision is final. We translate that precisely and keep the original term alongside where the legal systems do not line up.',
      'There is nothing to drop off — upload your document, get the quote by email, and receive the certified PDF ready to print or file.',
    ],
    faq: [
      ...HOW_IT_WORKS_FAQ('Van Nuys'),
      {
        q: 'Will the court accept a translation that was emailed to me?',
        a: 'Yes. Courts require a complete translation with a signed certification of accuracy; a printed PDF carrying that certification is what they accept. If your court has specific local formatting rules, send them and we will follow them.',
      },
    ],
  },
];

export const cityBySlug = (slug: string) => CITY_PAGES.find((c) => c.slug === slug);
