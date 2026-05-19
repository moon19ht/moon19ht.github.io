export type ToolchainItem = {
  name: string;
  why: string;
};

export type ToolchainCategory = {
  title: string;
  focus: string;
  items: readonly ToolchainItem[];
};

export const toolchain = [
  {
    title: 'Frontend',
    focus: '작은 인터랙션을 빠르게 만들고, 타입과 빌드로 다시 확인합니다.',
    items: [
      {
        name: 'React',
        why: '상태가 있는 화면을 작게 쪼개고 반복해서 조정하기 좋습니다.',
      },
      {
        name: 'TypeScript',
        why: '콘텐츠 모델과 컴포넌트 계약을 코드 단계에서 먼저 검증합니다.',
      },
      {
        name: 'Vite',
        why: '짧은 피드백 루프로 구현, 확인, 수정 사이의 시간을 줄입니다.',
      },
      {
        name: 'Framer Motion',
        why: '정적인 포트폴리오에도 흐름과 전환의 의도를 남길 수 있습니다.',
      },
    ],
  },
  {
    title: 'Motion / Media',
    focus: '브랜드 감각을 영상 자산으로 만들고 정적 배포에 연결합니다.',
    items: [
      {
        name: 'Remotion',
        why: 'React 방식으로 영상 장면을 구성해 히어로 미디어를 재현 가능하게 만듭니다.',
      },
    ],
  },
  {
    title: 'Automation',
    focus: '반복되는 검증과 준비 작업을 스크립트와 CI 흐름으로 옮깁니다.',
    items: [
      {
        name: 'Python',
        why: '파일 처리, 데이터 정리, 실험용 자동화에 빠르게 적용합니다.',
      },
      {
        name: 'Shell scripting',
        why: '로컬 검증과 배포 전 체크를 짧은 명령 흐름으로 묶습니다.',
      },
      {
        name: 'GitHub Actions',
        why: '빌드와 배포 확인을 저장소 기반 루프로 고정합니다.',
      },
    ],
  },
  {
    title: 'Dev Environment',
    focus: '로컬 환경을 직접 이해하고 네트워크와 가상화까지 통제합니다.',
    items: [
      {
        name: 'Arch Linux',
        why: '개발 환경의 구성 요소를 명확히 알고 필요한 만큼만 유지합니다.',
      },
      {
        name: 'KVM',
        why: '격리된 테스트 환경과 시스템 실험을 빠르게 만들 수 있습니다.',
      },
      {
        name: 'Tailscale',
        why: '장비 사이의 접근 경로를 단순하게 유지해 원격 작업 마찰을 줄입니다.',
      },
    ],
  },
  {
    title: 'Workflow',
    focus: '문서, 코드, 검증 결과가 같은 저장소 안에서 이어지게 합니다.',
    items: [
      {
        name: 'Codex',
        why: '구현과 검증 루프를 짧게 돌리고 변경 이유를 코드와 함께 남깁니다.',
      },
      {
        name: 'Markdown documentation',
        why: '결정, 사용법, 다음 작업을 가볍게 기록해 재진입 비용을 낮춥니다.',
      },
      {
        name: 'GitHub-based iteration',
        why: '작은 변경 단위로 실험하고 리뷰 가능한 흐름을 유지합니다.',
      },
    ],
  },
] as const satisfies readonly ToolchainCategory[];
