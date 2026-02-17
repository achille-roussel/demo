import { AuthorWithPostCount } from '@/lib/supabase'

type AuthorCardProps = {
  author: AuthorWithPostCount
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function getAvatarColor(name: string): string {
  const colors = [
    'bg-indigo-600',
    'bg-purple-600',
    'bg-pink-600',
    'bg-rose-600',
    'bg-orange-600',
    'bg-amber-600',
    'bg-emerald-600',
    'bg-teal-600',
    'bg-cyan-600',
    'bg-blue-600',
  ]
  const index = name.charCodeAt(0) % colors.length
  return colors[index]
}

export function AuthorCard({ author }: AuthorCardProps) {
  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 hover:bg-gray-800 hover:border-gray-600 transition-all cursor-pointer group">
      <div className="flex gap-4">
        <div className={`w-14 h-14 rounded-full ${getAvatarColor(author.name)} flex items-center justify-center flex-shrink-0`}>
          <span className="text-white font-semibold text-lg">{getInitials(author.name)}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors truncate">
                {author.name}
              </h3>
              <p className="text-gray-500 text-sm truncate">{author.email}</p>
            </div>
            <button className="flex-shrink-0 px-4 py-1.5 border border-gray-600 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 hover:border-gray-500 transition-colors">
              Follow
            </button>
          </div>
          {author.bio && (
            <p className="text-gray-400 text-sm mt-2 line-clamp-2">{author.bio}</p>
          )}
          <div className="flex items-center gap-4 mt-3 text-sm">
            <span className="text-gray-500">
              <span className="text-white font-medium">{author.postCount}</span> articles
            </span>
            <span className="text-gray-500">
              <span className="text-white font-medium">{Math.floor(Math.random() * 10000).toLocaleString()}</span> followers
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
