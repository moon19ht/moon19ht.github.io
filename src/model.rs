use base64::{Engine as _, engine::general_purpose::STANDARD};
use serde::{Deserialize, Serialize};
use std::collections::HashSet;

pub const MAX_CHARS: usize = 280;
pub const MAX_IMAGE_DATA_URL_BYTES: usize = 350_000;
const MAX_POSTS: usize = 500;
const MAX_REPLIES: usize = 100;

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize)]
pub struct Reply {
    pub body: String,
}

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize)]
pub struct Post {
    pub id: u64,
    pub author: String,
    pub handle: String,
    pub initial: String,
    pub tone: String,
    pub body: String,
    pub time: String,
    pub image: Option<String>,
    pub likes: u32,
    pub reposts: u32,
    pub liked: bool,
    pub reposted: bool,
    pub bookmarked: bool,
    pub own: bool,
    pub replies: Vec<Reply>,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct FeedState {
    pub posts: Vec<Post>,
    pub following: Vec<String>,
    pub next_id: u64,
}

impl Default for FeedState {
    fn default() -> Self {
        let seeds = [
            (
                "서연",
                "seoyeon",
                "S",
                "mauve",
                "18분",
                "잠깐 멈추고 바라보면, 익숙한 풍경도 새로운 영감이 된다. 오늘의 작은 발견 🌿",
                Some("/assets/architecture.jpg"),
                128,
                12,
            ),
            (
                "준호",
                "junho_dev",
                "J",
                "sage",
                "42분",
                "작은 아이디어를 실제로 움직이게 만드는 즐거움. 오늘은 Rust와 Leptos로 나만의 공간을 만들고 있어요.\n\n#Rust #Leptos #사이드프로젝트",
                None,
                64,
                8,
            ),
            (
                "지우",
                "jiwoo",
                "J",
                "sand",
                "1시간",
                "주말의 시작은 천천히 내린 커피와 읽다 만 책 한 권. 모두의 오늘에도 작은 여유가 있기를 ☕\n\n#일상의기록",
                None,
                92,
                4,
            ),
            (
                "도윤",
                "doyun",
                "D",
                "blue",
                "2시간",
                "완벽하게 준비될 때까지 기다리기보다, 오늘 할 수 있는 가장 작은 것부터 시작하기. 이번 주의 사이드 프로젝트도 한 걸음 더.\n\n#오늘의영감 #사이드프로젝트",
                None,
                37,
                3,
            ),
        ];
        Self {
            posts: seeds
                .into_iter()
                .enumerate()
                .map(
                    |(
                        index,
                        (author, handle, initial, tone, time, body, image, likes, reposts),
                    )| Post {
                        id: index as u64 + 1,
                        author: author.into(),
                        handle: handle.into(),
                        initial: initial.into(),
                        tone: tone.into(),
                        body: body.into(),
                        time: time.into(),
                        image: image.map(String::from),
                        likes,
                        reposts,
                        liked: false,
                        reposted: false,
                        bookmarked: false,
                        own: false,
                        replies: Vec::new(),
                    },
                )
                .collect(),
            following: vec!["junho_dev".into()],
            next_id: 5,
        }
    }
}

fn checked_body(body: &str) -> Result<String, String> {
    let body = body.trim();
    if body.is_empty() {
        return Err("내용을 입력해 주세요.".into());
    }
    if body.chars().count() > MAX_CHARS {
        return Err(format!("{MAX_CHARS}자 이내로 작성해 주세요."));
    }
    Ok(body.into())
}

fn valid_image(image: &str) -> bool {
    if image == "/assets/architecture.jpg" {
        return true;
    }
    if image.len() > MAX_IMAGE_DATA_URL_BYTES {
        return false;
    }
    image
        .strip_prefix("data:image/jpeg;base64,")
        .and_then(|encoded| STANDARD.decode(encoded).ok())
        .is_some_and(|bytes| {
            bytes.starts_with(&[0xff, 0xd8, 0xff]) && bytes.ends_with(&[0xff, 0xd9])
        })
}

fn checked_post(body: &str, image: Option<&str>) -> Result<String, String> {
    if image.is_some_and(|image| !valid_image(image)) {
        return Err("사진 형식이나 크기를 확인해 주세요.".into());
    }
    if image.is_some() && body.trim().is_empty() {
        Ok(String::new())
    } else {
        checked_body(body)
    }
}

fn valid_handle(handle: &str) -> bool {
    !handle.is_empty()
        && handle.len() <= 30
        && handle
            .bytes()
            .all(|c| c.is_ascii_alphanumeric() || c == b'_')
}

impl FeedState {
    pub fn publish(&mut self, body: &str, image: Option<String>) -> Result<(), String> {
        let body = checked_post(body, image.as_deref())?;
        if self.posts.len() >= MAX_POSTS {
            return Err(
                "저장 가능한 게시글 수에 도달했어요. 내 게시글을 정리한 뒤 다시 시도해 주세요."
                    .into(),
            );
        }
        let id = self.next_id.max(
            self.posts
                .iter()
                .map(|post| post.id)
                .max()
                .unwrap_or(0)
                .checked_add(1)
                .ok_or("게시글 번호를 만들 수 없어요.")?,
        );
        let next_id = id.checked_add(1).ok_or("게시글 번호를 만들 수 없어요.")?;
        self.posts.insert(
            0,
            Post {
                id,
                author: "Moon".into(),
                handle: "moon19ht".into(),
                initial: "M".into(),
                tone: "lavender".into(),
                body,
                time: "방금".into(),
                image,
                likes: 0,
                reposts: 0,
                liked: false,
                reposted: false,
                bookmarked: false,
                own: true,
                replies: Vec::new(),
            },
        );
        self.next_id = next_id;
        Ok(())
    }

    pub fn toggle_like(&mut self, id: u64) {
        if let Some(post) = self.posts.iter_mut().find(|post| post.id == id) {
            post.liked = !post.liked;
            post.likes = if post.liked {
                post.likes.saturating_add(1)
            } else {
                post.likes.saturating_sub(1)
            };
        }
    }

    pub fn toggle_repost(&mut self, id: u64) {
        if let Some(post) = self.posts.iter_mut().find(|post| post.id == id) {
            post.reposted = !post.reposted;
            post.reposts = if post.reposted {
                post.reposts.saturating_add(1)
            } else {
                post.reposts.saturating_sub(1)
            };
        }
    }

    pub fn toggle_bookmark(&mut self, id: u64) {
        if let Some(post) = self.posts.iter_mut().find(|post| post.id == id) {
            post.bookmarked = !post.bookmarked;
        }
    }

    pub fn toggle_follow(&mut self, handle: &str) {
        if let Some(index) = self.following.iter().position(|item| item == handle) {
            self.following.remove(index);
        } else if valid_handle(handle) && handle != "moon19ht" && self.following.len() < 100 {
            self.following.push(handle.into());
        }
    }

    pub fn reply(&mut self, id: u64, body: &str) -> Result<(), String> {
        let body = checked_body(body)?;
        let post = self
            .posts
            .iter_mut()
            .find(|post| post.id == id)
            .ok_or("게시글을 찾을 수 없어요.")?;
        if post.replies.len() >= MAX_REPLIES {
            return Err("이 게시글에 저장 가능한 답글 수에 도달했어요.".into());
        }
        post.replies.push(Reply { body });
        Ok(())
    }

    pub fn remove_post(&mut self, id: u64) -> bool {
        if let Some(index) = self.posts.iter().position(|post| post.id == id && post.own) {
            self.posts.remove(index);
            true
        } else {
            false
        }
    }

    pub fn validate(&self) -> bool {
        let mut ids = HashSet::new();
        let mut handles = HashSet::new();
        self.posts.len() <= MAX_POSTS
            && self.next_id > 0
            && self.following.len() <= 100
            && self
                .following
                .iter()
                .all(|handle| valid_handle(handle) && handles.insert(handle))
            && self.posts.iter().all(|post| {
                post.id > 0
                    && post.id < u64::MAX
                    && ids.insert(post.id)
                    && valid_handle(&post.handle)
                    && !post.author.trim().is_empty()
                    && post.author.chars().count() <= 50
                    && post.initial.chars().count() <= 2
                    && matches!(
                        post.tone.as_str(),
                        "mauve" | "sage" | "sand" | "blue" | "lavender"
                    )
                    && post.time.chars().count() <= 50
                    && checked_post(&post.body, post.image.as_deref()).is_ok()
                    && (!post.own || post.handle == "moon19ht")
                    && (!post.liked || post.likes > 0)
                    && (!post.reposted || post.reposts > 0)
                    && post.replies.len() <= MAX_REPLIES
                    && post
                        .replies
                        .iter()
                        .all(|reply| checked_body(&reply.body).is_ok())
            })
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn default_state_and_serialized_round_trip_are_valid() {
        let state = FeedState::default();
        assert!(state.validate());
        let decoded: FeedState =
            serde_json::from_str(&serde_json::to_string(&state).unwrap()).unwrap();
        assert!(decoded.validate());
        assert_eq!(decoded.posts.len(), 4);
    }

    #[test]
    fn publishing_validates_unicode_length_and_trims_without_mutating_on_error() {
        let mut state = FeedState::default();
        assert!(state.publish(" \n ", None).is_err());
        assert!(state.publish(&"한".repeat(MAX_CHARS + 1), None).is_err());
        assert_eq!(state.posts.len(), 4);
        state
            .publish(&format!("  {}\n", "한".repeat(MAX_CHARS)), None)
            .unwrap();
        assert_eq!(state.posts[0].body.chars().count(), MAX_CHARS);
        assert!(state.posts[0].own);
        assert!(state.validate());
    }

    #[test]
    fn stale_next_id_never_overwrites_a_post_and_overflow_leaves_state_intact() {
        let mut state = FeedState {
            next_id: 1,
            ..FeedState::default()
        };
        state.publish("새로운 이야기", None).unwrap();
        assert_eq!(state.posts[0].id, 5);
        state.next_id = u64::MAX;
        assert!(state.publish("번호 초과", None).is_err());
        assert_eq!(state.posts.len(), 5);
    }

    #[test]
    fn interactions_toggle_and_only_own_posts_can_be_deleted() {
        let mut state = FeedState::default();
        let likes = state.posts[0].likes;
        let reposts = state.posts[0].reposts;
        state.toggle_like(1);
        state.toggle_repost(1);
        state.toggle_bookmark(1);
        assert_eq!(state.posts[0].likes, likes + 1);
        assert_eq!(state.posts[0].reposts, reposts + 1);
        assert!(state.posts[0].bookmarked);
        state.toggle_like(1);
        state.toggle_repost(1);
        state.toggle_bookmark(1);
        assert_eq!(state.posts[0].likes, likes);
        assert_eq!(state.posts[0].reposts, reposts);
        assert!(!state.posts[0].bookmarked);
        assert!(!state.remove_post(1));
        state.publish("내 글", None).unwrap();
        assert!(state.remove_post(5));
        assert_eq!(state.posts.len(), 4);
    }

    #[test]
    fn replies_and_following_validate_input() {
        let mut state = FeedState::default();
        assert!(state.reply(1, "  ").is_err());
        assert!(state.reply(100, "답글").is_err());
        state.reply(1, "  반가워요  ").unwrap();
        assert_eq!(state.posts[0].replies[0].body, "반가워요");
        state.toggle_follow("seoyeon");
        assert!(state.following.iter().any(|handle| handle == "seoyeon"));
        state.toggle_follow("seoyeon");
        assert!(!state.following.iter().any(|handle| handle == "seoyeon"));
        state.toggle_follow("@invalid");
        state.toggle_follow("moon19ht");
        assert_eq!(state.following, ["junho_dev"]);
    }

    #[test]
    fn corrupted_persisted_state_is_rejected() {
        let mut state = FeedState::default();
        state.posts[1].id = state.posts[0].id;
        assert!(!state.validate());
        let mut state = FeedState::default();
        state.posts[0].image = Some("https://untrusted.example/image.jpg".into());
        assert!(!state.validate());
        let mut state = FeedState::default();
        state.posts[0].body = " ".into();
        state.posts[0].image = None;
        assert!(!state.validate());
    }

    fn jpeg_data_url(bytes: &[u8]) -> String {
        format!("data:image/jpeg;base64,{}", STANDARD.encode(bytes))
    }

    #[test]
    fn image_only_posts_and_existing_text_posts_survive_serialization() {
        let mut state = FeedState::default();
        state.publish("기존 글", None).unwrap();
        let previous: FeedState =
            serde_json::from_str(&serde_json::to_string(&state).unwrap()).unwrap();
        assert!(previous.validate());
        assert_eq!(previous.posts[0].body, "기존 글");
        assert!(previous.posts[0].image.is_none());

        let image = jpeg_data_url(&[0xff, 0xd8, 0xff, 0xe0, 0, 2, 0xff, 0xd9]);
        state.publish("  \n ", Some(image.clone())).unwrap();
        let decoded: FeedState =
            serde_json::from_str(&serde_json::to_string(&state).unwrap()).unwrap();
        assert!(decoded.validate());
        assert_eq!(decoded.posts[0].body, "");
        assert_eq!(decoded.posts[0].image.as_deref(), Some(image.as_str()));
        assert_eq!(decoded.posts[1].body, "기존 글");
        assert!(decoded.posts[0].own);
    }

    #[test]
    fn unsafe_or_malformed_images_never_mutate_posts() {
        let mut state = FeedState::default();
        let invalid_images = [
            "https://example.com/photo.jpg",
            "/assets/photo.svg",
            "data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=",
            "data:image/png;base64,iVBORw0KGgo=",
            "data:image/jpeg;base64,",
            "data:image/jpeg;base64,/9j/@@==",
            "data:image/jpeg;base64,/9j/2Q==\n",
            "data:image/jpeg;base64,/9j/2Q===",
            "data:image/jpeg;base64,PHNjcmlwdD4=",
        ];
        for image in invalid_images {
            assert!(
                state.publish("사진", Some(image.into())).is_err(),
                "{image}"
            );
            assert_eq!(state.posts.len(), 4);
            assert_eq!(state.next_id, 5);
        }
        let missing_end = jpeg_data_url(&[0xff, 0xd8, 0xff, 0xe0]);
        assert!(state.publish("사진", Some(missing_end)).is_err());
        let mut saved = FeedState::default();
        saved.posts[0].image = Some(invalid_images[2].into());
        assert!(!saved.validate());
    }

    #[test]
    fn image_size_and_body_limits_apply_before_publishing() {
        let mut state = FeedState::default();
        let max_binary_size =
            ((MAX_IMAGE_DATA_URL_BYTES - "data:image/jpeg;base64,".len()) / 4) * 3;
        let mut bytes = vec![0; max_binary_size];
        bytes[..3].copy_from_slice(&[0xff, 0xd8, 0xff]);
        bytes[max_binary_size - 2..].copy_from_slice(&[0xff, 0xd9]);
        let image = jpeg_data_url(&bytes);
        assert!(image.len() <= MAX_IMAGE_DATA_URL_BYTES);
        assert!(
            state
                .publish(&"한".repeat(MAX_CHARS + 1), Some(image.clone()))
                .is_err()
        );
        assert_eq!(state.posts.len(), 4);
        state.publish(&"한".repeat(MAX_CHARS), Some(image)).unwrap();
        assert!(state.validate());

        bytes.extend_from_slice(&[0, 0xff, 0xd9]);
        let oversized = jpeg_data_url(&bytes);
        assert!(oversized.len() > MAX_IMAGE_DATA_URL_BYTES);
        assert!(state.publish("", Some(oversized)).is_err());
        assert_eq!(state.posts.len(), 5);
        assert_eq!(state.next_id, 6);
    }
}
