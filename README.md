# ArtPlanner

> **“ArtPlanner는 사용자가 업로드한 사진에 명화 스타일 변환 또는 배경 제거 기능을 제공하고, 스타일 변환 결과물을 캘린더 이미지로 생성할 수 있는 웹 서비스입니다.”**
<p align="center">
  <img src="https://github.com/user-attachments/assets/655689b6-06a8-4517-82c1-12e93de75c53" width="320" />
  <img src="https://github.com/user-attachments/assets/c26be71e-c689-4ac8-91be-daae607c95cb" width="320" />
  <img src="https://github.com/user-attachments/assets/0a8a26f0-6f2d-4f8b-9c32-ac7b4c7b1822" height="250" />
  <img src="https://github.com/user-attachments/assets/10584f04-71d7-4eff-bd3c-f24f17ccb9d9" width="320" />
</p>

<details>
  
  <summary>목차</summary>
  
  - [핵심 컨셉](#핵심-컨셉)
  - [기능 흐름](#기능-흐름)
  - [주요 기술 스택](#주요-기술-스택)
  - [주요 컴포넌트](#주요-컴포넌트)
  - [프로젝트 구조](#프로젝트-구조)
  - [명화 스타일 리스트 (일부)](#명화-스타일-리스트-일부)
  - [타겟 사용자](#타겟-사용자)
  - [향후 확장 계획](#향후-확장-계획)
  - [프로젝트 실행 방법](#프로젝트-실행-방법)
  - [참고 자료](#참고-자료)

</details>



---

## 핵심 컨셉

- **Stable Diffusion 기반 스타일 변환**
- **U²-Net 기반 배경제거**
- **감성 UI/UX + 굿즈 템플릿 제공**
- **Z세대 & 문구 마니아 타겟팅**
- **맞춤형 선물 / 셀프케어 확장 가능**

---

## 기능 흐름

### 명화 스타일 변환 + 굿즈 제작

1. **사진 업로드**: React + FileReader 사용
2. **명화 스타일 선택**: 리스트 렌더링
3. **Stable Diffusion 변환**: Colab API 호출 → FastAPI 연동
4. **미리보기**: `img` 태그 + 다운로드 버튼
5. **캘린더 템플릿 선택**: `StyledCalendar` 컴포넌트 활용
6. **이미지 저장**: `html2canvas`로 변환 후 Blob 다운로드

### 배경 제거 (U²-Net)

| 단계 | 설명 |
|:--:|:--|
| 1 | 이미지 업로드 → FastAPI 전송 |
| 2 | `/api/remove/background` API 호출 |
| 3 | U²-Net 모델로 배경 제거 (PyTorch) |
| 4 | 투명 배경 PNG로 저장 및 반환 |
| + | 추후: 배경만 스타일 적용, 인물 합성 활용 가능 |

---

## 주요 기술 스택

| 영역 | 기술 |
|------|------|
| **프론트엔드** | React, Tailwind CSS, html2canvas |
| **백엔드** | FastAPI, SpringBoot |
| **AI 모델** | Stable Diffusion(Colab 실행), U²-Net (PyTorch) |
| **저장/출력** | Blob URL 다운로드, PNG, 향후 PDF 확장 |

---

## 주요 컴포넌트

- `UploadForm` – 이미지 업로드 & 스타일 선택
- `ResultPreview` – 결과 미리보기 + 다운로드
- `StyledCalendar` – 감성 달력 템플릿
- `BackgroundRemover` – 배경 제거 처리

---

## 프로젝트 구조
```
project-root/
├── backend/                     # Spring Boot 서버
│   └──spl
│       └── ddl.sql            # DB 스키마 + 초기 데이터
├── ml-server/
│   ├── style_transfer_server.py     # FastAPI 서버 진입점
│   ├── background_removal.py        # U²-Net 기반 배경 제거 함수
│   ├── u2net.pth                    # 사전학습된 PyTorch 모델 (필수)
│   ├── style_images/                # 명화 스타일 이미지 저장소
│   ├── uploads/                     # 사용자가 업로드한 원본 이미지
│   └── outputs/                     # 처리된 결과 이미지
├── react/                           # React 프론트엔드
│   ├── src/
│   │   ├── components/         # React 컴포넌트
│   │   ├── App.js
│   │   └── index.js
│   ├── .env.local
│   └── package.json
└── README.md
```

---

## 명화 스타일 리스트 (일부)
| No. | 작품명          | 작가    | 특징       |
| --- | ------------ | ----- | -------- |
| 1   | 별이 빛나는 밤     | 고흐    | 소용돌이 밤하늘 |
| 2   | 모나리자         | 다빈치   | 세계적 초상화  |
| 3   | 진주 귀걸이를 한 소녀 | 페르메이르 | 북유럽 모나리자 |
| 4   | 절규           | 뭉크    | 불안의 상징   |
| 5   | 키스           | 클림트   | 황금빛 사랑   |
| ... | ...          | ...   | ...      |

---

## 타겟 사용자
- 다꾸 / 문구 덕후 / 아트 굿즈 마니아
- Z세대 ~ 30대 감성 중심 SNS 유저
- 맞춤형 선물을 찾는 일반 사용자

--- 

## 향후 확장 계획
1. PDF 저장, 다이어리/엽서 템플릿 추가
2. 캘린더 내 “오늘의 문구” 사용자 입력
3. AI 문구 추천 (KoBART 등)
4. My Page 기능 – 스타일링한 이미지 관리

---

## 프로젝트 실행 방법
### 데이터베이스 설정

1. MySQL/MariaDB 콘솔 또는 CLI에서 데이터베이스 생성:
  ```
  CREATE DATABASE artplanner CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  USE artplanner;
  ```
2. 저장소 루트에 위치한 ddl.sql 파일을 실행하여 style_artworks 테이블과 초기 데이터를 삽입:

```mysql -u <사용자명> -p artplanner < ddl.sql```

3. 테이블이 정상 생성되었는지 확인:
```
SHOW TABLES;
SELECT COUNT(*) FROM style_artworks;
```
또는 MySQL Workbench에 붙여 넣어 실행

### 백엔드 실행 (Google Colab)

(Google Colab)

1. ml-server/notebooks/sd-style-transfer.ipynb 파일의 'Open in Colab'버튼 클릭 후 Google Colab에서 코드 실행 준비 

2. 런타임 > 러타임 유형 변경 > T4 GPU 이상의 옵션 선택 (CPU X)

3. conf.get_default().auth_token에 ngrok 토큰 설정

4. Colab 런타임에서  실행

5. 출력된 Public URL을 복사해 둡니다.

### 프론트엔드 실행 (로컬 개발)
1. 의존성 설치 
```
cd frontend  // 리포지토리 루트에서 frontend 폴더로 이동
npm install  // 의존성 설치
```
2. .env.local 파일 생성하고, 다음 변수 추가:
```
REACT_APP_API_URL=https://{Colab에서 받은 ngrok URL}
```
3. 개발 서버 실행:
```
npm start
```
4. 브라우저에서 http://localhost:3000 접속

### 백엔드 실행 (로컬 개발)

1. Spring Boot 실행

(1) 서버 디렉토리(backend/)로 이동:
```
cd backend
```
(2) 의존성 빌드 및 애플리케이션 실행:
* Gradle 사용:
```
./gradlew bootRun
```

2. FastAPI 서버 실행

(1) ml-server 디렉토리로 이동:
```
cd ../ml-server
```
(2) 가상환경 활성화 및 의존성 설치 (필요 시):
```
pip install -r requirements.txt
```
(3) 서버 실행:
```
python style_transfer_server.py
```

---

### 참고 자료
- 📄 U²-Net 논문 : https://arxiv.org/abs/2005.09007
- 🔗 U²-Net GitHub : https://github.com/xuebinqin/U-2-Net.git
- 📘 API 명세서 (Notion) : https://www.notion.so/2007910c6d4980d59ea8d590447c9485?v=2007910c6d498095b8b5000c6e103b77

<div align="right">
  
[목차로](#목차)

</div>
