// src/components/UploadForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function UploadForm({ selectedStyle }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [resultUrl, setResultUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  const handleConvert = async () => {
    if (!file) return;
    setLoading(true);
    setResultUrl(null);

    const formData = new FormData();
    formData.append('content', file);
    // 기본 프롬프트 + 사용자 입력 프롬프트 결합
    const promptText = customPrompt
      ? `${customPrompt} in the style of ${selectedStyle}`
      : `in the style of ${selectedStyle}`;
    formData.append('prompt', promptText);
    formData.append('strength', '0.3');
    formData.append('guidance_scale', '7.5');

    try {
      const res = await axios.post(
        '/api/sd-style-transfer',
        formData,
        { responseType: 'blob' }
      );
      const url = URL.createObjectURL(res.data);
      setResultUrl(url);
    } catch (err) {
      console.error('Conversion error:', err);
      alert('변환 중 오류가 발생했습니다. 콘솔을 확인하세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg space-y-6">
      {/* 업로드 박스 */}
      <div className="border-2 border-dashed border-gray-300 h-40 flex items-center justify-center rounded-lg">
        <label htmlFor="upload" className="flex flex-col items-center text-gray-500 cursor-pointer">
          <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>이미지 업로드</span>
        </label>
        <input
          id="upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* 미리보기 */}
      {previewUrl && (
        <div className="w-full flex justify-center">
          <img
            src={previewUrl}
            alt="preview"
            className="w-64 h-64 object-cover rounded-xl"
          />
        </div>
      )}

      {/* 사용자 프롬프트 */}
      <input
        type="text"
        value={customPrompt}
        onChange={(e) => setCustomPrompt(e.target.value)}
        placeholder="추가 프롬프트 입력 (옵션)"
        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

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
        </div>
      )}
    </div>
  );
}

// // src/components/UploadForm.jsx
// import { useState } from "react";
// import "./UploadForm.css";

// export default function UploadForm({ selectedStyle }) {
//   const [preview, setPreview] = useState(null);
//   const [file, setFile] = useState(null);
//   const [mode, setMode] = useState("full");
//   const [loading, setLoading] = useState(false);
//   const [resultUrl, setResultUrl] = useState(null);

//   const handleUpload = async () => {
//     if (!file || !selectedStyle) return;
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("style_filename", selectedStyle.fileName || selectedStyle.file_name);
//     formData.append("content", file);
//     formData.append("mode", mode);

//     try {
//       const res = await fetch("http://localhost:8000/api/style-transfer", {
//         method: "POST",
//         body: formData,
//       });

//       const blob = await res.blob();
//       const downloadFileName = `PicArt_${selectedStyle?.nameKo}_스타일변환완료.png`;
//       const imageObjectURL = URL.createObjectURL(blob);
//       setResultUrl(imageObjectURL);


//       const a = document.createElement("a");
//       a.href = imageObjectURL;
//       a.download = downloadFileName;
//       a.style.display = "none";
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//     } catch (e) {
//       console.error("업로드 실패", e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!selectedStyle) return null;

//   return (
//     <div className="upload-container" id="upload">
//       <h2>{selectedStyle?.nameKo} 스타일로 변환</h2>

//       <div className="mode-toggle">
//         <button className={mode === "full" ? "active" : ""} onClick={() => setMode("full")}>
//           전체 스타일 변경
//         </button>
//         <button className={mode === "background" ? "active" : ""} onClick={() => setMode("background")}>
//           배경만 스타일 변경
//         </button>
//         <button className={mode === "compose" ? "active" : ""} onClick={() => setMode("compose")}>
//           배경만 합성
//         </button>
//       </div>

//       <input
//         type="file"
//         accept="image/*"
//         onChange={(e) => {
//           setFile(e.target.files[0]);
//           setPreview(URL.createObjectURL(e.target.files[0]));
//         }}
//       />

//       {preview && (
//         <div className="preview-section">
//           <img src={preview} alt="업로드 이미지" className="preview" />
//           <button onClick={handleUpload} disabled={loading}>
//             {loading ? "변환 중..." : "스타일 변환 시작"}
//           </button>
//         </div>
//       )}

//       {resultUrl && (
//         <div className="result-container"> 
//           <h3>변환된 이미지</h3>
//           <img src={resultUrl} alt="결과 이미지" className="result" />
//           <a href={resultUrl} download>이미지 다운로드</a>
//           <button>엽서로 제작</button>

//         </div>
//       )}
//     </div>
//   );
// }
