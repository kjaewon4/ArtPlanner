# style_transfer_server.py
from nst_model import run_style_transfer
from fastapi import FastAPI, UploadFile, Form, File
from fastapi.responses import FileResponse, JSONResponse
import uvicorn
import shutil
import os
from tasks import style_transfer_task
from fastapi.middleware.cors import CORSMiddleware
from celery.result import AsyncResult

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "./uploads"
OUTPUT_DIR = "./outputs"
STYLE_DIR = "./style_images"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

from fastapi.responses import FileResponse

@app.post("/api/style-transfer")
async def style_transfer(
    style_filename: str = Form(...),
    content: UploadFile = File(...)
):
    content_path = os.path.join(UPLOAD_DIR, content.filename)
    style_path = os.path.join(STYLE_DIR, style_filename)
    output_path = os.path.join(OUTPUT_DIR, "stylized.png")

    with open(content_path, "wb") as buffer:
        shutil.copyfileobj(content.file, buffer)

    run_style_transfer(content_path, style_path, output_path)

    return FileResponse(output_path, media_type="image/png")  # ✅ 이미지 파일 직접 반환

# @app.post("/api/style-transfer")
# async def style_transfer(
#     style_filename: str = Form(...),
#     content: UploadFile = File(...),
#     quality: str = Form("fast"),
# ):
#     content_path = os.path.join(UPLOAD_DIR, content.filename)
#     style_path = os.path.join(STYLE_DIR, style_filename)

#     with open(content_path, "wb") as buffer:
#         shutil.copyfileobj(content.file, buffer)

#     task = style_transfer_task.delay(
#         content_path=content_path,
#         style_path=style_path,
#         output_dir=OUTPUT_DIR,
#         quality=quality,
#     )

#     return JSONResponse(content={"task_id": task.id}, status_code=202)

@app.get("/api/status/{task_id}")
def get_status(task_id: str):
    from celery_app import celery_app
    result = AsyncResult(task_id, app=celery_app)
    print("🔍 Task Status:", result.status)
    return {"status": result.status}


# @app.get("/api/status/{task_id}")
# def get_status(task_id: str):
#     result = AsyncResult(task_id)
#     return {
#         "status": result.status,
#         "result": result.result if result.successful() else None,
#     }


# @app.get("/api/status/{task_id}")
# def get_status(task_id: str):
#     result = AsyncResult(task_id)
#     return {"status": result.status}


@app.get("/api/result/{task_id}")
def get_result(task_id: str):
    file_path = os.path.join(OUTPUT_DIR, f"{task_id}.png")
    if os.path.exists(file_path):
        return FileResponse(file_path, media_type="image/png")
    return JSONResponse(status_code=404, content={"error": "Result not found"})


if __name__ == "__main__":
    uvicorn.run("style_transfer_server:app", host="0.0.0.0", port=8000, reload=True)


"""
요청: POST with multipart/form-data

style_filename: 명화 파일 이름 (예: starry_night.jpg)

content: 사용자가 업로드한 사진


동작:

업로드된 이미지 → ./uploads/에 저장

명화 스타일 이미지 → ./style_images/에서 로딩

스타일 변환 실행 → 결과 이미지 ./outputs/stylized.png로 저장

변환 결과 이미지 반환 (FileResponse)

의존 코드: run_style_transfer(content_path, style_path, output_path) 함수는 nst_model.py에서 정의 필요
"""
