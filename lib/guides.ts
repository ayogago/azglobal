import type { FaqItem } from '@/components/Sections';

export type GuideSection = {
  heading: string;
  body: string[];
  list?: string[];
};

export type Guide = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  summary: string; // shown on the index and under the H1
  readingTime: string;
  updated: string; // ISO date
  keyPoints: string[];
  sections: GuideSection[];
  faq: FaqItem[];
  sources: { label: string; href: string }[];
};

export const GUIDES: Guide[] = [
  {
    slug: 'uscis-translation-requirements',
    title: 'USCIS translation requirements, explained',
    metaTitle: 'USCIS Translation Requirements: What a Certified Translation Must Include',
    metaDescription:
      'What USCIS actually requires from a translated document: a full English translation plus the translator’s signed certification. Notarization, who may translate, and the mistakes that cause rejections.',
    summary:
      'The rule itself is one sentence long. Most rejected translations fail on the details around it — completeness, certification wording, and matching names.',
    readingTime: '5 min read',
    updated: '2026-09-13',
    keyPoints: [
      'Every foreign-language document needs a complete English translation, not a summary.',
      'The translator signs a statement certifying the translation is complete and accurate, and that they are competent to translate.',
      'Notarization is not required by USCIS.',
      'Stamps, seals, handwriting and margin notes all have to be translated or described.',
    ],
    sections: [
      {
        heading: 'What the regulation says',
        body: [
          'The requirement sits in 8 CFR 103.2(b)(3), and it is short: “Any document containing foreign language submitted to USCIS shall be accompanied by a full English language translation which the translator has certified as complete and accurate, and by the translator’s certification that he or she is competent to translate from the foreign language into English.”',
          'So there are two pieces: the translation itself, and a signed certification from whoever produced it. Both travel with the copy of the original document.',
        ],
      },
      {
        heading: 'What a compliant certification contains',
        body: ['A certificate of translation accuracy is a short signed statement. In practice it includes:'],
        list: [
          'A statement that the translation is complete and accurate',
          'A statement that the translator is competent to translate from that language into English',
          'The translator’s name, signature and date',
          'Contact details for the translator or the translation company',
        ],
      },
      {
        heading: 'Do you need a notary?',
        body: [
          'No. USCIS does not require the translator’s signature to be notarized. Notarization only confirms who signed a document — it says nothing about translation quality.',
          'Some other institutions do ask for it: certain courts, foreign consulates, and occasionally universities. If the office receiving your document requires notarization, say so when you order, and it can be added.',
        ],
      },
      {
        heading: 'Who is allowed to translate',
        body: [
          'The United States has no system of court-appointed or “sworn” translators, so the rule is about competence rather than a licence. Anyone competent in both languages can certify a translation.',
          'That said, translating your own documents is a bad idea, and so is asking the relative who is sponsoring you. An officer weighing whether a translation is impartial is a problem you do not want inside an application that already takes months. A professional translation company is inexpensive relative to that risk.',
        ],
      },
      {
        heading: 'What gets translations rejected',
        body: ['The errors we see most often are mundane rather than linguistic:'],
        list: [
          'Partial translations — the front of a document translated, the back or the margin stamps left out',
          'Names spelled differently than in the passport or the rest of the file',
          'Seals, signatures and registry numbers omitted because they “aren’t text”',
          'The certification statement missing, unsigned, or missing the competence wording',
          'A scan that cuts off an edge of the page, so the translation cannot be complete',
        ],
      },
      {
        heading: 'Practical tips before you send documents to a translator',
        body: [],
        list: [
          'Photograph or scan the whole page, all four edges visible, in good light',
          'Include both sides if anything is printed on the back',
          'Send every document in the filing at once so names and dates stay consistent',
          'Tell the translator the spelling used in your passport',
          'Keep the original — USCIS wants a copy of it alongside the translation, not the translation alone',
        ],
      },
    ],
    faq: [
      {
        q: 'Does USCIS accept translations done by a certified translator only?',
        a: 'There is no US licensing system for translators. The regulation asks for a competent translator who certifies the translation is complete and accurate. Professional translation companies provide exactly that certification.',
      },
      {
        q: 'Can I translate my own birth certificate for USCIS?',
        a: 'The regulation does not explicitly forbid it, but it is risky: you cannot credibly certify your own document as an impartial translator, and officers may question it. Use a third party.',
      },
      {
        q: 'Does the translation need to be notarized?',
        a: 'Not for USCIS. Some courts and consulates do ask for notarization, so check with the office that will receive it.',
      },
      {
        q: 'What if my document is partly in Russian and partly in Armenian?',
        a: 'Everything in a foreign language must be translated. Documents from the former Soviet republics often mix languages, which is routine for us.',
      },
    ],
    sources: [
      { label: '8 CFR 103.2(b)(3) — Translations', href: 'https://www.law.cornell.edu/cfr/text/8/103.2' },
      { label: 'USCIS — Filing your application', href: 'https://www.uscis.gov/forms/filing-guidance' },
    ],
  },
  {
    slug: 'apostille-vs-certified-translation',
    title: 'Apostille vs certified translation: which one do you need?',
    metaTitle: 'Apostille vs Certified Translation — What’s the Difference?',
    metaDescription:
      'An apostille authenticates a document; a certified translation makes it readable in English. What each one does, when you need both, and which order to do them in.',
    summary:
      'They solve different problems, and people often pay for the wrong one. An apostille proves a document is genuine. A translation makes it readable.',
    readingTime: '4 min read',
    updated: '2026-09-13',
    keyPoints: [
      'An apostille certifies that a public document is genuine — it does not translate anything.',
      'A certified translation renders the document in English with a signed accuracy statement.',
      'Only the country that issued a document can apostille it.',
      'When you need both, apostille first, then translate the document and the apostille together.',
    ],
    sections: [
      {
        heading: 'What an apostille actually is',
        body: [
          'An apostille is a certificate attached to a public document by the authority of the country that issued it, under the 1961 Hague Convention. It confirms that the signature, seal or stamp on the document is genuine, so that another member country will accept it without further legalisation.',
          'Armenia, Russia and Ukraine are all parties to the Convention, as is the United States. An Armenian birth certificate gets its apostille in Armenia; a California marriage certificate gets one from the California Secretary of State.',
        ],
      },
      {
        heading: 'What a certified translation is',
        body: [
          'A certified translation is the document rendered fully in another language, with a signed statement from the translator that the translation is complete and accurate. It says nothing about whether the original is genuine — that is the apostille’s job.',
        ],
      },
      {
        heading: 'Which one you need',
        body: ['It depends on who is receiving the document, not on the document itself.'],
        list: [
          'USCIS filings inside the United States: certified translation. USCIS does not ask for apostilles on foreign civil documents.',
          'Sending US documents abroad (marriage in Armenia, property in Russia, a foreign court): usually an apostille, plus a translation into that country’s language.',
          'Foreign consulates in the US: varies by consulate — ask them directly.',
          'Universities and credential evaluators: certified translation, sometimes sent directly by the issuing institution.',
        ],
      },
      {
        heading: 'The order matters',
        body: [
          'If you need both, get the apostille first. The apostille is itself a page of text, usually in the issuing country’s language, and the receiving authority generally expects it translated along with the document.',
          'Translating first and then apostilling means you either pay twice or hand over a file where the authentication page is the one thing nobody can read.',
        ],
      },
      {
        heading: 'A common trap',
        body: [
          'An apostille cannot be obtained in the US for a document issued abroad. If your Armenian diploma needs an apostille, it has to be issued in Armenia — a US notary or Secretary of State cannot authenticate a foreign authority’s seal. Plan the extra time, or ask family there to handle it.',
        ],
      },
    ],
    faq: [
      {
        q: 'Do I need an apostille for USCIS?',
        a: 'Generally no. USCIS asks for a copy of the foreign document plus a complete certified English translation. Apostilles come up when you send US documents to another country.',
      },
      {
        q: 'Can you apostille my translation?',
        a: 'In the US, what can be notarised and then apostilled is the translator’s signed certification — not the foreign original. Tell us who is asking and for what, and we will explain what is actually needed.',
      },
      {
        q: 'Should the apostille itself be translated?',
        a: 'Usually yes, when it is in a foreign language and the receiving office needs to read it. We translate it as part of the document.',
      },
    ],
    sources: [
      {
        label: 'HCCH — Apostille Section (1961 Convention)',
        href: 'https://www.hcch.net/en/instruments/conventions/specialised-sections/apostille',
      },
      {
        label: 'US Department of State — Apostille requirements',
        href: 'https://travel.state.gov/content/travel/en/records-and-authentications/authenticate-your-document/apostille-requirements.html',
      },
    ],
  },
  {
    slug: 'credential-evaluation-foreign-diplomas',
    title: 'Credential evaluation for foreign diplomas: how it works',
    metaTitle: 'Credential Evaluation for Foreign Diplomas — Translation vs Evaluation',
    metaDescription:
      'What a credential evaluation is, how it differs from a certified translation, which agencies are recognised, and what to prepare if your diploma is Armenian, Russian or Ukrainian.',
    summary:
      'A translation says what your diploma says. An evaluation says what it is worth in US terms. Most applicants need both, in that order.',
    readingTime: '5 min read',
    updated: '2026-09-13',
    keyPoints: [
      'Translation and evaluation are two different services from two different providers.',
      'Evaluation agencies compare your qualification to a US equivalent — a translator never does that.',
      'Most agencies want a certified translation alongside the original documents.',
      'Check which agency your university, board or employer accepts before you order anything.',
    ],
    sections: [
      {
        heading: 'The difference in one line',
        body: [
          'A certified translation renders your diploma and transcript in English, exactly as issued. A credential evaluation is an opinion from an evaluation agency about what your qualification corresponds to in the US education system — for example, that a five-year Armenian specialist degree is comparable to a US bachelor’s degree.',
          'Translators do not assess equivalence, and evaluators do not certify translations. Anyone offering to “translate your degree into a US GPA” is describing evaluation, not translation.',
        ],
      },
      {
        heading: 'Who accepts which agency',
        body: [
          'There is no single official evaluator. Universities, licensing boards and employers each publish a list of agencies they accept, most often members of NACES or AICE — WES, ECE and SpanTran are among the commonly named ones.',
          'Start from the requirements page of the institution you are applying to. Ordering an evaluation from an agency your target school does not accept is an expensive and slow mistake.',
        ],
      },
      {
        heading: 'What to prepare',
        body: ['Requirements differ by agency, but the usual set is:'],
        list: [
          'Your diploma or degree certificate',
          'Your academic transcript, every page, including the grading scale',
          'A certified English translation of both',
          'Sometimes an academic record sent directly by the issuing institution',
        ],
      },
      {
        heading: 'Why transcripts are the hard part',
        body: [
          'Transcripts are tables of course titles, hours and grades, often with abbreviations and a grading key in small print. A translation that flattens the table into prose, or that renders course titles loosely, makes the evaluator’s job harder and can slow the whole process down.',
          'We keep the structure of the original, translate course titles precisely, and leave grades exactly as issued so the evaluator can convert them.',
        ],
      },
      {
        heading: 'Typical order of operations',
        body: [],
        list: [
          'Confirm which evaluation agency the school, board or employer accepts',
          'Collect your diploma and full transcript, plus an apostille if the agency asks for one',
          'Get a certified translation of everything',
          'Submit both the originals and translations to the agency',
        ],
      },
    ],
    faq: [
      {
        q: 'Do you provide credential evaluations?',
        a: 'No. We provide the certified translations that evaluation agencies require. The evaluation itself comes from an agency your institution accepts.',
      },
      {
        q: 'Can you convert my grades to a 4.0 GPA?',
        a: 'No, and no honest translator will. A translation must mirror the original. Grade conversion is part of an evaluation.',
      },
      {
        q: 'Does my diploma need an apostille as well?',
        a: 'Some agencies and some universities require it. Check their requirements first — the apostille has to come from the country that issued the diploma.',
      },
    ],
    sources: [
      { label: 'NACES — member agencies', href: 'https://www.naces.org/members' },
      { label: 'AICE — member agencies', href: 'https://aice-eval.org/members/' },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
