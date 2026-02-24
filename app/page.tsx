import { getAuthorsWithPostCountsN1 } from '@/lib/queries'
import { PerformanceMonitor } from '@/components/PerformanceMonitor'
import { AuthorCard } from '@/components/AuthorCard'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
  const { authors, queryCount, totalTimeMs } = await getAuthorsWithPostCountsN1()

  return (
    <>
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Discover Writers
          </h1>
          <p className="text-gray-500">
            Follow your favorite authors and never miss their latest stories
          </p>
        </div>

        <div className="flex items-center gap-4 mb-6 border-b border-gray-200 pb-4">
          <button className="text-gray-900 font-medium pb-2 border-b-2 border-indigo-500">
            All Writers
          </button>
          <button className="text-gray-500 hover:text-gray-700 pb-2 border-b-2 border-transparent">
            Featured
          </button>
          <button className="text-gray-500 hover:text-gray-700 pb-2 border-b-2 border-transparent">
            New This Week
          </button>
          <div className="flex-1" />
          <span className="text-sm text-gray-500">{authors.length} writers</span>
        </div>

        <div className="grid gap-4">
          {authors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>

        {authors.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No writers yet</h3>
            <p className="text-gray-500">Check back soon for amazing content creators</p>
          </div>
        )}
      </main>

      <PerformanceMonitor queryCount={queryCount} totalTimeMs={totalTimeMs} />
    </>
  )
}
