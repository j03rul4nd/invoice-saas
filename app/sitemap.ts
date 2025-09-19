import { MetadataRoute } from 'next'

const locales = ['en', 'es', 'pt', 'ja', 'fr', 'de'] as const;
const baseUrl = 'https://rapidinvoice.eu';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // 1. Páginas principales por idioma (solo la home)
  locales.forEach(locale => {
    const localePrefix = locale === 'en' ? '' : `/${locale}`;
    entries.push({
      url: `${baseUrl}${localePrefix}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1
    });
  });

  // 2. Blog por idioma (siempre con locale, incluso en inglés)
  locales.forEach(locale => {
    entries.push({
      url: `${baseUrl}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7
    });
  });

  // 3. Pricing y Dashboard (solo en inglés)
  entries.push({
    url: `${baseUrl}/pricing`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8
  });

  entries.push({
    url: `${baseUrl}/dashboard`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8
  });

  return entries;
}