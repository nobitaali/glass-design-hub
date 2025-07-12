import { MetadataRoute } from 'next'
import { productService } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.jayasticker.id'
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    }
  ]

  // Dynamic product pages
  try {
    const productSlugs = await productService.getAllProductSlugs()
    const productPages: MetadataRoute.Sitemap = productSlugs.map(slug => ({
      url: `${baseUrl}/product/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9
    }))

    return [
      ...staticPages,
      ...productPages
    ]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return staticPages
  }
}