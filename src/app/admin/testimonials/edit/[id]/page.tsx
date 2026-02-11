import { redirect } from "next/navigation";
import TestimonialForm from "@/components/admin/TestimonialForm";
import { getTestimonialById } from "@/lib/supabase-testimonials";

export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
    // Fetch testimonial data on the server
    const testimonial = await getTestimonialById(params.id);

    // If testimonial not found, redirect to list
    if (!testimonial) {
        redirect("/admin/testimonials");
    }

    return <TestimonialForm mode="edit" testimonial={testimonial} />;
}
