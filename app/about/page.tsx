export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About me</h1>
        
        <div className="prose prose-lg max-w-none">
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">안녕하세요! 👋</h2>
            <p className="text-lg text-gray-600 mb-6">
              저는 <strong>moon19ht</strong>입니다. 개발자로서의 여정을 기록하고, 
              배운 것들을 정리하며, 앞으로의 계획을 세워나가는 공간을 만들고 있습니다.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">관심 분야</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-medium mb-3">🖥️ Frontend Development</h3>
                <p className="text-gray-600">
                  React, Next.js, TypeScript를 활용한 모던 웹 개발에 관심이 많습니다.
                  사용자 경험을 중시하며, 접근성과 성능을 고려한 개발을 추구합니다.
                </p>
              </div>
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-medium mb-3">🎨 UI/UX Design</h3>
                <p className="text-gray-600">
                  직관적이고 아름다운 인터페이스 설계에 관심이 있습니다.
                  디자인 시스템과 컴포넌트 기반 개발을 선호합니다.
                </p>
              </div>
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-medium mb-3">⚡ Performance</h3>
                <p className="text-gray-600">
                  웹 성능 최적화와 Core Web Vitals 개선에 관심이 많습니다.
                  빠르고 효율적인 웹 애플리케이션 구축을 목표로 합니다.
                </p>
              </div>
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-medium mb-3">📚 Continuous Learning</h3>
                <p className="text-gray-600">
                  새로운 기술과 트렌드를 지속적으로 학습하고 있습니다.
                  배운 것들을 정리하고 공유하는 것을 좋아합니다.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">기술 스택</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  {['JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'HTML5', 'CSS3'].map(tech => (
                    <span key={tech} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Tools & Others</h3>
                <div className="flex flex-wrap gap-2">
                  {['Git', 'GitHub', 'VS Code', 'Figma', 'Vercel', 'Node.js'].map(tool => (
                    <span key={tool} className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">연락하기</h2>
            <p className="text-gray-600 mb-4">
              궁금한 점이나 협업 제안이 있으시면 언제든 연락해 주세요!
            </p>
            <div className="flex gap-4">
              <a 
                href="https://github.com/moon19ht" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                GitHub
              </a>
              <a 
                href="mailto:contact@example.com"
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
