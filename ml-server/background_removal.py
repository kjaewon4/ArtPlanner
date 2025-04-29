# ml-server/background_removal.py
# 
import torch
import torchvision.transforms as transforms
from PIL import Image
import numpy as np
import os

from u2net import U2NETP  # ✅ 반드시 U²-Net 모델 파일 필요
from torchvision import transforms

# U²-Net 모델 로딩
MODEL_PATH = "u2netp.pth"
net = U2NETP(3, 1)
net.load_state_dict(torch.load(MODEL_PATH, map_location=torch.device('cpu')))
net.eval()

# transform 설정
transform = transforms.Compose([
    transforms.Resize((320, 320)),
    transforms.ToTensor(),
])

def remove_background(input_path, output_mask_path):
    image = Image.open(input_path).convert('RGB')
    transformed = transform(image).unsqueeze(0)
    with torch.no_grad():
        pred = net(transformed)[0]
    pred = pred.squeeze().cpu().numpy()
    mask = (pred > 0.3).astype(np.uint8) * 255

    mask_img = Image.fromarray(mask)
    mask_img = mask_img.resize(image.size)  # 원본 크기로 리사이즈
    mask_img.save(output_mask_path)
