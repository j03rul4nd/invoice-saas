import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Rapid Invoice - Generador de Facturas Rápido y Automático | SaaS de Facturación",
    template: "%s | Rapid Invoice"
  },
  description: "Genera facturas profesionales en segundos con IA. Generador automático de facturas con prompts, multidivisa, multilenguaje y exportación PDF. Perfecto para freelancers y PYMEs que quieren ahorrar tiempo.",
  
  keywords: [
    "generador de facturas",
    "facturación automática",
    "rapid invoice",
    "facturas con IA",
    "generador facturas PDF",
    "facturación freelancers",
    "facturación PYMEs",
    "facturas multidivisa",
    "facturas multilenguaje",
    "SaaS facturación",
    "crear facturas rápido",
    "enlace público facturas",
    "facturas online",
    "automatizar facturación"
  ],

  authors: [{ name: "Rapid Invoice" }],
  creator: "Rapid Invoice",
  publisher: "Rapid Invoice",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://rapidinvoice.eu',
    siteName: 'Rapid Invoice',
    title: 'Rapid Invoice - Generador de Facturas Rápido y Automático',
    description: 'Genera facturas profesionales en segundos con IA. Perfecto para freelancers y PYMEs. Multidivisa, multilenguaje y exportación PDF.',
    images: [
      {
        url: 'https://rapidinvoice.eu/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rapid Invoice - Generador de Facturas con IA',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Rapid Invoice - Generador de Facturas Rápido y Automático',
    description: 'Genera facturas profesionales en segundos con IA. Multidivisa, multilenguaje y exportación PDF.',
    images: ['https://rapidinvoice.eu/twitter-image.jpg'],
    creator: '@rapidinvoice',
  },

  alternates: {
    canonical: 'https://rapidinvoice.eu',
    languages: {
      'es-ES': 'https://rapidinvoice.eu/es',
      'en-US': 'https://rapidinvoice.eu/en',
      'fr-FR': 'https://rapidinvoice.eu/fr',
      'de-DE': 'https://rapidinvoice.eu/de',
    },
  },

  verification: {
    google: 'tu-codigo-de-verificacion-google',
    // Añade otros códigos de verificación cuando los tengas
  },

  category: 'technology',
  classification: 'Business Software',

  metadataBase: new URL('https://rapidinvoice.eu'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en" className="dark">
        <head>
          {/* Favicon */}
          <link rel="icon" href="./favicon.ico" sizes="32x32" />
          <link rel="icon" href="./favicon.svg" type="image/svg+xml" />
          {/* <link rel="apple-touch-icon" href="/apple-touch-icon.png" /> */}
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}