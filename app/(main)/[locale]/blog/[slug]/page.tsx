// app/[locale]/blog/[slug]/page.tsx
import { HubSpotBlogService } from '@/lib/hubspot';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';

const hubspot = new HubSpotBlogService();

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  
  console.log(`[Metadata] Fetching post for slug: "${slug}", locale: "${locale}"`);
  
  const post = await hubspot.getPostBySlug(slug, locale);
  
  if (!post) {
    console.log(`[Metadata] Post not found for slug: "${slug}"`);
    return { title: 'Post not found' };
  }

  console.log(`[Metadata] Post found: "${post.name}"`);
  
  return {
    title: post.name,
    description: post.metaDescription,
    openGraph: {
      title: post.name,
      description: post.metaDescription,
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
      type: 'article',
      publishedTime: post.publishDate,
    },
    // JSON-LD para artículos
    other: {
      'script:ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.name,
        description: post.metaDescription,
        datePublished: post.publishDate,
        image: post.featuredImage,
        author: {
          '@type': 'Organization',
          name: 'Rapid Invoice'
        }
      })
    }
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  
  console.log(`[BlogPost] Rendering page for slug: "${slug}", locale: "${locale}"`);
  
  const post = await hubspot.getPostBySlug(slug, locale);
  
  if (!post) {
    console.log(`[BlogPost] Post not found, calling notFound()`);
    notFound();
  }

  console.log(`[BlogPost] Rendering post: "${post.name}" (${post.language})`);
  
  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      {post.featuredImage && (
        <img 
          src={post.featuredImage} 
          alt={post.name}
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
      )}
      
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.name}</h1>
        <div className="flex items-center text-gray-600 mb-6 space-x-4">
          <time dateTime={post.publishDate}>
            {new Date(post.publishDate).toLocaleDateString(locale, {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          
          {/* Badge de idioma para debugging - puedes removerlo en producción */}
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
            {post.language}
          </span>
          
          {/* Información de slug para debugging - remover en producción */}
          <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded font-mono">
            {post.slug}
          </span>
        </div>
      </header>
      
      {/* Contenido del post */}
      <div 
        className="prose prose-lg max-w-none prose-headings:font-semibold prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
        dangerouslySetInnerHTML={{ __html: post.postBody }}
      />
      
      {/* Navegación y metadata adicional */}
      <footer className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <Link 
            href={`/${locale}/blog`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
          
          {/* Información adicional */}
          <div className="text-sm text-gray-500">
            Published on {new Date(post.publishDate).toLocaleDateString(locale)}
          </div>
        </div>
        
        {/* Tags si están disponibles */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </footer>
    </article>
  );
}