import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://azglobaltranslations.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/portal/admin/',
          '/admin/',
          '/api/',
          '/_next/',
          '/portal/admin-setup',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
