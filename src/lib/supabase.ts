import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
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


// Product service functions
export const productService = {
  // Get all products
  async getAllProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching products:', error)
      return []
    }

    return data || []
  },

  // Get products by category
  async getProductsByCategory(category: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching products by category:', error)
      return []
    }

    return data || []
  },

  // Get product by slug
  async getProductBySlug(slug: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      console.error('Error fetching product by slug:', error)
      return null
    }

    return data
  },

  // Get all product slugs (for sitemap generation)
  async getAllProductSlugs(): Promise<string[]> {
    const { data, error } = await supabase
      .from('products')
      .select('slug')

    if (error) {
      console.error('Error fetching product slugs:', error)
      return []
    }

    return data?.map(item => item.slug) || []
  },

  // Get all categories
  async getAllCategories(): Promise<string[]> {
    const { data, error } = await supabase
      .from('products')
      .select('category')

    if (error) {
      console.error('Error fetching categories:', error)
      return []
    }

    const categories = Array.from(new Set(data?.map(item => item.category) || []))
    return categories
  },

  // Get products by tag
  async getProductsByTag(tag: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .textSearch('seo_keywords', tag.replace(/-/g, ' '))
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching products by tag:', error)
      return []
    }

    return data || []
  },

  // Create new product (for admin)
  async createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single()

    if (error) {
      console.error('Error creating product:', error)
      return null
    }

    return data
  },

  // Update product (for admin)
  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating product:', error)
      return null
    }

    return data
  },

  // Delete product (for admin)
  async deleteProduct(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting product:', error)
      return false
    }

    return true
  }
}

// Blog service functions
export const blogService = {
  // Get all published blog posts
  async getAllPosts(limit?: number): Promise<BlogPost[]> {
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
  },

  // Get featured blog posts
  async getFeaturedPosts(): Promise<BlogPost[]> {
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
  },

  // Get blog post by slug
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
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

    // Increment view count
    if (data) {
      await supabase
        .from('blog_posts')
        .update({ views: data.views + 1 })
        .eq('id', data.id)
    }

    return data
  },

  // Get posts by category
  async getPostsByCategory(category: string, limit?: number): Promise<BlogPost[]> {
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
  },

  // Get posts by tag
  async getPostsByTag(tag: string): Promise<BlogPost[]> {
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
  },

  // Get related posts (same category, excluding current post)
  async getRelatedPosts(postId: string, category: string, limit: number = 3): Promise<BlogPost[]> {
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
  },

  // Search posts
  async searchPosts(query: string): Promise<BlogPost[]> {
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
  },

  // Get all blog categories
  async getAllCategories(): Promise<BlogCategory[]> {
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching blog categories:', error)
      return []
    }

    return data || []
  },

  // Get all unique tags
  async getAllTags(): Promise<string[]> {
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
  },

  // Get all post slugs (for sitemap)
  async getAllPostSlugs(): Promise<string[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('slug')
      .eq('published', true)

    if (error) {
      console.error('Error fetching post slugs:', error)
      return []
    }

    return data?.map(item => item.slug) || []
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