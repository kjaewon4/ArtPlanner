// src/components/ResultPreview.jsx
import React, { useState } from 'react';
import StyledCalendar from './StyledCalendar';

export default function ResultPreview({ resultUrl, fileName }) {
  const [showCalendar, setShowCalendar] = useState(false);

  if (!resultUrl) return null;

  // 파일명 지정: 파일명이 없을 경우 fallback
  const downloadName = fileName ? `styled_${fileName}` : 'styled_output.png';

  return (
    <div className="flex flex-col gap-4 items-center">
      {/* 결과 이미지 미리보기 */}
      <img
        src={resultUrl}
        alt="result"
        className="rounded-xl max-w-md shadow-lg"
      />

      {/* 버튼 그룹 */}
        <div className="flex justify-between w-full mt-4 gap-4">
            <a
                href={resultUrl}
                download={downloadName}
                className="w-full text-center px-5 py-3 rounded-xl text-white font-semibold transition-all shadow-md bg-indigo-600 hover:bg-indigo-700 no-underline"
            >
                이미지 다운로드
            </a>
            <button
                onClick={() => setShowCalendar(true)}
                className="w-full py-3 rounded-xl text-white font-semibold transition-all shadow-md bg-indigo-600 hover:bg-indigo-700"
            >
                캘린더로 만들기
            </button>
        </div>


      {/* StyledCalendar 컴포넌트: 결과 이미지 활용 */}
      {showCalendar && (
        <StyledCalendar imageUrl={resultUrl} mood="😊" />
      )}
    </div>
  );
}
