// src/components/ArtGenerator.jsx
import React, { useState } from 'react';
import StyleGallery from './StyleGallery';
// import ArtworkList from './ArtworkList'; // 필요에 따라 활성화
import UploadForm from './UploadForm';
import ResultPreview from './ResultPreview';

export default function ArtGenerator() {
  // { nameEn: 'Starry Night', authorEn: 'Vincent van Gogh', ... } 형태 객체 혹은 null
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [file, setFile] = useState(null); 
  const [resultUrl, setResultUrl] = useState(null);

  return (
    <div className="flex flex-col w-full">
       <h1 className="text-3xl font-bold text-center mb-2">내 사진을 <span className="text-[#3B28FF]">원하는 스타일로</span></h1>
      <p className="text-center text-gray-600 mb-8">사진을 업로드하고 스타일을 선택해주세요</p>

      {/* ───────────── 상단 네비게이션(탭) ───────────── */}
      <div className="flex justify-center space-x-8 text-sm pt-8">
        <span className="text-[#3B28FF] border-b-2 border-[#3B28FF] pb-1">
          스타일 변환기
        </span>
        <span className="text-gray-400">
          매직 지우개{' '}
          <span className="text-xs text-white bg-blue-500 px-2 py-[2px] rounded-full ml-1">
            new
          </span>
        </span>
        <span className="text-gray-400">
          이미지에서 배경제거{' '}
          <span className="text-xs text-white bg-blue-500 px-2 py-[2px] rounded-full ml-1">
            new
          </span>
        </span>
      </div>

      {/* ───────────── 메인 컨텐츠 영역 ───────────── */}
      <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto gap-8 p-8 bg-[rgb(238,241,243)] rounded-xl mt-8">
      {/* 왼쪽 영역 */}
      <div className="w-full lg:w-1/2 space-y-6">
        <UploadForm
          selectedStyle={selectedStyle}
          onStyleSelect={setSelectedStyle}
          onFileChange={setFile}
          onResultUrlChange={setResultUrl}
        />
      </div>

      {/* 오른쪽 결과 영역 */}
      <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow p-6 flex items-center justify-center">
        <ResultPreview resultUrl={resultUrl} fileName={file?.name} />
      </div>
    </div>

    </div>
  );
}
