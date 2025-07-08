# ml-server/style_transfer_server.py
# FastAPI 서버
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import os
import shutil
from nst_model import run_style_transfer
from background_removal import remove_background

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

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

@app.post("/api/remove/background")
async def remove_background_api(content: UploadFile = File(...)):
    try:
        content_path = os.path.join(UPLOAD_DIR, content.filename)
        output_path = os.path.join(OUTPUT_DIR, f"alpha_{content.filename}.png")

        # 1. 파일 저장
        with open(content_path, "wb") as buffer:
            shutil.copyfileobj(content.file, buffer)

        # 2. 배경 제거 → 알파 PNG 생성
        remove_background(content_path, output_path)

        # 3. 결과 파일 반환
        return FileResponse(output_path, media_type="image/png")

    except Exception as e:
        import traceback
        traceback.print_exc()  # 에러 상세 출력
        return JSONResponse(status_code=500, content={"error": str(e)})


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("style_transfer_server:app", host="0.0.0.0", port=8000, reload=True)

# uvicorn style_transfer_server:app --host 0.0.0.0 --port 8000 --reload
