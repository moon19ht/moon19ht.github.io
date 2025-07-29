interface TagListProps {
  tags: string[];
  onTagClick?: (tag: string) => void;
}

export default function TagList({ tags, onTagClick }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagClick?.(tag)}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full transition-colors"
        >
          #{tag}
        </button>
      ))}
    </div>
  );
}
