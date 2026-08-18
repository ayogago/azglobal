import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: "AZ Global Translations - Certified Translation Services",
  description: "Precision in Every Word. Speed in Every Project. Professional certified translation services for all your needs.",
  keywords: ["translation", "certified translation", "document translation", "language services", "professional translation"],
  manifest: '/manifest.json',
  metadataBase: new URL('https://azglobaltranslations.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'AZ Global Translations - Certified Translation Services',
    description: 'Precision in Every Word. Speed in Every Project.',
    siteName: 'AZ Global Translations',
    type: 'website',
    url: 'https://azglobaltranslations.com',
    images: [
      {
        url: '/az-global-icon.png',
        width: 500,
        height: 500,
        alt: 'AZ Global Translations Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AZ Global Translations - Certified Translation Services',
    description: 'Precision in Every Word. Speed in Every Project.',
    images: ['/az-global-icon.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://azglobaltranslations.com/#organization',
        name: 'AZ Global Translations',
        url: 'https://azglobaltranslations.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://azglobaltranslations.com/az-global-icon.png',
          width: 500,
          height: 500,
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+1-747-895-4845',
          contactType: 'customer service',
          email: 'info@azglobaltranslations.com',
          availableLanguage: ['English', 'Armenian', 'Russian', 'Spanish', 'French', 'Ukrainian'],
        },
        sameAs: [
          'https://www.facebook.com/azglobaltranslations',
          'https://twitter.com/azglobaltrans',
          'https://www.linkedin.com/company/azglobaltranslations',
        ],
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://azglobaltranslations.com/#localbusiness',
        name: 'AZ Global Translations',
        image: 'https://azglobaltranslations.com/az-global-icon.png',
        url: 'https://azglobaltranslations.com',
        telephone: '+1-747-895-4845',
        email: 'info@azglobaltranslations.com',
        priceRange: '$0.10 per word',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Los Angeles',
          addressRegion: 'CA',
          addressCountry: 'USA',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 34.0522,
          longitude: -118.2437,
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59',
        },
        description: 'Professional certified translation services in Armenian, Russian, Spanish, French, Ukrainian, and English. Fast, accurate, and USCIS-accepted translations.',
      },
      {
        '@type': 'Service',
        '@id': 'https://azglobaltranslations.com/#service',
        serviceType: 'Translation Services',
        provider: {
          '@id': 'https://azglobaltranslations.com/#organization',
        },
        areaServed: 'Worldwide',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Translation Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Certified Translation',
                description: 'USCIS-accepted certified translations with official stamp and signature.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Legal Translation',
                description: 'Court-ready legal translations for contracts, agreements, and more.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Business Translation',
                description: 'Professional business document translation for global operations.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Academic Translation',
                description: 'Certified translation of diplomas, transcripts, and certificates.',
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <html lang="en" className={openSans.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://flagcdn.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9BH27BCL3G"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9BH27BCL3G');
            gtag('config', 'AW-17641739629');
          `}
        </Script>
        <Script id="meta-pixel" strategy="lazyOnload">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '4157590451177300');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img height="1" width="1" style={{display: 'none'}}
            src="https://www.facebook.com/tr?id=4157590451177300&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
