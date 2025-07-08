// artplanner-react\src\components\Header.jsx
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header bg-white">
      <div className="header__inner max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* 좌측: 로고 + 메뉴 */}
        <div className="header__branding flex items-center space-x-12">
          {/* 로고 */}
          <Link to="/" className='header__logo-link no-underline'>
                <div className="header__logo-text text-[22px] font-bold italic text-[#3B28FF]">ArtPlanner</div>
          </Link>
        </div>
      </div>
    </header>
  );
}
