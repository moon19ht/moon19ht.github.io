use crate::model::{FeedState, MAX_CHARS};
use leptos::{html, prelude::*};

const STORAGE_KEY: &str = "orbit.feed.v1";
const MAX_STORAGE_BYTES: usize = 4_000_000;

#[derive(Clone, Copy, PartialEq)]
enum Page {
    Home,
    Explore,
    Bookmarks,
    Profile,
}

impl Page {
    fn label(self) -> &'static str {
        match self {
            Self::Home => "홈",
            Self::Explore => "탐색",
            Self::Bookmarks => "북마크",
            Self::Profile => "프로필",
        }
    }
}

#[derive(Clone, Copy)]
struct AppState {
    feed: RwSignal<FeedState>,
    page: RwSignal<Page>,
    query: RwSignal<String>,
    following: RwSignal<bool>,
    notice: RwSignal<String>,
    draft: RwSignal<String>,
    composer: NodeRef<html::Textarea>,
}

impl AppState {
    fn navigate(self, page: Page) {
        self.page.set(page);
        self.query.set(String::new());
        self.notice.set(String::new());
    }

    fn compose(self) {
        self.navigate(Page::Home);
        self.following.set(false);
        leptos::leptos_dom::helpers::set_timeout(
            move || {
                if let Some(input) = self.composer.get() {
                    input.scroll_into_view();
                    let _ = input.focus();
                }
            },
            std::time::Duration::ZERO,
        );
    }

    fn search(self, query: String) {
        self.page.set(Page::Explore);
        self.query.set(query);
    }
}

fn load_feed() -> (FeedState, String, bool, Option<String>) {
    let result = (|| {
        let storage = web_sys::window()
            .ok_or(())?
            .local_storage()
            .map_err(|_| ())?
            .ok_or(())?;
        let value = storage.get_item(STORAGE_KEY).map_err(|_| ())?;
        match value {
            None => Ok((FeedState::default(), None)),
            Some(json) if json.len() <= MAX_STORAGE_BYTES => {
                let feed: FeedState = serde_json::from_str(&json).map_err(|_| ())?;
                feed.validate().then_some((feed, Some(json))).ok_or(())
            }
            Some(_) => Err(()),
        }
    })();
    match result {
        Ok((feed, snapshot)) => (feed, String::new(), true, snapshot),
        Err(()) => (
            FeedState::default(),
            "저장 공간을 읽을 수 없어 임시 모드로 열었습니다. 기존 데이터는 유지되며, 이번 변경은 새로고침하면 사라집니다.".into(),
            false,
            None,
        ),
    }
}

#[component]
pub fn App() -> impl IntoView {
    let (initial, storage_warning, can_save, snapshot) = load_feed();
    let saved_snapshot = StoredValue::new(snapshot);
    let warning = RwSignal::new(storage_warning);
    let state = AppState {
        feed: RwSignal::new(initial),
        page: RwSignal::new(Page::Home),
        query: RwSignal::new(String::new()),
        following: RwSignal::new(false),
        notice: RwSignal::new(String::new()),
        draft: RwSignal::new(String::new()),
        composer: NodeRef::new(),
    };
    provide_context(state);

    // shortcut: browser-only persistence; add a shared backend for real multi-user accounts.
    Effect::watch(
        move || state.feed.get(),
        move |feed, _, _| {
            if !can_save {
                return;
            }
            let saved = (|| {
                let message = "저장할 공간이 부족하거나 차단되어 있습니다. 이번 변경은 새로고침하면 사라질 수 있습니다.";
                let json = serde_json::to_string(feed).map_err(|_| message)?;
                if json.len() > MAX_STORAGE_BYTES {
                    return Err(message);
                }
                let storage = web_sys::window()
                    .ok_or(message)?
                    .local_storage()
                    .map_err(|_| message)?
                    .ok_or(message)?;
                if storage.get_item(STORAGE_KEY).map_err(|_| message)? != saved_snapshot.get_value()
                {
                    return Err(
                        "다른 탭에서 데이터가 변경되어 저장을 멈췄습니다. 이번에 작성한 내용을 복사한 뒤 새로고침해 주세요.",
                    );
                }
                storage.set_item(STORAGE_KEY, &json).map_err(|_| message)?;
                saved_snapshot.set_value(Some(json));
                Ok(())
            })();
            warning.set(match saved {
                Err(message) => message.into(),
                Ok(()) => String::new(),
            });
        },
        false,
    );

    view! {
        <a class="skip-link" href="#main-content">"피드로 바로가기"</a>
        <div class="app-shell">
            <Sidebar/>
            <main class="feed-column" id="main-content">
                <header class="feed-heading">
                    <h1>{move || state.page.get().label()}</h1>
                    <span class="heading-sparkle" title="작은 생각이 만나는 곳"><Icon name="sparkles"/></span>
                </header>
                <Show when=move || !warning.get().is_empty()>
                    <p class="storage-warning" role="alert">{move || warning.get()}</p>
                </Show>
                <div class="status-notice" role="status" aria-live="polite" hidden=move || state.notice.get().is_empty()>{move || state.notice.get()}</div>
                <Show when=move || state.page.get() == Page::Home>
                    <div class="tab-list" role="group" aria-label="피드 선택">
                        <button class="tab" class:active=move || !state.following.get() aria-pressed=move || (!state.following.get()).to_string() on:click=move |_| state.following.set(false)>"추천"</button>
                        <button class="tab" class:active=move || state.following.get() aria-pressed=move || (state.following.get()).to_string() on:click=move |_| state.following.set(true)>"팔로잉"</button>
                    </div>
                    <Composer/>
                </Show>
                <Show when=move || state.page.get() == Page::Explore>
                    <div class="search-panel"><SearchBox/></div>
                    <div class="mobile-discovery"><Recommendations/></div>
                </Show>
                <Show when=move || state.page.get() == Page::Profile>
                    <section class="profile-panel" aria-label="내 프로필">
                        <div class="profile-cover"><span class="orbit-mark"/></div>
                        <Avatar initial="M" tone="lavender"/>
                        <h2>"Moon"</h2><p class="muted">"@moon19ht"</p>
                        <p>"작은 생각을 모아 나만의 우주를 만듭니다."</p>
                        <p class="profile-stats">{move || format!("게시글 {}  ·  팔로잉 {}", state.feed.with(|feed| feed.posts.iter().filter(|post| post.own).count()), state.feed.with(|feed| feed.following.len()))}</p>
                        <p class="muted">"브라우저 저장 데모입니다. 글과 반응은 이 브라우저에만 저장되며, 브라우저 데이터를 삭제하면 사라집니다."</p>
                    </section>
                </Show>
                <Feed/>
            </main>
            <RightSidebar/>
        </div>
    }
}

#[component]
fn Sidebar() -> impl IntoView {
    let state = expect_context::<AppState>();
    view! {
        <aside class="sidebar" aria-label="주 메뉴">
            <button class="brand" on:click=move |_| state.navigate(Page::Home) aria-label="Orbit 홈"><span class="orbit-mark"/><span>"orbit"</span></button>
            <nav class="nav-list" aria-label="메인 탐색">
                {[(Page::Home, "home"), (Page::Explore, "search"), (Page::Bookmarks, "bookmark"), (Page::Profile, "user")].into_iter().map(|(page, icon)| view! {
                    <button class="nav-item" class:active=move || state.page.get() == page aria-current=move || (state.page.get() == page).then_some("page") aria-label=page.label() on:click=move |_| state.navigate(page)>
                        <Icon name=icon/><span>{page.label()}</span>
                    </button>
                }).collect_view()}
            </nav>
            <button class="primary-button compose-nav" on:click=move |_| state.compose() aria-label="새 게시글 작성"><Icon name="plus"/><span>"게시하기"</span></button>
            <button class="account-button" on:click=move |_| state.navigate(Page::Profile) aria-label="내 프로필 보기">
                <Avatar initial="M" tone="lavender"/><span><strong>"Moon"</strong><small>"@moon19ht"</small></span>
            </button>
        </aside>
    }
}

#[component]
fn Composer() -> impl IntoView {
    let state = expect_context::<AppState>();
    let body = state.draft;
    let count = move || body.with(|text| text.chars().count());
    view! {
        <form class="composer" on:submit=move |event| {
            event.prevent_default();
            let mut result = Ok(());
            state.feed.update(|feed| result = feed.publish(&body.get_untracked()));
            match result {
                Ok(()) => { body.set(String::new()); state.following.set(false); state.notice.set("새 이야기를 게시했습니다.".into()); }
                Err(error) => state.notice.set(error),
            }
        }>
            <Avatar initial="M" tone="lavender"/>
            <div class="composer-body">
                <label class="sr-only" for="post-body">"새 게시글"</label>
                <textarea id="post-body" node_ref=state.composer placeholder="지금 무슨 생각을 하고 있나요?" rows="2" prop:value=move || body.get() on:input=move |event| body.set(event_target_value(&event)) aria-describedby="post-limit"/>
                <div class="composer-footer">
                    <span class="composer-note">"나의 우주에 이야기를 남겨보세요."</span>
                    <span class="character-count" id="post-limit" class:over-limit=move || { count() > MAX_CHARS } hidden=move || count() == 0>{move || format!("{}/{}", count(), MAX_CHARS)}</span>
                    <button class="primary-button" type="submit" disabled=move || { body.with(|text| text.trim().is_empty()) || count() > MAX_CHARS }>"게시하기"</button>
                </div>
            </div>
        </form>
    }
}

#[component]
fn Feed() -> impl IntoView {
    let state = expect_context::<AppState>();
    let ids = Memo::new(move |_| {
        let page = state.page.get();
        let query = state.query.get().trim().to_lowercase();
        let following = state.following.get();
        state.feed.with(|feed| {
            feed.posts
                .iter()
                .filter(|post| match page {
                    Page::Home => !following || feed.following.contains(&post.handle),
                    Page::Explore => format!("{} {} {}", post.author, post.handle, post.body)
                        .to_lowercase()
                        .contains(&query),
                    Page::Bookmarks => post.bookmarked,
                    Page::Profile => post.own,
                })
                .map(|post| post.id)
                .collect::<Vec<_>>()
        })
    });
    view! {
        <section aria-label="게시글 목록">
            <div class="feed-label">{move || match state.page.get() {
                Page::Home if state.following.get() => "팔로우한 사람들의 이야기".into(),
                Page::Home => "새로운 이야기".into(),
                Page::Explore => format!("검색 결과 {}개", ids.with(Vec::len)),
                Page::Bookmarks => "다시 읽고 싶은 이야기".into(),
                Page::Profile => "내가 남긴 이야기".into(),
            }}</div>
            <Show when=move || ids.with(Vec::is_empty)>
                <div class="empty-state"><Icon name="sparkles"/><h2>"아직 이야기가 없어요"</h2><p>{move || match state.page.get() {
                    Page::Bookmarks => "마음에 드는 글의 북마크를 눌러 모아보세요.",
                    Page::Explore => "다른 키워드나 이름으로 검색해 보세요.",
                    Page::Profile => "첫 번째 이야기를 남겨보세요.",
                    Page::Home => "새로운 연결에서 관심 있는 사람을 팔로우해 보세요.",
                }}</p></div>
            </Show>
            <For each=move || ids.get() key=|id| *id children=move |id| view! {<PostCard id/>}/>
        </section>
    }
}

#[component]
fn PostCard(id: u64) -> impl IntoView {
    let state = expect_context::<AppState>();
    let initial = state
        .feed
        .with_untracked(|feed| feed.posts.iter().find(|post| post.id == id).cloned())
        .expect("feed id exists");
    let current = Memo::new(move |_| {
        state
            .feed
            .with(|feed| feed.posts.iter().find(|post| post.id == id).cloned())
    });
    let replying = RwSignal::new(false);
    let deleting = RwSignal::new(false);
    let reply = RwSignal::new(String::new());
    let author = initial.author.clone();
    view! {
        <article class="post" aria-label=format!("{}의 게시글", initial.author)>
            <div class="post-avatar"><Avatar initial=initial.initial.clone() tone=initial.tone.clone()/></div>
            <div class="post-content">
                <div class="post-header"><strong class="post-author">{initial.author.clone()}</strong><span class="post-handle">{format!("@{}", initial.handle)}</span><span class="post-time">{format!("· {}", initial.time)}</span>
                    {initial.own.then(|| view! { <button class="delete-button" aria-label="내 게시글 삭제" title="내 게시글 삭제" on:click=move |_| deleting.set(true)><Icon name="trash"/></button> })}
                </div>
                <Show when=move || deleting.get()>
                    <div class="delete-confirm" role="group" aria-label="게시글 삭제 확인">
                        <p>"이 게시글과 답글을 삭제할까요? 삭제하면 복구할 수 없습니다."</p>
                        <button on:click=move |_| deleting.set(false)>"취소"</button>
                        <button class="confirm-delete" on:click=move |_| {
                            state.feed.update(|feed| { feed.remove_post(id); });
                            state.notice.set("내 게시글을 삭제했습니다.".into());
                        }>"삭제"</button>
                    </div>
                </Show>
                <p class="post-body">{initial.body}</p>
                {initial.image.map(|src| view! { <img class="post-media" src=src alt="초록 나무 사이로 햇빛과 잎 그림자가 드리운 콘크리트 건축물" width="960" height="540"/> })}
                {(initial.handle == "junho_dev").then(|| view! {
                    <a class="link-preview" href="https://book.leptos.dev/" target="_blank" rel="noopener noreferrer"><Icon name="code"/><span><strong>"Rust와 Leptos로 만드는 작은 웹앱"</strong><small>"book.leptos.dev"</small></span><Icon name="arrow"/></a>
                })}
                <div class="post-actions">
                    <button class="action-button" class:is-active=move || replying.get() aria-label=format!("{}에게 답글", author) title="답글" aria-expanded=move || (replying.get()).to_string() on:click=move |_| replying.update(|value| *value = !*value)><Icon name="message"/><span>{move || current.with(|post| post.as_ref().map_or(0, |post| post.replies.len()))}</span></button>
                    <button class="action-button repost-action" class:is-active=move || current.with(|post| post.as_ref().is_some_and(|post| post.reposted)) aria-label="재게시" title="재게시" aria-pressed=move || (current.with(|post| post.as_ref().is_some_and(|post| post.reposted))).to_string() on:click=move |_| state.feed.update(|feed| feed.toggle_repost(id))><Icon name="repeat"/><span>{move || current.with(|post| post.as_ref().map_or(0, |post| post.reposts))}</span></button>
                    <button class="action-button like-action" class:is-active=move || current.with(|post| post.as_ref().is_some_and(|post| post.liked)) aria-label="좋아요" title="좋아요" aria-pressed=move || (current.with(|post| post.as_ref().is_some_and(|post| post.liked))).to_string() on:click=move |_| state.feed.update(|feed| feed.toggle_like(id))><Icon name="heart"/><span>{move || current.with(|post| post.as_ref().map_or(0, |post| post.likes))}</span></button>
                    <button class="action-button bookmark-action" class:is-active=move || current.with(|post| post.as_ref().is_some_and(|post| post.bookmarked)) aria-label="북마크 저장" title="북마크 저장" aria-pressed=move || (current.with(|post| post.as_ref().is_some_and(|post| post.bookmarked))).to_string() on:click=move |_| state.feed.update(|feed| feed.toggle_bookmark(id))><Icon name="bookmark"/></button>
                </div>
                <Show when=move || replying.get()>
                    <div class="reply-panel">
                        <div class="reply-list">{move || current.with(|post| post.as_ref().map(|post| post.replies.iter().map(|reply| view! {<div class="reply"><strong>"Moon "</strong><span>{reply.body.clone()}</span></div>}).collect_view()))}</div>
                        <form class="reply-form" on:submit=move |event| {
                            event.prevent_default();
                            let mut result = Ok(());
                            state.feed.update(|feed| result = feed.reply(id, &reply.get_untracked()));
                            match result { Ok(()) => { reply.set(String::new()); state.notice.set("답글을 남겼습니다.".into()); }, Err(error) => state.notice.set(error) }
                        }>
                            <label class="sr-only" for=format!("reply-{id}")>"답글 내용"</label>
                            <input id=format!("reply-{id}") placeholder="답글을 남겨보세요" prop:value=move || reply.get() on:input=move |event| reply.set(event_target_value(&event))/>
                            <button class="primary-button" type="submit" disabled=move || reply.with(|text| text.trim().is_empty() || text.chars().count() > MAX_CHARS)>"답글"</button>
                        </form>
                        <small class="muted">{move || format!("{} / {}자", reply.with(|text| text.chars().count()), MAX_CHARS)}</small>
                    </div>
                </Show>
            </div>
        </article>
    }
}

#[component]
fn SearchBox() -> impl IntoView {
    let state = expect_context::<AppState>();
    view! { <form class="search-box" role="search" on:submit=move |event| { event.prevent_default(); state.page.set(Page::Explore); }>
        <Icon name="search"/><input type="search" aria-label="게시글 검색" placeholder="검색하기" prop:value=move || state.query.get() on:input=move |event| state.search(event_target_value(&event))/>
    </form> }
}

#[component]
fn RightSidebar() -> impl IntoView {
    let state = expect_context::<AppState>();
    view! {
        <aside class="right-sidebar" aria-label="발견하기">
            <SearchBox/>
            <section class="trends"><h2>"지금 이야기하는 것들"</h2><p class="section-caption">"함께 발견하는 새로운 관심사"</p>
                {[("라이프 · 영감", "#오늘의영감"), ("개발 · 테크", "#Leptos"), ("개발 · 생산성", "#사이드프로젝트"), ("일상 · 기록", "#일상의기록")].into_iter().map(|(category, tag)| view! {
                    <button class="trend" on:click=move |_| state.search(tag.into())><span class="trend-category">{category}</span><strong class="trend-name">{tag}</strong><span class="trend-count">{move || format!("이 공간의 이야기 {}개", state.feed.with(|feed| feed.posts.iter().filter(|post| post.body.to_lowercase().contains(&tag.to_lowercase())).count()))}</span><Icon name="arrow"/></button>
                }).collect_view()}
            </section>
            <Recommendations/>
            <footer class="aside-footer">
                <div class="footer-links"><details><summary>"Orbit 소개"</summary><p>"예시 이야기와 함께 시작하는 개인용 소셜 데모입니다. 글과 반응은 이 브라우저에만 저장되며 다른 사람에게 전송되지 않습니다. 브라우저 데이터를 삭제하면 함께 사라집니다."</p></details><span>"·"</span><a href="https://github.com/moon19ht/moon19ht.github.io" target="_blank" rel="noopener noreferrer">"GitHub"</a></div>
                <p>"나만의 작은 소셜 공간"</p><small>"브라우저에 저장되는 데모"</small>
            </footer>
        </aside>
    }
}

#[component]
fn Recommendations() -> impl IntoView {
    let state = expect_context::<AppState>();
    view! {
        <section class="recommendations"><h2>"새로운 연결"</h2>
            {[("서연", "seoyeon", "S", "mauve", "디자이너 · 일상과 영감"), ("도윤", "doyun", "D", "sage", "개발자 · 도구와 생산성"), ("준호", "junho_dev", "J", "blue", "개발자 · 작은 웹 실험")].into_iter().map(|(name, handle, initial, tone, bio)| view! {
                <div class="person"><Avatar initial tone/><div class="person-info"><strong>{name}</strong><small>{bio}</small></div><button class="follow-button" class:is-following=move || state.feed.with(|feed| feed.following.iter().any(|value| value == handle)) aria-label=move || format!("{} {}", name, if state.feed.with(|feed| feed.following.iter().any(|value| value == handle)) { "팔로우 취소" } else { "팔로우" }) aria-pressed=move || (state.feed.with(|feed| feed.following.iter().any(|value| value == handle))).to_string() on:click=move |_| state.feed.update(|feed| feed.toggle_follow(handle))>{move || if state.feed.with(|feed| feed.following.iter().any(|value| value == handle)) { "팔로잉" } else { "팔로우" }}</button></div>
            }).collect_view()}
        </section>
    }
}

#[component]
fn Avatar(#[prop(into)] initial: String, #[prop(into)] tone: String) -> impl IntoView {
    view! { <span class=format!("avatar {tone}") aria-hidden="true">{initial}</span> }
}

#[component]
fn Icon(name: &'static str) -> impl IntoView {
    let path = match name {
        "home" => "M3 10 12 3l9 7v11h-6v-7H9v7H3Z",
        "search" => "M21 21l-5-5M19 10.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0",
        "bookmark" => "M6 3h12v18l-6-4-6 4Z",
        "user" => "M17 7a5 5 0 1 1-10 0 5 5 0 0 1 10 0M3 21v-2a7 7 0 0 1 7-7h4a7 7 0 0 1 7 7v2Z",
        "plus" => "M12 5v14M5 12h14",
        "sparkles" => "m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z",
        "message" => {
            "M21 11.5a9 9 0 0 1-9 8.5 10 10 0 0 1-4-.8L3 21l1.6-4.2A8 8 0 0 1 3 11.5a9 9 0 0 1 18 0Z"
        }
        "repeat" => "m4 8 3-3 3 3M7 5v11a3 3 0 0 0 3 3h3m7-3-3 3-3-3M17 19V8a3 3 0 0 0-3-3h-3",
        "heart" => {
            "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"
        }
        "code" => "m8 5-6 7 6 7m8-14 6 7-6 7M14 3l-4 18",
        "arrow" => "M7 17 17 7M7 7h10v10",
        "trash" => "M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7",
        _ => "",
    };
    view! { <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d=path/></svg> }
}
