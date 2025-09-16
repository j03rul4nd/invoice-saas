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
  const post = await hubspot.getPostBySlug(slug, locale);
  
  if (!post) return { title: 'Post not found' };
  
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
  const post = await hubspot.getPostBySlug(slug, locale);
  
  if (!post) {
    notFound();
  }
  
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
        <div className="flex items-center text-gray-600 mb-6">
          <time dateTime={post.publishDate}>
            {new Date(post.publishDate).toLocaleDateString()}
          </time>
        </div>
      </header>
      
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.postBody }}
      />
      
      {/* Navegación a otros posts */}
      <div className="mt-12 pt-8 border-t">
        <Link 
          href={`/${locale}/blog`}
          className="text-blue-600 hover:underline"
        >
          ← Back to Blog
        </Link>
      </div>
    </article>
  );
}