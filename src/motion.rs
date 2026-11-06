use leptos::{ev, html, leptos_dom::helpers::window_event_listener, prelude::*};
use wasm_bindgen::{JsCast, closure::Closure};
use wasm_bindgen_futures::JsFuture;

fn autoplay_allowed(compact: bool) -> bool {
    let query = if compact {
        "(prefers-reduced-motion: no-preference) and (min-width: 1101px)"
    } else {
        "(prefers-reduced-motion: no-preference)"
    };
    web_sys::window()
        .and_then(|window| window.match_media(query).ok().flatten())
        .is_some_and(|query| query.matches())
}

#[component]
pub fn MotionGraphic(#[prop(default = false)] compact: bool) -> impl IntoView {
    let video = NodeRef::<html::Video>::new();
    let failed = RwSignal::new(false);
    let playing = RwSignal::new(false);
    let play_requested = RwSignal::new(false);
    let playback_error = RwSignal::new(false);
    let autoplay = autoplay_allowed(compact);
    let pause_if_needed = move || {
        if !autoplay_allowed(compact)
            && let Some(video) = video.get_untracked()
        {
            let _ = video.pause();
        }
    };
    let resize = window_event_listener(ev::resize, move |_| pause_if_needed());
    on_cleanup(move || {
        if let Some(video) = video.get_untracked() {
            let _ = video.pause();
        }
        resize.remove();
    });
    if let Some(media) = web_sys::window().and_then(|window| {
        window
            .match_media("(prefers-reduced-motion: reduce)")
            .ok()
            .flatten()
    }) {
        let listener = Closure::<dyn FnMut(web_sys::Event)>::new(move |_| pause_if_needed());
        if media
            .add_event_listener_with_callback("change", listener.as_ref().unchecked_ref())
            .is_ok()
        {
            let listener = StoredValue::new_local((media, listener));
            on_cleanup(move || {
                listener.with_value(|(media, listener)| {
                    let _ = media.remove_event_listener_with_callback(
                        "change",
                        listener.as_ref().unchecked_ref(),
                    );
                })
            });
        }
    }

    view! {
        <figure class="motion-card" class:compact=compact>
            <Show when=move || !failed.get() fallback=|| view! {
                <img class="motion-poster" src="/assets/orbit-motion-poster.jpg" alt="Orbit의 작은 우주를 표현한 그래픽" width="800" height="450"/>
            }>
                <video node_ref=video class="motion-video" src="/assets/orbit-motion.mp4" poster="/assets/orbit-motion-poster.jpg"
                    width="800" height="450" autoplay=autoplay muted=true prop:muted=true loop=true playsinline=true preload=if autoplay { "metadata" } else { "none" }
                    aria-label="Orbit 모션 그래픽"
                    on:play=move |_| { let _ = playing.try_set(true); }
                    on:pause=move |_| { let _ = playing.try_set(false); let _ = play_requested.try_set(false); }
                    on:error=move |_| { let _ = failed.try_set(true); let _ = playing.try_set(false); }>
                    "이 브라우저는 영상 재생을 지원하지 않습니다."
                </video>
            </Show>
            <figcaption>
                <div class="motion-caption">
                    <strong>"작은 우주의 움직임"</strong>
                    <span>"잠시 쉬어가는 나의 궤도."</span>
                    <Show when=move || failed.get() || playback_error.get()>
                        <span class="motion-error" role="status">{move || if failed.get() { "영상을 불러오지 못해 정지 이미지로 표시합니다." } else { "영상을 재생할 수 없습니다. 잠시 후 다시 시도해 주세요." }}</span>
                    </Show>
                </div>
                <button class="motion-toggle" class:is-playing=move || playing.get() type="button" disabled=move || failed.get()
                    aria-label=move || if playing.get() { "모션 그래픽 일시정지" } else { "모션 그래픽 재생" }
                    title=move || if playing.get() { "일시정지" } else { "재생" }
                    aria-pressed=move || playing.get().to_string()
                    on:click=move |_| {
                        if let Some(video) = video.get_untracked() {
                            playback_error.set(false);
                            if video.paused() {
                                play_requested.set(true);
                                match video.play() {
                                    Ok(promise) => leptos::task::spawn_local(async move {
                                        if JsFuture::from(promise).await.is_err() && play_requested.try_get().unwrap_or(false) {
                                            let _ = playback_error.try_set(true);
                                            let _ = playing.try_set(false);
                                            let _ = play_requested.try_set(false);
                                        }
                                    }),
                                    Err(_) => { playback_error.set(true); play_requested.set(false); }
                                }
                            } else {
                                play_requested.set(false);
                                if video.pause().is_err() { playback_error.set(true); }
                            }
                        }
                    }>
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                        <path d=move || if playing.get() { "M6 5h4v14H6zM14 5h4v14h-4z" } else { "m8 5 11 7-11 7z" }/>
                    </svg>
                </button>
            </figcaption>
        </figure>
    }
}
