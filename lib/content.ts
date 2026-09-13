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
    summary: 'Everyday documents translated quickly and correctly, at flat per-page pricing.',
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
    a: 'Certified documents such as birth and marriage certificates are $25 per page. Complex formatted documents like passport books with stamps or military books are $60 per page. Text-heavy material such as contracts, manuals and websites is $0.10 per word. Rush service is $30 and a mailed hard copy is $20.',
  },
  {
    q: 'How do I send you my documents?',
    a: 'Use our quote form to upload photos or scans — a clear photo from your phone is usually enough. You can also email your documents to info@azglobaltranslations.com.',
  },
  {
    q: 'Can I get a printed copy in the mail?',
    a: 'Yes. Translations are delivered as PDFs by email; a printed hard copy sent by mail is $20 extra. Ask for it in your request.',
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
      'Our professional translators work with Armenian-language records regularly, including civil registry documents issued in Armenia. Every certified translation includes a signed certification of accuracy.',
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
      'Each certified translation mirrors the layout of the original, renders names and stamps accurately, and includes a signed certification of accuracy.',
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
      'Documents issued in Ukraine can be in Ukrainian, Russian or both. We translate both languages, so your whole file can be handled in one place. Every certified translation includes a signed certification of accuracy.',
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
  | 'divorce-decree'
  | 'passport'
  | 'medical-record'
  | 'bank-statement'
  | 'military-record'
  | 'work-book'
  | 'power-of-attorney'
  | 'court-document';

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
  /** Overrides the default "$25 per page" line when the document is usually priced differently. */
  priceNote?: string;
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
      'We translate the whole document, keep the layout close to the original so an officer can compare them side by side, and attach a signed certificate of accuracy.',
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
        q: 'How much does a marriage certificate translation cost?',
        a: 'A standard single-page marriage certificate is $25 per page. Certificates with heavy stamps or unusual formatting are quoted at the complex rate of $60 per page — your quote confirms the price before we start.',
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
  {
    slug: 'passport',
    href: '/passport-translation',
    name: 'Passports',
    title: 'Certified Passport Translation',
    metaTitle: 'Certified Passport Translation | Armenian, Russian & Ukrainian',
    metaDescription:
      'Certified translation of Armenian, Russian and Ukrainian passports for USCIS, banks, universities and consulates. Every stamp and visa page transcribed. Los Angeles based.',
    intro:
      'Passports translated and certified page by page — the biographic page, every visa, and every entry and exit stamp.',
    usedFor: [
      'USCIS filings that ask for proof of identity or travel history',
      'Bank and mortgage applications',
      'University admissions and credential files',
      'Consulates, licensing boards and employers',
    ],
    included: CERTIFIED_INCLUDES,
    about: [
      'Most people only need the biographic page — the one with the photo, name, date of birth and passport number. That is a single page at the standard rate, and it is what banks, universities and most employers ask for.',
      'Immigration filings are different. When an officer wants travel history, every stamped page has to be translated or described, including stamps that are partly illegible. A passport book full of stamps is slow, detailed work, so those pages are priced at our complex rate.',
      'Send us photos of every page you think you need and we will tell you in the quote exactly which pages we would translate and what it costs, before any work starts.',
    ],
    faq: [
      {
        q: 'Do I need my whole passport translated?',
        a: 'Usually not. For a bank, a university or an employer the biographic page is enough. Only translate the stamped pages when the office you are filing with has asked for travel history — check the instruction letter, and if you are unsure, send us a photo of it and we will tell you.',
      },
      {
        q: 'How much does a passport translation cost?',
        a: 'The biographic page is $25. Pages dense with visas and entry stamps are $60 per page, because every stamp has to be read and reproduced. Your quote lists the exact pages and the exact total.',
      },
      {
        q: 'Some of my stamps are smudged — is that a problem?',
        a: 'No. Where a stamp cannot be read with confidence we mark it as illegible rather than guessing. That is the correct way to handle it, and it is what officers expect to see.',
      },
      {
        q: 'Can you work from phone photos?',
        a: 'Yes, as long as the whole page is in frame and the text is sharp. Lay the passport flat, avoid glare on the laminate, and take one photo per page.',
      },
    ],
    priceNote: 'Biographic page $25 · pages full of stamps and visas $60',
  },
  {
    slug: 'medical-record',
    href: '/medical-records-translation',
    name: 'Medical records',
    title: 'Certified Medical Record Translation',
    metaTitle: 'Certified Medical Record Translation | Armenian, Russian & Ukrainian',
    metaDescription:
      'Certified translation of Armenian, Russian and Ukrainian medical records, vaccination cards, test results and discharge summaries for doctors, insurers and USCIS.',
    intro:
      'Medical records, vaccination cards, test results and discharge summaries translated accurately for the people who will act on them.',
    usedFor: [
      'US doctors continuing treatment started abroad',
      'Immigration medical exams and USCIS filings',
      'Vaccination requirements for schools and universities',
      'Insurance claims and disability applications',
    ],
    included: CERTIFIED_INCLUDES,
    about: [
      'Medical translation is where a careless word does real damage. Drug names, dosages, units and dates all have to carry over exactly, and a diagnosis has to land in the terminology a US clinician actually uses rather than a literal rendering of the original.',
      'Post-Soviet records bring their own quirks: handwritten notes, abbreviations that have no English equivalent, and reference ranges reported in different units. We transcribe the original values and note the units rather than silently converting them, so your doctor can see what was actually measured.',
      'Vaccination cards are the most common request. They are usually a single card with a grid of dates and vaccine names, translated and certified so a school, university or USCIS can match it against the US schedule.',
    ],
    faq: [
      {
        q: 'Will my doctor accept the translation?',
        a: 'Yes. The translation reproduces the record in full with a signed certificate of accuracy, which is what clinics and insurers ask for. It is a translation of your record, not a medical opinion.',
      },
      {
        q: 'Can you read handwritten notes?',
        a: 'Usually. Handwriting from a doctor is often the hardest part of the document — where a word genuinely cannot be read, we mark it illegible rather than guess, and we tell you which part it was.',
      },
      {
        q: 'Do you convert lab units to US units?',
        a: 'We translate what the record says and keep the original values and units, which is what a certified translation must do. Your doctor converts from there; adding our own conversions would change the record.',
      },
      {
        q: 'Is my medical information kept private?',
        a: 'Yes. Documents are stored privately, seen only by the team working on your translation, and deleted on our retention schedule. We never share them.',
      },
    ],
  },
  {
    slug: 'bank-statement',
    href: '/bank-statement-translation',
    name: 'Bank statements',
    title: 'Certified Bank Statement Translation',
    metaTitle: 'Certified Bank Statement & Financial Document Translation | Los Angeles',
    metaDescription:
      'Certified translation of Armenian, Russian and Ukrainian bank statements, account certificates and financial records for visas, mortgages and USCIS filings.',
    intro:
      'Bank statements, account certificates and financial records translated and certified for visa, immigration and lending applications.',
    usedFor: [
      'Proof of funds for student and visitor visas',
      'Affidavit of support and USCIS filings',
      'Mortgage and loan applications',
      'Consular processing and residency applications',
    ],
    included: CERTIFIED_INCLUDES,
    about: [
      'Financial documents are read closely by the people who receive them, so the numbers have to be reproduced exactly — amounts, currencies, dates, account and reference numbers, and the running balance as the statement shows it.',
      'We keep the original currency and the original figures. Converting to dollars would be inventing information the bank did not state; if the office you are filing with wants a conversion, that is a separate note you add, not something a certified translation supplies.',
      'Statements are usually several pages of repeating rows, which reads as a lot of paper but translates quickly. Send the full statement rather than a screenshot of one page — a partial record tends to get questioned.',
    ],
    faq: [
      {
        q: 'How are multi-page statements priced?',
        a: 'By page of the original, at the standard rate. Statements that are simple repeating tables stay at $25 per page; dense multi-column financial forms can fall into the complex rate, and your quote says which before work starts.',
      },
      {
        q: 'Do you translate the bank stamp and signature?',
        a: 'Yes. Stamps, signatures and the issuing officer are transcribed or described, because that is what shows the statement is genuine.',
      },
      {
        q: 'Will you convert the balance into US dollars?',
        a: 'No. A certified translation reproduces what the document says. We keep the original currency and amounts so the figures match the bank’s own record.',
      },
    ],
  },
  {
    slug: 'military-record',
    href: '/military-record-translation',
    name: 'Military records',
    title: 'Certified Military Record Translation',
    metaTitle: 'Certified Military Book & Service Record Translation | Los Angeles',
    metaDescription:
      'Certified translation of Armenian, Russian and Ukrainian military books (военный билет) and service records for USCIS, citizenship and visa applications.',
    intro:
      'Military books and service records translated and certified for immigration filings that ask about military service.',
    usedFor: [
      'Naturalization applications that ask about military service',
      'Immigrant visa and consular processing',
      'Asylum and humanitarian filings',
      'Background and security checks',
    ],
    included: CERTIFIED_INCLUDES,
    about: [
      'A military book is a booklet, not a sheet of paper: dozens of small pages, printed tables, handwritten entries, unit stamps and abbreviations that mean nothing outside the original system. Reproducing it faithfully is detailed work, which is why it is priced at our complex rate.',
      'Ranks, unit designations and specialties do not map neatly onto US equivalents. We translate them literally and keep the original designation alongside, rather than substituting an American rank that would misrepresent the record.',
      'These documents come up in naturalization and security checks, where an inconsistency between your form and your record causes delay. Tell us how the details appear on your other filings so names and dates are spelled consistently across the file.',
    ],
    faq: [
      {
        q: 'Do I have to translate the whole book?',
        a: 'Not always. Some offices ask only for the pages covering your service period. Send photos of everything and tell us what was requested — the quote will list exactly which pages we would translate.',
      },
      {
        q: 'Why is a military book priced higher?',
        a: 'It is a booklet of small, densely printed and hand-completed pages with stamps throughout. Reproducing that faithfully takes far longer than a single-page certificate, so those pages are $60 each.',
      },
      {
        q: 'How are ranks and units handled?',
        a: 'Translated literally, with the original designation kept alongside. Claiming a US rank equivalent would change what your record says.',
      },
    ],
    priceNote: 'Usually $60 per page — military books are dense, hand-completed booklets',
  },
  {
    slug: 'work-book',
    href: '/work-book-translation',
    name: 'Work books',
    title: 'Certified Work Book & Employment Record Translation',
    metaTitle: 'Certified Work Book (Трудовая книжка) Translation | Los Angeles',
    metaDescription:
      'Certified translation of Armenian, Russian and Ukrainian work books (трудовая книжка) and employment records for visas, pensions, licensing and immigration.',
    intro:
      'Work books and employment records translated and certified — every entry, employer and stamp, in order.',
    usedFor: [
      'Employment-based visa and green card filings',
      'Professional licensing that requires proof of experience',
      'Pension and social security claims',
      'Employers verifying experience earned abroad',
    ],
    included: CERTIFIED_INCLUDES,
    about: [
      'The work book — трудовая книжка, աշխատանքային գրքույկ — is the official record of a person’s whole working life in the post-Soviet system, and nothing in the US corresponds to it. Each entry has a date, a job title, an order number and an employer stamp, and the value of the document is that the entries run in an unbroken sequence.',
      'We keep that sequence intact and reproduce each entry in full, including the order numbers and the stamps, so a licensing board or immigration officer can follow your employment history year by year.',
      'Job titles are the part people ask about most. We translate the title as written rather than mapping it to the nearest American job title, because the office reading it is verifying what your employer actually recorded.',
    ],
    faq: [
      {
        q: 'How is a work book priced?',
        a: 'By page of the original. Pages that are clean printed tables are $25; pages crowded with handwritten entries and overlapping stamps are $60. Your quote lists the pages and the total before any work starts.',
      },
      {
        q: 'Do you translate the blank pages?',
        a: 'No. Blank pages are not translated or charged. We translate every page that carries an entry, a stamp or a correction.',
      },
      {
        q: 'What if an entry was crossed out and corrected?',
        a: 'Corrections are part of the record, so we reproduce them — the original entry, the correction and the note authorising it. Leaving out a correction would misstate your history.',
      },
    ],
  },
  {
    slug: 'power-of-attorney',
    href: '/power-of-attorney-translation',
    name: 'Powers of attorney',
    title: 'Certified Power of Attorney Translation',
    metaTitle: 'Certified Power of Attorney Translation | Armenian, Russian & Ukrainian',
    metaDescription:
      'Certified translation of Armenian, Russian and Ukrainian powers of attorney and notarial deeds for courts, banks, property transactions and consulates.',
    intro:
      'Powers of attorney and notarial deeds translated with the precision that legal authority requires.',
    usedFor: [
      'Property sales and inheritance matters abroad',
      'Banks and financial institutions acting on your instructions',
      'Courts and attorneys handling cross-border matters',
      'Consulates and government agencies',
    ],
    included: CERTIFIED_INCLUDES,
    about: [
      'A power of attorney is a grant of authority, and its wording is the whole document. The scope of what the agent may do, any limits on it, the validity period and the right to delegate all have to survive translation exactly as written — a softened phrase can widen or narrow authority that someone will rely on.',
      'These documents almost always carry a notarial certificate, a register number and one or more seals. All of it is translated or described, because that is what shows the deed was properly executed.',
      'If your document has an apostille attached, send that too. The apostille is a separate certificate and is usually translated with the deed so the receiving office can read both.',
    ],
    faq: [
      {
        q: 'Does the translation need to be notarized as well?',
        a: 'Not by us — we do not offer notarization. What we provide is a certified translation with a signed certificate of accuracy. If the office receiving it also requires a notarized signature, a local notary can handle that step.',
      },
      {
        q: 'Should the apostille be translated too?',
        a: 'Usually yes. It is a short separate certificate and most offices want it readable alongside the deed. Send a photo of it with the document and we will include it in the quote.',
      },
      {
        q: 'Can you match wording to a template my attorney uses?',
        a: 'A certified translation has to reflect the original, so we cannot substitute different wording. If your attorney needs particular terminology explained, tell us and we can note the original term alongside the translation.',
      },
    ],
  },
  {
    slug: 'court-document',
    href: '/court-document-translation',
    name: 'Court documents',
    title: 'Certified Court Document Translation',
    metaTitle: 'Certified Court Document & Judgment Translation | Los Angeles',
    metaDescription:
      'Certified translation of Armenian, Russian and Ukrainian court judgments, rulings, summonses and case files for US courts, attorneys and immigration filings.',
    intro:
      'Judgments, rulings, summonses and case files translated for US courts, attorneys and immigration filings.',
    usedFor: [
      'US court filings that reference a foreign judgment',
      'Attorneys building an immigration or family-law case',
      'Asylum claims supported by court records',
      'Recognition of foreign custody, divorce or property rulings',
    ],
    included: CERTIFIED_INCLUDES,
    about: [
      'Court documents are read by people looking for specific things: who the parties were, what the court actually ordered, on what date, and whether the decision became final. Those elements have to be unambiguous in the translation, with the operative part of the ruling rendered precisely rather than paraphrased.',
      'Legal systems do not line up, so some terms have no clean English equivalent. Where that happens we translate the term and keep the original alongside, which lets an attorney see exactly what the foreign court said instead of an approximation.',
      'Case files can run long. Tell us the filing deadline in your request — long files are quoted with a realistic delivery date rather than an optimistic one.',
    ],
    faq: [
      {
        q: 'Will a US court accept this translation?',
        a: 'Yes. US courts require a complete translation with a signed certification of accuracy, which is what we provide. Some courts have their own local rules on formatting — if yours does, send them and we will follow them.',
      },
      {
        q: 'Do you translate the whole file or just the judgment?',
        a: 'Whichever you need. Many people file only the judgment and the finality stamp. Tell us what the court or your attorney asked for and the quote will cover exactly that.',
      },
      {
        q: 'How are long case files priced?',
        a: 'Dense text-heavy filings are usually priced per word at $0.10, which works out cheaper than per-page for long documents. Short formal rulings are priced per page. The quote tells you which applies.',
      },
      {
        q: 'Is the content kept confidential?',
        a: 'Yes. Case documents are stored privately, seen only by the team working on the translation, and never shared.',
      },
    ],
  },
];
