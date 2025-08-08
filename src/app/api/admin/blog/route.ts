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

// GET - Get all blog posts
export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json(
        { error: `Failed to fetch posts: ${error.message}` },
        { status: 400 }
      )
    }

    return NextResponse.json({ data })

  } catch (error) {
    console.error('Get blog posts error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new blog post
export async function POST(request: NextRequest) {
  try {
    const postData = await request.json()

    // Ensure required fields are present
    if (!postData.title || !postData.content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    // Set default values for fields that might be missing
    const blogPost = {
      ...postData,
      views: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      // Ensure author_id is set if not provided
      author_id: postData.author_id || null
    }

    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .insert([blogPost])
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: `Failed to create post: ${error.message}` },
        { status: 400 }
      )
    }

    return NextResponse.json({ 
      success: true,
      data 
    })

  } catch (error) {
    console.error('Create blog post error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}