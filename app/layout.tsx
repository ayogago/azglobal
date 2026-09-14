import type { Metadata, Viewport } from "next";
import Script from "next/script";
// Self-hosted fonts (no build-time dependency on Google Fonts).
import "@fontsource-variable/montserrat/wght.css";
import "@fontsource-variable/open-sans/wght.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import MobileCtaBar from "@/components/MobileCtaBar";
import { SITE } from "@/lib/site";

const title = "Certified Armenian, Russian & Ukrainian Translation";
const description =
  "USCIS-accepted certified translations between English and Armenian, Russian or Ukrainian. Los Angeles based, 12–48 hour turnaround.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: title,
    template: "%s | AZ Global Translations",
  },
  description,
  manifest: "/manifest.json",
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    siteName: SITE.name,
    type: "website",
    locale: "en_US",
    url: SITE.url,
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "AZ Global Translations" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#077AA3",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      url: SITE.url,
      logo: `${SITE.url}/az-global-icon.png`,
      email: SITE.email,
      telephone: SITE.phoneSchema,
      sameAs: SITE.social,
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE.url}/#business`,
      name: SITE.name,
      url: SITE.url,
      image: `${SITE.url}/az-global-icon.png`,
      telephone: SITE.phoneSchema,
      email: SITE.email,
      parentOrganization: { "@id": `${SITE.url}/#organization` },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Los Angeles",
        addressRegion: "CA",
        addressCountry: "US",
      },
      areaServed: [
        { "@type": "City", name: "Los Angeles" },
        { "@type": "State", name: "California" },
        { "@type": "Country", name: "United States" },
      ],
      knowsLanguage: ["en", "hy", "ru", "uk"],
      priceRange: "$25–$60 per page",
      currenciesAccepted: "USD",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
      description,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      publisher: { "@id": `${SITE.url}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col pb-[60px] lg:pb-0">
        <JsonLd data={organizationSchema} />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-9BH27BCL3G" strategy="lazyOnload" />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
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
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow-card"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-grow">
          {children}
        </main>
        <Footer />
        <MobileCtaBar />
      </body>
    </html>
  );
}
