/**
 * Armenian and Russian versions of the site.
 *
 * The English site lives at the root; the native-language versions live under
 * /hy and /ru. Form *values* stay in English on purpose — they are what lands
 * in the team's inbox — while their labels are translated.
 */

export type Locale = 'en' | 'hy' | 'ru';

export const LOCALES: { code: Locale; label: string; short: string; href: string; hreflang: string }[] = [
  { code: 'en', label: 'English', short: 'EN', href: '/', hreflang: 'en-US' },
  { code: 'hy', label: 'Հայերեն', short: 'ՀԱՅ', href: '/hy', hreflang: 'hy' },
  { code: 'ru', label: 'Русский', short: 'РУС', href: '/ru', hreflang: 'ru' },
];

export function localeFromPath(pathname: string): Locale {
  if (pathname === '/hy' || pathname.startsWith('/hy/')) return 'hy';
  if (pathname === '/ru' || pathname.startsWith('/ru/')) return 'ru';
  return 'en';
}

export const homeHref = (locale: Locale) => (locale === 'en' ? '/' : `/${locale}`);
export const quoteHref = (locale: Locale) => (locale === 'en' ? '/quote' : `/${locale}/quote`);
export const pricingHref = (locale: Locale) => (locale === 'en' ? '/pricing' : `/${locale}/pricing`);

/** hreflang alternates, for pages that exist in all three languages. */
export const HOME_ALTERNATES = {
  languages: {
    'en-US': '/',
    hy: '/hy',
    ru: '/ru',
    'x-default': '/',
  },
};

export const QUOTE_ALTERNATES = {
  languages: {
    'en-US': '/quote',
    hy: '/hy/quote',
    ru: '/ru/quote',
    'x-default': '/quote',
  },
};

export const PRICING_ALTERNATES = {
  languages: {
    'en-US': '/pricing',
    hy: '/hy/pricing',
    ru: '/ru/pricing',
    'x-default': '/pricing',
  },
};

/** hreflang alternates for a page that exists at /<segment>, /hy/<segment> and /ru/<segment>. */
export const segmentAlternates = (segment: string) => ({
  languages: {
    'en-US': `/${segment}`,
    hy: `/hy/${segment}`,
    ru: `/ru/${segment}`,
    'x-default': `/${segment}`,
  },
});

/* ------------------------------------------------------------------ */
/* Header, footer and form strings                                     */
/* ------------------------------------------------------------------ */

type Chrome = {
  nav: { name: string; href: string }[];
  quoteCta: string;
  menu: string;
  closeMenu: string;
  languagesHeading: string;
  documentsHeading: string;
  companyHeading: string;
  contactHeading: string;
  footerBlurb: string;
  support: string;
  rights: string;
  skipToContent: string;
  languageLabel: string;
  barCall: string;
  barText: string;
};

export const CHROME: Record<Locale, Chrome> = {
  en: {
    nav: [
      { name: 'Services', href: '/services' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Guides', href: '/guides' },
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
    ],
    quoteCta: 'Get a Free Quote',
    menu: 'Open menu',
    closeMenu: 'Close menu',
    languagesHeading: 'Languages',
    documentsHeading: 'Documents',
    companyHeading: 'Company',
    contactHeading: 'Contact',
    footerBlurb: 'Certified Armenian, Russian and Ukrainian translations, accepted by USCIS, courts and universities.',
    support: 'Support available 24/7',
    rights: 'All rights reserved.',
    skipToContent: 'Skip to content',
    languageLabel: 'Language',
    barCall: 'Call',
    barText: 'Text',
  },
  hy: {
    nav: [
      { name: 'Ծառայություններ', href: '/hy/services' },
      { name: 'Գներ', href: '/hy/pricing' },
      { name: 'Մեր մասին', href: '/hy/about' },
      { name: 'Կապ', href: '/hy/contact' },
    ],
    quoteCta: 'Անվճար գնահատում',
    menu: 'Բացել ընտրացանկը',
    closeMenu: 'Փակել ընտրացանկը',
    languagesHeading: 'Լեզուներ',
    documentsHeading: 'Փաստաթղթեր',
    companyHeading: 'Ընկերություն',
    contactHeading: 'Կապ',
    footerBlurb:
      'Հայերեն, ռուսերեն և ուկրաիներեն հաստատված թարգմանություններ՝ ընդունելի USCIS-ի, դատարանների և համալսարանների կողմից։',
    support: 'Աջակցություն 24/7',
    rights: 'Բոլոր իրավունքները պաշտպանված են։',
    skipToContent: 'Անցնել բովանդակությանը',
    languageLabel: 'Լեզու',
    barCall: 'Զանգ',
    barText: 'SMS',
  },
  ru: {
    nav: [
      { name: 'Услуги', href: '/ru/services' },
      { name: 'Цены', href: '/ru/pricing' },
      { name: 'О нас', href: '/ru/about' },
      { name: 'Контакты', href: '/ru/contact' },
    ],
    quoteCta: 'Бесплатный расчёт',
    menu: 'Открыть меню',
    closeMenu: 'Закрыть меню',
    languagesHeading: 'Языки',
    documentsHeading: 'Документы',
    companyHeading: 'Компания',
    contactHeading: 'Контакты',
    footerBlurb:
      'Заверенные переводы с армянского, русского и украинского, которые принимают USCIS, суды и университеты.',
    support: 'Поддержка 24/7',
    rights: 'Все права защищены.',
    skipToContent: 'Перейти к содержанию',
    languageLabel: 'Язык',
    barCall: 'Звонок',
    barText: 'SMS',
  },
};

type FormCopy = {
  name: string;
  email: string;
  phone: string;
  optional: string;
  languagePair: string;
  choosePair: string;
  documentType: string;
  select: string;
  serviceLevel: string;
  turnaround: string;
  subject: string;
  messageQuote: string;
  messageContact: string;
  messagePlaceholder: string;
  filesQuote: string;
  filesContact: string;
  filesHintQuote: string;
  filesHintContact: string;
  chooseFiles: string;
  orDrag: string;
  fileTypes: (max: number, size: string) => string;
  remove: string;
  uploading: string;
  sending: string;
  submitQuote: string;
  submitContact: string;
  privacy: string;
  doneQuoteTitle: string;
  doneContactTitle: string;
  doneQuoteText: string;
  doneContactText: string;
  sooner: string;
  errorGeneric: string;
  errorUpload: (email: string) => string;
  errorTooMany: (max: number) => string;
  errorType: (name: string) => string;
  errorSize: (name: string, size: string) => string;
  /** Translated labels for the English option values. */
  options: Record<string, string>;
};

export const FORM_COPY: Record<Locale, FormCopy> = {
  en: {
    name: 'Full name',
    email: 'Email',
    phone: 'Phone',
    optional: '(optional)',
    languagePair: 'Translate',
    choosePair: 'Choose languages',
    documentType: 'Document type',
    select: 'Select…',
    serviceLevel: 'Service needed',
    turnaround: 'When do you need it?',
    subject: 'Subject',
    messageQuote: 'Anything we should know?',
    messageContact: 'Message',
    messagePlaceholder:
      'e.g. where it will be submitted (USCIS, court, university), a deadline, or names as spelled in your passport',
    filesQuote: 'Your documents',
    filesContact: 'Attachments',
    filesHintQuote: 'recommended for an accurate quote',
    filesHintContact: 'optional',
    chooseFiles: 'Choose files',
    orDrag: 'or drag them here',
    fileTypes: (max, size) => `PDF, photos (JPG, PNG, HEIC) or Word · up to ${max} files, ${size} each`,
    remove: 'Remove',
    uploading: 'Uploading documents…',
    sending: 'Sending…',
    submitQuote: 'Request my free quote',
    submitContact: 'Send message',
    privacy: 'Your documents are stored privately and only used to prepare your quote and translation.',
    doneQuoteTitle: 'Request received — thank you!',
    doneContactTitle: 'Message sent — thank you!',
    doneQuoteText:
      'We’ll review your documents and email you a quote shortly. A confirmation is on its way to your inbox.',
    doneContactText: 'We’ll get back to you shortly. A confirmation is on its way to your inbox.',
    sooner: 'Need it sooner? Call',
    errorGeneric: 'Something went wrong. Please try again.',
    errorUpload: (email) => `We couldn't upload your files. Please try again, or email them to ${email}.`,
    errorTooMany: (max) => `You can attach up to ${max} files.`,
    errorType: (name) => `"${name}" isn't a supported file type.`,
    errorSize: (name, size) => `"${name}" is larger than ${size}.`,
    options: {},
  },
  hy: {
    name: 'Անուն, ազգանուն',
    email: 'Էլ. փոստ',
    phone: 'Հեռախոս',
    optional: '(ըստ ցանկության)',
    languagePair: 'Թարգմանել',
    choosePair: 'Ընտրեք լեզուները',
    documentType: 'Փաստաթղթի տեսակը',
    select: 'Ընտրեք…',
    serviceLevel: 'Անհրաժեշտ ծառայությունը',
    turnaround: 'Ե՞րբ է պետք',
    subject: 'Թեմա',
    messageQuote: 'Ի՞նչ պետք է իմանանք',
    messageContact: 'Հաղորդագրություն',
    messagePlaceholder:
      'օրինակ՝ ուր է ներկայացվելու (USCIS, դատարան, համալսարան), վերջնաժամկետը, կամ անունների գրելաձևը ըստ անձնագրի',
    filesQuote: 'Ձեր փաստաթղթերը',
    filesContact: 'Կցված ֆայլեր',
    filesHintQuote: 'խորհուրդ է տրվում ճշգրիտ գնահատման համար',
    filesHintContact: 'ըստ ցանկության',
    chooseFiles: 'Ընտրել ֆայլեր',
    orDrag: 'կամ քաշեք դրանք այստեղ',
    fileTypes: (max, size) => `PDF, լուսանկար (JPG, PNG, HEIC) կամ Word · մինչև ${max} ֆայլ, յուրաքանչյուրը՝ ${size}`,
    remove: 'Հեռացնել',
    uploading: 'Փաստաթղթերը վերբեռնվում են…',
    sending: 'Ուղարկվում է…',
    submitQuote: 'Ստանալ անվճար գնահատում',
    submitContact: 'Ուղարկել հաղորդագրությունը',
    privacy:
      'Ձեր փաստաթղթերը պահվում են ապահով և օգտագործվում են միայն ձեր գնահատումն ու թարգմանությունը պատրաստելու համար։',
    doneQuoteTitle: 'Հարցումը ստացվեց — շնորհակալություն։',
    doneContactTitle: 'Հաղորդագրությունն ուղարկվեց — շնորհակալություն։',
    doneQuoteText:
      'Կդիտարկենք ձեր փաստաթղթերը և շուտով կուղարկենք գնահատումը էլ. փոստով։ Հաստատումն արդեն ճանապարհին է։',
    doneContactText: 'Շուտով կպատասխանենք։ Հաստատումն արդեն ճանապարհին է։',
    sooner: 'Ավելի շո՞ւտ է պետք։ Զանգահարեք',
    errorGeneric: 'Ինչ-որ բան այնպես չգնաց։ Խնդրում ենք կրկին փորձել։',
    errorUpload: (email) =>
      `Չհաջողվեց վերբեռնել ձեր ֆայլերը։ Խնդրում ենք կրկին փորձել կամ ուղարկել դրանք ${email} հասցեին։`,
    errorTooMany: (max) => `Կարող եք կցել առավելագույնը ${max} ֆայլ։`,
    errorType: (name) => `«${name}»-ը չաջակցվող ֆայլի տեսակ է։`,
    errorSize: (name, size) => `«${name}»-ը մեծ է ${size}-ից։`,
    options: {
      'Armenian → English': 'Հայերենից անգլերեն',
      'English → Armenian': 'Անգլերենից հայերեն',
      'Russian → English': 'Ռուսերենից անգլերեն',
      'English → Russian': 'Անգլերենից ռուսերեն',
      'Ukrainian → English': 'Ուկրաիներենից անգլերեն',
      'English → Ukrainian': 'Անգլերենից ուկրաիներեն',
      'Other / not sure': 'Այլ / վստահ չեմ',
      'Birth certificate': 'Ծննդյան վկայական',
      'Marriage or divorce certificate': 'Ամուսնության կամ ամուսնալուծության վկայական',
      'Passport, ID or driver’s license': 'Անձնագիր, ID կամ վարորդական իրավունք',
      'Diploma or transcript': 'Դիպլոմ կամ ակադեմիական տեղեկանք',
      'Court or legal document': 'Դատական կամ իրավական փաստաթուղթ',
      'Police or criminal record': 'Ոստիկանության կամ դատվածության տեղեկանք',
      'Medical record': 'Բժշկական փաստաթուղթ',
      'Business or financial document': 'Բիզնես կամ ֆինանսական փաստաթուղթ',
      Other: 'Այլ',
      'Certified translation': 'Հաստատված թարգմանություն',
      'Standard translation (not certified)': 'Սովորական թարգմանություն (առանց հաստատման)',
      'Not sure': 'Վստահ չեմ',
      'Standard (12–48 hours)': 'Սովորական (12–48 ժամ)',
      'As soon as possible': 'Հնարավորինս շուտ',
      'No rush': 'Շտապ չէ',
    },
  },
  ru: {
    name: 'Имя и фамилия',
    email: 'Эл. почта',
    phone: 'Телефон',
    optional: '(необязательно)',
    languagePair: 'Перевести',
    choosePair: 'Выберите языки',
    documentType: 'Тип документа',
    select: 'Выберите…',
    serviceLevel: 'Нужная услуга',
    turnaround: 'Когда нужен перевод?',
    subject: 'Тема',
    messageQuote: 'Что нам важно знать?',
    messageContact: 'Сообщение',
    messagePlaceholder:
      'например: куда подаётся (USCIS, суд, университет), срок, или написание имён как в загранпаспорте',
    filesQuote: 'Ваши документы',
    filesContact: 'Вложения',
    filesHintQuote: 'желательно для точного расчёта',
    filesHintContact: 'необязательно',
    chooseFiles: 'Выбрать файлы',
    orDrag: 'или перетащите их сюда',
    fileTypes: (max, size) => `PDF, фото (JPG, PNG, HEIC) или Word · до ${max} файлов, по ${size}`,
    remove: 'Удалить',
    uploading: 'Загружаем документы…',
    sending: 'Отправляем…',
    submitQuote: 'Получить бесплатный расчёт',
    submitContact: 'Отправить сообщение',
    privacy:
      'Ваши документы хранятся в защищённом виде и используются только для подготовки расчёта и перевода.',
    doneQuoteTitle: 'Запрос получен — спасибо!',
    doneContactTitle: 'Сообщение отправлено — спасибо!',
    doneQuoteText: 'Мы посмотрим ваши документы и вскоре пришлём расчёт на эл. почту. Подтверждение уже в пути.',
    doneContactText: 'Мы скоро свяжемся с вами. Подтверждение уже в пути.',
    sooner: 'Нужно быстрее? Позвоните',
    errorGeneric: 'Что-то пошло не так. Попробуйте ещё раз.',
    errorUpload: (email) => `Не удалось загрузить файлы. Попробуйте ещё раз или отправьте их на ${email}.`,
    errorTooMany: (max) => `Можно приложить не более ${max} файлов.`,
    errorType: (name) => `«${name}» — неподдерживаемый тип файла.`,
    errorSize: (name, size) => `«${name}» больше ${size}.`,
    options: {
      'Armenian → English': 'С армянского на английский',
      'English → Armenian': 'С английского на армянский',
      'Russian → English': 'С русского на английский',
      'English → Russian': 'С английского на русский',
      'Ukrainian → English': 'С украинского на английский',
      'English → Ukrainian': 'С английского на украинский',
      'Other / not sure': 'Другое / не знаю',
      'Birth certificate': 'Свидетельство о рождении',
      'Marriage or divorce certificate': 'Свидетельство о браке или разводе',
      'Passport, ID or driver’s license': 'Паспорт, удостоверение или права',
      'Diploma or transcript': 'Диплом или приложение к диплому',
      'Court or legal document': 'Судебный или юридический документ',
      'Police or criminal record': 'Справка о несудимости',
      'Medical record': 'Медицинский документ',
      'Business or financial document': 'Деловой или финансовый документ',
      Other: 'Другое',
      'Certified translation': 'Заверенный перевод',
      'Standard translation (not certified)': 'Обычный перевод (без заверения)',
      'Not sure': 'Не знаю',
      'Standard (12–48 hours)': 'Обычный (12–48 часов)',
      'As soon as possible': 'Как можно скорее',
      'No rush': 'Не срочно',
    },
  },
};

/** Translate an English option value for display, falling back to the value. */
export const optionLabel = (locale: Locale, value: string) => FORM_COPY[locale].options[value] ?? value;
