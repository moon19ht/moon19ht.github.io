import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface PostMetadata {
  title: string;
  date: string;
  category: string;
  tags: string[];
  slug: string;
}

export interface Post extends PostMetadata {
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'content');

export function getAllCategories(): string[] {
  const categories = fs.readdirSync(postsDirectory);
  return categories.filter(category => 
    fs.statSync(path.join(postsDirectory, category)).isDirectory()
  );
}

export function getPostsByCategory(category: string): PostMetadata[] {
  const categoryPath = path.join(postsDirectory, category);
  
  if (!fs.existsSync(categoryPath)) {
    return [];
  }

  const files = fs.readdirSync(categoryPath);
  const posts = files
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const slug = file.replace(/\.mdx$/, '');
      const fullPath = path.join(categoryPath, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      
      return {
        slug,
        title: data.title,
        date: data.date,
        category: data.category || category,
        tags: data.tags || [],
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getAllPosts(): PostMetadata[] {
  const categories = getAllCategories();
  const allPosts = categories.flatMap(category => getPostsByCategory(category));
  
  return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(category: string, slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, category, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      slug,
      title: data.title,
      date: data.date,
      category: data.category || category,
      tags: data.tags || [],
      content,
    };
  } catch {
    return null;
  }
}
