import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

// Create admin client with service role key
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // This bypasses RLS
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      )
    }

    // 1. Create user in auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true // Auto-confirm email
    })

    if (authError) {
      // If user already exists, try to get existing user
      if (authError.message.includes('already registered')) {
        const { data: existingUsers, error: listError } = await supabaseAdmin.auth.admin.listUsers()
        
        if (listError) {
          return NextResponse.json(
            { error: `Error finding existing user: ${listError.message}` },
            { status: 400 }
          )
        }

        const existingUser = existingUsers.users.find(user => user?.email === email)
        
        if (!existingUser) {
          return NextResponse.json(
            { error: 'User exists but could not be found' },
            { status: 400 }
          )
        }

        // Use existing user
        const { error: adminError } = await supabaseAdmin
          .from('admin_users')
          .upsert([
            {
              user_id: existingUser.id,
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
          message: `Existing user ${email} added as admin`,
          userId: existingUser.id
        })
      }

      return NextResponse.json(
        { error: `Error creating user: ${authError.message}` },
        { status: 400 }
      )
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      )
    }

    // 2. Create admin record using service role (bypasses RLS)
    const { error: adminError } = await supabaseAdmin
      .from('admin_users')
      .insert([
        {
          user_id: authData.user.id,
          name: name,
          role: 'admin'
        }
      ])

    if (adminError) {
      return NextResponse.json(
        { error: `Error creating admin record: ${adminError.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: `Admin user created successfully`,
      userId: authData.user.id
    })

  } catch (error) {
    console.error('Setup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}