// app/[locale]/blog/page.tsx
import { HubSpotBlogService } from '@/lib/hubspot';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';

const hubspot = new HubSpotBlogService();

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

// Función para extraer el slug final de la URL completa
function extractSlug(fullSlug: string, locale: string): string {
  // Eliminar prefijos de idioma y 'blog/' del slug
  let cleanSlug = fullSlug;
  
  // Si el slug empieza con el locale, lo removemos
  if (cleanSlug.startsWith(`${locale}/blog/`)) {
    cleanSlug = cleanSlug.replace(`${locale}/blog/`, '');
  } else if (cleanSlug.startsWith('blog/')) {
    cleanSlug = cleanSlug.replace('blog/', '');
  }
  
  return cleanSlug;
}

// Metadatos para SEO multiidioma
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  const seoData = {
    en: {
      title: 'Blog - Latest Invoice & Business Tips | Rapid Invoice',
      description: 'Latest tips and insights about invoicing, business management, and entrepreneurship. Expert advice for freelancers and small businesses.'
    },
    es: {
      title: 'Blog - Últimos Consejos de Facturación y Negocios | Rapid Invoice',
      description: 'Últimos consejos e ideas sobre facturación, gestión empresarial y emprendimiento. Consejos de expertos para freelancers y pequeñas empresas.'
    },
    fr: {
      title: 'Blog - Derniers Conseils sur la Facturation et les Affaires | Rapid Invoice',
      description: 'Derniers conseils et idées sur la facturation, la gestion d\'entreprise et l\'entrepreneuriat. Conseils d\'experts pour freelances et petites entreprises.'
    },
    pt: {
      title: 'Blog - Últimas Dicas de Faturamento e Negócios | Rapid Invoice',
      description: 'Últimas dicas e insights sobre faturamento, gestão empresarial e empreendedorismo. Conselhos de especialistas para freelancers e pequenas empresas.'
    },
    ja: {
      title: 'ブログ - 最新の請求書とビジネスのヒント | Rapid Invoice',
      description: '請求書発行、ビジネス管理、起業に関する最新のヒントと洞察。フリーランサーや中小企業向けの専門的なアドバイス。'
    },
    de: {
      title: 'Blog - Neueste Rechnungs- und Geschäftstipps | Rapid Invoice',
      description: 'Neueste Tipps und Einblicke zu Rechnungsstellung, Unternehmensführung und Unternehmertum. Expertenratschläge für Freelancer und kleine Unternehmen.'
    }
  };

  const currentSeo = seoData[locale as keyof typeof seoData] || seoData.en;
  
  return {
    title: currentSeo.title,
    description: currentSeo.description,
    openGraph: {
      title: currentSeo.title,
      description: currentSeo.description,
      type: 'website',
      locale: locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: currentSeo.title,
      description: currentSeo.description,
    },
    alternates: {
      languages: {
        'en': '/en/blog',
        'es': '/es/blog',
        'fr': '/fr/blog',
        'pt': '/pt/blog',
        'ja': '/ja/blog',
        'de': '/de/blog',
        'x-default': '/en/blog',
      },
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  
  // Textos localizados para la interfaz
  const texts = {
    en: {
      title: 'Blog',
      noPosts: 'No posts found for this language.',
      readMore: 'Read more',
      dateFormat: 'en-US'
    },
    es: {
      title: 'Blog',
      noPosts: 'No se encontraron artículos para este idioma.',
      readMore: 'Leer más',
      dateFormat: 'es-ES'
    },
    fr: {
      title: 'Blog',
      noPosts: 'Aucun article trouvé pour cette langue.',
      readMore: 'Lire la suite',
      dateFormat: 'fr-FR'
    },
    pt: {
      title: 'Blog',
      noPosts: 'Nenhum artigo encontrado para este idioma.',
      readMore: 'Ler mais',
      dateFormat: 'pt-BR'
    },
    ja: {
      title: 'ブログ',
      noPosts: 'この言語の記事が見つかりません。',
      readMore: '続きを読む',
      dateFormat: 'ja-JP'
    },
    de: {
      title: 'Blog',
      noPosts: 'Keine Beiträge für diese Sprache gefunden.',
      readMore: 'Weiterlesen',
      dateFormat: 'de-DE'
    }
  };

  const currentTexts = texts[locale as keyof typeof texts] || texts.en;
  
  // Obtener posts filtrados por idioma
  const posts = await hubspot.getPostsByLanguage(locale);
  
  if (!posts.length) {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">{currentTexts.title}</h1>
            <p>{currentTexts.noPosts}</p>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{currentTexts.title}</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => {
          const cleanSlug = extractSlug(post.slug, locale);
          
          return (
            <article key={post.id} className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl overflow-hidden hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl">
              {/* Imagen con overlay glassmorphism */}
              {post.featuredImage && (
                <div className="relative overflow-hidden">
                  <img 
                    src={post.featuredImage}
                    alt={post.name}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              )}
              
              <div className="p-8">
                {/* Título con tipografía mejorada */}
                <h2 className="text-2xl font-bold mb-4 leading-tight">
                  <Link
                    href={`/${locale}/blog/${cleanSlug}`}
                    className="text-white hover:text-blue-300 transition-colors duration-300 bg-gradient-to-r from-white to-gray-100 bg-clip-text hover:from-blue-300 hover:to-purple-300"
                  >
                    {post.name}
                  </Link>
                </h2>
                
                {/* Descripción con mejor contraste */}
                {post.metaDescription && (
                  <p className="text-gray-300 mb-6 leading-relaxed text-base font-light line-clamp-3">
                    {post.metaDescription}
                  </p>
                )}
                
                {/* Footer con glassmorphism interno */}
                <div className="flex justify-between items-center bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <time className="text-sm text-gray-400 font-medium tracking-wide">
                    {new Date(post.publishDate).toLocaleDateString(currentTexts.dateFormat, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  
                  <Link
                    href={`/${locale}/blog/${cleanSlug}`}
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold text-sm tracking-wide transition-all duration-300 hover:gap-3 group-hover:translate-x-1"
                  >
                    {currentTexts.readMore}
                    <svg 
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
              
              {/* Efectos adicionales de glassmorphism */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </article>
          );
        })}
      </div>
    </div>
  );
}