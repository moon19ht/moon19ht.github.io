# 🌕 Moon19ht.github.io_DEV

> Personal Portfolio & Technical Blog powered by **Next.js + MDX + Tailwind CSS**  
> ✍️ 공부 기록 | 🛠 개발 팁 | 🌱 앞으로의 방향 | 💡 아이디어 구상

---

## 🔗 Deployment

🔎 Live URL: [https://moon19ht.github.io](https://moon19ht.github.io)

---

## 🖼️ Screenshots

> 메인 페이지

<!-- ![home screenshot](./public/images/screenshot-home.png) -->

> 블로그 목록

<!-- ![blog screenshot](./public/images/screenshot-blog.png) -->

> 포스트 상세 페이지

<!-- ![post screenshot](./public/images/screenshot-post.png) -->

---

## 🧭 Overview

**moon19ht.github.io** is a developer portfolio and blog site built with cutting-edge web technologies.

The site is designed to be:

- **Modular** – 각 기능을 컴포넌트 기반으로 분리
- **Extensible** – 다크 모드, 검색 기능 등 확장을 고려한 구조
- **Minimal** – 콘텐츠에 집중하는 UI/UX 지향

---

## 🛠 Tech Stack

| Category | Tools |
|----------|-------|
| Framework | [Next.js (App Router)](https://nextjs.org/docs/app) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) + Custom CSS |
| Content | `.mdx` (Markdown + JSX components) |
| Parsing | `gray-matter`, `@next/mdx` |
| Deployment | [Vercel](https://vercel.com) or GitHub Pages |

---

## 📁 Project Structure

```bash
moon19ht.github.io/
├── app/                        # ✅ 라우팅 페이지 (App Router 기반)
│   ├── page.tsx               # 홈 (인트로 + 최근 글)
│   ├── layout.tsx             # 전체 레이아웃 + 헤더/푸터 포함
│   ├── globals.css            # 전역 스타일 (Tailwind 포함)
│   ├── favicon.ico            # 파비콘
│   ├── about/                 
│   │   └── page.tsx           # 자기소개 페이지
│   ├── projects/              
│   │   └── page.tsx           # 포트폴리오 목록
│   └── blog/                  # 블로그 루트
│       └── page.tsx           # 전체 글 목록 (카테고리/검색 포함)
│       # TODO: [slug]/page.tsx - 글 상세 페이지 예정
│
├── components/                # ✅ 재사용 가능한 UI 컴포넌트
│   ├── layout/                # Header, Footer 등 전체 프레임 구성요소
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── post/                  # 블로그 관련 컴포넌트
│   │   ├── PostCard.tsx
│   │   ├── MDXContent.tsx
│   │   └── TagList.tsx
│   └── ui/                    # 버튼, 입력창 등 공용 컴포넌트
│       ├── CategoryBadge.tsx
│       ├── ThemeToggle.tsx    # 💡 다크 모드 스위치
│       └── SearchInput.tsx    # 🔍 검색창 컴포넌트
│
├── content/                   # ✅ `.mdx` 글 저장소 (카테고리별로 나눔)
│   ├── what-i-learned/        # 📚 학습 기록
│   ├── tech-tips/             # 🧰 기술 팁
│   ├── roadmap/               # 🌱 앞으로의 계획
│   └── ideas/                 # 🧠 아이디어 스케치
│       └── example-post.mdx   # 예시 MDX 포스트
│
├── lib/                       # ✅ 기능 함수 및 유틸 모음
│   ├── getPosts.ts            # 글 목록 불러오기
│   └── search.ts              # 🔍 검색 인덱스 생성 함수 (추후 사용)
│   # TODO: mdx.ts - MDX 파서 설정 예정
│
├── styles/                    # ✅ 커스텀 스타일
│   └── prose.css              # Markdown 스타일링용 Tailwind typography 확장
│
├── public/                    # ✅ 정적 자산
│   ├── images/                # 스크린샷 및 이미지 폴더
│   ├── next.svg               # Next.js 로고
│   ├── vercel.svg             # Vercel 로고
│   ├── file.svg               # 파일 아이콘
│   ├── globe.svg              # 글로브 아이콘
│   └── window.svg             # 윈도우 아이콘
│
├── types/                     # ✅ 타입 정의
│   └── post.d.ts              # MDX frontmatter 타입 등
│
├── context/                   # ✅ React Context (다크모드, 검색 등)
│   # TODO: ThemeContext, SearchContext 예정
│
├── .git/                      # Git 저장소
├── .next/                     # Next.js 빌드 캐시
├── node_modules/              # 의존성 패키지들
├── .gitignore                 # Git 무시 파일 목록
├── README.md                  # 프로젝트 문서
├── next.config.ts             # Next.js 설정 (`output: 'export'`)
├── tsconfig.json              # TypeScript 설정
├── postcss.config.mjs         # PostCSS 설정
├── eslint.config.mjs          # ESLint 설정
├── package.json               # 의존성 및 스크립트
├── package-lock.json          # 정확한 의존성 버전 lock
└── next-env.d.ts              # Next.js TypeScript 환경 선언

````

> ✨ 컴포넌트와 레이아웃은 **다크 모드 전환 (`ThemeProvider`)** 및
> **검색 기능(`SearchInput + filtering`)** 확장을 염두에 두고 설계되어 있습니다.

---

## 📝 Writing Posts with MDX

All blog posts are written in `.mdx` format and stored under `content/` by category.

```mdx
---
title: "Using MDX in Next.js"
date: "2025-06-26"
category: "what-i-learned"
tags: ["next.js", "mdx", "tailwind"]
---

# 제목 (Title)

본문 내용은 이렇게 작성합니다.
This is the content of the blog post...
```

---

## 🚀 Deployment

### Vercel

```bash
npm install
npx vercel
```

### GitHub Pages

```bash
npm run build && npm run export
```

> 결과물(`/out`)을 `/docs`로 복사 → GitHub Pages에서 `/docs` 선택

---

---

## 🛠 Workflow & Design Strategy

### 🔄 GitHub Actions 기반 자동 배포

이 프로젝트는 정적 사이트(Static Export)를 기반으로 하여  
**GitHub Actions**를 사용해 자동으로 `/docs` 폴더를 생성하고 GitHub Pages에 배포됩니다.

#### 배포 흐름:

1. main 브랜치에 `push` 발생 시
2. GitHub Actions가 실행되어 `next build && next export` 수행
3. `/out` 폴더를 `/docs`로 이동
4. `/docs`가 다시 커밋되고 GitHub Pages에 배포됨

📂 `.github/workflows/deploy.yml`에서 자동 배포 로직이 정의되어 있습니다.

---

### 🎨 Figma 기반 UI 컴포넌트 설계

전체 UI는 [Figma](https://figma.com/)에서 설계되었으며,  
Tailwind CSS 기반 구현을 고려해 다음을 구성했습니다:

- 🧱 페이지 와이어프레임 (Home, About, Blog, Projects)
- 🧩 컴포넌트 단위 설계 (PostCard, Header, Footer 등)
- 🎨 색상/폰트 시스템 정의 (다크모드 포함)
- 📱 반응형 대응 설계

디자인 → 코드 전환은 Tailwind utility-first 방식에 최적화되어 있어  
유지보수가 쉽고 확장 가능성이 높습니다.

---
## ✅ Features

### 구현 완료
* [x] 📱 반응형 레이아웃 (Tailwind CSS 기반)
* [x] 🏠 홈페이지 (Hero 섹션, 최근 글, 카테고리)
* [x] 👤 자기소개 페이지 (About)
* [x] 💼 포트폴리오 페이지 (Projects)
* [x] 📝 블로그 목록 페이지
* [x] 📄 개별 포스트 상세 페이지 (`[slug]/page.tsx`)
* [x] 🧩 컴포넌트 기반 구조
* [x] 📁 카테고리별 MDX 글 저장소
* [x] ⚛️ React 컴포넌트 (Header, Footer, PostCard 등)
* [x] 🎨 UI 컴포넌트 (CategoryBadge, ThemeToggle, SearchInput)
* [x] � 다크 모드 (ThemeProvider + ThemeToggle 완전 구현)
* [x] 🌙 테마 시스템 (light/dark/system)
* [x] �📚 예시 MDX 포스트
* [x] 🔧 TypeScript 타입 정의

### 준비된 구조 (구현 예정)
* [ ]  검색 기능 (SearchInput + 검색 인덱스)
* [ ] 🏷️ 태그별 필터링
* [ ] 📖 MDX 파서 완전 설정 및 동적 렌더링
* [ ] 🚀 GitHub Pages 자동 배포

---

## 🪪 License

MIT License © 2025 [moon19ht](https://github.com/moon19ht)
