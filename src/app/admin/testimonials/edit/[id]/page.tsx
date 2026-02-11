import { redirect } from "next/navigation";
import TestimonialForm from "@/components/admin/TestimonialForm";
import { getTestimonialByIdAdmin } from "@/lib/supabase-testimonials";

export const dynamic = "force-dynamic";

export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
    // Fetch testimonial data on the server
    const testimonial = await getTestimonialByIdAdmin(params.id);

    // If testimonial not found, redirect to list
    if (!testimonial) {
        redirect("/admin/testimonials");
    }

    return <TestimonialForm mode="edit" testimonial={testimonial} />;
}
