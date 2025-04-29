# ml-server/style_transfer_server.py
# (mode = "full" or "background" 분기 처리)
from fastapi import FastAPI, UploadFile, Form, File
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware

import os
import shutil

from nst_model import run_style_transfer
from background_removal import remove_background
from background_style_transfer import stylize_background
from compose_foreground import compose_foreground 

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "./uploads"
STYLE_DIR = "./style_images"
OUTPUT_DIR = "./outputs"
MASK_DIR = "./masks"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(MASK_DIR, exist_ok=True)

@app.post("/api/style-transfer")
async def style_transfer(
    style_filename: str = Form(...),
    content: UploadFile = File(...),
    mode: str = Form("full")  # full, background, compose
):
    content_path = os.path.join(UPLOAD_DIR, content.filename)
    style_path = os.path.join(STYLE_DIR, style_filename)
    output_path = os.path.join(OUTPUT_DIR, f"styled_{content.filename}")
    mask_path = os.path.join(MASK_DIR, f"mask_{content.filename}")

    # 파일 저장
    with open(content_path, "wb") as buffer:
        shutil.copyfileobj(content.file, buffer)

    if mode == "full":
        # 전체 스타일 변환
        run_style_transfer(content_path, style_path, output_path)

    elif mode == "background":
        # 배경만 스타일 변환
        remove_background(content_path, mask_path)
        stylize_background(content_path, style_path, mask_path, output_path)

    elif mode == "compose":
        # 배경은 스타일 이미지 그대로 두고, 인물만 합성
        remove_background(content_path, mask_path)
        compose_foreground(content_path, style_path, mask_path, output_path)

    else:
        return JSONResponse(content={"error": "Invalid mode"}, status_code=400)

    return FileResponse(output_path, media_type="image/png")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("style_transfer_server:app", host="0.0.0.0", port=8000, reload=True)
