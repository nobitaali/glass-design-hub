import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // Bypasses RLS
);

export async function DELETE(request: NextRequest) {
    try {
        const { imageUrl } = await request.json();

        if (!imageUrl) {
            return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
        }

        console.log('DELETE image request for URL:', imageUrl);

        // Extract file path from URL
        const urlParts = imageUrl.split('/');
        const filePath = urlParts[urlParts.length - 1];

        console.log('Deleting file from storage:', filePath);

        // Check if file exists before attempting to delete
        const { data: fileList } = await supabase.storage
            .from('testimonial-images')
            .list('', { search: filePath });

        if (!fileList || fileList.length === 0) {
            console.log('File not found in storage:', filePath);
            return NextResponse.json({ success: true, message: 'File not found but continuing' });
        }

        const { error } = await supabase.storage
            .from('testimonial-images')
            .remove([filePath]);

        if (error) {
            console.error('Error deleting image from storage:', error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        console.log('Image deleted successfully:', filePath);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error in DELETE image handler:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
