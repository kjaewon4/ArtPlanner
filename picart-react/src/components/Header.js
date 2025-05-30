import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Globe, Database, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* 좌측: 로고 + 메뉴 */}
        <div className="flex items-center space-x-12">
          {/* 로고 */}
          <Link to="/" className='no-underline'>
                <div className="text-[22px] font-bold italic text-[#3B28FF]">PicArt</div>
          </Link>
        </div>

        {/* 우측: 아이콘들 */}
        <div className="flex items-center space-x-6">
          {/* 사용자 아이콘 - 회색 원 배경 */}
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
            <User size={16} strokeWidth={2.2} className="text-black" />
            </button>

        </div>
      </div>
    </header>
  );
}
