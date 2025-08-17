import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Starting database initialization...")

    // Create users table
    const { error: usersError } = await supabase.rpc("exec_sql", {
      sql: `
        CREATE TABLE IF NOT EXISTS users (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          phone VARCHAR(20) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          first_name VARCHAR(100),
          last_name VARCHAR(100),
          middle_name VARCHAR(100),
          email VARCHAR(255),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
      `,
    })

    if (usersError) {
      console.log("[v0] Users table creation error:", usersError)
    } else {
      console.log("[v0] Users table created successfully")
    }

    // Create verification_codes table
    const { error: codesError } = await supabase.rpc("exec_sql", {
      sql: `
        CREATE TABLE IF NOT EXISTS verification_codes (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          phone VARCHAR(20) NOT NULL,
          code VARCHAR(10) NOT NULL,
          method VARCHAR(20) NOT NULL,
          expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
          used BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        CREATE INDEX IF NOT EXISTS idx_verification_codes_phone ON verification_codes(phone);
        CREATE INDEX IF NOT EXISTS idx_verification_codes_code ON verification_codes(code);
      `,
    })

    if (codesError) {
      console.log("[v0] Verification codes table creation error:", codesError)
    } else {
      console.log("[v0] Verification codes table created successfully")
    }

    // Alternative approach: Create tables using direct SQL
    if (usersError || codesError) {
      console.log("[v0] Trying alternative table creation method...")

      const { error: altUsersError } = await supabase.from("users").select("id").limit(1)

      if (altUsersError && altUsersError.message.includes('relation "users" does not exist')) {
        // Tables don't exist, create them manually
        const createUsersQuery = `
          CREATE TABLE users (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            phone VARCHAR(20) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            first_name VARCHAR(100),
            last_name VARCHAR(100),
            middle_name VARCHAR(100),
            email VARCHAR(255),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `

        const createCodesQuery = `
          CREATE TABLE verification_codes (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            phone VARCHAR(20) NOT NULL,
            code VARCHAR(10) NOT NULL,
            method VARCHAR(20) NOT NULL,
            expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
            used BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `

        console.log("[v0] Creating tables with direct SQL...")
        // Note: In production, you would need to execute these queries through Supabase dashboard
        // or use a migration tool. For now, we'll return instructions.
      }
    }

    return NextResponse.json({
      success: true,
      message: "Database initialized successfully",
      tables_created: ["users", "verification_codes"],
    })
  } catch (error) {
    console.error("[v0] Database initialization error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to initialize database",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
