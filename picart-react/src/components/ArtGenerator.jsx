import React, { useState } from 'react';

const styles = [
  { name: '명화', src: '../starry_night.jpg' },
  { name: 'Ghibli', src: '/preview.jpg' },
  { name: 'Cyberpunk', src: '/preview.jpg' },
];

export default function ArtGenerator() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('/preview.jpg');
  

  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-2">내 사진을 <span className="text-[#3B28FF]">원하는 스타일로</span></h1>
      <p className="text-center text-gray-600 mb-8">사진을 업로드하고 스타일을 선택해주세요</p>

      {/* 메뉴 */}
      <div className="flex justify-center space-x-8 text-sm mb-12">
        <span className="text-[#3B28FF] border-b-2 border-[#3B28FF] pb-1">AI 아트워크 생성기</span>
        <span className="text-gray-400">매직 지우개 <span className="text-xs text-white bg-blue-500 px-2 py-[2px] rounded-full ml-1">new</span></span>
        <span className="text-gray-400">이미지에서 배경제거 <span className="text-xs text-white bg-blue-500 px-2 py-[2px] rounded-full ml-1">new</span></span>
      </div>

      <div className="flex max-w-7xl mx-auto bg-gray-100 rounded-3xl p-8 space-x-8">
        {/* 왼쪽 영역 */}
        <div className="w-1/2 space-y-6">
          {/* 이미지 업로드 박스 */}
          <div className="bg-white h-36 flex items-center justify-center rounded-xl border-2 border-dashed border-gray-300">
            <label htmlFor="file" className="cursor-pointer text-purple-500 flex items-center space-x-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>이곳에 이미지 업로드</span>
            </label>
            <input id="file" type="file" className="hidden" onChange={(e) => {
              const file = e.target.files[0];
              if (file) setSelectedImage(URL.createObjectURL(file));
            }} />
          </div>

          {/* 스타일 선택 */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">스타일 선택</p>
            <div className="grid grid-cols-5 gap-4">
              {styles.map((style, idx) => (
                <button key={idx} onClick={() => setPreviewUrl(style.src)} className="flex flex-col items-center">
                  <img src={style.src} alt={style.name} className="w-12 h-12 rounded-md object-cover" />
                  <span className="text-xs mt-1">{style.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 사용자 프롬프트 */}
          <input type="text" placeholder="사용자 지정 프롬프트" className="w-full p-2 border border-gray-300 rounded-md text-sm" />

          {/* 생성 버튼 */}
          <button className="w-full bg-gray-300 py-2 rounded-md text-white text-sm" disabled>생성하기</button>
        </div>

        {/* 오른쪽 이미지 프리뷰 */}
        <div className="w-1/2 flex items-center justify-center">
          <div className="bg-white p-4 rounded-3xl">
            <img src={selectedImage || previewUrl} alt="Preview" className="w-[350px] h-[350px] object-cover rounded-[20px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
