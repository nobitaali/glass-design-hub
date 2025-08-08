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

export async function POST(request: NextRequest) {
  try {
    const { userId, name } = await request.json()

    if (!userId || !name) {
      return NextResponse.json(
        { error: 'User ID and name are required' },
        { status: 400 }
      )
    }

    // Add user to admin_users table using service role (bypasses RLS)
    const { error: adminError } = await supabaseAdmin
      .from('admin_users')
      .upsert([
        {
          user_id: userId,
          name: name,
          role: 'admin'
        }
      ], {
        onConflict: 'user_id'
      })

    if (adminError) {
      return NextResponse.json(
        { error: `Error creating admin record: ${adminError.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: `User added as admin successfully`,
      userId: userId
    })

  } catch (error) {
    console.error('Add existing user error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}