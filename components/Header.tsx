export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-2">
              <svg className="w-8 h-8 text-indigo-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span className="text-xl font-bold text-gray-900">Inkwell</span>
            </a>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">Discover</a>
              <a href="#" className="text-gray-900 font-medium">Writers</a>
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">Topics</a>
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">Publications</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search writers..."
                className="bg-gray-100 border border-gray-200 rounded-full px-4 py-2 pl-10 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-64"
              />
              <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
              Sign in
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
