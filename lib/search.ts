// 추후 Fuse.js 또는 FlexSearch 기반 검색 인덱스 구현 예정

import { PostMetadata } from '../types/post';

export interface SearchIndex {
  title: string;
  content: string;
  category: string;
  tags: string[];
  slug: string;
}

export function createSearchIndex(posts: PostMetadata[]): SearchIndex[] {
  // TODO: 검색 인덱스 생성 로직 구현
  return posts.map(post => ({
    title: post.title,
    content: post.excerpt || '',
    category: post.category,
    tags: post.tags,
    slug: post.slug,
  }));
}

export function searchPosts(query: string, posts: SearchIndex[]): SearchIndex[] {
  // TODO: Fuse.js 또는 FlexSearch를 사용한 검색 구현
  const lowercaseQuery = query.toLowerCase();
  
  return posts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.content.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}
