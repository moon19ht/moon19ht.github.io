interface CategoryBadgeProps {
  category: string;
  variant?: 'default' | 'outline';
}

export default function CategoryBadge({ category, variant = 'default' }: CategoryBadgeProps) {
  const baseClasses = 'text-xs px-2 py-1 rounded font-medium';
  const variantClasses = {
    default: 'bg-blue-100 text-blue-800',
    outline: 'border border-blue-300 text-blue-600'
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]}`}>
      {category}
    </span>
  );
}
