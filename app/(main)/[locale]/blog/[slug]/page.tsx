// app/[locale]/blog/[slug]/page.tsx
import { HubSpotBlogService } from '@/lib/hubspot';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import "./styleBlog.css";

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

  console.log(`[BlogPost] JBD:"${post.postBody}" Rendering post: "${post.name}" (${post.language})`);
  
  return (
    <div className="min-h-screen text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        
        
        {/* Featured Image Background */}
        {/* {post.featuredImage && (
          <div className="absolute inset-0 opacity-10">
            <img 
              src={post.featuredImage} 
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )} */}
        
        {/* Content */}
        <div className="relative">
          <div className="container mx-auto px-4 py-24 max-w-4xl">
            {/* Navigation */}
            <nav className="mb-12">
              <Link 
                href={`/${locale}/blog`}
                className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-200 group"
              >
                <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Blog
              </Link>
            </nav>

            {/* Header */}
            <header className="mb-16">
              <div className="flex items-center text-sm text-gray-400 mb-6 space-x-4">
                <time dateTime={post.publishDate} className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(post.publishDate).toLocaleDateString(locale, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                
                {/* Badge de idioma - remover en producción */}
                <span className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-full border border-gray-700">
                  {post.language}
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent leading-tight">
                {post.name}
              </h1>
              
              {post.metaDescription && (
                <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
                  {post.metaDescription}
                </p>
              )}
            </header>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="relative">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          {/* Featured Image in content */}
          {post.featuredImage && (
            <div className="mb-16 rounded-2xl overflow-hidden border border-gray-800">
              <img 
                src={post.featuredImage} 
                alt={post.name}
                className="w-full h-auto"
              />
            </div>
          )}
          
          {/* Blog Content with Custom Styles */}
          <div 
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.postBody }}
          />
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-950/50">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-12">
              <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">
                Tagged in
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 text-sm bg-gray-800 text-gray-300 rounded-full border border-gray-700 hover:border-gray-600 transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Bottom Navigation */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <Link 
              href={`/${locale}/blog`}
              className="inline-flex items-center px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium group"
            >
              <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to All Posts
            </Link>
            
            <div className="text-sm text-gray-500">
              Published on {new Date(post.publishDate).toLocaleDateString(locale)}
            </div>
          </div>
        </div>
      </footer>


    </div>
  );
}