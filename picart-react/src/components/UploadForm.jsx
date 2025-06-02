// src/components/UploadForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { XIcon } from 'lucide-react';
import StyleGallery from './StyleGallery';

// 생략: import 및 컴포넌트 시작 부분

export default function UploadForm({
  selectedStyle,
  onStyleSelect,
  onFileChange,
  onResultUrlChange,
}) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const { nameEn, authorEn } = selectedStyle || {};
  const NGROK_URL = 'https://8bc7-34-32-254-48.ngrok-free.app';

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
      onFileChange(selected); // 부모에게 전달
    }
  };

  const handleClear = () => {
    setFile(null);
    setPreviewUrl(null);
    onFileChange(null);
    onResultUrlChange(null);
  };

  const handleGenerate = async () => {
    if (!file || !selectedStyle) return;
    setLoading(true);

  const promptText = `
      A high-resolution portrait of a person.
      Preserve realistic facial details, eyes, skin texture, and clothing folds.
      Apply the brushstroke style of ${authorEn}’s masterpiece “${nameEn}” 
        – especially on hair edges, clothing edges, and in the background.
        - Don't change the face in the content file picture.
         For the background:
        - Fully render it in the style and color palette of “${nameEn}” by ${authorEn}.
        - Keep swirling, vivid brushstrokes characteristic of ${authorEn}.
      For the subject (face/body):
        - The face maintains realistic facial features without deformation, but adds subtle brush textures along the hairline and the edge of the garment to gently blend the subject with the background style.
        - Do not lose the person’s recognizable facial structure (eyes, nose, mouth).
    `;

    const formData = new FormData();
    formData.append('content', file);
    formData.append('prompt', promptText);
    formData.append('strength', '0.4');
    formData.append('guidance_scale', '7.5');

    try {
      const res = await axios.post(`${NGROK_URL}/api/sd-style-transfer`, formData, {
        responseType: 'blob',
      });
      const url = URL.createObjectURL(res.data);
      onResultUrlChange(url);
    } catch (err) {
      console.error('변환 오류:', err);
      alert(`변환 오류: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg space-y-6">
      {/* 업로드 박스 */}
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
            <img src={previewUrl} alt="preview" className="h-full object-cover" />
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

      {/* 스타일 선택 */}
      <div>
        <p className="text-sm font-semibold mb-2">스타일 선택</p>
        <StyleGallery onStyleClick={onStyleSelect} selected={selectedStyle} />
      </div>

      {/* 생성 버튼 */}
      <button
        onClick={handleGenerate}
        disabled={!file || !selectedStyle || loading}
        className={`w-full py-2 rounded-md text-white font-semibold transition-colors ${
          file && selectedStyle && !loading
            ? 'bg-indigo-600 hover:bg-indigo-700'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        {loading ? '변환 중...' : '생성하기'}
      </button>
    </div>
  );
}
