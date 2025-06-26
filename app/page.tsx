import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            안녕하세요, <span className="text-blue-600">moon19ht</span>입니다
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            개발자로서의 학습 과정, 기술 팁, 그리고 앞으로의 계획을 기록하고 공유하는 공간입니다.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/blog" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              블로그 보기
            </Link>
            <Link 
              href="/about" 
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              소개 보기
            </Link>
          </div>
        </section>

        {/* Recent Posts Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">최근 글</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 최근 글들이 여기에 렌더링될 예정 */}
            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="text-sm text-gray-500 mb-2">2025-06-26</div>
              <h3 className="text-xl font-semibold mb-2">
                <Link href="/blog/ideas/example-post" className="hover:underline">
                  MDX와 Next.js로 블로그 만들기
                </Link>
              </h3>
              <p className="text-gray-600 mb-3">
                Next.js와 MDX를 사용하여 개인 블로그를 구축하는 방법에 대해 알아보겠습니다.
              </p>
              <div className="flex gap-2">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">#next.js</span>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">#mdx</span>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">카테고리</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/blog?category=what-i-learned" className="group">
              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow text-center">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">
                  학습 기록
                </h3>
                <p className="text-gray-600">새로 배운 것들을 정리합니다</p>
              </div>
            </Link>
            <Link href="/blog?category=tech-tips" className="group">
              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow text-center">
                <div className="text-4xl mb-4">🧰</div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">
                  기술 팁
                </h3>
                <p className="text-gray-600">실무에서 유용한 팁들을 공유합니다</p>
              </div>
            </Link>
            <Link href="/blog?category=roadmap" className="group">
              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow text-center">
                <div className="text-4xl mb-4">🌱</div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">
                  앞으로의 계획
                </h3>
                <p className="text-gray-600">개발자로서의 성장 계획을 세웁니다</p>
              </div>
            </Link>
            <Link href="/blog?category=ideas" className="group">
              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow text-center">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">
                  아이디어 스케치
                </h3>
                <p className="text-gray-600">새로운 아이디어를 구상하고 정리합니다</p>
              </div>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
