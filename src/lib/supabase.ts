import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface Product {
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