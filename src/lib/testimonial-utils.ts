import { Testimonial } from './supabase-testimonials';

// =====================================================
// RATING UTILITIES
// =====================================================

export function renderStars(rating: number): string {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return '⭐'.repeat(fullStars) +
        (hasHalfStar ? '✨' : '') +
        '☆'.repeat(emptyStars);
}

export function getRatingColor(rating: number): string {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 3.5) return 'text-yellow-600';
    if (rating >= 2.5) return 'text-orange-600';
    return 'text-red-600';
}

export function getRatingLabel(rating: number): string {
    if (rating >= 4.5) return 'Sangat Puas';
    if (rating >= 3.5) return 'Puas';
    if (rating >= 2.5) return 'Cukup';
    return 'Kurang Puas';
}

// =====================================================
// TEXT UTILITIES
// =====================================================

export function truncateText(text: string, maxLength: number = 150): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
}

export function extractKeywords(text: string): string[] {
    // Simple keyword extraction from testimonial text
    const commonWords = ['yang', 'dan', 'untuk', 'dengan', 'dari', 'di', 'ke', 'ini', 'itu', 'sangat', 'juga', 'sudah', 'saya'];
    const words = text.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(word => word.length > 3 && !commonWords.includes(word));

    // Get unique words and return top 5
    return [...new Set(words)].slice(0, 5);
}

// =====================================================
// FILTER & SORT UTILITIES
// =====================================================

export function filterTestimonials(
    testimonials: Testimonial[],
    filters: {
        rating?: number;
        location?: string;
        projectType?: string;
        verified?: boolean;
    }
): Testimonial[] {
    let filtered = [...testimonials];

    if (filters.rating) {
        filtered = filtered.filter(t => t.rating >= filters.rating!);
    }

    if (filters.location) {
        filtered = filtered.filter(t =>
            t.customer_location?.toLowerCase().includes(filters.location!.toLowerCase())
        );
    }

    if (filters.projectType) {
        filtered = filtered.filter(t => t.project_type === filters.projectType);
    }

    if (filters.verified !== undefined) {
        filtered = filtered.filter(t => t.verified === filters.verified);
    }

    return filtered;
}

export function sortTestimonials(
    testimonials: Testimonial[],
    sortBy: 'rating' | 'date' | 'helpful' | 'views'
): Testimonial[] {
    const sorted = [...testimonials];

    switch (sortBy) {
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'date':
            return sorted.sort((a, b) =>
                new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            );
        case 'helpful':
            return sorted.sort((a, b) => b.helpful_count - a.helpful_count);
        case 'views':
            return sorted.sort((a, b) => b.views - a.views);
        default:
            return sorted;
    }
}

// =====================================================
// VALIDATION UTILITIES
// =====================================================

export function validateTestimonial(testimonial: Partial<Testimonial>): {
    valid: boolean;
    errors: string[];
} {
    const errors: string[] = [];

    if (!testimonial.customer_name || testimonial.customer_name.trim().length === 0) {
        errors.push('Nama pelanggan harus diisi');
    }

    if (!testimonial.testimonial_text || testimonial.testimonial_text.trim().length < 10) {
        errors.push('Testimoni minimal 10 karakter');
    }

    if (!testimonial.rating || testimonial.rating < 1 || testimonial.rating > 5) {
        errors.push('Rating harus antara 1-5');
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

// =====================================================
// DATE UTILITIES
// =====================================================

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return date.toLocaleDateString('id-ID', options);
}

export function getRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Hari ini';
    if (diffInDays === 1) return 'Kemarin';
    if (diffInDays < 7) return `${diffInDays} hari yang lalu`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} minggu yang lalu`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} bulan yang lalu`;
    return `${Math.floor(diffInDays / 365)} tahun yang lalu`;
}

// =====================================================
// SEO UTILITIES
// =====================================================

export function generateTestimonialMetadata(testimonial: Testimonial) {
    return {
        title: `Testimoni ${testimonial.customer_name} - ${testimonial.project_type || 'Jaya Sticker'}`,
        description: truncateText(testimonial.testimonial_text, 160),
        keywords: testimonial.keywords.join(', '),
        openGraph: {
            title: `Testimoni ${testimonial.customer_name}`,
            description: truncateText(testimonial.testimonial_text, 200),
            images: testimonial.image_url ? [testimonial.image_url] : [],
            type: 'article'
        }
    };
}

export function generateTestimonialsPageMetadata(totalCount: number, averageRating: number) {
    const baseUrl = 'https://www.jayasticker.id';

    // Enhanced keywords with location-specific and service-specific terms
    const keywords = [
        // Core testimonial keywords
        'testimoni kaca film jogja',
        'review sandblast yogyakarta',
        'testimoni pelanggan jaya sticker',

        // Location-specific
        'testimoni kaca film bantul',
        'review sandblast sleman',
        'testimoni stiker solo',
        'testimoni kaca film magelang',
        'review sandblast klaten',

        // Service-specific
        'testimoni kaca film mobil',
        'review sandblast kaca',
        'testimoni stiker dekoratif',

        // Quality/trust indicators
        'pelanggan puas kaca film',
        'review terpercaya sandblast',
        'testimoni profesional jogja'
    ].join(', ');

    return {
        title: `${totalCount}+ Testimoni Pelanggan Puas | Kaca Film & Sandblast Jogja`,
        description: `Baca ${totalCount}+ testimoni pelanggan kami dengan rating rata-rata ${averageRating}/5. Kualitas terpercaya untuk kaca film, sandblast, dan stiker dekoratif di Yogyakarta, Bantul, Sleman, Solo.`,
        keywords,

        // Canonical URL
        alternates: {
            canonical: `${baseUrl}/testimonials`
        },

        // Robots meta
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-image-preview': 'large',
                'max-snippet': -1,
            }
        },

        // Enhanced OpenGraph
        openGraph: {
            title: `${totalCount}+ Testimoni Pelanggan Puas - Jaya Sticker`,
            description: `Rating ${averageRating}/5 dari ${totalCount}+ pelanggan. Layanan kaca film & sandblast terpercaya di Yogyakarta!`,
            url: `${baseUrl}/testimonials`,
            siteName: 'Jaya Sticker Custom',
            locale: 'id_ID',
            type: 'website',
            images: [
                {
                    url: `${baseUrl}/og-image.jpg`,
                    width: 1200,
                    height: 630,
                    alt: 'Testimoni Pelanggan Jaya Sticker'
                }
            ]
        },

        // Twitter Card
        twitter: {
            card: 'summary_large_image',
            title: `${totalCount}+ Testimoni Pelanggan Puas`,
            description: `Rating ${averageRating}/5 - Kaca Film & Sandblast Terpercaya`,
            images: [`${baseUrl}/og-image.jpg`]
        }
    };
}

