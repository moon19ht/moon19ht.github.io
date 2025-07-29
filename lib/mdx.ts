// MDX 컴파일 유틸리티 (추후 구현 예정)

export async function compileMDXContent(source: string) {
  // 현재는 단순히 소스를 반환
  // 추후 @mdx-js/mdx 또는 next/mdx를 사용하여 구현
  return source;
}

export function parseMarkdown(content: string) {
  // 기본적인 마크다운 파싱 (추후 확장)
  return content
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(/\n/gim, '<br>');
}
