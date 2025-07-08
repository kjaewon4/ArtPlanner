import React, { useState } from 'react';
import StyledCalendar from './StyledCalendar';

export default function ResultPreview({ resultUrl, fileName }) {
  const [showModal, setShowModal] = useState(false);

  if (!resultUrl) return null;

  const downloadName = fileName ? `styled_${fileName}` : 'styled_output.png';

  return (
    <>
      {/* 기본 이미지 뷰 */}
      <div className="flex flex-col gap-4 items-center">
        <img
          src={resultUrl}
          alt="result"
          className="rounded-xl max-w-md shadow-lg"
        />

        <div className="flex justify-between w-full mt-4 gap-4">
          <a
            href={resultUrl}
            download={downloadName}
            className=" w-full text-center px-5 py-3 rounded-xl text-white font-semibold transition-all shadow-md bg-indigo-600 hover:bg-indigo-700 no-underline"
          >
            이미지 다운로드
          </a>
          <button
            onClick={() => setShowModal(true)}
            className="w-full py-3 rounded-xl text-white font-semibold transition-all shadow-md bg-indigo-600 hover:bg-indigo-700"
          >
            캘린더로 만들기
          </button>
        </div>
      </div>

      {/* 모달 */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)} // 바깥 클릭 시 닫기
        >
          <div
            className="bg-white rounded-xl shadow-xl p-6 max-w-[700px] max-h-[95vh] w-full relative flex items-center justify-center"
            onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫힘 방지
          >
            {/* 닫기 버튼 */}
            <button
              className="absolute top-1 right-2 text-gray-500 hover:text-gray-700 text-5xl bg-transparent "
              onClick={() => setShowModal(false)}
            >
                →
            </button>

            {/* 캘린더 콘텐츠 */}
            <StyledCalendar imageUrl={resultUrl} mood="😊" />
          </div>
        </div>
      )}
    </>
  );
}
