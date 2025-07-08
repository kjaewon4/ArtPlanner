// src/components/ArtGenerator.jsx
import React, { useState } from 'react';
import UploadForm from './UploadForm';
import ResultPreview from './ResultPreview';
import BackgroundRemover from './BackgroundRemover';

export default function ArtGenerator() {
  // { nameEn: 'Starry Night', authorEn: 'Vincent van Gogh', ... } 형태 객체 혹은 null
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [file, setFile] = useState(null); 
  const [resultUrl, setResultUrl] = useState(null);
  const [activeTab, setActiveTab] = useState('style'); // 'style' or 'remove'

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-3xl font-bold text-center mb-2">
      내 사진을{' '}
      <span className="text-[#3B28FF]">
        {activeTab === 'style' ? '원하는 스타일로' : '배경 없이'}
      </span>
      </h1>
      <p className="text-center text-gray-600 mb-8">
        {activeTab === 'style'
          ? '사진을 업로드하고 스타일을 선택해주세요\n스타일 변환 후 캘린더를 만들 수 있습니다'
          : '사진을 업로드하면 배경이 제거된 이미지를 받을 수 있어요'}
      </p>

      {/* ───────────── 상단 네비게이션(탭) ───────────── */}
      <div className="flex justify-center space-x-8 text-sm pt-8">
        <span
          className={`pb-1 ${
            activeTab === 'style'
              ? 'text-[#3B28FF] border-b-2 border-[#3B28FF]'
              : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('style')}
        >
          스타일 변환기
        </span>

        <span
          className={`pb-1 bg-transparent ${
            activeTab === 'remove'
              ? 'text-[#3B28FF] border-b-2 border-[#3B28FF]'
              : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('remove')}
        >
          배경 제거기
        </span>
      </div>


      {/* ───────────── 메인 컨텐츠 영역 ───────────── */}
      <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto gap-8 p-8 bg-[rgb(238,241,243)] rounded-xl mt-8 mb-10">
        {activeTab === 'style' ? (
          <>
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
          {/* </div> */}
              </>
        ) : (
          <>
            {/* 배경 제거기 UI (BackgroundRemover는 따로 구현된 컴포넌트로 가정) */}
            <div className="w-full">
              <BackgroundRemover />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
