'use client';

import { Testimonial } from '@/lib/supabase-testimonials';
import { renderStars, formatDate, truncateText } from '@/lib/testimonial-utils';
import { useState } from 'react';

interface TestimonialCardProps {
    testimonial: Testimonial;
    showFullText?: boolean;
}

export default function TestimonialCard({ testimonial, showFullText = false }: TestimonialCardProps) {
    const [isExpanded, setIsExpanded] = useState(showFullText);
    const displayText = isExpanded
        ? testimonial.testimonial_text
        : truncateText(testimonial.testimonial_text, 150);

    return (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            {/* Header with Avatar and Info */}
            <div className="flex items-start gap-4 mb-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    {testimonial.avatar_url ? (
                        <img
                            src={testimonial.avatar_url}
                            alt={testimonial.customer_name}
                            className="w-14 h-14 rounded-full object-cover border-2 border-primary/20"
                        />
                    ) : (
                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                            {testimonial.customer_name.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>

                {/* Customer Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                {testimonial.customer_name}
                                {testimonial.verified && (
                                    <span className="text-blue-500" title="Verified Customer">
                                        ✓
                                    </span>
                                )}
                            </h3>
                            {testimonial.customer_title && (
                                <p className="text-sm text-muted-foreground">{testimonial.customer_title}</p>
                            )}
                            {testimonial.customer_location && (
                                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                    📍 {testimonial.customer_location}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mt-2">
                        <div className="text-yellow-500 text-lg">
                            {renderStars(testimonial.rating)}
                        </div>
                        <span className="text-sm font-semibold text-foreground">
                            {testimonial.rating}/5
                        </span>
                    </div>
                </div>
            </div>

            {/* Project Type Badge */}
            {testimonial.project_type && (
                <div className="mb-3">
                    <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                        {testimonial.project_type}
                    </span>
                </div>
            )}

            {/* Testimonial Text */}
            <div className="mb-4">
                <p className="text-muted-foreground leading-relaxed">
                    "{displayText}"
                </p>
                {!showFullText && testimonial.testimonial_text.length > 150 && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-primary text-sm font-semibold mt-2 hover:underline"
                    >
                        {isExpanded ? 'Tampilkan lebih sedikit' : 'Baca selengkapnya'}
                    </button>
                )}
            </div>

            {/* Project Image */}
            {testimonial.image_url && (
                <div className="mb-4 rounded-xl overflow-hidden">
                    <img
                        src={testimonial.image_url}
                        alt={`Hasil ${testimonial.project_type || 'proyek'} ${testimonial.customer_name}`}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                </div>
            )}

            {/* Footer with Date and Keywords */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                    {formatDate(testimonial.created_at)}
                </p>
                {testimonial.keywords && testimonial.keywords.length > 0 && (
                    <div className="flex gap-1">
                        {testimonial.keywords.slice(0, 2).map((keyword, index) => (
                            <span
                                key={index}
                                className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded"
                            >
                                #{keyword.split(' ')[0]}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
