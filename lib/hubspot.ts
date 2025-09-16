// lib/hubspot.ts - VERSIÓN CORREGIDA CON MANEJO ADECUADO DE IDIOMAS
import { BlogPost } from "@/types/blog"

export class HubSpotBlogService {
  private baseUrl = 'https://api.hubapi.com/cms/v3/blogs/posts';
  private apiKey = process.env.HUBSPOT_API_KEY;

  // Método para obtener TODOS los posts (sin filtro de idioma)
  async getAllPosts(limit = 100): Promise<BlogPost[]> {
    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        state: 'PUBLISHED',
        sort: '-publishDate',
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
        const errorText = await response.text();
        console.error('HubSpot API Response:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText
        });
        throw new Error(`HubSpot API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('HubSpot getAllPosts Response:', {
        total: data.total || 0,
        resultsCount: data.results?.length || 0
      });

      const posts = data.results || [];
      
      return posts.map((post: any) => this.transformPost(post));

    } catch (error) {
      console.error('Error fetching all posts:', error);
      return [];
    }
  }

  // Obtener posts con paginación y filtrado mejorado
  async getPostsByLanguage(
    language: string, 
    limit = 10, 
    offset = 0
  ): Promise<BlogPost[]> {
    try {
      // Obtener todos los posts primero
      const allPosts = await this.getAllPosts(100);
      
      // Filtrar por idioma basándose en el slug o propiedades del post
      const filteredPosts = allPosts.filter(post => {
        // Lógica de filtrado por idioma mejorada
        if (language === 'en') {
          // Para inglés: posts que empiecen con "en/" o no tengan prefijo
          return post.slug.startsWith('en/') || 
                 (!post.slug.startsWith('es/') && 
                  !post.slug.startsWith('fr/') &&
                  !post.slug.includes('/es/') &&
                  !post.slug.includes('/fr/')) ||
                 post.language === 'en';
        } else {
          // Para otros idiomas: posts que contengan el prefijo del idioma O que tengan el language correcto
          return post.slug.startsWith(`${language}/`) || 
                 post.slug.includes(`/${language}/`) ||
                 post.language === language;
        }
      });

      console.log(`Posts filtered for ${language}:`, {
        total: allPosts.length,
        filtered: filteredPosts.length,
        posts: filteredPosts.map(p => ({ id: p.id, slug: p.slug, lang: p.language, name: p.name }))
      });

      // Aplicar paginación después del filtrado
      return filteredPosts.slice(offset, offset + limit);

    } catch (error) {
      console.error('Error fetching posts by language:', error);
      return [];
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
      return this.transformPost(post);

    } catch (error) {
      console.error('Error fetching post:', error);
      return null;
    }
  }

  // CORREGIDO: Buscar post por slug CON PRIORIDAD DE IDIOMA
  async getPostBySlug(slug: string, language: string): Promise<BlogPost | null> {
    try {
      // IMPORTANTE: Decodificar el slug de la URL
      const decodedSlug = decodeURIComponent(slug);
      
      console.log(`Searching for slug: "${slug}" (decoded: "${decodedSlug}") in language: "${language}"`);
      
      const allPosts = await this.getAllPosts();
      
      // Paso 1: Buscar posts que coincidan con el slug
      const matchingPosts = allPosts.filter((p: BlogPost) => {
        // Extraer el slug final del post
        let postSlug = p.slug;
        
        // Limpiar el slug para comparación
        if (postSlug.includes('/blog/')) {
          postSlug = postSlug.split('/blog/').pop() || postSlug;
        } else if (postSlug.startsWith('blog/')) {
          postSlug = postSlug.replace('blog/', '');
        }
        
        // Remover prefijos de idioma si existen
        if (postSlug.startsWith(`${language}/`)) {
          postSlug = postSlug.replace(`${language}/`, '');
        } else if (postSlug.startsWith('en/')) {
          postSlug = postSlug.replace('en/', '');
        } else if (postSlug.startsWith('es/')) {
          postSlug = postSlug.replace('es/', '');
        } else if (postSlug.startsWith('fr/')) {
          postSlug = postSlug.replace('fr/', '');
        }
        
        // Comparar con ambas versiones del slug (original y decodificado)
        const matchesOriginal = postSlug === slug;
        const matchesDecoded = postSlug === decodedSlug;
        return matchesOriginal || matchesDecoded;
      });

      console.log(`Found ${matchingPosts.length} posts with matching slug:`, 
        matchingPosts.map(p => ({ id: p.id, slug: p.slug, language: p.language, name: p.name }))
      );

      if (matchingPosts.length === 0) {
        console.log(`No posts found for slug: "${slug}" (decoded: "${decodedSlug}")`);
        return null;
      }

      // Paso 2: Priorizar por idioma exacto
      const exactLanguageMatch = matchingPosts.find(p => p.language === language);
      if (exactLanguageMatch) {
        console.log(`Found exact language match:`, {
          id: exactLanguageMatch.id,
          name: exactLanguageMatch.name,
          slug: exactLanguageMatch.slug,
          language: exactLanguageMatch.language
        });
        return exactLanguageMatch;
      }

      // Paso 3: Buscar por prefijo de idioma en el slug
      const slugLanguageMatch = matchingPosts.find(p => 
        p.slug.startsWith(`${language}/`) || p.slug.includes(`/${language}/`)
      );
      if (slugLanguageMatch) {
        console.log(`Found slug language match:`, {
          id: slugLanguageMatch.id,
          name: slugLanguageMatch.name,
          slug: slugLanguageMatch.slug,
          language: slugLanguageMatch.language
        });
        return slugLanguageMatch;
      }

      // Paso 4: Si no hay match exacto, devolver el primero encontrado como fallback
      const fallbackPost = matchingPosts[0];
      console.log(`Using fallback post (no exact language match):`, {
        id: fallbackPost.id,
        name: fallbackPost.name,
        slug: fallbackPost.slug,
        language: fallbackPost.language,
        requestedLanguage: language
      });
      
      return fallbackPost;

    } catch (error) {
      console.error('Error fetching post by slug:', error);
      return null;
    }
  }

  // Método de transformación mejorado
  private transformPost(hubspotPost: any): BlogPost {
    // Detectar idioma basándose en el slug o propiedades
    let detectedLanguage = 'en'; // Por defecto inglés
    
    if (hubspotPost.slug) {
      if (hubspotPost.slug.startsWith('es/') || hubspotPost.slug.includes('/es/')) {
        detectedLanguage = 'es';
      } else if (hubspotPost.slug.startsWith('fr/') || hubspotPost.slug.includes('/fr/')) {
        detectedLanguage = 'fr';
      } else if (hubspotPost.slug.startsWith('en/') || hubspotPost.slug.includes('/en/')) {
        detectedLanguage = 'en';
      }
    }
    
    // Usar el idioma del post si está disponible, sino usar el detectado
    const finalLanguage = hubspotPost.language || detectedLanguage;

    return {
      id: hubspotPost.id,
      name: hubspotPost.name || hubspotPost.htmlTitle,
      slug: hubspotPost.slug,
      postBody: hubspotPost.postBody || hubspotPost.content,
      publishDate: hubspotPost.publishDate,
      featuredImage: hubspotPost.featuredImage,
      metaDescription: hubspotPost.metaDescription,
      language: finalLanguage,
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