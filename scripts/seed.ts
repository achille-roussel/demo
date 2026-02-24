import { createClient } from '@supabase/supabase-js'
import { faker } from '@faker-js/faker'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables:')
  console.error('- NEXT_PUBLIC_SUPABASE_URL')
  console.error('- SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const AUTHOR_COUNT = 200
const MIN_POSTS_PER_AUTHOR = 5
const MAX_POSTS_PER_AUTHOR = 15

async function seed() {
  console.log('Starting database seed...')
  console.log(`Creating ${AUTHOR_COUNT} authors with ${MIN_POSTS_PER_AUTHOR}-${MAX_POSTS_PER_AUTHOR} posts each\n`)

  // Clear existing data
  console.log('Clearing existing data...')
  await supabase.from('posts').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await supabase.from('authors').delete().neq('id', '00000000-0000-0000-0000-000000000000')

  // Create authors
  console.log('Creating authors...')
  const authors = Array.from({ length: AUTHOR_COUNT }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    bio: faker.person.bio(),
  }))

  const { data: insertedAuthors, error: authorsError } = await supabase
    .from('authors')
    .insert(authors)
    .select('id')

  if (authorsError) {
    console.error('Failed to insert authors:', authorsError)
    process.exit(1)
  }

  console.log(`Created ${insertedAuthors.length} authors`)

  // Create posts for each author
  console.log('Creating posts...')
  let totalPosts = 0

  for (const author of insertedAuthors) {
    const postCount = faker.number.int({ min: MIN_POSTS_PER_AUTHOR, max: MAX_POSTS_PER_AUTHOR })
    const posts = Array.from({ length: postCount }, () => ({
      author_id: author.id,
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs({ min: 2, max: 5 }),
      published_at: faker.date.past({ years: 2 }).toISOString(),
    }))

    const { error: postsError } = await supabase.from('posts').insert(posts)

    if (postsError) {
      console.error(`Failed to insert posts for author ${author.id}:`, postsError)
    } else {
      totalPosts += postCount
    }
  }

  console.log(`\nSeeding complete!`)
  console.log(`- Authors: ${insertedAuthors.length}`)
  console.log(`- Posts: ${totalPosts}`)
  console.log(`\nThe N+1 query will now execute ${insertedAuthors.length + 1} database queries on each page load.`)
}

seed().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
