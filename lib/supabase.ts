import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Author = {
  id: string
  name: string
  email: string
  bio: string | null
  created_at: string
}

export type Post = {
  id: string
  author_id: string
  title: string
  content: string
  published_at: string
}

export type AuthorWithPostCount = Author & {
  postCount: number
}
