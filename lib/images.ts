// Photography used across the site. Unsplash photos (free to use under the
// Unsplash licence), served through Next.js image optimisation.
const unsplash = (id: string) => `https://images.unsplash.com/${id}`;

export const IMAGES = {
  hero: {
    src: unsplash('photo-1763729805496-b5dbf7f00c79'),
    alt: 'Hand signing an official document with a pen',
  },
  translator: {
    src: unsplash('photo-1602016736566-7ed6a58894bd'),
    alt: 'Translator working on a document at a laptop',
  },
  passport: {
    src: unsplash('photo-1581553673739-c4906b5d0de8'),
    alt: 'Open passport covered in border stamps',
  },
  losAngeles: {
    src: unsplash('photo-1594309336026-a820898c0416'),
    alt: 'Downtown Los Angeles skyline at night',
  },
  documents: {
    src: unsplash('photo-1583521214690-73421a1829a9'),
    alt: 'Stacks of paper documents and file folders',
  },
  form: {
    src: unsplash('photo-1564846824194-346b7871b855'),
    alt: 'Person filling in an official form',
  },
} as const;
