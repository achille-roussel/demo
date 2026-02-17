import { AuthorWithPostCount } from '@/lib/supabase'

type AuthorCardProps = {
  author: AuthorWithPostCount
}

export function AuthorCard({ author }: AuthorCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-100">{author.name}</h3>
          <p className="text-gray-400 text-sm">{author.email}</p>
          {author.bio && (
            <p className="text-gray-500 text-sm mt-2 line-clamp-2">{author.bio}</p>
          )}
        </div>
        <div className="ml-4 text-right">
          <div className="text-2xl font-bold text-blue-400">{author.postCount}</div>
          <div className="text-xs text-gray-500">posts</div>
        </div>
      </div>
    </div>
  )
}
