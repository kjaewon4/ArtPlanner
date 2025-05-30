# ml-server/fast_style_transfer.py

import torch
from torchvision import transforms
from PIL import Image
import os

from transformer_net import TransformerNet

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
MODEL_DIR = "./style_models"

# 이미지 불러오기 및 전처리
def load_image(img_path, size=512):
    image = Image.open(img_path).convert('RGB')
    transform = transforms.Compose([
        transforms.Resize(size),
        transforms.ToTensor(),
        transforms.Lambda(lambda x: x.mul(255))
    ])
    image = transform(image).unsqueeze(0)
    return image.to(DEVICE)

# 변환된 이미지 저장
def save_image(tensor, output_path):
    image = tensor.clone().detach().cpu().squeeze(0)
    image = transforms.ToPILImage()(image / 255.0)
    image.save(output_path)

# 스타일 전이 실행 함수
def fast_style_transfer(content_path, style_name, output_path):
    style_model_path = os.path.join(MODEL_DIR, f"{style_name}.pth")
    if not os.path.exists(style_model_path):
        raise FileNotFoundError(f"[❌] Style model not found: {style_model_path}")

    model = TransformerNet()
    model.load_state_dict(torch.load(style_model_path, map_location=DEVICE))
    model.to(DEVICE)
    model.eval()

    content_image = load_image(content_path)

    with torch.no_grad():
        output = model(content_image).cpu()

    save_image(output, output_path)
