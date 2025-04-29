# ml-server/nst_model.py
import tensorflow as tf
import tensorflow_hub as hub
import numpy as np
import PIL.Image

# TensorFlow Hub 모델 로드 (최초 1회)
# tf.saved_model.load_v2 대신 최신 권장 방식 사용
# hub_model = tf.compat.v2.saved_model.load('https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2')
hub_model = hub.load('https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2')

# 이미지 로딩 및 전처리
def load_img(path):
    img = tf.io.read_file(path)
    img = tf.image.decode_image(img, channels=3)
    img = tf.image.convert_image_dtype(img, tf.float32)
    img = tf.image.resize(img, [512, 512])
    img = img[tf.newaxis, :]
    return img

# Tensor를 PIL Image로 변환
def tensor_to_image(tensor):
    tensor = tensor * 255
    tensor = tf.clip_by_value(tensor, 0, 255)
    tensor = tf.cast(tensor, tf.uint8)
    tensor = tf.squeeze(tensor)
    return PIL.Image.fromarray(tensor.numpy())

# 스타일 변환 실행
def run_style_transfer(content_path, style_path, output_path):
    content_image = load_img(content_path)
    style_image = load_img(style_path)
    stylized_image = hub_model(content_image, style_image)[0]
    result_image = tensor_to_image(stylized_image)
    result_image.save(output_path)
    return output_path
