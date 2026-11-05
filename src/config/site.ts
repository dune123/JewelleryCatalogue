/**
 * Single source of truth for the Prince Jewellers catalogue.
 * Change names, copy, and contact details here — components read this file only.
 */
export const site = {
  name: 'Prince Jewellers',
  wordmark: 'Prince',
  categoryLine: 'Jewellers',
  tagline: 'Jewellery That Defines You',
  description:
    'Prince Jewellers is a photograph-led catalogue of modern, quietly made pieces. Enquire about any piece by WhatsApp or email.',
  // TODO: replace with the live site URL (used for Open Graph and structured data)
  url: 'https://princejewellery.example',
  locale: 'en-IN',
  currency: '₹',
  // TODO: replace with the studio WhatsApp number, digits only in international format (no + or spaces), e.g. 9198XXXXXXXX
  whatsappNumber: '910000000000',
  // TODO: replace with the studio email address
  email: 'hello@princejewellery.example',
  phones: [
    { number: '9810748016', label: 'Sanjay Chauhan' },
    { number: '9212653922', label: 'Sanjay Chauhan' },
    { number: '85272 79516', label: '' },
  ],
  address: 'A-4/204, Sector-17, Hanuman Market, Rohini, Delhi-110089',
  social: {
    // TODO: replace with the Instagram profile URL
    instagram: 'https://instagram.com/',
    // TODO: replace with the Facebook page URL
    facebook: 'https://facebook.com/',
    // TODO: replace with the Pinterest profile URL
    pinterest: 'https://pinterest.com/',
    // TODO: replace with the YouTube channel URL
    youtube: 'https://youtube.com/',
  },
  about: {
    eyebrow: 'The House',
    title: 'Quiet pieces, made to be lived in',
    paragraphs: [
      'Prince Jewellers is a house of modern elegance — jewellery shaped with care, worn close, and kept long after a season has passed.',
      'Each piece is chosen for its craftsmanship and the story it carries: a line of light at the collarbone, a ring that becomes familiar, earrings that catch the day without asking for it.',
      'This catalogue is a first look. Names and prices can be filled in as they are decided. Until then, enquire about anything that stays with you.',
    ],
  },
  topPieces: {
    eyebrow: 'Top pieces',
    title: 'Dhanteras special',
    intro: 'A silver fish, kept close and given often.',
  },
  collections: {
    eyebrow: 'Collections',
    title: 'The edit',
    intro: 'Every photograph is a piece you can enquire about.',
  },
  lookbook: {
    eyebrow: 'Lookbook',
    title: 'In the light',
    intro: 'Details, studies, and pieces as they were photographed.',
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Enquire',
    intro: 'Tell us which piece you are drawn to. We reply by WhatsApp or email.',
  },
  heroCta: 'Explore the Collection',
  enquireLabel: 'Enquire',
  enquireForPrice: 'Enquire for price',
} as const

export type Site = typeof site
