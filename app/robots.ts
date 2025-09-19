import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/dashboard/private/',
          // Añadir estas si existen y no quieres que se indexen:
          '/auth/',
          '/login',
          '/register'
        ]
      }
    ],
    sitemap: 'https://rapidinvoice.eu/sitemap.xml',
    host: 'https://rapidinvoice.eu'
  }
}