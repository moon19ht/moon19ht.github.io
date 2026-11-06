# Orbit

Rust + Leptos로 만든 한국어 마이크로블로그. X의 3열 피드 구성을 바탕으로, 개인용 브라우저 저장 기능을 제공합니다.

**사이트:** https://moon19ht.github.io/

## 할 수 있는 일

- 280자 게시글 작성, 내 게시글 삭제, 답글 작성
- 게시글당 사진 1장 첨부, 미리보기·교체·제거, 사진만 게시하기
- 좋아요, 재게시 표시, 북마크 및 모아보기
- 키워드·이름·해시태그 검색, 팔로우 및 팔로잉 피드
- 내 프로필과 게시글 목록, 모바일 하단 탐색 메뉴
- 새로고침 후에도 유지되는 localStorage 저장
- Remotion으로 제작한 8초 모션 그래픽, 재생·일시정지, 모션 감소 설정 지원

예시 인물과 게시글·반응 수는 데모 데이터입니다. 실제 계정이나 공용 서버는 없으며, 글과 첨부 사진은 외부로 업로드하지 않습니다. 같은 브라우저·같은 주소에서만 데이터를 유지합니다. 브라우저 데이터를 지우면 글과 사진도 삭제됩니다. 저장 실패는 화면에 표시하고, 손상된 저장 데이터는 자동으로 덮어쓰지 않습니다.

다른 탭의 저장 변경을 감지하면 덮어쓰기를 멈추고 안내합니다. 완전히 동시에 저장하는 탭 사이의 원자적 잠금은 제공하지 않습니다. 작성 중인 글과 첨부 사진은 메뉴 이동 시 유지되지만 새로고침 전에 게시해야 저장됩니다.

## 사진과 저장 공간

JPG·PNG·WebP를 최대 10MiB, 4천만 화소까지 선택할 수 있습니다. 사진은 브라우저 안에서 방향을 보정하고 긴 변 1280px 이하, JPEG data URL 350,000바이트 이하로 줄여 저장합니다. 원본 사진은 보관하지 않으며 투명 영역은 흰색으로 변환합니다. 캔버스에 다시 그려 위치 등 원본 EXIF 메타데이터를 저장하지 않습니다.

전체 피드에는 4MB 직렬화 한도를 적용하며 브라우저 자체 한도에 먼저 도달할 수도 있습니다. 저장 성공 후에만 게시글 목록을 갱신하고 초안을 비웁니다. 용량 부족·다른 탭 충돌·저장 차단 시 기존 데이터와 작성 중인 글·사진을 유지합니다. 용량 부족 때는 이전 사진 게시글을 정리한 뒤 다시 게시할 수 있습니다. 다른 탭 충돌 때는 초안을 따로 보관하고 새로고침해야 합니다. 기존 `orbit.feed.v1` 데이터는 그대로 읽습니다.

## 모션 그래픽

데스크톱 오른쪽 영역과 프로필에서 8초짜리 무음 Orbit 영상을 볼 수 있습니다. 모바일에서는 프로필을 열어 확인합니다. 모션 감소 설정에서는 자동재생하지 않으며 설정이 켜지면 재생 중인 영상도 정지합니다. 재생·일시정지는 화면의 버튼으로 제어합니다.

영상은 [Remotion 소스](motion/README.md)로 미리 렌더링한 약 145KB의 MP4입니다. 방문자의 브라우저에는 React나 Remotion을 설치하거나 로드하지 않습니다. 피드 등장과 반응 버튼에도 짧은 움직임을 적용하며 모션 감소 설정에서는 생략합니다.

## 로컬 실행

[Rust](https://rustup.rs/)와 [Trunk 0.22.1](https://github.com/trunk-rs/trunk/releases/tag/v0.22.1)을 설치한 뒤:

```sh
rustup toolchain install
trunk serve
```

http://127.0.0.1:8080 에서 확인합니다. `rust-toolchain.toml`이 Rust 1.99.1과 WASM 타깃을 지정합니다. Windows GNU 환경은 MinGW 도구를 PATH에 추가해야 하며, MSVC 환경은 Visual Studio C++ Build Tools가 필요합니다.

이 Windows 개발 PC에 설치한 GNU 도구를 사용하는 경우:

```powershell
$llvmBin = Join-Path $env:LOCALAPPDATA 'Programs\llvm-mingw-20261104-ucrt-x86_64\bin'
$cargoBin = Join-Path $env:USERPROFILE '.cargo\bin'
$env:PATH = "$llvmBin;$cargoBin;$env:PATH"
$rustSysroot = rustc --print sysroot
$env:CARGO_TARGET_X86_64_PC_WINDOWS_GNU_LINKER = Join-Path $rustSysroot 'lib\rustlib\x86_64-pc-windows-gnu\bin\self-contained\x86_64-w64-mingw32-gcc.exe'
trunk serve --release --no-autoreload --no-error-reporting
```

위 명령은 실제 배포 형태를 확인할 때 사용합니다. 소스 변경을 확인하려면 브라우저를 새로고침합니다.

```sh
cargo fmt --all -- --check
cargo clippy --locked --all-targets -- -D warnings
cargo test --locked
trunk build --release
```

## GitHub Pages

`.github/workflows/pages.yml`이 `main` push 시 포맷·린트·Rust 테스트·모션 반복 테스트·WASM 빌드를 수행하고 `dist`를 GitHub Pages에 배포합니다. PR에서는 검사와 빌드만 실행합니다. 모션 아트워크를 수정하면 `motion/README.md`의 명령으로 MP4·포스터를 다시 만들고 함께 커밋합니다. 저장소 Settings → Pages → Source는 **GitHub Actions**를 사용합니다. 별도 유료 호스팅, 사용자 토큰, CNAME은 필요하지 않습니다.

## 구조와 디자인

- `src/model.rs`: 데이터, 입력 검증, 상태 변경, 단위 테스트
- `src/ui.rs`: Leptos 컴포넌트, 페이지 전환, 브라우저 저장
- `src/photo.rs`: 로컬 사진 검증과 압축
- `src/motion.rs`, `motion.css`: 재생 제어, 모션 감소 처리와 화면 전환 효과
- `motion/`: 실제 Remotion 렌더 소스·고정 의존성·반복 테스트
- `style.css`: 반응형 스타일과 접근성
- `assets/`: 자체 생성 이미지 및 SVG 아이콘
- [디자인·검증 기록](docs/DESIGN.md)

설치된 [Craft Anything](https://github.com/storytold/craft-anything)의 Clean room 캡처 기능으로 화면을 관찰하고 구현 결과를 비교합니다. X 공개 페이지는 자동화 브라우저에서 접근이 차단되어 원본 화면을 복사하거나 소스 코드를 추출하지 않았습니다.
