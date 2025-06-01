// src/components/UploadForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { XIcon } from 'lucide-react';

export default function UploadForm({ selectedStyle }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [resultUrl, setResultUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  // selectedStyle은 { nameEn, authorEn } 형태
  const { nameEn, authorEn } = selectedStyle || {};

  const NGROK_URL = 'https://1bbc-35-234-44-106.ngrok-free.app';

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
      setResultUrl(null);
    }
  };

  const handleClear = () => {
    setFile(null);
    setPreviewUrl(null);
    setResultUrl(null);
  };


  const handleConvert = async () => {
    if (!file) return;
    setLoading(true);
    setResultUrl(null);

    // 1단계: 배경 제거 (로컬 MODNet 서버로)
    const removeBgForm = new FormData();
    removeBgForm.append('image', file);

    const modnetResponse = await axios.post(
      'http://localhost:8002/api/remove-background',
      removeBgForm,
      { responseType: 'blob' }
    );
    const rgbaImageBlob = modnetResponse.data;

      // 프롬프트는 작가명과 작품명(또는 스타일명)을 조합해서 사용
    // 예시: "portrait photo in the style of Starry Night by Vincent van Gogh"
    const promptText = `
      A high-resolution portrait of a person.
      Preserve realistic facial details, eyes, skin texture, and clothing folds.
      Apply the brushstroke style of ${authorEn}’s masterpiece “${nameEn}” 
        – especially on hair edges, clothing edges, and in the background.
      For the background:
        - Fully render it in the style and color palette of “${nameEn}” by ${authorEn}.
        - Keep swirling, vivid brushstrokes characteristic of ${authorEn}.
      For the subject (face/body):
        - Retain photorealistic facial features, but add subtle brushstroke textures along the hairline and clothing edge so the subject merges gently with the background style.
        - Do not lose the person’s recognizable facial structure (eyes, nose, mouth).
    `;

    // 2단계: 스타일 변환 (코랩 SD 서버로)
    const styleForm = new FormData();
    styleForm.append('content', new File([rgbaImageBlob], file.name, { type: 'image/png' }));
    styleForm.append('prompt', promptText);
    styleForm.append('strength', '0.5');
    styleForm.append('guidance_scale', '7.5');
  
    try {
      const res = await axios.post(
        `${NGROK_URL}/api/sd-style-transfer`,
        styleForm,
        { responseType: 'blob' }
      );
      // res.data → 최종 합성된 이미지(512×512) Blob
      const url = URL.createObjectURL(res.data);
      setResultUrl(url);
    } catch (err) {
      console.error('Conversion error:', err);
      alert(`변환 오류: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg space-y-6">
      {/* 업로드 박스: 선택 전/후 모두 동일 위치 */}
      <div className="relative border-2 border-dashed border-gray-300 h-40 flex items-center justify-center rounded-lg overflow-hidden">
        {!previewUrl && (
          <label htmlFor="upload" className="flex flex-col items-center text-gray-500 cursor-pointer">
            <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>이곳에 이미지 업로드</span>
          </label>
        )}
        {previewUrl && (
          <>
            <img
              src={previewUrl}
              alt="preview"
              className=" h-full object-cover"
            />
            <button
              onClick={handleClear}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
            >
              <XIcon size={16} className="text-gray-700" />
            </button>
          </>
        )}
        <input
          id="upload"
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleFileChange}
        />
      </div>

      {/* 미리보기 영역 (결과 혹은 업로드된 이미지 아래)에 제거 */}
      {/* 사용자 프롬프트 */}
      {/* <input
        type="text"
        value={customPrompt}
        onChange={(e) => setCustomPrompt(e.target.value)}
        placeholder="추가 프롬프트 입력 (옵션)"
        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      /> */}

      {/* 변환 버튼 */}
      <button
        onClick={handleConvert}
        disabled={!file || loading}
        className={
          `w-full py-2 rounded-md text-white font-medium transition-colors ` +
          (file && !loading
            ? 'bg-indigo-600 hover:bg-indigo-700'
            : 'bg-gray-400 cursor-not-allowed')
        }
      >
        {loading ? '변환 중...' : '생성하기'}
      </button>

      {/* 결과 출력 */}
      {resultUrl && (
        <div className="mt-4">
          <h4 className="text-lg font-semibold mb-2">결과 이미지</h4>
          <img src={resultUrl} alt="Result" className="w-full rounded-xl shadow-md" />
           <a
            href={resultUrl}
            download={`styled_${file.name}`}
            className="block text-center w-full py-2 rounded-md text-white font-medium transition-colors bg-indigo-600 hover:bg-indigo-700"
          >
            이미지 다운로드
          </a>
        </div>
      )}
    </div>
  );
}