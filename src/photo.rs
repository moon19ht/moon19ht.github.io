use crate::model::MAX_IMAGE_DATA_URL_BYTES;
use wasm_bindgen::prelude::*;

const MAX_FILE_BYTES: f64 = 10.0 * 1024.0 * 1024.0;

fn validate_file(mime: &str, size: f64) -> Result<(), String> {
    if !matches!(mime, "image/jpeg" | "image/png" | "image/webp") {
        return Err("JPG, PNG, WebP 사진만 첨부할 수 있어요.".into());
    }
    if !size.is_finite() || size <= 0.0 {
        return Err("비어 있거나 올바르지 않은 사진 파일이에요.".into());
    }
    if size > MAX_FILE_BYTES {
        return Err("10MB 이하의 사진을 선택해 주세요.".into());
    }
    Ok(())
}

#[wasm_bindgen(inline_js = r#"
export async function preparePhoto(file, maxLength) {
    if (typeof createImageBitmap !== 'function') {
        throw '이 브라우저는 사진 처리를 지원하지 않아요. 최신 브라우저를 사용해 주세요.';
    }
    let bitmap;
    try {
        try {
            bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
        } catch {
            throw '사진을 읽을 수 없어요. 손상되지 않은 JPG, PNG, WebP 파일을 선택해 주세요.';
        }
        if (!bitmap.width || !bitmap.height || bitmap.width * bitmap.height > 40000000) {
            throw '4천만 화소 이하의 사진을 선택해 주세요.';
        }
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) {
            throw '사진을 처리할 수 없어요. 다른 브라우저에서 다시 시도해 주세요.';
        }
        let scale = Math.min(1, 1280 / Math.max(bitmap.width, bitmap.height));
        for (let attempt = 0; attempt < 6; attempt++) {
            canvas.width = Math.max(1, Math.round(bitmap.width * scale));
            canvas.height = Math.max(1, Math.round(bitmap.height * scale));
            context.fillStyle = '#ffffff';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
            for (const quality of [0.86, 0.74, 0.62, 0.5]) {
                const data = canvas.toDataURL('image/jpeg', quality);
                if (!data.startsWith('data:image/jpeg;base64,')) {
                    throw '사진을 JPEG로 변환할 수 없어요. 다른 사진을 선택해 주세요.';
                }
                if (data.length <= maxLength) return data;
            }
            scale *= 0.75;
        }
        throw '사진 용량을 충분히 줄일 수 없어요. 더 작은 사진을 선택해 주세요.';
    } finally {
        if (bitmap) bitmap.close();
    }
}
"#)]
extern "C" {
    #[wasm_bindgen(catch, js_name = preparePhoto)]
    async fn prepare_photo_js(file: web_sys::File, max_length: u32) -> Result<JsValue, JsValue>;
}

pub async fn prepare_photo(file: web_sys::File) -> Result<String, String> {
    validate_file(&file.type_(), file.size())?;
    prepare_photo_js(file, MAX_IMAGE_DATA_URL_BYTES as u32)
        .await
        .map_err(|error| {
            error
                .as_string()
                .unwrap_or_else(|| "사진 처리 중 오류가 발생했어요. 다시 시도해 주세요.".into())
        })?
        .as_string()
        .ok_or_else(|| "사진을 변환할 수 없어요. 다른 사진을 선택해 주세요.".into())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn accepts_supported_images_up_to_ten_mib() {
        for mime in ["image/jpeg", "image/png", "image/webp"] {
            assert!(validate_file(mime, 1.0).is_ok());
            assert!(validate_file(mime, MAX_FILE_BYTES).is_ok());
        }
        assert!(validate_file("image/jpeg", MAX_FILE_BYTES + 1.0).is_err());
    }

    #[test]
    fn rejects_unsupported_empty_and_invalid_files() {
        for mime in ["", "image/gif", "image/svg+xml", "image/heic", "text/plain"] {
            assert!(validate_file(mime, 100.0).is_err());
        }
        for size in [0.0, -1.0, f64::NAN, f64::INFINITY] {
            assert!(validate_file("image/png", size).is_err());
        }
    }
}
