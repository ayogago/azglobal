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

export type DocumentSlug =
  | 'birth-certificate'
  | 'marriage-certificate'
  | 'diploma-transcript'
  | 'police-record'
  | 'drivers-license'
  | 'divorce-decree';

export type DocumentPage = {
  slug: DocumentSlug;
  href: string;
  name: string; // short label for links
  title: string; // H1
  metaTitle: string;
  metaDescription: string;
  intro: string;
  usedFor: string[]; // where people submit it
  included: string[]; // what is in the delivered translation
  about: string[];
  faq: FaqItem[];
};

const CERTIFIED_INCLUDES = [
  'Complete word-for-word translation, laid out like the original',
  'Signed certificate of translation accuracy',
  'Names, dates, seals and stamps transcribed exactly',
  'Delivered as a PDF, ready to print or upload',
];

export const DOCUMENT_PAGES: DocumentPage[] = [
  {
    slug: 'birth-certificate',
    href: '/birth-certificate-translation',
    name: 'Birth certificates',
    title: 'Certified Birth Certificate Translation',
    metaTitle: 'Certified Birth Certificate Translation for USCIS | Los Angeles',
    metaDescription:
      'Certified birth certificate translation from Armenian, Russian or Ukrainian into English, accepted by USCIS. Los Angeles based, delivered in 12–48 hours. Free quote.',
    intro:
      'Armenian, Russian and Ukrainian birth certificates translated into English and certified for USCIS, courts, schools and government agencies.',
    usedFor: [
      'Green card and citizenship applications',
      'Passport and Social Security applications',
      'School and university enrollment',
      'Marriage licenses and name changes',
    ],
    included: CERTIFIED_INCLUDES,
    about: [
      'A birth certificate is the document USCIS asks for most often, and it is also the one most often rejected when the translation is incomplete. Every line matters: the registry number, the issuing office, the stamps in the margins, and the handwriting on older Soviet-era certificates.',
      'We translate the whole document, keep the layout close to the original so an officer can compare them side by side, and attach a signed certificate of accuracy. Notarization is available if the office receiving it asks for one.',
    ],
    faq: [
      {
        q: 'Do you translate the stamps and seals on a birth certificate?',
        a: 'Yes. USCIS requires a complete translation, so every stamp, seal, signature block and handwritten note is translated or described.',
      },
      {
        q: 'Do you need the original document?',
        a: 'No. A clear photo or scan of the full page is enough. Make sure all four edges are visible and the text is readable.',
      },
      {
        q: 'How long does a birth certificate translation take?',
        a: 'Most single-page birth certificates are delivered within 12–48 hours. Tell us if you have a filing deadline.',
      },
      {
        q: 'What if my name is spelled differently on other documents?',
        a: 'Tell us the spelling used in your passport or immigration paperwork and we will match it, with a translator’s note where needed.',
      },
    ],
  },
  {
    slug: 'marriage-certificate',
    href: '/marriage-certificate-translation',
    name: 'Marriage certificates',
    title: 'Certified Marriage Certificate Translation',
    metaTitle: 'Certified Marriage Certificate Translation for USCIS | Los Angeles',
    metaDescription:
      'Certified marriage certificate translation from Armenian, Russian or Ukrainian into English for USCIS, courts and immigration filings. 12–48 hour turnaround. Free quote.',
    intro:
      'Marriage certificates translated and certified for spousal petitions, green card applications, name changes and court filings.',
    usedFor: [
      'Spousal petitions and adjustment of status',
      'Name change applications',
      'Court and family law filings',
      'Insurance, benefits and bank paperwork',
    ],
    included: CERTIFIED_INCLUDES,
    about: [
      'Marriage certificates are usually filed alongside birth certificates and passports, and the names have to agree across all of them. We keep spellings consistent across every document in your file so nothing looks like a mismatch to the officer reviewing it.',
      'Send us the whole set at once — it is faster, and we can flag differences in spelling before they become a request for evidence.',
    ],
    faq: [
      {
        q: 'Can you translate our marriage certificate and birth certificates together?',
        a: 'Yes, and we recommend it. Upload them in one request and we will keep names and dates consistent across all of them.',
      },
      {
        q: 'Is a certified translation enough, or do we need notarization?',
        a: 'USCIS accepts a certified translation without notarization. Some courts and foreign consulates ask for a notarized one — tell us where it is going and we will advise.',
      },
      {
        q: 'Our certificate is in Russian but issued in Armenia. Is that a problem?',
        a: 'Not at all. We translate both Armenian and Russian, including Soviet-era documents issued anywhere in the former USSR.',
      },
    ],
  },
  {
    slug: 'diploma-transcript',
    href: '/diploma-transcript-translation',
    name: 'Diplomas & transcripts',
    title: 'Certified Diploma and Transcript Translation',
    metaTitle: 'Certified Diploma & Transcript Translation | Los Angeles',
    metaDescription:
      'Certified translation of Armenian, Russian and Ukrainian diplomas, transcripts and academic records for universities, credential evaluation and licensing boards.',
    intro:
      'Diplomas, degrees, transcripts and academic certificates translated for university admissions, credential evaluation and licensing boards.',
    usedFor: [
      'University and graduate school applications',
      'Credential evaluation agencies',
      'Professional licensing boards',
      'Employers verifying foreign degrees',
    ],
    included: [
      'Complete translation of the diploma and every transcript page',
      'Course names, grades and hours kept in the original structure',
      'Signed certificate of translation accuracy',
      'Delivered as a PDF, ready to upload to an application portal',
    ],
    about: [
      'Transcripts are dense — course titles, credit hours, grading scales and the stamps of the issuing institution. Evaluation agencies compare the translation against the original line by line, so the structure has to survive the translation.',
      'We keep tables as tables, translate course titles precisely rather than loosely, and leave the grading scale intact so the evaluator can convert it.',
    ],
    faq: [
      {
        q: 'Will a credential evaluation agency accept your translation?',
        a: 'Yes. Our certified translations include the signed statement of accuracy that evaluation agencies and universities require. Check whether your agency requires the translation to be sent directly by the school as well.',
      },
      {
        q: 'Do you convert grades to a US GPA?',
        a: 'No. A translation must mirror the original, so grades stay as issued. Converting them is the job of a credential evaluation service.',
      },
      {
        q: 'How much does a multi-page transcript cost?',
        a: 'It depends on the number of pages and how dense they are. Upload the pages and we will send you a quote.',
      },
    ],
  },
  {
    slug: 'police-record',
    href: '/police-record-translation',
    name: 'Police records',
    title: 'Certified Police Record Translation',
    metaTitle: 'Certified Police Clearance Certificate Translation | Los Angeles',
    metaDescription:
      'Certified translation of Armenian, Russian and Ukrainian police clearance certificates and criminal record checks for USCIS, visas and immigration.',
    intro:
      'Police clearance certificates and criminal record checks translated and certified for immigration and visa applications.',
    usedFor: [
      'Immigrant visa and consular processing',
      'Adjustment of status filings',
      'Employment and licensing background checks',
      'Foreign residency applications',
    ],
    included: CERTIFIED_INCLUDES,
    about: [
      'Police certificates are short but formal, and the phrasing matters: the exact wording of the finding, the period it covers, and the authority that issued it. A loose translation invites questions.',
      'These are usually time-sensitive, since consulates treat them as valid only for a limited period. Tell us your interview or filing date and we will work to it.',
    ],
    faq: [
      {
        q: 'How fast can you turn around a police certificate?',
        a: 'Usually within 12–24 hours, since they are short. Mention your deadline in the request and we will confirm.',
      },
      {
        q: 'Do you translate the QR code or reference number page?',
        a: 'Yes. Everything on the document is translated or described, including reference numbers and verification codes.',
      },
    ],
  },
  {
    slug: 'drivers-license',
    href: '/drivers-license-translation',
    name: 'Driver’s licenses',
    title: 'Certified Driver’s License Translation',
    metaTitle: 'Certified Driver’s License Translation | Los Angeles',
    metaDescription:
      'Certified translation of Armenian, Russian and Ukrainian driver’s licenses and IDs for the DMV, insurance companies and car rental. Fast turnaround, free quote.',
    intro:
      'Driver’s licenses and national ID cards translated and certified for the DMV, insurance companies and rental agencies.',
    usedFor: [
      'DMV applications and license exchange',
      'Auto insurance policies',
      'Car rental abroad and in the US',
      'Proof of identity for employers',
    ],
    included: [
      'Both sides of the licence translated in full',
      'Licence categories and endorsements explained',
      'Signed certificate of translation accuracy',
      'Delivered as a PDF, usually same day',
    ],
    about: [
      'Licences are small but every field counts — categories, restrictions, issue and expiry dates, and the issuing authority. Insurance companies in particular look for the date you were first licensed, because it decides your rate.',
      'Send clear photos of the front and the back. Both sides are needed for a complete certified translation.',
    ],
    faq: [
      {
        q: 'Do you need both sides of the licence?',
        a: 'Yes. The back carries the categories and restrictions, and a certified translation has to cover the whole document.',
      },
      {
        q: 'Can I use the translation at the California DMV?',
        a: 'Our certified translations are prepared for official use, including DMV submissions. Always confirm current requirements with the office receiving it.',
      },
    ],
  },
  {
    slug: 'divorce-decree',
    href: '/divorce-decree-translation',
    name: 'Divorce decrees',
    title: 'Certified Divorce Decree Translation',
    metaTitle: 'Certified Divorce Decree Translation for USCIS | Los Angeles',
    metaDescription:
      'Certified translation of Armenian, Russian and Ukrainian divorce decrees and court judgments for USCIS, remarriage and court filings. 12–48 hour turnaround.',
    intro:
      'Divorce decrees, court judgments and dissolution certificates translated and certified for immigration and court use.',
    usedFor: [
      'Proving a previous marriage ended, for USCIS',
      'Marriage licence applications',
      'Family court filings',
      'Name change and records updates',
    ],
    included: CERTIFIED_INCLUDES,
    about: [
      'Court documents use fixed legal phrasing, and immigration officers read them closely to confirm that a prior marriage legally ended and when. The date the judgment took effect is often the detail that matters most.',
      'Our translators handle court language carefully and keep the decree’s structure — case number, parties, findings, and the operative order — intact.',
    ],
    faq: [
      {
        q: 'My decree is several pages of court text. Do you translate all of it?',
        a: 'Yes. A certified translation must be complete, so every page you submit is translated in full.',
      },
      {
        q: 'Do you translate the court seal and judge’s signature?',
        a: 'Yes, seals and signature blocks are translated or described so the document is complete.',
      },
    ],
  },
];
