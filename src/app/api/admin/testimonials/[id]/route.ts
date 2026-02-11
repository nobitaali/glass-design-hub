import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // Bypasses RLS
);

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const updates = await request.json();

        console.log('PATCH request received for ID:', params.id);
        console.log('Updates:', updates);

        // Add updated_at timestamp
        const updateData = {
            ...updates,
            updated_at: new Date().toISOString(),
        };

        console.log('Attempting update with Service Role Key...');
        const { data, error } = await supabase
            .from('testimonials')
            .update(updateData)
            .eq('id', params.id)
            .select()
            .single();

        console.log('Update result:', { data, error });

        if (error) {
            console.error('Error updating testimonial:', error);
            // Handle specific PGRST116 error
            if (error.code === 'PGRST116') {
                return NextResponse.json({ error: 'Testimonial not found or no changes made' }, { status: 404 });
            }
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        if (!data) {
            console.error('No data returned after update');
            return NextResponse.json({ error: 'Testimonial not found or no changes made' }, { status: 404 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error in PATCH handler:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { error } = await supabase
            .from('testimonials')
            .delete()
            .eq('id', params.id);

        if (error) {
            console.error('Error deleting testimonial:', error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error in DELETE handler:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
