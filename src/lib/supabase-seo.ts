import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// =====================================================
// TYPES
// =====================================================

export interface SEOMetadata {
  id: string;
  page_path: string;
  page_type: 'homepage' | 'location' | 'blog' | 'product' | 'service' | 'other';
  meta_title: string;
  meta_description: string;
  meta_keywords: string[];
  canonical_url?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  og_type?: string;
  twitter_card?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  schema_type?: string;
  schema_data?: any;
  robots?: string;
  priority?: number;
  change_frequency?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface LocationPage {
  id: string;
  name: string;
  slug: string;
  province: string;
  latitude?: number;
  longitude?: number;
  address?: string;
  postal_code?: string;
  title: string;
  description: string;
  content?: string;
  hero_image?: string;
  meta_title?: string;
  meta_description?: string;
  keywords: string[];
  service_areas: string[];
  phone?: string;
  email?: string;
  opening_hours?: string;
  featured: boolean;
  published: boolean;
  display_order: number;
  views: number;
  created_at: string;
  updated_at: string;
}

export interface SEOKeyword {
  id: string;
  keyword: string;
  keyword_type: 'primary' | 'secondary' | 'long-tail' | 'branded';
  category?: string;
  search_volume: number;
  difficulty: number;
  current_ranking?: number;
  target_ranking: number;
  competitor_urls: string[];
  competitor_rankings?: any;
  target_pages: string[];
  monthly_searches: number;
  click_through_rate: number;
  conversion_rate: number;
  last_checked?: string;
  created_at: string;
  updated_at: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  target_pages: string[];
  location_specific?: string;
  display_order: number;
  featured: boolean;
  published: boolean;
  include_in_schema: boolean;
  views: number;
  helpful_count: number;
  not_helpful_count: number;
  created_at: string;
  updated_at: string;
}

// =====================================================
// SEO METADATA FUNCTIONS
// =====================================================

export async function getSEOMetadata(pagePath: string): Promise<SEOMetadata | null> {
  const { data, error } = await supabase
    .from('seo_metadata')
    .select('*')
    .eq('page_path', pagePath)
    .eq('published', true)
    .single();

  if (error) {
    console.error('Error fetching SEO metadata:', error);
    return null;
  }

  return data;
}

export async function getAllSEOMetadata(): Promise<SEOMetadata[]> {
  const { data, error } = await supabase
    .from('seo_metadata')
    .select('*')
    .eq('published', true)
    .order('priority', { ascending: false });

  if (error) {
    console.error('Error fetching all SEO metadata:', error);
    return [];
  }

  return data || [];
}

// =====================================================
// LOCATION PAGES FUNCTIONS
// =====================================================

export async function getLocationPage(slug: string): Promise<LocationPage | null> {
  const { data, error } = await supabase
    .from('location_pages')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error) {
    console.error('Error fetching location page:', error);
    return null;
  }

  // Increment views
  if (data) {
    await supabase
      .from('location_pages')
      .update({ views: data.views + 1 })
      .eq('id', data.id);
  }

  return data;
}

export async function getAllLocationPages(): Promise<LocationPage[]> {
  const { data, error } = await supabase
    .from('location_pages')
    .select('*')
    .eq('published', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching location pages:', error);
    return [];
  }

  return data || [];
}

export async function getFeaturedLocationPages(): Promise<LocationPage[]> {
  const { data, error } = await supabase
    .from('location_pages')
    .select('*')
    .eq('published', true)
    .eq('featured', true)
    .order('display_order', { ascending: true })
    .limit(3);

  if (error) {
    console.error('Error fetching featured location pages:', error);
    return [];
  }

  return data || [];
}

// =====================================================
// SEO KEYWORDS FUNCTIONS
// =====================================================

export async function getKeywordsByCategory(category: string): Promise<SEOKeyword[]> {
  const { data, error } = await supabase
    .from('seo_keywords')
    .select('*')
    .eq('category', category)
    .order('search_volume', { ascending: false });

  if (error) {
    console.error('Error fetching keywords by category:', error);
    return [];
  }

  return data || [];
}

export async function getPrimaryKeywords(): Promise<SEOKeyword[]> {
  const { data, error } = await supabase
    .from('seo_keywords')
    .select('*')
    .eq('keyword_type', 'primary')
    .order('search_volume', { ascending: false });

  if (error) {
    console.error('Error fetching primary keywords:', error);
    return [];
  }

  return data || [];
}

export async function getKeywordsForPage(pagePath: string): Promise<SEOKeyword[]> {
  const { data, error } = await supabase
    .from('seo_keywords')
    .select('*')
    .contains('target_pages', [pagePath])
    .order('keyword_type', { ascending: true });

  if (error) {
    console.error('Error fetching keywords for page:', error);
    return [];
  }

  return data || [];
}

// =====================================================
// FAQ FUNCTIONS
// =====================================================

export async function getFAQsByCategory(category: string): Promise<FAQItem[]> {
  const { data, error } = await supabase
    .from('faq_items')
    .select('*')
    .eq('category', category)
    .eq('published', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching FAQs by category:', error);
    return [];
  }

  return data || [];
}

export async function getFAQsForPage(pagePath: string): Promise<FAQItem[]> {
  const { data, error } = await supabase
    .from('faq_items')
    .select('*')
    .contains('target_pages', [pagePath])
    .eq('published', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching FAQs for page:', error);
    return [];
  }

  return data || [];
}

export async function getFAQsForSchema(pagePath?: string): Promise<FAQItem[]> {
  let query = supabase
    .from('faq_items')
    .select('*')
    .eq('published', true)
    .eq('include_in_schema', true)
    .order('display_order', { ascending: true });

  if (pagePath) {
    query = query.contains('target_pages', [pagePath]);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching FAQs for schema:', error);
    return [];
  }

  return data || [];
}

export async function getFAQsByLocation(location: string): Promise<FAQItem[]> {
  const { data, error } = await supabase
    .from('faq_items')
    .select('*')
    .or(`location_specific.eq.${location},location_specific.is.null`)
    .eq('published', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching FAQs by location:', error);
    return [];
  }

  return data || [];
}

export async function incrementFAQHelpful(faqId: string, helpful: boolean): Promise<void> {
  const field = helpful ? 'helpful_count' : 'not_helpful_count';
  
  const { data: currentData } = await supabase
    .from('faq_items')
    .select(field)
    .eq('id', faqId)
    .single();

  if (currentData) {
    const newCount = (currentData[field] || 0) + 1;
    await supabase
      .from('faq_items')
      .update({ [field]: newCount })
      .eq('id', faqId);
  }
}

// =====================================================
// SCHEMA GENERATION HELPERS
// =====================================================

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

export function generateLocalBusinessSchema(location: LocationPage) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `Interior Solutions Indonesia - ${location.name}`,
    description: location.description,
    url: `https://www.jayasticker.id/lokasi/${location.slug}`,
    telephone: location.phone || '+62851-5627-5565',
    email: location.email || 'jayastiker25@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address || '',
      addressLocality: location.name,
      addressRegion: location.province,
      postalCode: location.postal_code || '',
      addressCountry: 'Indonesia'
    },
    geo: location.latitude && location.longitude ? {
      '@type': 'GeoCoordinates',
      latitude: location.latitude.toString(),
      longitude: location.longitude.toString()
    } : undefined,
    areaServed: location.service_areas.map(area => ({
      '@type': 'City',
      name: area
    })),
    openingHours: location.opening_hours || 'Mo-Su 00:00-23:59',
    priceRange: '$'
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://www.jayasticker.id${item.url}`
    }))
  };
}
