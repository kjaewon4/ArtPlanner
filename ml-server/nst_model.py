# nst_model.py
import tensorflow as tf
import numpy as np
import PIL.Image
import tensorflow_hub as hub

# 이미지 로딩 함수
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

# 텐서를 이미지로 변환
def tensor_to_image(tensor):
    tensor = tensor * 255
    tensor = np.array(tensor, dtype=np.uint8)
    if np.ndim(tensor) > 3:
        tensor = tensor[0]
    return PIL.Image.fromarray(tensor)

# TensorFlow Hub에서 스타일 변환 모델 로드 (캐싱 방식)
hub_model = None

def get_hub_model():
    global hub_model
    if hub_model is None:
        hub_model = hub.load('https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2')
    return hub_model

# 스타일 변환 실행 함수
def run_style_transfer(content_path, style_path, output_path, max_dim=512):
    content_image = load_img(content_path, max_dim)
    style_image = load_img(style_path, max_dim)

    model = get_hub_model()
    stylized_image = model(tf.constant(content_image), tf.constant(style_image))[0]
    result_image = tensor_to_image(stylized_image)
    result_image.save(output_path)
    return output_path


# # nst_model.py
# import tensorflow as tf
# import numpy as np
# import PIL.Image
# import time
# import os


# def load_img(path_to_img, max_dim=512):
#     img = tf.io.read_file(path_to_img)
#     img = tf.image.decode_image(img, channels=3)
#     img = tf.image.convert_image_dtype(img, tf.float32)
#     shape = tf.cast(tf.shape(img)[:-1], tf.float32)
#     long_dim = max(shape)
#     scale = max_dim / long_dim
#     new_shape = tf.cast(shape * scale, tf.int32)
#     img = tf.image.resize(img, new_shape)
#     img = img[tf.newaxis, :]
#     return img


# def tensor_to_image(tensor):
#     tensor = tensor * 255
#     tensor = np.array(tensor, dtype=np.uint8)
#     if np.ndim(tensor) > 3:
#         assert tensor.shape[0] == 1
#         tensor = tensor[0]
#     return PIL.Image.fromarray(tensor)


# def gram_matrix(input_tensor):
#     result = tf.linalg.einsum('bijc,bijd->bcd', input_tensor, input_tensor)
#     input_shape = tf.shape(input_tensor)
#     num_locations = tf.cast(input_shape[1] * input_shape[2], tf.float32)
#     return result / num_locations


# def vgg_layers(layer_names):
#     vgg = tf.keras.applications.VGG19(include_top=False, weights='imagenet')
#     vgg.trainable = False
#     outputs = [vgg.get_layer(name).output for name in layer_names]
#     model = tf.keras.Model([vgg.input], outputs)
#     return model


# class StyleContentModel(tf.keras.models.Model):
#     def __init__(self, style_layers, content_layers):
#         super(StyleContentModel, self).__init__()
#         self.vgg = vgg_layers(style_layers + content_layers)
#         self.style_layers = style_layers
#         self.content_layers = content_layers
#         self.num_style_layers = len(style_layers)
#         self.vgg.trainable = False

#     def call(self, inputs):
#         inputs = inputs * 255.0
#         preprocessed_input = tf.keras.applications.vgg19.preprocess_input(inputs)
#         outputs = self.vgg(preprocessed_input)
#         style_outputs, content_outputs = outputs[:self.num_style_layers], outputs[self.num_style_layers:]
#         style_outputs = [gram_matrix(output) for output in style_outputs]
#         content_dict = {name: val for name, val in zip(self.content_layers, content_outputs)}
#         style_dict = {name: val for name, val in zip(self.style_layers, style_outputs)}
#         return {'content': content_dict, 'style': style_dict}


# def run_style_transfer(
#     content_path,
#     style_path,
#     output_path,
#     epochs=10,
#     steps_per_epoch=100,
#     max_dim=512,
#     style_weight=1e-2,
#     content_weight=1e4,
#     total_variation_weight=30
# ):
#     content_image = load_img(content_path, max_dim)
#     style_image = load_img(style_path, max_dim)

#     content_layers = ['block5_conv2']
#     style_layers = ['block1_conv1', 'block2_conv1', 'block3_conv1', 'block4_conv1', 'block5_conv1']
#     extractor = StyleContentModel(style_layers, content_layers)

#     style_targets = extractor(style_image)['style']
#     content_targets = extractor(content_image)['content']

#     image = tf.Variable(content_image)
#     opt = tf.optimizers.Adam(learning_rate=0.02, beta_1=0.99, epsilon=1e-1)

#     def style_content_loss(outputs):
#         style_outputs = outputs['style']
#         content_outputs = outputs['content']
#         style_loss = tf.add_n([tf.reduce_mean((style_outputs[name] - style_targets[name]) ** 2) for name in style_outputs])
#         style_loss *= style_weight / len(style_layers)
#         content_loss = tf.add_n([tf.reduce_mean((content_outputs[name] - content_targets[name]) ** 2) for name in content_outputs])
#         content_loss *= content_weight / len(content_layers)
#         return style_loss + content_loss

#     def total_variation_loss(image):
#         x_deltas = image[:, :, 1:, :] - image[:, :, :-1, :]
#         y_deltas = image[:, 1:, :, :] - image[:, :-1, :, :]
#         return tf.reduce_sum(tf.abs(x_deltas)) + tf.reduce_sum(tf.abs(y_deltas))

#     @tf.function()
#     def train_step(image):
#         with tf.GradientTape() as tape:
#             outputs = extractor(image)
#             loss = style_content_loss(outputs)
#             loss += total_variation_weight * total_variation_loss(image)
#         grad = tape.gradient(loss, image)
#         opt.apply_gradients([(grad, image)])
#         image.assign(tf.clip_by_value(image, 0.0, 1.0))

#     step = 0
#     for n in range(epochs):
#         for m in range(steps_per_epoch):
#             step += 1
#             train_step(image)

#     result_image = tensor_to_image(image)
#     result_image.save(output_path)
#     return output_path
