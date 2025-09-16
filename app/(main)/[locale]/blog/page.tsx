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
            <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {post.featuredImage && (
                <img 
                  src={post.featuredImage}
                  alt={post.name}
                  className="w-full h-48 object-cover"
                />
              )}
              
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-3">
                  <Link
                    href={`/${locale}/blog/${cleanSlug}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {post.name}
                  </Link>
                </h2>
                
                {post.metaDescription && (
                  <p className="text-gray-600 mb-4">{post.metaDescription}</p>
                )}
                
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                  <Link
                    href={`/${locale}/blog/${cleanSlug}`}
                    className="text-blue-600 hover:underline"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}