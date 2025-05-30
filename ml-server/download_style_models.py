# ml-server/download_style_models.py
'''
cd ml-server
python download_style_models.py
'''
import os
import requests

STYLE_MODELS = {
    "starry_night": "	https://huggingface.co/akhaliq/fast-style-transfer/resolve/main/starry_night.pth",
    "the_scream": "https://huggingface.co/akhaliq/fast-style-transfer/resolve/main/the_scream.pth",
    "sunflowers": "	https://huggingface.co/akhaliq/fast-style-transfer/resolve/main/sunflowers.pth",
    "impression_sunrise": "	https://huggingface.co/akhaliq/fast-style-transfer/resolve/main/impression_sunrise.pth",
    "great_wave": "https://huggingface.co/akhaliq/fast-style-transfer/resolve/main/wave.pth",
}

MODEL_DIR = "./style_models"
os.makedirs(MODEL_DIR, exist_ok=True)

def download_file(url, dest):
    if os.path.exists(dest):
        print(f"✅ 이미 존재함: {dest}")
        return
    print(f"⬇️ 다운로드 시작: {dest}")
    response = requests.get(url, stream=True)
    if response.status_code == 200:
        with open(dest, "wb") as f:
            for chunk in response.iter_content(1024):
                f.write(chunk)
        print(f"✅ 다운로드 완료: {dest}")
    else:
        print(f"❌ 다운로드 실패: {url}")

def main():
    for name, url in STYLE_MODELS.items():
        dest = os.path.join(MODEL_DIR, f"{name}.pth")
        download_file(url, dest)

if __name__ == "__main__":
    main()

