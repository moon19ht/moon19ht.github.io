import Link from 'next/link';

export default function Blog() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>
        <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          개발 과정에서 배운 것들, 기술 팁, 그리고 앞으로의 계획을 공유합니다.
        </p>

        {/* 카테고리 필터 */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            전체
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
            📚 학습 기록
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
            🧰 기술 팁
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
            🌱 앞으로의 계획
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
            🧠 아이디어 스케치
          </button>
        </div>

        {/* 블로그 포스트 목록 */}
        <div className="space-y-6">
          {/* Example post */}
          <article className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                아이디어 스케치
              </span>
              <time className="text-gray-500 text-sm">2025-06-26</time>
            </div>
            
            <h2 className="text-2xl font-semibold mb-3">
              <Link href="/blog/ideas-example-post" className="hover:underline">
                MDX와 Next.js로 블로그 만들기
              </Link>
            </h2>
            
            <p className="text-gray-600 mb-4">
              Next.js와 MDX를 사용하여 개인 블로그를 구축하는 방법에 대해 알아보겠습니다. 
              MDX는 마크다운에 JSX 컴포넌트를 추가할 수 있는 형식으로, 정적 사이트의 성능과 
              동적 컴포넌트의 장점을 모두 얻을 수 있습니다.
            </p>
            
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                #next.js
              </span>
              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                #mdx
              </span>
              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                #tailwind
              </span>
              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                #blog
              </span>
            </div>
          </article>

          {/* Placeholder posts */}
          <article className="border rounded-lg p-6 hover:shadow-md transition-shadow opacity-50">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                학습 기록
              </span>
              <time className="text-gray-500 text-sm">Coming Soon</time>
            </div>
            
            <h2 className="text-2xl font-semibold mb-3">
              <span className="text-gray-400">더 많은 글이 준비 중입니다</span>
            </h2>
            
            <p className="text-gray-400 mb-4">
              새로운 학습 내용과 기술 팁들을 정리하여 곧 공유할 예정입니다.
            </p>
          </article>
        </div>

        {/* 검색 및 더 보기 */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            더 많은 글들이 곧 추가될 예정입니다.
          </p>
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="글 검색..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
