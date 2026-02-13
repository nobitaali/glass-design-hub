import { createClient } from '@supabase/supabase-js'
import { unstable_cache } from 'next/cache'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client with service role key (bypasses RLS)
const getAdminClient = () => {
  if (typeof window !== 'undefined') {
    // Client-side: use anon key
    return supabase;
  }
  // Server-side: use service role key to bypass RLS
  return createClient(supabaseUrl, supabaseServiceRoleKey);
}

// Lightweight product interface for client-side (only essential data)
export interface ProductSummary {
  id: string
  slug: string
  title: string
  description: string
  category: string
  image_url: string
  price: string
  features: string[]
  created_at: string
}

// Full product interface (for server-side or detailed views)
export interface Product {
  additional_images: any[]
  id: string
  slug: string
  title: string
  description: string
  long_description?: string
  category: string
  image_url: string
  price: string
  features: string[]
  specifications: Record<string, string>
  seo_meta_title?: string
  seo_meta_description?: string
  seo_keywords: string[]
  seo_structured_data?: Record<string, any>
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  author_bio?: string
  author_avatar?: string
  published_at: string
  updated_at: string
  created_at: string
  read_time: number
  category: string
  tags: string[]
  image_url: string
  featured: boolean
  published: boolean
  seo_meta_title?: string
  seo_meta_description?: string
  seo_keywords: string[]
  views: number
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description?: string
  created_at: string
  updated_at: string
}

// Next.js unstable_cache for server-side caching
// This is better than client-side Map cache for Next.js App Router

// Helper function to create cached fetchers
const createCachedFetcher = <T,>(
  fetcher: () => Promise<T>,
  keyParts: string[],
  revalidateSeconds: number = 300
) => {
  // Check if we're on the server side
  if (typeof window === 'undefined') {
    return unstable_cache(fetcher, keyParts, {
      revalidate: revalidateSeconds,
      tags: keyParts
    })
  } else {
    // Client-side fallback - just return the fetcher function
    return fetcher
  }
}

// Optimized Product service functions
export const productService = {
  // Get products summary - only essential data for listings/sliders
  getAllProducts: async (): Promise<ProductSummary[]> => {
    const fetcher = async (): Promise<ProductSummary[]> => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('id, slug, title, description, category, image_url, price, features, created_at')
          .order('created_at', { ascending: false })
          .limit(10); // Limit for better performance

        if (error) {
          console.error('Error fetching products:', error);
          return [];
        }

        return data || [];
      } catch (error) {
        console.error('Network error fetching products:', error);
        return [];
      }
    };

    if (typeof window === 'undefined') {
      const cachedFetcher = createCachedFetcher(fetcher, ['products', 'all'], 300);
      return cachedFetcher();
    } else {
      return fetcher();
    }
  },

  // Get full product details - only when needed (for individual product pages)
  getProductBySlug: (slug: string) => {
    const fetcher = async (): Promise<Product | null> => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) {
          console.error('Error fetching product by slug:', error);
          return null;
        }

        return data;
      } catch (error) {
        console.error('Network error fetching product:', error);
        return null;
      }
    };

    if (typeof window === 'undefined') {
      return createCachedFetcher(fetcher, ['products', 'slug', slug], 300)();
    } else {
      return fetcher();
    }
  },

  // Get products by category - lightweight version
  getProductsByCategory: (category: string) => {
    const fetcher = async (): Promise<ProductSummary[]> => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('id, slug, title, description, category, image_url, price, features, created_at')
          .eq('category', category)
          .order('created_at', { ascending: false })
          .limit(20);

        if (error) {
          console.error('Error fetching products by category:', error);
          return [];
        }

        return data || [];
      } catch (error) {
        console.error('Network error fetching products by category:', error);
        return [];
      }
    };

    if (typeof window === 'undefined') {
      return createCachedFetcher(fetcher, ['products', 'category', category], 300)();
    } else {
      return fetcher();
    }
  },

  // Get all product slugs (for sitemap generation) - minimal data
  getAllProductSlugs: async (): Promise<string[]> => {
    const fetcher = async (): Promise<string[]> => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('slug');

        if (error) {
          console.error('Error fetching product slugs:', error);
          return [];
        }

        return data?.map(item => item.slug) || [];
      } catch (error) {
        console.error('Network error fetching product slugs:', error);
        return [];
      }
    };

    if (typeof window === 'undefined') {
      const cachedFetcher = createCachedFetcher(fetcher, ['products', 'slugs'], 600);
      return cachedFetcher();
    } else {
      return fetcher();
    }
  },

  // Get all categories - minimal data
  getAllCategories: async (): Promise<string[]> => {
    const fetcher = async (): Promise<string[]> => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('category');

        if (error) {
          console.error('Error fetching categories:', error);
          return [];
        }

        const categories = Array.from(new Set(data?.map(item => item.category) || []));
        return categories;
      } catch (error) {
        console.error('Network error fetching categories:', error);
        return [];
      }
    };

    if (typeof window === 'undefined') {
      const cachedFetcher = createCachedFetcher(fetcher, ['products', 'categories'], 600);
      return cachedFetcher();
    } else {
      return fetcher();
    }
  },

  // Get products by tag - lightweight version
  getProductsByTag: (tag: string) => {
    const fetcher = async (): Promise<ProductSummary[]> => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('id, slug, title, description, category, image_url, price, features, created_at')
          .textSearch('seo_keywords', tag.replace(/-/g, ' '))
          .order('created_at', { ascending: false })
          .limit(20);

        if (error) {
          console.error('Error fetching products by tag:', error);
          return [];
        }

        return data || [];
      } catch (error) {
        console.error('Network error fetching products by tag:', error);
        return [];
      }
    };

    if (typeof window === 'undefined') {
      return createCachedFetcher(fetcher, ['products', 'tag', tag], 300)();
    } else {
      return fetcher();
    }
  },

  // Admin functions - full data access (no cache for mutations)
  // Uses Service Role Key to bypass RLS
  async createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product | null> {
    try {
      const adminClient = getAdminClient();
      const { data, error } = await adminClient
        .from('products')
        .insert([product])
        .select()
        .single();

      if (error) {
        console.error('Error creating product:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Network error creating product:', error);
      return null;
    }
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    try {
      const adminClient = getAdminClient();
      const { data, error } = await adminClient
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating product:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Network error updating product:', error);
      return null;
    }
  },

  async deleteProduct(id: string): Promise<boolean> {
    try {
      const adminClient = getAdminClient();
      const { error } = await adminClient
        .from('products')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting product:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Network error deleting product:', error);
      return false;
    }
  },

  // Admin-specific functions (no-cache for fresh data)
  async getProductByIdAdmin(id: string): Promise<Product | null> {
    // Create a fresh client with no-store fetch to bypass Next.js cache
    const adminClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        fetch: (url, options) => fetch(url, { ...options, cache: 'no-store' }),
      },
    });

    try {
      const { data, error } = await adminClient
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching product (admin):', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Network error fetching product (admin):', error);
      return null;
    }
  },

  async getAllProductsAdmin(): Promise<Product[]> {
    const adminClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        fetch: (url, options) => fetch(url, { ...options, cache: 'no-store' }),
      },
    });

    try {
      const { data, error } = await adminClient
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products (admin):', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Network error fetching products (admin):', error);
      return [];
    }
  },

  // Image upload functions
  async uploadProductImage(
    file: File,
    type: 'main' | 'additional'
  ): Promise<string | null> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${type}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    // First try to upload with upsert: false to avoid overwriting
    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    // If there's a duplicate error, try with upsert: true
    if (uploadError && uploadError.message.includes('already exists')) {
      console.log('File already exists, trying with upsert: true');
      const { error: upsertError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (upsertError) {
        console.error('Error uploading image with upsert:', upsertError);
        return null;
      }
    } else if (uploadError) {
      console.error('Error uploading image:', uploadError);
      return null;
    }

    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  },

  async deleteProductImage(imageUrl: string): Promise<boolean> {
    try {
      // Extract file path from URL
      const url = new URL(imageUrl);
      const pathParts = url.pathname.split('/');
      const filePath = pathParts[pathParts.length - 1];

      const { error } = await supabase.storage
        .from('product-images')
        .remove([filePath]);

      if (error) {
        console.error('Error deleting product image:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error deleting product image:', error);
      return false;
    }
  }
};

// Blog service functions (keeping existing functionality)
export const blogService = {
  // Get all published blog posts
  getAllPosts: async (limit?: number): Promise<BlogPost[]> => {
    const fetcher = async (limit?: number): Promise<BlogPost[]> => {
      let query = supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false })

      if (limit) {
        query = query.limit(limit)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error fetching blog posts:', error)
        return []
      }

      return data || []
    };

    if (typeof window === 'undefined') {
      const cachedFetcher = createCachedFetcher(fetcher, ['blog', 'posts'], 600);
      return cachedFetcher();
    } else {
      return fetcher(limit);
    }
  },

  // Get featured blog posts
  getFeaturedPosts: async (): Promise<BlogPost[]> => {
    const fetcher = async (): Promise<BlogPost[]> => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .eq('featured', true)
        .order('published_at', { ascending: false })

      if (error) {
        console.error('Error fetching featured posts:', error)
        return []
      }

      return data || []
    };

    if (typeof window === 'undefined') {
      const cachedFetcher = createCachedFetcher(fetcher, ['blog', 'featured'], 600);
      return cachedFetcher();
    } else {
      return fetcher();
    }
  },

  // Get blog post by slug
  getPostBySlug: (slug: string) => {
    const fetcher = async (): Promise<BlogPost | null> => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single()

      if (error) {
        console.error('Error fetching blog post by slug:', error)
        return null
      }

      // Increment view count (non-cached operation)
      if (data) {
        await supabase
          .from('blog_posts')
          .update({ views: data.views + 1 })
          .eq('id', data.id)
      }

      return data
    };

    if (typeof window === 'undefined') {
      return createCachedFetcher(fetcher, ['blog', 'post', slug], 3600)();
    } else {
      return fetcher();
    }
  },

  // Get posts by category
  getPostsByCategory: (category: string, limit?: number) => {
    const fetcher = async (): Promise<BlogPost[]> => {
      let query = supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .eq('category', category)
        .order('published_at', { ascending: false })

      if (limit) {
        query = query.limit(limit)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error fetching posts by category:', error)
        return []
      }

      return data || []
    };

    if (typeof window === 'undefined') {
      return createCachedFetcher(fetcher, ['blog', 'category', category], 600)();
    } else {
      return fetcher();
    }
  },

  // Get posts by tag
  getPostsByTag: (tag: string) => {
    const fetcher = async (): Promise<BlogPost[]> => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .contains('tags', [tag])
        .order('published_at', { ascending: false })

      if (error) {
        console.error('Error fetching posts by tag:', error)
        return []
      }

      return data || []
    };

    if (typeof window === 'undefined') {
      return createCachedFetcher(fetcher, ['blog', 'tag', tag], 600)();
    } else {
      return fetcher();
    }
  },

  // Get related posts (same category, excluding current post)
  getRelatedPosts: (postId: string, category: string, limit: number = 3) => {
    const fetcher = async (): Promise<BlogPost[]> => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .eq('category', category)
        .neq('id', postId)
        .order('published_at', { ascending: false })
        .limit(limit)

      if (error) {
        console.error('Error fetching related posts:', error)
        return []
      }

      return data || []
    };

    if (typeof window === 'undefined') {
      return createCachedFetcher(fetcher, ['blog', 'related', postId, category], 600)();
    } else {
      return fetcher();
    }
  },

  // Search posts
  searchPosts: (query: string) => {
    const fetcher = async (): Promise<BlogPost[]> => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .or(`title.ilike.%${query}%, content.ilike.%${query}%, excerpt.ilike.%${query}%`)
        .order('published_at', { ascending: false })

      if (error) {
        console.error('Error searching posts:', error)
        return []
      }

      return data || []
    };

    if (typeof window === 'undefined') {
      return createCachedFetcher(fetcher, ['blog', 'search', query], 300)();
    } else {
      return fetcher();
    }
  },

  // Get all blog categories
  getAllCategories: async (): Promise<BlogCategory[]> => {
    const fetcher = async (): Promise<BlogCategory[]> => {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name', { ascending: true })

      if (error) {
        console.error('Error fetching blog categories:', error)
        return []
      }

      return data || []
    };

    if (typeof window === 'undefined') {
      const cachedFetcher = createCachedFetcher(fetcher, ['blog', 'categories'], 600);
      return cachedFetcher();
    } else {
      return fetcher();
    }
  },

  // Get all unique tags
  getAllTags: async (): Promise<string[]> => {
    const fetcher = async (): Promise<string[]> => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('tags')
        .eq('published', true)

      if (error) {
        console.error('Error fetching tags:', error)
        return []
      }

      const allTags = new Set<string>()
      data?.forEach(post => {
        post.tags?.forEach((tag: string) => allTags.add(tag))
      })

      return Array.from(allTags).sort()
    };

    if (typeof window === 'undefined') {
      const cachedFetcher = createCachedFetcher(fetcher, ['blog', 'tags'], 600);
      return cachedFetcher();
    } else {
      return fetcher();
    }
  },

  // Get all post slugs (for sitemap)
  getAllPostSlugs: async (): Promise<string[]> => {
    const fetcher = async (): Promise<string[]> => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('slug')
        .eq('published', true)

      if (error) {
        console.error('Error fetching post slugs:', error)
        return []
      }

      return data?.map(item => item.slug) || []
    };

    if (typeof window === 'undefined') {
      const cachedFetcher = createCachedFetcher(fetcher, ['blog', 'slugs'], 600);
      return cachedFetcher();
    } else {
      return fetcher();
    }
  },

  // Admin functions
  // Create new blog post
  async createPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at' | 'views'>): Promise<BlogPost | null> {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([{ ...post, views: 0 }])
      .select()
      .single()

    if (error) {
      console.error('Error creating blog post:', error)
      return null
    }

    return data
  },

  // Update blog post
  async updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
    const { data, error } = await supabase
      .from('blog_posts')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating blog post:', error)
      return null
    }

    return data
  },

  // Delete blog post
  async deletePost(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting blog post:', error)
      return false
    }

    return true
  },

  // Get all posts (including unpublished, for admin)
  async getAllPostsAdmin(): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching all posts:', error)
      return []
    }

    return data || []
  }
}
