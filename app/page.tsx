import { getAuthorsWithPostCountsN1 } from '@/lib/queries'
import { TimingDisplay } from '@/components/TimingDisplay'
import { AuthorCard } from '@/components/AuthorCard'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
  const { authors, queryCount, totalTimeMs } = await getAuthorsWithPostCountsN1()

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-100 mb-2">
          N+1 Query Demo
        </h1>
        <p className="text-gray-400">
          Watch how the N+1 query problem slows down your application
        </p>
      </header>

      <TimingDisplay
        queryCount={queryCount}
        totalTimeMs={totalTimeMs}
        authorCount={authors.length}
      />

      <section>
        <h2 className="text-2xl font-semibold text-gray-200 mb-4">
          Authors ({authors.length})
        </h2>

        <div className="grid gap-4">
          {authors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>

        {authors.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>No authors found. Run the seed script to populate the database.</p>
            <code className="block mt-2 text-sm bg-gray-800 px-4 py-2 rounded">
              npm run seed
            </code>
          </div>
        )}
      </section>
    </main>
  )
}
