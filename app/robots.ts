// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Opcional: bloquear rutas que no quieras indexar
        disallow: ['/api/', '/admin/', '/_next/', '/dashboard/private/']
      }
    ],
    sitemap: 'https://rapidinvoice.eu/sitemap.xml',
    // Opcional: añadir más información
    host: 'https://rapidinvoice.eu',
  }
}