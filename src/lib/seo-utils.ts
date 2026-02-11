import { Metadata } from 'next';

// =====================================================
// SEO UTILITIES FOR NEXT.JS
// =====================================================

interface SEOConfig {
    title: string;
    description: string;
    keywords?: string[];
    canonical?: string;
    ogImage?: string;
    ogType?: string;
    twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
    noindex?: boolean;
}

/**
 * Generate Next.js metadata object with SEO best practices
 */
export function generateMetadata(config: SEOConfig): Metadata {
    const {
        title,
        description,
        keywords = [],
        canonical,
        ogImage = 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=630&fit=crop',
        ogType = 'website',
        twitterCard = 'summary_large_image',
        noindex = false
    } = config;

    return {
        title,
        description,
        keywords: keywords.join(', '),
        robots: noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        alternates: {
            canonical: canonical || undefined
        },
        openGraph: {
            title,
            description,
            type: ogType as any,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title
                }
            ],
            locale: 'id_ID',
            siteName: 'Interior Solutions Indonesia'
        },
        twitter: {
            card: twitterCard,
            title,
            description,
            images: [ogImage]
        }
    };
}

/**
 * Generate location-specific metadata
 */
export function generateLocationMetadata(locationName: string, province: string = 'Yogyakarta'): Metadata {
    const title = `Stiker Kaca ${locationName} | Kaca Film & Sandblast Profesional`;
    const description = `Spesialis kaca film, sandblast, dan stiker dekoratif di ${locationName}, ${province}. Pemasangan profesional dengan garansi resmi. Harga terjangkau, kualitas terbaik! Gratis konsultasi & survey.`;

    const keywords = [
        `stiker kaca ${locationName.toLowerCase()}`,
        `kaca film ${locationName.toLowerCase()}`,
        `sandblast ${locationName.toLowerCase()}`,
        `jasa pasang kaca film ${locationName.toLowerCase()}`,
        `stiker dekoratif ${locationName.toLowerCase()}`,
        `kaca film murah ${locationName.toLowerCase()}`,
        `one way vision ${locationName.toLowerCase()}`
    ];

    return generateMetadata({
        title,
        description,
        keywords,
        canonical: `/lokasi/${locationName.toLowerCase()}`,
        ogType: 'website'
    });
}

/**
 * Generate blog post metadata
 */
export function generateBlogMetadata(
    title: string,
    excerpt: string,
    keywords: string[],
    slug: string,
    imageUrl?: string
): Metadata {
    return generateMetadata({
        title: `${title} - Jaya Sticker Indonesia`,
        description: excerpt,
        keywords,
        canonical: `/blog/${slug}`,
        ogImage: imageUrl,
        ogType: 'article',
        twitterCard: 'summary_large_image'
    });
}

/**
 * Extract keywords from text content
 */
export function extractKeywords(text: string, maxKeywords: number = 10): string[] {
    // Remove HTML tags
    const cleanText = text.replace(/<[^>]*>/g, ' ');

    // Common Indonesian stop words to filter out
    const stopWords = new Set([
        'yang', 'dan', 'di', 'dari', 'untuk', 'pada', 'dengan', 'adalah', 'ini', 'itu',
        'ke', 'dalam', 'akan', 'atau', 'juga', 'oleh', 'dapat', 'sebagai', 'telah',
        'ada', 'tidak', 'lebih', 'sudah', 'bisa', 'hanya', 'sangat', 'karena'
    ]);

    // Split into words and filter
    const words = cleanText
        .toLowerCase()
        .split(/\s+/)
        .filter(word => word.length > 3 && !stopWords.has(word));

    // Count word frequency
    const wordCount = new Map<string, number>();
    words.forEach(word => {
        wordCount.set(word, (wordCount.get(word) || 0) + 1);
    });

    // Sort by frequency and return top keywords
    return Array.from(wordCount.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, maxKeywords)
        .map(([word]) => word);
}

/**
 * Generate alt text for images based on context
 */
export function generateImageAlt(
    context: string,
    location?: string,
    service?: string
): string {
    const parts = [];

    if (service) parts.push(service);
    if (location) parts.push(location);
    parts.push(context);
    parts.push('Interior Solutions Indonesia');

    return parts.join(' - ');
}

/**
 * Optimize title for SEO (max 60 characters)
 */
export function optimizeTitle(title: string, brandSuffix: boolean = true): string {
    const maxLength = brandSuffix ? 60 - 25 : 60; // Reserve space for brand
    const suffix = brandSuffix ? ' - Jaya Sticker' : '';

    if (title.length <= maxLength) {
        return title + suffix;
    }

    return title.substring(0, maxLength - 3) + '...' + suffix;
}

/**
 * Optimize description for SEO (max 160 characters)
 */
export function optimizeDescription(description: string): string {
    const maxLength = 160;

    if (description.length <= maxLength) {
        return description;
    }

    // Try to cut at last sentence
    const lastPeriod = description.lastIndexOf('.', maxLength);
    if (lastPeriod > maxLength - 50) {
        return description.substring(0, lastPeriod + 1);
    }

    // Cut at last space
    const lastSpace = description.lastIndexOf(' ', maxLength - 3);
    return description.substring(0, lastSpace) + '...';
}

/**
 * Generate structured data for breadcrumbs
 */
export function generateBreadcrumbStructuredData(
    breadcrumbs: { name: string; url: string }[]
) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.name,
            item: `https://www.jayasticker.id${crumb.url}`
        }))
    };
}

/**
 * Generate canonical URL
 */
export function generateCanonicalUrl(path: string): string {
    const baseUrl = 'https://www.jayasticker.id';
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${baseUrl}${cleanPath}`;
}

/**
 * Validate and sanitize slug
 */
export function sanitizeSlug(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Calculate reading time for blog posts
 */
export function calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const cleanText = content.replace(/<[^>]*>/g, ' ');
    const wordCount = cleanText.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Generate social sharing URLs
 */
export function generateSocialShareUrls(url: string, title: string) {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    return {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`
    };
}

/**
 * Check if content is SEO optimized
 */
export function checkSEOOptimization(config: {
    title: string;
    description: string;
    content: string;
    keywords: string[];
}): {
    score: number;
    issues: string[];
    suggestions: string[];
} {
    const issues: string[] = [];
    const suggestions: string[] = [];
    let score = 100;

    // Check title length
    if (config.title.length < 30) {
        issues.push('Title terlalu pendek (min 30 karakter)');
        score -= 10;
    } else if (config.title.length > 60) {
        issues.push('Title terlalu panjang (max 60 karakter)');
        score -= 10;
    }

    // Check description length
    if (config.description.length < 120) {
        issues.push('Description terlalu pendek (min 120 karakter)');
        score -= 10;
    } else if (config.description.length > 160) {
        issues.push('Description terlalu panjang (max 160 karakter)');
        score -= 10;
    }

    // Check keywords
    if (config.keywords.length < 3) {
        issues.push('Terlalu sedikit keywords (min 3)');
        score -= 10;
    } else if (config.keywords.length > 10) {
        suggestions.push('Pertimbangkan mengurangi jumlah keywords (max 10 optimal)');
        score -= 5;
    }

    // Check content length
    const wordCount = config.content.split(/\s+/).length;
    if (wordCount < 300) {
        issues.push('Konten terlalu pendek (min 300 kata untuk SEO optimal)');
        score -= 15;
    } else if (wordCount > 2000) {
        suggestions.push('Konten sangat panjang, pertimbangkan membagi menjadi beberapa artikel');
    }

    // Check keyword density in content
    const contentLower = config.content.toLowerCase();
    const primaryKeyword = config.keywords[0]?.toLowerCase();
    if (primaryKeyword && !contentLower.includes(primaryKeyword)) {
        issues.push('Primary keyword tidak ditemukan dalam konten');
        score -= 20;
    }

    return { score: Math.max(0, score), issues, suggestions };
}
