# style_transfer_server.py
from fastapi import FastAPI, UploadFile, Form
from fastapi.responses import FileResponse
import uvicorn
import shutil
import os
from nst_model import run_style_transfer
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # 또는 ["*"] 테스트용
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "./uploads"
OUTPUT_FILE = "./outputs/stylized.png"
STYLE_DIR = "./style_images"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs("./outputs", exist_ok=True)

@app.post("/api/style-transfer")
async def style_transfer(style_filename: str = Form(...), content: UploadFile = ...):
    content_path = os.path.join(UPLOAD_DIR, content.filename)
    style_path = os.path.join(STYLE_DIR, style_filename)

    with open(content_path, "wb") as buffer:
        shutil.copyfileobj(content.file, buffer)

    run_style_transfer(content_path, style_path, OUTPUT_FILE)

    return FileResponse(OUTPUT_FILE, media_type="image/png")

if __name__ == "__main__":
    uvicorn.run("style_transfer_server:app", host="0.0.0.0", port=8000, reload=True)

'''
요청: POST with multipart/form-data

style_filename: 명화 파일 이름 (예: starry_night.jpg)

content: 사용자가 업로드한 사진


동작:

업로드된 이미지 → ./uploads/에 저장

명화 스타일 이미지 → ./style_images/에서 로딩

스타일 변환 실행 → 결과 이미지 ./outputs/stylized.png로 저장

변환 결과 이미지 반환 (FileResponse)

의존 코드: run_style_transfer(content_path, style_path, output_path) 함수는 nst_model.py에서 정의 필요
'''