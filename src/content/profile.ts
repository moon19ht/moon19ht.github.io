export type Project = {
  title: string;
  summary: string;
  problem: string;
  approach: string;
  result: string;
  stack: readonly string[];
  status: 'Prototype' | 'In progress' | 'Shipped' | 'Archived';
  links: readonly {
    label: string;
    href: string;
  }[];
};

const projects = [
  {
    title: 'GrantForge',
    summary: '정부지원사업 탐색부터 문서 초안 흐름까지 줄이는 작업대.',
    problem: '지원사업 공고, 자격 조건, 제출 문서가 흩어져 있어 초기 판단과 초안 작성에 시간이 많이 든다.',
    approach: '공고 탐색, 조건 체크, 문서 작성 단계를 하나의 상태 흐름으로 묶고 반복 입력을 구조화했다.',
    result: '프로젝트 적합성 판단과 제출 준비를 빠르게 반복할 수 있는 프로토타입 워크플로를 만들었다.',
    stack: ['React', 'TypeScript', 'Workflow design', 'Document automation'],
    status: 'Prototype',
    links: [
      { label: 'GitHub', href: 'https://github.com/moon19ht' },
      { label: 'Notes', href: 'https://github.com/moon19ht' },
    ],
  },
  {
    title: 'VideoForge',
    summary: '짧은 영상 아이디어를 생성, 구성, 렌더링 단계로 정리하는 자동화 흐름.',
    problem: '반복되는 영상 제작 과정에서 아이디어, 스크립트, 렌더 설정이 매번 새로 흩어진다.',
    approach: '콘텐츠 입력값을 템플릿화하고 Remotion 기반 렌더링 흐름과 연결할 수 있는 구조를 설계했다.',
    result: '반복 가능한 영상 제작 파이프라인의 기준점을 만들고 포트폴리오 히어로 미디어에도 적용했다.',
    stack: ['Remotion', 'React', 'Motion system', 'Static media'],
    status: 'Shipped',
    links: [
      { label: 'Hero media', href: '#top' },
      { label: 'GitHub', href: 'https://github.com/moon19ht' },
    ],
  },
  {
    title: 'SEOForge',
    summary: '검색 의도를 구조화해 일관된 SEO 콘텐츠 초안을 생산하는 시스템.',
    problem: '키워드, 문서 구조, 내부 링크 기준이 분리되어 콘텐츠 품질을 일정하게 유지하기 어렵다.',
    approach: '검색 의도, 제목 후보, 섹션 구조, 검수 기준을 typed content처럼 다룰 수 있게 정리했다.',
    result: '콘텐츠를 빠르게 만들되 제목과 구조를 매번 검증할 수 있는 반복 가능한 제작 루프를 확보했다.',
    stack: ['Content modeling', 'SEO structure', 'TypeScript', 'Automation'],
    status: 'In progress',
    links: [
      { label: 'Outline', href: 'https://github.com/moon19ht' },
      { label: 'GitHub', href: 'https://github.com/moon19ht' },
    ],
  },
  {
    title: 'ContentVault',
    summary: '재사용 가능한 프롬프트, 문장, 콘텐츠 자산을 정리하는 개인 아카이브.',
    problem: '좋은 프롬프트와 문장 패턴을 다시 찾기 어려워 같은 탐색을 반복하게 된다.',
    approach: '자산을 목적, 입력, 출력, 재사용 조건으로 분류하고 나중에 확장 가능한 데이터 모델로 잡았다.',
    result: '작업 맥락을 빠르게 복원하고 실험 결과를 다음 프로젝트로 넘길 수 있는 저장소 구조를 만들었다.',
    stack: ['Knowledge base', 'Prompt archive', 'Markdown', 'Information architecture'],
    status: 'In progress',
    links: [
      { label: 'Archive', href: 'https://github.com/moon19ht' },
      { label: 'GitHub', href: 'https://github.com/moon19ht' },
    ],
  },
] as const satisfies readonly Project[];

export const profile = {
  name: 'MOON19HT',
  eyebrow: 'Personal systems portfolio',
  tagline: 'Builds in motion',
  statement:
    '작게 검증하고 빠르게 구현하는 개발자. systems, automation, and motion-led interfaces.',
  location: 'Seoul, KR / GitHub Pages',
  cta: {
    label: 'View GitHub',
    href: 'https://github.com/moon19ht',
  },
  secondaryCta: {
    label: 'Contact',
    href: 'mailto:hello@moon19ht.dev',
  },
  signals: [
    {
      label: 'Systems',
      value: 'Full-stack surfaces',
      detail: 'Interfaces, services, and deployment paths designed as one working system.',
    },
    {
      label: 'Automation',
      value: 'Repeatable workflows',
      detail: 'Small tools and scripts that compress setup, validation, and shipping loops.',
    },
    {
      label: 'Motion',
      value: 'Remotion-led identity',
      detail: 'Video and interface motion used to explain structure, timing, and intent.',
    },
  ],
  projects,
  rhythm: [
    {
      step: 'Prototype',
      text: '검증할 수 있는 가장 작은 범위를 먼저 정하고 화면으로 확인합니다.',
      points: [
        'Define the smallest testable version',
        'Build the visible surface first',
        'Keep assumptions explicit in notes or issues',
      ],
    },
    {
      step: 'Verify',
      text: '빌드와 실제 상호작용을 확인하면서 약한 가정을 줄입니다.',
      points: [
        'Run the build before calling a change done',
        'Test interaction and responsive layout',
        'Automate repeated checks where the loop is stable',
      ],
    },
    {
      step: 'Ship',
      text: '결과를 배포하거나 보관하고, 다음 사람이 이어갈 수 있게 남깁니다.',
      points: [
        'Document decisions and tradeoffs',
        'Leave a clean extension path in GitHub',
        'Deploy or archive the result with the next step clear',
      ],
    },
  ],
  contact: {
    heading: 'Selected work is still moving.',
    text: 'For collaboration, experiments, or project context, start with GitHub.',
    links: [
      { label: 'GitHub', href: 'https://github.com/moon19ht' },
      { label: 'Email placeholder', href: 'mailto:hello@moon19ht.dev' },
    ],
  },
} as const;

export type Profile = typeof profile;
