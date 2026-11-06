# Orbit

Rust + Leptos로 만든 한국어 마이크로블로그. X의 3열 피드 구성을 바탕으로, 개인용 브라우저 저장 기능을 제공합니다.

**사이트:** https://moon19ht.github.io/

## 할 수 있는 일

- 280자 게시글 작성, 내 게시글 삭제, 답글 작성
- 좋아요, 재게시 표시, 북마크 및 모아보기
- 키워드·이름·해시태그 검색, 팔로우 및 팔로잉 피드
- 내 프로필과 게시글 목록, 모바일 하단 탐색 메뉴
- 새로고침 후에도 유지되는 localStorage 저장

예시 인물과 게시글·반응 수는 데모 데이터입니다. 실제 계정이나 공용 서버는 없으며, 입력한 내용은 다른 사용자에게 전송되지 않습니다. 같은 브라우저·같은 주소에서만 데이터를 유지합니다. 브라우저 데이터를 지우면 글도 삭제됩니다. 저장 실패는 화면에 표시하고, 손상된 저장 데이터는 자동으로 덮어쓰지 않습니다.

다른 탭에서 저장된 내용이 바뀌면 덮어쓰기를 멈추고 안내합니다. 작성 중인 초안은 페이지 메뉴 이동 시 유지되지만 새로고침 전에 게시해야 저장됩니다.

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

`.github/workflows/pages.yml`이 `main` push 시 포맷·린트·테스트·WASM 빌드를 수행하고 `dist`를 GitHub Pages에 배포합니다. PR에서는 검사와 빌드만 실행합니다. 저장소 Settings → Pages → Source는 **GitHub Actions**를 사용합니다. 별도 유료 호스팅, 사용자 토큰, CNAME은 필요하지 않습니다.

## 구조와 디자인

- `src/model.rs`: 데이터, 입력 검증, 상태 변경, 단위 테스트
- `src/ui.rs`: Leptos 컴포넌트, 페이지 전환, 브라우저 저장
- `style.css`: 반응형 스타일과 접근성
- `assets/`: 자체 생성 이미지 및 SVG 아이콘
- [디자인·검증 기록](docs/DESIGN.md)

설치된 [Craft Anything](https://github.com/storytold/craft-anything)의 Clean room 캡처 기능으로 화면을 관찰하고 구현 결과를 비교합니다. X 공개 페이지는 자동화 브라우저에서 접근이 차단되어 원본 화면을 복사하거나 소스 코드를 추출하지 않았습니다.
