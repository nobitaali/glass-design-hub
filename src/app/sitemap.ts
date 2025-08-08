import { MetadataRoute } from 'next'
import { productService, blogService } from '@/lib/supabase'
import { keywordsToTags } from '@/lib/utils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.glassdesignhub.com'
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/tags`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7
    }
  ]

  try {
    // Get all products
    const products = await productService.getAllProducts()
    
    // Generate product pages
    const productPages: MetadataRoute.Sitemap = products.map(product => ({
      url: `${baseUrl}/product/${product.slug}`,
      lastModified: new Date(product.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.9
    }))

    // Generate tag pages
    const allTags = new Set<string>()
    products.forEach(product => {
      const urlTags = keywordsToTags(product.seo_keywords || [])
      urlTags.forEach(tag => allTags.add(tag))
    })

    const tagPages: MetadataRoute.Sitemap = Array.from(allTags).map(tag => ({
      url: `${baseUrl}/tag/${tag}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8
    }))

    // Get all blog posts
    const blogPosts = await blogService.getAllPosts()
    
    // Generate blog post pages
    const blogPages: MetadataRoute.Sitemap = blogPosts.map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at),
      changeFrequency: 'monthly' as const,
      priority: 0.8
    }))

    return [
      ...staticPages,
      ...productPages,
      ...tagPages,
      ...blogPages
    ]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return staticPages
  }
}