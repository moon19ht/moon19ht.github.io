interface PostCardProps {
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt?: string;
  slug: string;
}

export default function PostCard({ title, date, category, tags, excerpt, slug }: PostCardProps) {
  return (
    <article className="border rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
          {category}
        </span>
        <time className="text-gray-500 text-sm">{date}</time>
      </div>
      
      <h2 className="text-xl font-semibold mb-2">
        <a href={`/blog/${slug}`} className="hover:underline">
          {title}
        </a>
      </h2>
      
      {excerpt && (
        <p className="text-gray-600 mb-3">{excerpt}</p>
      )}
      
      <div className="flex flex-wrap gap-1">
        {tags.map((tag) => (
          <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}
