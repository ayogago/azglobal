# AZ Global Translations - Next.js 14 Website

Production-ready Next.js 14 website for AZ Global Translations - Professional Certified Translation Services.

## Features

- ⚡ **Next.js 14** with App Router
- 🎨 **Tailwind CSS** for styling
- 📱 **Fully Responsive** design
- 🔍 **SEO Optimized** with metadata
- ♿ **Accessible** components
- 🚀 **Performance Optimized**
- 📝 **TypeScript** for type safety

## Pages Included

- **Home** - Hero section, services overview, and CTAs
- **Services** - Detailed service offerings
- **About** - Company information and values
- **Contact** - Contact form and information
- **Quote** - Free quote request form

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with Header/Footer
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles
│   ├── services/           # Services page
│   ├── about/              # About page
│   ├── contact/            # Contact page
│   └── quote/              # Quote request page
├── components/
│   ├── Header.tsx          # Navigation header
│   └── Footer.tsx          # Footer component
├── public/                 # Static assets
└── tailwind.config.ts      # Tailwind configuration
```

## Brand Colors

- Primary Green: `#1B9C85`
- Primary Dark: `#178E79`
- Dark Text: `#0F172A`
- Dark Light: `#454F5E`

## Typography

- Headings: **Encode Sans**
- Body: **Open Sans**

## Customization

### Update Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    DEFAULT: '#1B9C85',
    dark: '#178E79',
  },
  // ...
}
```

### Update Content

- Homepage: `app/page.tsx`
- Services: `app/services/page.tsx`
- About: `app/about/page.tsx`
- Contact: `app/contact/page.tsx`
- Quote: `app/quote/page.tsx`

### Update Navigation

Edit `components/Header.tsx` to add/remove menu items.

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy automatically

### Other Platforms

Build the production bundle:

```bash
npm run build
```

Deploy the `.next` folder and `public` directory to your hosting provider.

## Environment Variables

Create a `.env.local` file for environment-specific variables:

```env
NEXT_PUBLIC_SITE_URL=https://azglobaltranslations.com
NEXT_PUBLIC_CONTACT_EMAIL=info@azglobaltranslations.com
```

## Performance

- Uses Next.js Image optimization
- Implements font optimization with `next/font`
- CSS is automatically optimized and purged
- Built-in code splitting

## SEO

- Metadata configured for all pages
- Semantic HTML structure
- Optimized for search engines
- Open Graph tags ready to add

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Copyright © 2024 AZ Global Translations. All rights reserved.

## Support

For questions or support, contact: info@azglobaltranslations.com
