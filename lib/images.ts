/**
 * Photography used across the site.
 *
 * All images are hosted by Unsplash and served through Next.js image
 * optimisation (see `images.remotePatterns` in next.config.js). Every photo
 * here was chosen to be bright enough to stay visible behind an overlay —
 * dark photos disappear against the brand's navy sections.
 */
const unsplash = (id: string) => `https://images.unsplash.com/${id}`;

export type SiteImage = { src: string; alt: string };

export const IMAGES = {
  /** Two people going through documents together — the homepage hero. */
  hero: {
    src: unsplash('photo-1565688534245-05d6b5be184a'),
    alt: 'Two people reviewing documents together at a desk',
  },
  /** A translator checking a document with a client. */
  consultation: {
    src: unsplash('photo-1562564055-71e051d33c19'),
    alt: 'A translator going through paperwork with a client',
  },
  /** Close-up of someone writing on a printed document. */
  writing: {
    src: unsplash('photo-1606242403120-0d1997a32486'),
    alt: 'Close-up of a hand completing an official form',
  },
  /** Papers and a pen on a desk — a neutral documents image. */
  documents: {
    src: unsplash('photo-1631651693480-97f1132e333d'),
    alt: 'Printed documents and a pen on a desk',
  },
  /** A US passport held over a world map. */
  passport: {
    src: unsplash('photo-1654163600133-452eb7274426'),
    alt: 'A United States passport held above a world map',
  },
  /** A framed diploma with a gold seal. */
  diploma: {
    src: unsplash('photo-1638636241638-aef5120c5153'),
    alt: 'A framed university diploma with a gold seal',
  },
  /** A graduation cap in front of a university building. */
  graduation: {
    src: unsplash('photo-1658235081483-8f06aa0882cf'),
    alt: 'A graduation cap held up in front of a university building',
  },
  /** A courthouse with a clock tower and flag. */
  courthouse: {
    src: unsplash('photo-1769605767686-57ebdca36923'),
    alt: 'A historic courthouse with a clock tower and flag',
  },
  /** Wedding rings resting on a document. */
  rings: {
    src: unsplash('photo-1639291502992-81aacf53e2e0'),
    alt: 'Two wedding rings resting on a printed document',
  },
  /** A bright, modern office. */
  office: {
    src: unsplash('photo-1746021451691-4385f318ec13'),
    alt: 'A bright, modern office with a meeting table',
  },
  /** Two people meeting across a desk. */
  meeting: {
    src: unsplash('photo-1698047682091-782b1e5c6536'),
    alt: 'Two people meeting across a desk',
  },
  /** Downtown Los Angeles in daylight. */
  losAngeles: {
    src: unsplash('photo-1513711487224-63b774e12f4d'),
    alt: 'The downtown Los Angeles skyline in daylight',
  },
} as const satisfies Record<string, SiteImage>;

/** The photo shown on each document landing page. */
export const DOCUMENT_IMAGES: Record<string, SiteImage> = {
  'birth-certificate': IMAGES.writing,
  'marriage-certificate': IMAGES.rings,
  'diploma-transcript': IMAGES.diploma,
  'police-record': IMAGES.courthouse,
  'divorce-decree': IMAGES.courthouse,
  'drivers-license': IMAGES.passport,
};

export const documentImage = (slug: string): SiteImage => DOCUMENT_IMAGES[slug] ?? IMAGES.documents;
