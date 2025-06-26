export interface PostMetadata {
  title: string;
  date: string;
  category: string;
  tags: string[];
  slug: string;
  excerpt?: string;
}

export interface Post extends PostMetadata {
  content: string;
}

export interface CategoryInfo {
  name: string;
  slug: string;
  description: string;
  icon?: string;
}
