# # modnet_server.py
# import sys
# import os
# sys.path.append(os.path.abspath('.'))
# import shutil
# import torch
# import numpy as np
# from PIL import Image
# from torchvision import transforms
# from fastapi import FastAPI, UploadFile, File
# from fastapi.responses import FileResponse
# from model.modnet import MODNet  # 사전에 다운로드한 코드에서 import
# import time
# start = time.time()

# app = FastAPI()

# # 1. 모델 로드
# modnet = MODNet()  # backbone 인자 제거
# state_dict = torch.load('./pretrained/modnet_photographic_portrait_matting.ckpt', map_location='cpu')
# modnet.load_state_dict(state_dict, strict=False)

# modnet.eval()

# # 2. 입력 이미지 전처리
# def preprocess(image: Image.Image):
#     transform = transforms.Compose([
#         transforms.Resize((512, 512)),
#         transforms.ToTensor(),
#         transforms.Normalize(mean=[0.5]*3, std=[0.5]*3)
#     ])
#     return transform(image).unsqueeze(0)  # shape (1, 3, 512, 512)

# # 3. 인물 분리 및 알파 추출
# def run_modnet(image_path, save_dir="./outputs"):
#     os.makedirs(save_dir, exist_ok=True)
#     orig = Image.open(image_path).convert("RGB").resize((512, 512))
#     input_tensor = preprocess(orig)

#     with torch.no_grad():
#         _, _, pred_matte = modnet(input_tensor, inference=True)  # 수정 포인트
#         print("Inference time:", time.time() - start)
#         matte_np = (pred_matte.squeeze().numpy() * 255).astype(np.uint8)
    
#     orig_np = np.array(orig)
#     # RGBA 저장
#     rgba_np = np.dstack([orig_np, matte_np])
#     rgba_image = Image.fromarray(rgba_np, mode="RGBA")
#     filename_wo_ext = os.path.splitext(os.path.basename(image_path))[0]
#     rgba_path = os.path.join(save_dir, f"rgba_{filename_wo_ext}.png")
#     rgba_image.save(rgba_path)

#     # 🎯 인물만 추출된 RGB 저장
#     fg_np = (orig_np * (matte_np[:, :, None] / 255)).astype(np.uint8)
#     fg_image = Image.fromarray(fg_np, mode="RGB")
#     fg_path = os.path.join(save_dir, f"fg_{filename_wo_ext}.jpg")
#     fg_image.save(fg_path)

#     return rgba_path

# # 4. API 엔드포인트
# @app.post("/api/remove-background")
# async def remove_background(image: UploadFile = File(...)):
#     contents = await image.read()

#     TEMP_DIR = "./outputs"
#     os.makedirs(TEMP_DIR, exist_ok=True)

#     input_path = os.path.join(TEMP_DIR, image.filename)
#     with open(input_path, "wb") as f:
#         f.write(contents)

#     output_path = run_modnet(input_path, save_dir=TEMP_DIR)
#     return FileResponse(output_path, media_type="image/png")


# # uvicorn modnet_server:app --host 0.0.0.0 --port 8002
# modnet_server.py

import os
import uuid
import torch
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse
from PIL import Image
from torchvision import transforms
from model.modnet import MODNet

app = FastAPI()

# 모델 초기화 및 가중치 로드
modnet = MODNet(backbone_pretrained=False)
modnet.load_state_dict(torch.load("./pretrained/modnet_photographic_portrait_matting.ckpt", map_location=torch.device("cpu")))
modnet.eval()

# 전처리 함수
def preprocess(image: Image.Image):
    transform = transforms.Compose([
        transforms.Resize((512, 512)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5])
    ])
    return transform(image).unsqueeze(0)  # shape: (1, 3, 512, 512)

# 인물 분리 처리 함수
def run_modnet(input_path):
    image = Image.open(input_path).convert("RGB")
    input_tensor = preprocess(image)

    with torch.no_grad():
        _, _, matte = modnet(input_tensor, inference=True)

    matte_np = matte.squeeze().cpu().numpy()
    matte_img = Image.fromarray((matte_np * 255).astype('uint8')).resize(image.size)

    # 알파 채널 붙이기
    rgba = image.convert("RGBA")
    rgba.putalpha(matte_img)

    output_path = os.path.join("outputs", f"{uuid.uuid4()}.png")
    rgba.save(output_path)
    return output_path

@app.post("/api/remove-background")
async def remove_background(file: UploadFile = File(...)):
    input_path = os.path.join("./outputs", file.filename)
    with open(input_path, "wb") as f:
        f.write(await file.read())

    output_path = run_modnet(input_path)
    return FileResponse(output_path)
