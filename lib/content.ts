import type { FaqItem } from '@/components/Sections';
import type { LanguageSlug } from '@/lib/site';

export type ServiceKey = 'immigration' | 'legal' | 'academic' | 'medical' | 'business' | 'personal';

export const SERVICES: {
  key: ServiceKey;
  title: string;
  summary: string;
  documents: string[];
}[] = [
  {
    key: 'immigration',
    title: 'Immigration & USCIS',
    summary:
      'Certified translations for green card, citizenship, visa and asylum filings, with the signed certification of accuracy USCIS requires.',
    documents: ['Birth certificates', 'Marriage & divorce certificates', 'Police certificates', 'Passports & IDs'],
  },
  {
    key: 'legal',
    title: 'Legal & Court',
    summary:
      'Court-ready translations of legal documents for attorneys, courts and individuals, handled with strict confidentiality.',
    documents: ['Court orders & judgments', 'Contracts & agreements', 'Powers of attorney', 'Affidavits'],
  },
  {
    key: 'academic',
    title: 'Academic',
    summary:
      'Certified translations of diplomas and transcripts for university admissions, licensing boards and credential evaluations.',
    documents: ['Diplomas & degrees', 'Academic transcripts', 'Certificates', 'Recommendation letters'],
  },
  {
    key: 'medical',
    title: 'Medical',
    summary: 'Accurate translations of medical records for doctors, insurers and immigration medical exams.',
    documents: ['Medical records', 'Vaccination records', 'Prescriptions', 'Discharge summaries'],
  },
  {
    key: 'business',
    title: 'Business & Financial',
    summary: 'Professional translations of corporate, financial and technical documents for companies working across borders.',
    documents: ['Bank statements', 'Tax & financial records', 'Corporate documents', 'Manuals & specifications'],
  },
  {
    key: 'personal',
    title: 'Personal Documents',
    summary: 'Everyday documents translated quickly and correctly, with notarization available when you need it.',
    documents: ['Driver’s licenses', 'Military records', 'Employment records', 'Personal letters'],
  },
];

export const GENERAL_FAQ: FaqItem[] = [
  {
    q: 'What is a certified translation?',
    a: 'A certified translation is a complete, word-for-word translation of your document together with a signed statement certifying that the translation is accurate and complete. It is what USCIS, courts and most universities require.',
  },
  {
    q: 'Will USCIS accept your translations?',
    a: 'Yes. Our certified translations are accepted by USCIS, and are also used for courts, universities and government agencies.',
  },
  {
    q: 'How long does a translation take?',
    a: 'Most documents are delivered within 12–48 hours. If you have a specific deadline, mention it in your quote request and we will let you know right away what we can do.',
  },
  {
    q: 'How much does a translation cost?',
    a: 'Every document is different, so we quote each request individually. Upload a photo or scan of your document and we will reply with a free quote. There is no obligation.',
  },
  {
    q: 'How do I send you my documents?',
    a: 'Use our quote form to upload photos or scans — a clear photo from your phone is usually enough. You can also email your documents to info@azglobaltranslations.com.',
  },
  {
    q: 'Can you notarize the translation?',
    a: 'Yes, notarization is available on request. Select “Certified + notarized” in the quote form, or tell us where the translation will be submitted and we will advise you.',
  },
];

export type LanguagePage = {
  slug: LanguageSlug;
  name: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  about: string[];
  documents: string[];
  defaultPair: string;
  faq: FaqItem[];
};

export const LANGUAGE_PAGES: Record<LanguageSlug, LanguagePage> = {
  armenian: {
    slug: 'armenian',
    name: 'Armenian',
    title: 'Certified Armenian Translation Services',
    metaTitle: 'Certified Armenian to English Translation in Los Angeles',
    metaDescription:
      'USCIS-accepted certified Armenian to English and English to Armenian translations. Birth certificates, diplomas, court documents and more, delivered in 12–48 hours. Free quote.',
    intro:
      'Certified Armenian ⇄ English translations of birth certificates, marriage certificates, diplomas, court papers and more — accepted by USCIS, courts and universities.',
    about: [
      'Los Angeles is home to one of the largest Armenian communities in the world. Whether you are filing with USCIS, applying to a university, or submitting records to a court in Glendale, Burbank or downtown Los Angeles, you need a translation that is precise and properly certified.',
      'Our professional translators work with Armenian-language records regularly, including civil registry documents issued in Armenia. Every certified translation includes a signed certification of accuracy, and notarization is available on request.',
    ],
    documents: [
      'Birth & death certificates',
      'Marriage & divorce certificates',
      'Passports & national IDs',
      'Diplomas & transcripts',
      'Police & court records',
      'Military records',
      'Medical records',
      'Business & financial documents',
    ],
    defaultPair: 'Armenian → English',
    faq: [
      {
        q: 'Do you translate from English into Armenian as well?',
        a: 'Yes. We translate in both directions — Armenian to English and English to Armenian.',
      },
      {
        q: 'Will USCIS accept your Armenian translations?',
        a: 'Yes. Our certified Armenian to English translations include the signed certification of accuracy that USCIS requires.',
      },
      {
        q: 'How long does an Armenian translation take?',
        a: 'Most Armenian documents are delivered within 12–48 hours. Let us know about any deadline in your quote request.',
      },
      {
        q: 'How much does it cost to translate an Armenian document?',
        a: 'Upload a photo or scan of your document and we will reply with a free, no-obligation quote.',
      },
    ],
  },
  russian: {
    slug: 'russian',
    name: 'Russian',
    title: 'Certified Russian Translation Services',
    metaTitle: 'Certified Russian to English Translation in Los Angeles',
    metaDescription:
      'USCIS-accepted certified Russian to English and English to Russian translations. Birth certificates, diplomas, legal and medical documents, delivered in 12–48 hours. Free quote.',
    intro:
      'Certified Russian ⇄ English translations for immigration, legal, academic and business needs — accepted by USCIS, courts and universities.',
    about: [
      'Russian is used in official documents across many countries, from Russia and Belarus to Kazakhstan, Uzbekistan, Kyrgyzstan and other former Soviet republics. We translate Russian-language records from all of them, including older Soviet-era certificates.',
      'Each certified translation mirrors the layout of the original, renders names and stamps accurately, and includes a signed certification of accuracy. Notarization is available on request.',
    ],
    documents: [
      'Birth & marriage certificates',
      'Soviet-era civil records',
      'Passports & internal passports',
      'Diplomas & transcripts',
      'Court & police records',
      'Work books & employment records',
      'Medical records',
      'Contracts & financial documents',
    ],
    defaultPair: 'Russian → English',
    faq: [
      {
        q: 'Do you translate documents from countries other than Russia?',
        a: 'Yes. We translate Russian-language documents issued anywhere, including Belarus, Kazakhstan, Uzbekistan, Kyrgyzstan, Moldova and other former Soviet countries.',
      },
      {
        q: 'Will USCIS accept your Russian translations?',
        a: 'Yes. Our certified Russian to English translations include the signed certification of accuracy that USCIS requires.',
      },
      {
        q: 'How long does a Russian translation take?',
        a: 'Most Russian documents are delivered within 12–48 hours. Let us know about any deadline in your quote request.',
      },
      {
        q: 'How much does it cost to translate a Russian document?',
        a: 'Upload a photo or scan of your document and we will reply with a free, no-obligation quote.',
      },
    ],
  },
  ukrainian: {
    slug: 'ukrainian',
    name: 'Ukrainian',
    title: 'Certified Ukrainian Translation Services',
    metaTitle: 'Certified Ukrainian to English Translation in Los Angeles',
    metaDescription:
      'USCIS-accepted certified Ukrainian to English and English to Ukrainian translations for immigration, school and legal documents, delivered in 12–48 hours. Free quote.',
    intro:
      'Certified Ukrainian ⇄ English translations for immigration, education, employment and legal matters — accepted by USCIS, courts and universities.',
    about: [
      'Many Ukrainian families arriving in the United States need their documents translated quickly and correctly — for immigration applications, school enrollment, employment and benefits. We handle Ukrainian civil records, education documents and legal papers with care and fast turnaround.',
      'Documents issued in Ukraine can be in Ukrainian, Russian or both. We translate both languages, so your whole file can be handled in one place. Every certified translation includes a signed certification of accuracy, and notarization is available on request.',
    ],
    documents: [
      'Birth & marriage certificates',
      'International & internal passports',
      'Diplomas & school records',
      'Vaccination & medical records',
      'Court & police records',
      'Driver’s licenses',
      'Employment records',
      'Financial documents',
    ],
    defaultPair: 'Ukrainian → English',
    faq: [
      {
        q: 'Some of my Ukrainian documents are in Russian. Can you translate them too?',
        a: 'Yes. We translate both Ukrainian and Russian, so you can send all of your documents in a single request.',
      },
      {
        q: 'Will USCIS accept your Ukrainian translations?',
        a: 'Yes. Our certified Ukrainian to English translations include the signed certification of accuracy that USCIS requires.',
      },
      {
        q: 'How long does a Ukrainian translation take?',
        a: 'Most Ukrainian documents are delivered within 12–48 hours. Let us know about any deadline in your quote request.',
      },
      {
        q: 'How much does it cost to translate a Ukrainian document?',
        a: 'Upload a photo or scan of your document and we will reply with a free, no-obligation quote.',
      },
    ],
  },
};
