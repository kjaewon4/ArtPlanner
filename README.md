# ArtPlanner

> **“내 사진을 명화처럼 바꿔 나만의 감성 굿즈(캘린더/엽서)로 제작할 수 있는 웹 서비스”**
<p align="center">
  <img src="https://github.com/user-attachments/assets/655689b6-06a8-4517-82c1-12e93de75c53" width="320" />
  <img src="https://github.com/user-attachments/assets/c26be71e-c689-4ac8-91be-daae607c95cb" width="320" />
  <img src="https://github.com/user-attachments/assets/0a8a26f0-6f2d-4f8b-9c32-ac7b4c7b1822" height="250" />
  <img src="https://github.com/user-attachments/assets/10584f04-71d7-4eff-bd3c-f24f17ccb9d9" width="320" />
</p>


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
└── ml-server/
    ├── style_transfer_server.py     # FastAPI 서버 진입점
    ├── background_removal.py        # U²-Net 기반 배경 제거 함수
    ├── u2net.pth                    # 사전학습된 PyTorch 모델 (필수)
    ├── style_images/                # 명화 스타일 이미지 저장소
    ├── uploads/                     # 사용자가 업로드한 원본 이미지
    └── outputs/                     # 처리된 결과 이미지
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
4. My Page 기능 – 스타일 이미지 관리

---

### 참고 링크
- 📄 U²-Net 논문 : https://arxiv.org/abs/2005.09007
- 🔗 U²-Net GitHub : https://github.com/xuebinqin/U-2-Net.git
- 📘 API 명세서 (Notion) : https://www.notion.so/2007910c6d4980d59ea8d590447c9485?v=2007910c6d498095b8b5000c6e103b77



