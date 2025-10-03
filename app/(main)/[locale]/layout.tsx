import Navbar from "./_components/navbar";
import Aurora from '@/components/aurora';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Lista de idiomas soportados - ACTUALIZADA
export const locales = ['en', 'es', 'pt', 'ja', 'fr', 'de'] as const;
type Locale = typeof locales[number];

// Traducciones para metadata - EXPANDIDAS
const metadataTranslations = {
  en: {
    title: "Rapid Invoice - Fast & Automatic Invoice Generator | Billing SaaS",
    description: "Generate professional invoices in seconds with AI. Automatic invoice generator with prompts, multi-currency, multi-language and PDF export. Perfect for freelancers and SMEs looking to save time.",
    ogTitle: "Rapid Invoice - Fast & Automatic Invoice Generator",
    ogDescription: "Generate professional invoices in seconds with AI. Perfect for freelancers and SMEs. Multi-currency, multi-language and PDF export.",
    keywords: "invoice generator, automatic invoicing, rapid invoice, AI invoices, PDF invoice generator, freelancer billing, SME invoicing"
  },
  es: {
    title: "Rapid Invoice - Generador de Facturas Rápido y Automático | SaaS de Facturación",
    description: "Genera facturas profesionales en segundos con IA. Generador automático de facturas con prompts, multi-moneda, multi-idioma y exportación PDF. Perfecto para freelancers y PYMEs.",
    ogTitle: "Rapid Invoice - Generador de Facturas con IA",
    ogDescription: "Genera facturas profesionales en segundos con IA. Perfecto para freelancers y PYMEs. Multi-moneda, multi-idioma y exportación PDF.",
    keywords: "generador facturas, facturación automática, facturas IA, generador PDF facturas, facturación freelancers, facturación PYMES"
  },
  pt: {
    title: "Rapid Invoice - Gerador de Faturas Rápido e Automático | SaaS de Faturamento",
    description: "Gere faturas profissionais em segundos com IA. Gerador automático de faturas com prompts, multi-moeda, multi-idioma e exportação PDF. Perfeito para freelancers e PMEs.",
    ogTitle: "Rapid Invoice - Gerador de Faturas com IA",
    ogDescription: "Gere faturas profissionais em segundos com IA. Perfeito para freelancers e PMEs. Multi-moeda, multi-idioma e exportação PDF.",
    keywords: "gerador faturas, faturamento automático, faturas IA, gerador PDF faturas, faturamento freelancers, faturamento PME"
  },
  ja: {
    title: "Rapid Invoice - 高速・自動請求書ジェネレーター | 請求SaaS",
    description: "AIで数秒でプロフェッショナルな請求書を生成。プロンプト付き自動請求書ジェネレーター、多通貨、多言語、PDF出力対応。フリーランサーや中小企業に最適。",
    ogTitle: "Rapid Invoice - AI請求書ジェネレーター",
    ogDescription: "AIで数秒でプロフェッショナルな請求書を生成。フリーランサーや中小企業に最適。多通貨、多言語、PDF出力対応。",
    keywords: "請求書ジェネレーター, 自動請求, AI請求書, PDF請求書ジェネレーター, フリーランサー請求, 中小企業請求"
  },
  fr: {
    title: "Rapid Invoice - Générateur de Factures Rapide et Automatique | SaaS de Facturation",
    description: "Générez des factures professionnelles en quelques secondes avec l'IA. Générateur automatique de factures avec prompts, multi-devises, multi-langues et export PDF.",
    ogTitle: "Rapid Invoice - Générateur de Factures IA",
    ogDescription: "Générez des factures professionnelles en quelques secondes avec l'IA. Parfait pour freelancers et PME.",
    keywords: "générateur factures, facturation automatique, factures IA, générateur PDF factures, facturation freelancers, facturation PME"
  },
  de: {
    title: "Rapid Invoice - Schneller & Automatischer Rechnungsgenerator | Abrechnungs-SaaS",
    description: "Erstellen Sie professionelle Rechnungen in Sekunden mit KI. Automatischer Rechnungsgenerator mit Prompts, Multi-Währung, Multi-Sprache und PDF-Export.",
    ogTitle: "Rapid Invoice - KI-Rechnungsgenerator",
    ogDescription: "Erstellen Sie professionelle Rechnungen in Sekunden mit KI. Perfekt für Freelancer und KMUs.",
    keywords: "Rechnungsgenerator, automatische Rechnungsstellung, KI Rechnungen, PDF Rechnungsgenerator, Freelancer Abrechnung, KMU Rechnungsstellung"
  }
};

// ✅ FIX: Generar metadata para cada página - params debe ser await
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params; // ✅ Await params
  const localeTyped = locale as Locale;
  const translations = metadataTranslations[localeTyped] || metadataTranslations.en;
  const baseUrl = 'https://www.rapidinvoice.eu';
  const currentUrl = localeTyped === 'en' ? baseUrl : `${baseUrl}/${localeTyped}`;

  // Mapeo de locales a códigos de Open Graph
  const ogLocaleMap = {
    en: 'en_US',
    es: 'es_ES',
    pt: 'pt_BR',
    ja: 'ja_JP',
    fr: 'fr_FR',
    de: 'de_DE'
  };

  return {
    title: {
      default: translations.title,
      template: `%s | Rapid Invoice`
    },
    description: translations.description,
    
    keywords: translations.keywords,

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
      locale: ogLocaleMap[localeTyped] || 'en_US',
      url: currentUrl,
      siteName: 'Rapid Invoice',
      title: translations.ogTitle,
      description: translations.ogDescription,
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'Rapid Invoice - AI Invoice Generator',
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: translations.ogTitle,
      description: translations.ogDescription,
      images: [`${baseUrl}/twitter-image.jpg`],
      creator: '@rapidinvoice',
    },

    alternates: {
      canonical: currentUrl,
      languages: {
        'x-default': `${baseUrl}`,
        'en-US': `${baseUrl}`,
        'es-ES': `${baseUrl}/es`,
        'pt-BR': `${baseUrl}/pt`,
        'ja-JP': `${baseUrl}/ja`,
        'fr-FR': `${baseUrl}/fr`,
        'de-DE': `${baseUrl}/de`,
      },
    },
  };
}

// Generar rutas estáticas para cada idioma
export function generateStaticParams() {
  return locales.map((locale) => ({
    locale: locale,
  }));
}

// ✅ FIX: Layout component - params debe ser await
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params; // ✅ Await params
  
  // Verificar que el idioma es válido
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <>
      {/* Aurora como fondo fijo */}
      <div className="fixed inset-0 -z-10">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      
      {/* Contenido principal - ✅ Pasamos locale al Navbar */}
      <div className="relative z-10">
        <Navbar initialLocale={locale as Locale} />
        {children}
      </div>
    </>
  );
}