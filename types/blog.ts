export interface BlogPost {
  id: string;
  name: string; // título
  slug: string;
  postBody: string; // contenido HTML
  publishDate: string;
  featuredImage?: string;
  metaDescription?: string;
  language: string;
  author?: {
    name: string;
    avatar?: string;
  };
  tags?: string[];
  category?: string;
}