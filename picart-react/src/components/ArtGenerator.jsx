// src/components/ArtGenerator.jsx
import React, { useState } from 'react';
import StyleGallery from './StyleGallery';
// import ArtworkList from './ArtworkList'; // 필요에 따라 활성화
import UploadForm from './UploadForm';

export default function ArtGenerator() {
  // { nameEn: 'Starry Night', authorEn: 'Vincent van Gogh', ... } 형태 객체 혹은 null
  const [selectedStyle, setSelectedStyle] = useState(null);

  return (
    <div className="flex flex-col w-full">
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
      <div className="flex w-full max-w-7xl mx-auto mt-6 bg-gray-100 rounded-3xl p-8 space-x-8">
        {/* ───────────── 왼쪽 컬럼: 스타일 선택 + 작품 리스트 ───────────── */}
        <div className="w-1/2 space-y-6">
          {/* ──── ① 스타일 캐러셀 카드 ──── */}
          <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">스타일 선택</p>
            <StyleGallery onStyleClick={setSelectedStyle} />
          </div>

          {/* ──── ② 선택된 스타일이 있을 때 작품 리스트 렌더 ──── */}
          {selectedStyle && (
            <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                {selectedStyle.authorEn}의 {selectedStyle.nameEn} 
              </p>
              {/* 
                ArtworkList 컴포넌트가 필요하다면 주석 해제 후 사용하세요.
                예: <ArtworkList styleId={selectedStyle.nameEn} /> 
              */}
              {/* <ArtworkList styleId={selectedStyle.nameEn} /> */}
          
            </div>
          )}
        </div>

        {/* ───────────── 오른쪽 컬럼: UploadForm ───────────── */}
        <div className="w-1/2">
          <UploadForm selectedStyle={selectedStyle} />
        </div>
      </div>
    </div>
  );
}
