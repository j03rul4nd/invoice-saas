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

// Metadata para SEO
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  const titles = {
    en: 'Blog - Latest Invoice & Business Tips | Rapid Invoice',
    es: 'Blog - Últimos Consejos de Facturación y Negocios | Rapid Invoice',
    fr: 'Blog - Derniers Conseils sur la Facturation | Rapid Invoice',
  };
  
  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: 'Latest tips and insights about invoicing, business management, and entrepreneurship.',
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  
  // Obtener posts filtrados por idioma
  const posts = await hubspot.getPostsByLanguage(locale);
  
  if (!posts.length) {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Blog</h1>
            <p>No posts found for this language.</p>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      
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
        {new Date(post.publishDate).toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </time>
      
      <Link
        href={`/${locale}/blog/${cleanSlug}`}
        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold text-sm tracking-wide transition-all duration-300 hover:gap-3 group-hover:translate-x-1"
      >
        Leer más
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