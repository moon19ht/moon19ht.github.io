export default function Projects() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Projects</h1>
        <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          개발한 프로젝트들과 포트폴리오를 소개합니다.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 현재 블로그 프로젝트 */}
          <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-48 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-4xl mb-2">🌕</div>
                <div className="font-semibold">Personal Blog</div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">moon19ht.github.io</h3>
              <p className="text-gray-600 mb-4">
                Next.js와 MDX를 사용한 개인 블로그 및 포트폴리오 사이트
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Next.js</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">MDX</span>
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Tailwind</span>
              </div>
              <div className="flex gap-3">
                <a 
                  href="https://github.com/moon19ht/moon19ht.github.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  GitHub →
                </a>
                <a 
                  href="https://moon19ht.github.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Live Demo →
                </a>
              </div>
            </div>
          </div>

          {/* 프로젝트 placeholder들 */}
          <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow opacity-50">
            <div className="bg-gradient-to-br from-green-500 to-teal-600 h-48 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-4xl mb-2">🚀</div>
                <div className="font-semibold">Coming Soon</div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Project Name</h3>
              <p className="text-gray-600 mb-4">
                새로운 프로젝트를 준비 중입니다.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">TBD</span>
              </div>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow opacity-50">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 h-48 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-4xl mb-2">💡</div>
                <div className="font-semibold">Coming Soon</div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Project Name</h3>
              <p className="text-gray-600 mb-4">
                새로운 프로젝트를 준비 중입니다.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">TBD</span>
              </div>
            </div>
          </div>
        </div>

        {/* GitHub 섹션 */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4">더 많은 프로젝트</h2>
          <p className="text-gray-600 mb-8">
            GitHub에서 더 많은 프로젝트와 코드를 확인하실 수 있습니다.
          </p>
          <a 
            href="https://github.com/moon19ht"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <span>GitHub에서 보기</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
