import React from 'react';

export default function BrushLogo({ className = '' }) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* 브러시 스트로크 아이콘 (SVG) */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-orange-500"
      >
        <path
          d="M8 32C8 16 16 8 32 8C48 8 56 16 56 32C56 48 48 56 32 56C16 56 8 48 8 32Z"
          fill="currentColor"
        />
        <path
          d="M20 36L44 28"
          stroke="#fff"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
      {/* 텍스트 로고 */}
      <span className="text-2xl font-bold text-gray-800">PicArt</span>
    </div>
  );
}
