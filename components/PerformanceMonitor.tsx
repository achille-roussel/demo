type PerformanceMonitorProps = {
  queryCount: number
  totalTimeMs: number
}

export function PerformanceMonitor({ queryCount, totalTimeMs }: PerformanceMonitorProps) {
  const seconds = (totalTimeMs / 1000).toFixed(2)
  const isSlowLoad = totalTimeMs > 1000

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`${isSlowLoad ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'} border backdrop-blur-sm rounded-lg shadow-lg overflow-hidden max-w-sm`}>
        <div className={`${isSlowLoad ? 'bg-red-100' : 'bg-gray-50'} px-4 py-2 border-b ${isSlowLoad ? 'border-red-200' : 'border-gray-200'} flex items-center gap-2`}>
          <div className={`w-2 h-2 rounded-full ${isSlowLoad ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
          <span className="text-xs font-medium text-gray-600">Performance Monitor</span>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className={`text-2xl font-bold ${isSlowLoad ? 'text-red-600' : 'text-gray-900'}`}>{queryCount}</div>
              <div className="text-xs text-gray-500">DB Queries</div>
            </div>
            <div>
              <div className={`text-2xl font-bold ${isSlowLoad ? 'text-amber-600' : 'text-gray-900'}`}>{seconds}s</div>
              <div className="text-xs text-gray-500">Load Time</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
