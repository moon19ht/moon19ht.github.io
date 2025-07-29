import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getAllPosts } from '../../../lib/getPosts';
import MDXContent from '../../../components/post/MDXContent';
import CategoryBadge from '../../../components/ui/CategoryBadge';
import TagList from '../../../components/post/TagList';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  
  return posts.map((post) => ({
    slug: `${post.category}-${post.slug}`,
  }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const [category, ...slugParts] = slug.split('-');
  const actualSlug = slugParts.join('-');
  
  const post = getPostBySlug(category, actualSlug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | moon19ht`,
    description: post.content.slice(0, 160) + '...',
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const [category, ...slugParts] = slug.split('-');
  const actualSlug = slugParts.join('-');
  
  const post = getPostBySlug(category, actualSlug);
  
  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* 포스트 헤더 */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <CategoryBadge category={post.category} />
            <time className="text-gray-500">{post.date}</time>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          
          <TagList tags={post.tags} />
        </header>

        {/* 포스트 내용 */}
        <article>
          <MDXContent>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </MDXContent>
        </article>

        {/* 포스트 하단 네비게이션 */}
        <footer className="mt-12 pt-8 border-t">
          <div className="flex justify-between items-center">
            <Link 
              href="/blog"
              className="text-blue-600 hover:underline"
            >
              ← 블로그 목록으로
            </Link>
            
            <div className="text-center">
              <p className="text-gray-600">이 글이 도움이 되었나요?</p>
              <div className="flex gap-2 mt-2">
                <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">
                  👍 도움됨
                </button>
                <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">
                  💡 개선점 있음
                </button>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500">
                마지막 수정: {post.date}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
