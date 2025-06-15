# ml-server/background_removal.py
# 
import torch
import torchvision.transforms as transforms
from PIL import Image
import numpy as np
import os

from u2net import U2NET  # ✅ 반드시 U²-Net 모델 파일 필요
from torchvision import transforms

# U²-Net 모델 로딩
MODEL_PATH = "u2net.pth"
net = U2NET(3, 1)
net.load_state_dict(torch.load(MODEL_PATH, map_location=torch.device('cpu')))
net.eval()

# 전처리 transform 설정
transform = transforms.Compose([
    transforms.Resize((320, 320)),
    transforms.ToTensor(),
])

def remove_background(input_path, output_path):
    # 이미지 로드 및 전처리리
    image = Image.open(input_path).convert('RGB')
    transformed = transform(image).unsqueeze(0)

    # 2. U²-Net 추론 (마스크 예측)
    with torch.no_grad():
        pred = net(transformed)[0]
    pred = pred.squeeze().cpu().numpy()

    # 3. 마스크 후처리 (255 스케일, 원본 크기로 resize)
    mask = (pred > 0.3).astype(np.uint8) * 255
    mask_img = Image.fromarray(mask).resize(image.size)  # 원본 크기로 resize
    mask_np = np.array(mask_img)

    # 4. RGB → RGBA 결합
    image_np = np.array(image)
    rgba_np = np.dstack((image_np, mask_np))  # 크기 맞추고 나서 결합

    # 5. 저장
    Image.fromarray(rgba_np).save(output_path)
