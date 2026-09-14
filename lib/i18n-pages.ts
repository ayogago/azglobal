/**
 * Interface strings for the shared document and city landing layouts, so the
 * same components render in English, Armenian and Russian.
 */
import type { Locale } from '@/lib/i18n';

export type PageUi = {
  home: string;
  services: string;
  includesTitle: string;
  badgeUscis: string;
  badgeSpeed: string;
  badgePrivate: string;
  whatToKnowEyebrow: string;
  whatToKnowTitle: string;
  submittedTo: string;
  perPage: string;
  complexNote: string;
  fullPricing: string;
  quoteEyebrow: string;
  quoteTitle: string;
  quoteText: string;
  ctaQuote: string;
  ctaWhatsapp: string;
  faqSuffix: (name: string) => string;
  otherDocuments: string;
  /** City pages */
  alsoServing: (areas: string) => string;
  workingWith: (city: string) => string;
  sendsUsMost: (city: string) => string;
  priceSummary: string;
  documentsWeTranslate: string;
  otherAreas: string;
  cityFaqTitle: (city: string) => string;
  languageLinkSuffix: string;
  /** Guides */
  guides: string;
  guidesTitle: string;
  guidesIntro: string;
  guidesMetaTitle: string;
  guidesMetaDescription: string;
  read: string;
  updatedOn: (date: string) => string;
  inShort: string;
  sources: string;
  disclaimer: string;
  needTranslation: string;
  needTranslationText: string;
  moreGuides: string;
  faqShort: string;
  relatedServices: string;
};

export const PAGE_UI: Record<Locale, PageUi> = {
  en: {
    home: 'Home',
    services: 'Services',
    includesTitle: 'Every certified translation includes',
    badgeUscis: 'USCIS accepted',
    badgeSpeed: '12–48 hours',
    badgePrivate: 'Private & secure',
    whatToKnowEyebrow: 'What to know',
    whatToKnowTitle: 'Getting it right the first time',
    submittedTo: 'Commonly submitted to',
    perPage: 'per page',
    complexNote: '· complex formatted pages $60',
    fullPricing: 'full pricing',
    quoteEyebrow: 'Free quote',
    quoteTitle: 'Send us your document',
    quoteText: 'Upload a photo or scan and we’ll email you a quote. No account, no obligation.',
    ctaQuote: 'Get a Free Quote',
    ctaWhatsapp: 'WhatsApp us',
    faqSuffix: (name) => `${name} — questions we get`,
    otherDocuments: 'Other documents we translate',
    alsoServing: (areas) => `Also serving ${areas} — everything handled online, nothing to drop off.`,
    workingWith: (city) => `Working with ${city}`,
    sendsUsMost: (city) => `What ${city} sends us most`,
    priceSummary:
      'Certified documents are $25 per page, complex formatted pages $60, text-heavy material $0.10 per word.',
    documentsWeTranslate: 'Documents we translate',
    otherAreas: 'Other areas we serve',
    cityFaqTitle: (city) => `Translation in ${city} — common questions`,
    languageLinkSuffix: 'translation',
    guides: 'Guides',
    guidesTitle: 'Answers to the questions we get asked most',
    guidesIntro:
      'Short, practical explanations of the paperwork around certified translation — what offices actually require, and what trips people up.',
    guidesMetaTitle: 'Translation Guides',
    guidesMetaDescription:
      'Plain-English guides to USCIS translation requirements, apostilles, and credential evaluation for foreign diplomas, from a certified translation company in Los Angeles.',
    read: 'Read',
    updatedOn: (date) => `Updated ${date}`,
    inShort: 'In short',
    sources: 'Sources',
    disclaimer:
      'General information, not legal advice. Requirements change and vary by office — confirm with the agency receiving your documents.',
    needTranslation: 'Need a certified translation?',
    needTranslationText: 'Armenian, Russian and Ukrainian ⇄ English, accepted by USCIS.',
    moreGuides: 'More guides',
    faqShort: 'Frequently asked',
    relatedServices: 'Documents this applies to',
  },
  hy: {
    home: 'Գլխավոր',
    services: 'Ծառայություններ',
    includesTitle: 'Ներառված է յուրաքանչյուր հաստատված թարգմանության մեջ',
    badgeUscis: 'Ընդունում է USCIS-ը',
    badgeSpeed: '12–48 ժամ',
    badgePrivate: 'Գաղտնի և ապահով',
    whatToKnowEyebrow: 'Ինչ պետք է իմանալ',
    whatToKnowTitle: 'Անել ճիշտ՝ առաջին անգամից',
    submittedTo: 'Սովորաբար ներկայացվում է',
    perPage: 'մեկ էջ',
    complexNote: '· բարդ ձևաչափված էջեր՝ $60',
    fullPricing: 'ամբողջական գնացուցակ',
    quoteEyebrow: 'Անվճար գնահատում',
    quoteTitle: 'Ուղարկեք ձեր փաստաթուղթը',
    quoteText:
      'Վերբեռնեք լուսանկար կամ սկան, և մենք էլ. փոստով կուղարկենք գնահատումը։ Հաշիվ պետք չէ, պարտավորություն չկա։',
    ctaQuote: 'Ստանալ անվճար գնահատում',
    ctaWhatsapp: 'Գրել WhatsApp-ով',
    faqSuffix: (name) => `${name} — հաճախ տրվող հարցեր`,
    otherDocuments: 'Այլ փաստաթղթեր, որոնք թարգմանում ենք',
    alsoServing: (areas) =>
      `Սպասարկում ենք նաև՝ ${areas}։ Ամեն ինչ կատարվում է առցանց, ոչինչ բերել պետք չէ։`,
    workingWith: (city) => `Աշխատանք ${city}-ի հետ`,
    sendsUsMost: (city) => `Ինչ են ամենից հաճախ ուղարկում ${city}-ից`,
    priceSummary:
      'Հաստատված փաստաթղթերը՝ $25 մեկ էջի համար, բարդ ձևաչափված էջերը՝ $60, ծավալուն տեքստերը՝ $0.10 մեկ բառի համար։',
    documentsWeTranslate: 'Փաստաթղթեր, որոնք թարգմանում ենք',
    otherAreas: 'Այլ տարածքներ, որոնք սպասարկում ենք',
    cityFaqTitle: (city) => `Թարգմանություն ${city}-ում — հաճախ տրվող հարցեր`,
    languageLinkSuffix: 'թարգմանություն',
    guides: 'Ուղեցույցներ',
    guidesTitle: 'Պատասխաններ ամենահաճախ տրվող հարցերին',
    guidesIntro:
      'Կարճ, գործնական բացատրություններ հաստատված թարգմանության շուրջ եղած թղթաբանության մասին՝ ինչ են իրականում պահանջում հաստատությունները և ինչի վրա են մարդիկ սայթաքում։',
    guidesMetaTitle: 'Թարգմանության ուղեցույցներ',
    guidesMetaDescription:
      'Պարզ բացատրություններ USCIS-ի թարգմանության պահանջների, ապոստիլի և օտարերկրյա դիպլոմների որակավորման գնահատման մասին՝ Լոս Անջելեսի հաստատված թարգմանությունների ընկերությունից։',
    read: 'Կարդալ',
    updatedOn: (date) => `Թարմացվել է՝ ${date}`,
    inShort: 'Հակիրճ',
    sources: 'Աղբյուրներ',
    disclaimer:
      'Ընդհանուր տեղեկատվություն է, ոչ թե իրավաբանական խորհրդատվություն։ Պահանջները փոխվում են և տարբերվում ըստ հաստատության — ճշտեք այնտեղ, ուր ներկայացնում եք ձեր փաստաթղթերը։',
    needTranslation: 'Հաստատված թարգմանությո՞ւն է պետք',
    needTranslationText: 'Հայերեն, ռուսերեն և ուկրաիներեն ⇄ անգլերեն՝ ընդունելի USCIS-ի կողմից։',
    moreGuides: 'Այլ ուղեցույցներ',
    faqShort: 'Հաճախ տրվող հարցեր',
    relatedServices: 'Փաստաթղթեր, որոնց վերաբերում է սա',
  },
  ru: {
    home: 'Главная',
    services: 'Услуги',
    includesTitle: 'Входит в каждый заверенный перевод',
    badgeUscis: 'Принимает USCIS',
    badgeSpeed: '12–48 часов',
    badgePrivate: 'Конфиденциально',
    whatToKnowEyebrow: 'Что важно знать',
    whatToKnowTitle: 'Сделать правильно с первого раза',
    submittedTo: 'Куда обычно подают',
    perPage: 'за страницу',
    complexNote: '· страницы со сложным оформлением $60',
    fullPricing: 'полный прайс-лист',
    quoteEyebrow: 'Бесплатный расчёт',
    quoteTitle: 'Отправьте нам документ',
    quoteText:
      'Загрузите фото или скан, и мы пришлём расчёт на эл. почту. Регистрация не нужна, обязательств нет.',
    ctaQuote: 'Получить бесплатный расчёт',
    ctaWhatsapp: 'Написать в WhatsApp',
    faqSuffix: (name) => `${name} — частые вопросы`,
    otherDocuments: 'Другие документы, которые мы переводим',
    alsoServing: (areas) => `Также обслуживаем: ${areas}. Всё делается онлайн, привозить ничего не нужно.`,
    workingWith: (city) => `Работа с районом ${city}`,
    sendsUsMost: (city) => `Что чаще всего присылают из района ${city}`,
    priceSummary:
      'Заверенные документы — $25 за страницу, страницы со сложным оформлением — $60, объёмные тексты — $0.10 за слово.',
    documentsWeTranslate: 'Документы, которые мы переводим',
    otherAreas: 'Другие районы, которые мы обслуживаем',
    cityFaqTitle: (city) => `Перевод в районе ${city} — частые вопросы`,
    languageLinkSuffix: 'перевод',
    guides: 'Руководства',
    guidesTitle: 'Ответы на вопросы, которые задают чаще всего',
    guidesIntro:
      'Короткие практичные объяснения бумажной стороны заверенного перевода — что на самом деле требуют инстанции и на чём люди спотыкаются.',
    guidesMetaTitle: 'Руководства по переводу',
    guidesMetaDescription:
      'Понятные объяснения требований USCIS к переводу, апостиля и оценки иностранных дипломов — от бюро заверенных переводов в Лос-Анджелесе.',
    read: 'Читать',
    updatedOn: (date) => `Обновлено ${date}`,
    inShort: 'Коротко',
    sources: 'Источники',
    disclaimer:
      'Это общая информация, а не юридическая консультация. Требования меняются и отличаются в разных инстанциях — уточняйте там, куда подаёте документы.',
    needTranslation: 'Нужен заверенный перевод?',
    needTranslationText: 'Армянский, русский и украинский ⇄ английский, принимает USCIS.',
    moreGuides: 'Другие руководства',
    faqShort: 'Частые вопросы',
    relatedServices: 'К каким документам это относится',
  },
};
