# ml-server/compose_foreground.py

from PIL import Image
import numpy as np
import cv2

def compose_foreground(content_path, style_path, mask_path, output_path):
    content_image = Image.open(content_path).convert("RGB")
    style_image = Image.open(style_path).convert("RGB")
    mask_image = Image.open(mask_path).convert("L")

    style_image = style_image.resize(content_image.size)
    mask_np = np.array(mask_image.resize(content_image.size)).astype(np.float32) / 255.0
    mask_np = np.expand_dims(mask_np, axis=-1)

    mask_np_blurred = cv2.GaussianBlur(mask_np.squeeze(), (51, 51), sigmaX=0, sigmaY=0)
    mask_np_blurred = np.expand_dims(mask_np_blurred, axis=-1)

    content_np = np.array(content_image).astype(np.float32) / 255.0
    style_np = np.array(style_image).astype(np.float32) / 255.0

    combined = mask_np_blurred * content_np + (1 - mask_np_blurred) * style_np
    combined = np.clip(combined * 255, 0, 255).astype(np.uint8)

    Image.fromarray(combined).save(output_path)
