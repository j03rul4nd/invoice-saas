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
    default: "Rapid Invoice - Fast & Automatic Invoice Generator | Billing SaaS",
    template: "%s | Rapid Invoice"
  },
  description: "Generate professional invoices in seconds with AI. Automatic invoice generator with prompts, multi-currency, multi-language and PDF export. Perfect for freelancers and SMEs looking to save time.",
  
  keywords: [
    "invoice generator",
    "automatic invoicing",
    "rapid invoice",
    "AI invoices",
    "PDF invoice generator",
    "freelancer billing",
    "SME invoicing",
    "multi-currency invoices",
    "multi-language invoices",
    "billing SaaS",
    "create invoices fast",
    "public invoice link",
    "online invoices",
    "automate invoicing"
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
    locale: 'en_US',
    url: 'https://www.rapidinvoice.eu',
    siteName: 'Rapid Invoice',
    title: 'Rapid Invoice - Fast & Automatic Invoice Generator',
    description: 'Generate professional invoices in seconds with AI. Perfect for freelancers and SMEs. Multi-currency, multi-language and PDF export.',
    images: [
      {
        url: 'https://www.rapidinvoice.eu/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rapid Invoice - AI Invoice Generator',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Rapid Invoice - Fast & Automatic Invoice Generator',
    description: 'Generate professional invoices in seconds with AI. Multi-currency, multi-language and PDF export.',
    images: ['https://www.rapidinvoice.eu/twitter-image.jpg'],
    creator: '@rapidinvoice',
  },

  alternates: {
    canonical: 'https://www.rapidinvoice.eu',
    languages: {
      'es-ES': 'https://www.rapidinvoice.eu/es',
      'en-US': 'https://www.rapidinvoice.eu/en',
      'fr-FR': 'https://www.rapidinvoice.eu/fr',
      'de-DE': 'https://www.rapidinvoice.eu/de',
    },
  },

  verification: {
    google: 'your-google-verification-code',
    // Add other verification codes when you have them
  },

  category: 'technology',
  classification: 'Business Software',

  metadataBase: new URL('https://www.rapidinvoice.eu'),
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
          <link rel="icon" href="/favicon.ico" sizes="32x32" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          {/* <link rel="apple-touch-icon" href="/apple-touch-icon.png" /> */}
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}