import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// =====================================================
// TYPES
// =====================================================

export interface Testimonial {
    id: string;
    customer_name: string;
    customer_title?: string;
    customer_location?: string;
    rating: number;
    testimonial_text: string;
    project_type?: string;
    image_url?: string;
    avatar_url?: string;
    keywords: string[];
    featured: boolean;
    verified: boolean;
    published: boolean;
    display_order: number;
    views: number;
    helpful_count: number;
    created_at: string;
    updated_at: string;
}

export interface TestimonialStats {
    total_count: number;
    average_rating: number;
    five_star_count: number;
    four_star_count: number;
    three_star_count: number;
}

// =====================================================
// TESTIMONIAL CRUD FUNCTIONS
// =====================================================

export async function getAllTestimonials(): Promise<Testimonial[]> {
    const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('published', true)
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching testimonials:', error);
        return [];
    }

    return data || [];
}

export async function getFeaturedTestimonials(limit: number = 6): Promise<Testimonial[]> {
    const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('published', true)
        .eq('featured', true)
        .order('display_order', { ascending: true })
        .limit(limit);

    if (error) {
        console.error('Error fetching featured testimonials:', error);
        return [];
    }

    return data || [];
}

export async function getTestimonialById(id: string): Promise<Testimonial | null> {
    const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching testimonial:', error);
        return null;
    }

    // Increment views
    if (data) {
        await supabase.rpc('increment_testimonial_views', { testimonial_id: id });
    }

    return data;
}

export async function getTestimonialsByLocation(location: string): Promise<Testimonial[]> {
    const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('published', true)
        .ilike('customer_location', `%${location}%`)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching testimonials by location:', error);
        return [];
    }

    return data || [];
}

export async function getTestimonialsByProjectType(projectType: string): Promise<Testimonial[]> {
    const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('published', true)
        .eq('project_type', projectType)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching testimonials by project type:', error);
        return [];
    }

    return data || [];
}

export async function getTestimonialsByRating(minRating: number): Promise<Testimonial[]> {
    const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('published', true)
        .gte('rating', minRating)
        .order('rating', { ascending: false })
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching testimonials by rating:', error);
        return [];
    }

    return data || [];
}

// =====================================================
// ADMIN FUNCTIONS (Requires Authentication)
// =====================================================

export async function createTestimonial(testimonial: Partial<Testimonial>): Promise<Testimonial | null> {
    const { data, error } = await supabase
        .from('testimonials')
        .insert([testimonial])
        .select()
        .single();

    if (error) {
        console.error('Error creating testimonial:', error);
        return null;
    }

    return data;
}

export async function updateTestimonial(id: string, updates: Partial<Testimonial>): Promise<Testimonial | null> {
    try {
        const response = await fetch(`/api/admin/testimonials/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Error updating testimonial:', error);
            return null;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating testimonial:', error);
        return null;
    }
}


export async function deleteTestimonial(id: string): Promise<boolean> {
    try {
        const response = await fetch(`/api/admin/testimonials/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Error deleting testimonial:', error);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        return false;
    }
}


// =====================================================
// STATISTICS FUNCTIONS
// =====================================================

export async function getTestimonialStats(): Promise<TestimonialStats> {
    const { data: testimonials, error } = await supabase
        .from('testimonials')
        .select('rating')
        .eq('published', true)
        .eq('verified', true);

    if (error || !testimonials) {
        return {
            total_count: 0,
            average_rating: 0,
            five_star_count: 0,
            four_star_count: 0,
            three_star_count: 0
        };
    }

    const total_count = testimonials.length;
    const average_rating = testimonials.reduce((sum, t) => sum + t.rating, 0) / total_count;
    const five_star_count = testimonials.filter(t => t.rating === 5).length;
    const four_star_count = testimonials.filter(t => t.rating === 4).length;
    const three_star_count = testimonials.filter(t => t.rating === 3).length;

    return {
        total_count,
        average_rating: Math.round(average_rating * 10) / 10,
        five_star_count,
        four_star_count,
        three_star_count
    };
}

// =====================================================
// IMAGE UPLOAD FUNCTIONS
// =====================================================

export async function uploadTestimonialImage(
    file: File,
    type: 'project' | 'avatar'
): Promise<string | null> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${type}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('testimonial-images')
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
        });

    if (uploadError) {
        console.error('Error uploading image:', uploadError);
        return null;
    }

    const { data } = supabase.storage
        .from('testimonial-images')
        .getPublicUrl(filePath);

    return data.publicUrl;
}

export async function deleteTestimonialImage(imageUrl: string): Promise<boolean> {
    // Extract file path from URL
    const urlParts = imageUrl.split('/');
    const filePath = urlParts[urlParts.length - 1];

    const { error } = await supabase.storage
        .from('testimonial-images')
        .remove([filePath]);

    if (error) {
        console.error('Error deleting image:', error);
        return false;
    }

    return true;
}

// =====================================================
// SCHEMA GENERATION HELPERS
// =====================================================

export function generateReviewSchema(testimonial: Testimonial) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Review',
        reviewRating: {
            '@type': 'Rating',
            ratingValue: testimonial.rating,
            bestRating: 5,
            worstRating: 1
        },
        author: {
            '@type': 'Person',
            name: testimonial.customer_name
        },
        reviewBody: testimonial.testimonial_text,
        datePublished: testimonial.created_at,
        itemReviewed: {
            '@type': 'LocalBusiness',
            name: 'Jaya Sticker Custom - Interior Film Solutions',
            image: 'https://www.jayasticker.id/logo.png',
            address: {
                '@type': 'PostalAddress',
                addressLocality: 'Yogyakarta',
                addressCountry: 'Indonesia'
            }
        }
    };
}

export function generateAggregateRatingSchema(stats: TestimonialStats) {
    return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'Jaya Sticker Custom - Interior Film Solutions',
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: stats.average_rating,
            reviewCount: stats.total_count,
            bestRating: 5,
            worstRating: 1
        }
    };
}
