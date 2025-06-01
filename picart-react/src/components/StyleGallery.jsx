// src/components/StyleGallery.jsx
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

/**
 * StyleGallery (Carousel)
 * - /api/styles 에서 스타일 목록을 불러와 가로 스크롤 캐러셀로 렌더링합니다.
 * - 좌우 버튼으로 부드럽게 스크롤 제어
 * - 클릭 시 부모의 onStyleClick 콜백 호출
 */
export default function StyleGallery({ onStyleClick }) {
  const [styles, setStyles] = useState([]);
  const scrollerRef = useRef(null);
  const BASE_URL = process.env.PUBLIC_URL + '/assets/';

  useEffect(() => {
    axios.get('/api/styles')
      .then((res) => {
        console.log('styles:', res.data); // 데이터 구조 확인용 디버그
        setStyles(res.data);
      })
      .catch((err) => console.error('스타일 불러오기 실패:', err));
  }, []);

  const scroll = (direction) => {
    const container = scrollerRef.current;
    if (!container) return;
    const distance = container.clientWidth * 0.8;
    container.scrollBy({ left: direction * distance, behavior: 'smooth' });
  };

  return (
    <div className="relative bg-white rounded-xl">
      {/* 좌측 스크롤 버튼 */}
      <button
        onClick={() => scroll(-1)}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow-md z-10
                   opacity-0 hover:opacity-100 transition-opacity bg-white"
      >
        <ChevronLeftIcon size={24} className="text-gray-600" />
      </button>

      {/* 가로 스크롤 캐러셀 */}
      <div
        ref={scrollerRef}
        className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide scroll-snap-x mandatory"
      >
        {styles.map((style) => {
          const labelKo = style.name_ko || style.nameKo;
          const labelEn = style.name_en || style.nameEn; 
          const fileName = style.file_name || style.fileName;
          // 작가 이름 (영문)
          const authorEn = style.author;   
          const imgSrc = fileName
            ? `${BASE_URL}/${fileName}`
            : `${BASE_URL}/default.jpg`;

          return (
            <div
              key={style.id}
              className="flex-shrink-0 scroll-snap-start flex flex-col items-center"
            >
              <button
                onClick={() => {
                  // labelEn, authorEn을 객체로 묶어서 넘겨줍니다.
                  onStyleClick({ nameEn: labelEn, authorEn });
                }}                className="w-32 h-32 bg-white overflow-hidden rounded-lg cursor-pointer focus:outline-none p-0"
              >
                <img
                  src={imgSrc}
                  alt={labelKo}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `${BASE_URL}/default.jpg`;
                  }}
                />
              </button>
              <span className="text-sm mt-2 text-gray-700 truncate w-32 text-center">
                {labelKo}
              </span>
            </div>
          );
        })}
      </div>

      {/* 우측 스크롤 버튼 */}
      <button
        onClick={() => scroll(1)}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow-md z-10
                   opacity-0 hover:opacity-100 transition-opacity bg-white"
      >
        <ChevronRightIcon size={24} className="text-gray-600" />
      </button>
    </div>
  );
}
