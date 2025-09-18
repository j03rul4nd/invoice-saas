// app/sitemap.ts
import { MetadataRoute } from 'next'

const locales = ['en', 'es', 'pt', 'ja', 'fr', 'de'] as const;
const baseUrl = 'https://rapidinvoice.eu';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/pricing', '/dashboard'];
  const entries: MetadataRoute.Sitemap = [];

  // Páginas principales + Blog
  locales.forEach(locale => {
    // Rutas principales
    routes.forEach(route => {
      const localePrefix = locale === 'en' ? '' : `/${locale}`;
      entries.push({
        url: `${baseUrl}${localePrefix}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.8
      });
    });

    // Blog (requiere locale)
    const localePrefix = locale === 'en' ? '' : `/${locale}`;
    entries.push({
      url: `${baseUrl}${localePrefix}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7
    });
  });

  return entries;
}