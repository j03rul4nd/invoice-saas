// lib/hubspot.ts - VERSIÓN CORREGIDA
import { BlogPost } from "@/types/blog"

export class HubSpotBlogService {
  private baseUrl = 'https://api.hubapi.com/cms/v3/blogs/posts';
  private apiKey = process.env.HUBSPOT_API_KEY;

  // Obtener posts con paginación
  async getPostsByLanguage(
    language: string, 
    limit = 10, 
    offset = 0
  ): Promise<BlogPost[]> {
    try {
      // Construir URL con parámetros
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
        state: 'PUBLISHED',
        sort: '-publishDate', // Ordenar por fecha de publicación descendente
      });

      const response = await fetch(
        `${this.baseUrl}?${params}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          next: { revalidate: 3600 } // Cache 1 hora
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('HubSpot API Response:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText
        });
        throw new Error(`HubSpot API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('HubSpot Response:', data); // Para debug

      // La estructura de respuesta en v3 es diferente
      const posts = data.results || [];
      
      return posts
        .filter((post: any) => {
          // Filtrar por idioma si es necesario
          if (!language || language === 'en') return true;
          return post.slug?.includes(language);
        })
        .map((post: any) => this.transformPost(post, language));

    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }

  // Obtener post individual por ID
  async getPostById(postId: string): Promise<BlogPost | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/${postId}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          next: { revalidate: 3600 }
        }
      );

      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`HubSpot API error: ${response.status}`);
      }

      const post = await response.json();
      return this.transformPost(post, 'en');

    } catch (error) {
      console.error('Error fetching post:', error);
      return null;
    }
  }

  // Buscar post por slug (necesita búsqueda personalizada)
  async getPostBySlug(slug: string, language: string): Promise<BlogPost | null> {
    try {
      // En v3, necesitamos usar search o filtros
      const params = new URLSearchParams({
        limit: '100', // Obtener más posts para buscar
        state: 'PUBLISHED',
      });

      const response = await fetch(
        `${this.baseUrl}?${params}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          next: { revalidate: 3600 }
        }
      );

      if (!response.ok) {
        throw new Error(`HubSpot API error: ${response.status}`);
      }

      const data = await response.json();
      const posts = data.results || [];
      
      const post = posts.find((p: any) => 
        p.slug === slug || 
        p.slug?.endsWith(`/${slug}`) ||
        p.slug?.includes(slug)
      );

      return post ? this.transformPost(post, language) : null;

    } catch (error) {
      console.error('Error fetching post by slug:', error);
      return null;
    }
  }

  private transformPost(hubspotPost: any, language: string): BlogPost {
    return {
      id: hubspotPost.id,
      name: hubspotPost.name || hubspotPost.htmlTitle,
      slug: hubspotPost.slug,
      postBody: hubspotPost.postBody || hubspotPost.content,
      publishDate: hubspotPost.publishDate,
      featuredImage: hubspotPost.featuredImage,
      metaDescription: hubspotPost.metaDescription,
      language: language || 'en',
      tags: hubspotPost.tagIds || [],
      category: hubspotPost.categoryId || null,
    };
  }

  // Método para probar la conexión
  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(
        `${this.baseUrl}?limit=1`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          }
        }
      );

      return response.ok;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }
}