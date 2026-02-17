type TimingDisplayProps = {
  queryCount: number
  totalTimeMs: number
  authorCount: number
}

export function TimingDisplay({ queryCount, totalTimeMs, authorCount }: TimingDisplayProps) {
  const seconds = (totalTimeMs / 1000).toFixed(2)

  return (
    <div className="bg-red-900/50 border border-red-500 rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-red-400 mb-4">
        N+1 Query Problem Detected
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-4xl font-bold text-red-400">{queryCount}</div>
          <div className="text-gray-400 mt-1">Database Queries</div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-4xl font-bold text-yellow-400">{seconds}s</div>
          <div className="text-gray-400 mt-1">Total Load Time</div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-4xl font-bold text-blue-400">{authorCount}</div>
          <div className="text-gray-400 mt-1">Authors Loaded</div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-300 mb-2">What's happening?</h3>
        <p className="text-gray-400 text-sm">
          This page executes <span className="text-red-400 font-mono">1 query</span> to fetch all authors,
          then <span className="text-red-400 font-mono">{authorCount} additional queries</span> to count
          each author's posts. That's <span className="text-red-400 font-mono">{queryCount} total queries</span> when
          it could be done with <span className="text-green-400 font-mono">1 query</span> using a JOIN or subquery.
        </p>
      </div>
    </div>
  )
}
