import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

// Create admin client with service role key
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// GET - Get single blog post
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) {
      return NextResponse.json(
        { error: `Post not found: ${error.message}` },
        { status: 404 }
      )
    }

    return NextResponse.json({ data })

  } catch (error) {
    console.error('Get blog post error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new blog post with specific ID
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { title, content, excerpt, status = 'draft', author_id } = await request.json()

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    // Check if post with this ID already exists
    const { data: existingPost } = await supabaseAdmin
      .from('blog_posts')
      .select('id')
      .eq('id', params.id)
      .single()

    if (existingPost) {
      return NextResponse.json(
        { error: 'Post with this ID already exists' },
        { status: 409 }
      )
    }

    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .insert([
        {
          id: params.id,
          title,
          content,
          excerpt,
          status,
          author_id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: `Failed to create post: ${error.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data
    }, { status: 201 })

  } catch (error) {
    console.error('Create blog post error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const updateData = await request.json()

    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .update({
        ...updateData,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: `Failed to update post: ${error.message}` },
        { status: 400 }
      )
    }

    return NextResponse.json({ 
      success: true,
      data 
    })

  } catch (error) {
    console.error('Update blog post error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabaseAdmin
      .from('blog_posts')
      .delete()
      .eq('id', params.id)

    if (error) {
      return NextResponse.json(
        { error: `Failed to delete post: ${error.message}` },
        { status: 400 }
      )
    }

    return NextResponse.json({ 
      success: true,
      message: 'Post deleted successfully'
    })

  } catch (error) {
    console.error('Delete blog post error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}