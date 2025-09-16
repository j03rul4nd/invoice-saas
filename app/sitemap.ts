// app/sitemap.ts
import { MetadataRoute } from 'next'

// Mismos locales que en tu layout
const locales = ['en', 'es', 'pt', 'ja', 'fr', 'de'] as const;
const baseUrl = 'https://rapidinvoice.eu';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/pricing', '/dashboard']; // Añade todas tus rutas principales
  
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generar URLs para cada idioma
  locales.forEach((locale) => {
    routes.forEach((route) => {
      // URL base para inglés vs otros idiomas
      const localePrefix = locale === 'en' ? '' : `/${locale}`;
      const url = `${baseUrl}${localePrefix}${route}`;
      
      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.8,
        // Opcional: añadir alternates para hreflang en sitemap
        alternates: {
          languages: Object.fromEntries(
            locales.map(lang => [
              lang === 'en' ? 'x-default' : lang,
              lang === 'en' ? `${baseUrl}${route}` : `${baseUrl}/${lang}${route}`
            ])
          )
        }
      });
    });
  });

  return sitemapEntries;
}