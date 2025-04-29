# ml-server/background_style_transfer.py
# (배경 스타일 변환 후 전경 합성)
import tensorflow as tf
import numpy as np
from PIL import Image
import tensorflow_hub as hub

# 스타일 변환 모델 로드
hub_model = hub.load('https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2')

# 🔥 추가: TensorFlow 허브 모델에 넣을 때 사용할 로딩 함수
def load_img(path_to_img, max_dim=512):
    img = tf.io.read_file(path_to_img)
    img = tf.image.decode_image(img, channels=3)
    img = tf.image.convert_image_dtype(img, tf.float32)
    shape = tf.cast(tf.shape(img)[:-1], tf.float32)
    long_dim = max(shape)
    scale = max_dim / long_dim
    new_shape = tf.cast(shape * scale, tf.int32)
    img = tf.image.resize(img, new_shape)
    img = img[tf.newaxis, :]
    return img

def stylize_background(content_path, style_path, mask_path, output_path):
    # 이미지 로드
    content_image = Image.open(content_path).convert("RGB")
    mask_image = Image.open(mask_path).convert("L")

   # 스타일 변환
    stylized_tensor = hub_model(
        tf.constant(load_img(content_path)), 
        tf.constant(load_img(style_path))
    )[0]

    # 🔥 squeeze() 추가
    stylized_np = tf.squeeze(stylized_tensor).numpy()
    stylized_np = np.clip(stylized_np * 255, 0, 255).astype(np.uint8)

    # 🔥 resize해서 content 이미지 크기에 맞추기
    stylized_np = np.array(Image.fromarray(stylized_np).resize(content_image.size))

    mask_np = np.array(mask_image.resize(content_image.size)).astype(np.float32) / 255.0
    mask_np = np.expand_dims(mask_np, axis=-1)  # (H, W) → (H, W, 1)

    content_np = np.array(content_image).astype(np.float32) / 255.0
    stylized_np = stylized_np.astype(np.float32) / 255.0

    # 🔥 최종 합성
    combined = mask_np * content_np + (1 - mask_np) * stylized_np
    combined = np.clip(combined * 255, 0, 255).astype(np.uint8)

    # 저장
    Image.fromarray(combined).save(output_path)
