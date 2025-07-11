import { MetadataRoute } from 'next'
import { getAllProductSlugs } from '@/lib/product-data'

export default function sitemap(): MetadataRoute.Sitemap {
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
  const productPages: MetadataRoute.Sitemap = getAllProductSlugs().map(slug => ({
    url: `${baseUrl}/product/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9
  }))

  return [
    ...staticPages,
    ...productPages
  ]
}