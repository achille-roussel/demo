import { supabase, Author, AuthorWithPostCount } from './supabase'

export type QueryResult = {
  authors: AuthorWithPostCount[]
  queryCount: number
  totalTimeMs: number
}

export async function getAuthorsWithPostCountsN1(): Promise<QueryResult> {
  const startTime = performance.now()
  let queryCount = 0

  // Query 1: Get all authors
  queryCount++
  const { data: authors, error: authorsError } = await supabase
    .from('authors')
    .select('*')
    .order('name')

  if (authorsError) {
    throw new Error(`Failed to fetch authors: ${authorsError.message}`)
  }

  if (!authors || authors.length === 0) {
    return { authors: [], queryCount, totalTimeMs: performance.now() - startTime }
  }

  // N queries: One for EACH author to get their post count
  // This is the N+1 problem!
  const authorsWithCounts = await Promise.all(
    authors.map(async (author: Author) => {
      queryCount++
      const { count, error: countError } = await supabase
        .from('posts')
        .select('*', { count: 'exact', head: true })
        .eq('author_id', author.id)

      if (countError) {
        console.error(`Failed to fetch post count for author ${author.id}:`, countError)
        return { ...author, postCount: 0 }
      }

      return { ...author, postCount: count ?? 0 }
    })
  )

  const totalTimeMs = performance.now() - startTime

  return {
    authors: authorsWithCounts,
    queryCount,
    totalTimeMs,
  }
}
