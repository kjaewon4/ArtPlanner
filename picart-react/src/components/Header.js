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

      </div>
    </header>
  );
}
