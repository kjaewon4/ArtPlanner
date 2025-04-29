// src/components/NavigationBar.jsx
import "./NavigationBar.css";

export default function NavigationBar() {
  return (
    <nav className="navbar">
      <div className="logo">PicArt</div>
      <div className="menu">
        <a href="#gallery">스타일 갤러리</a>
        <a href="#upload">이미지 변환</a>
      </div>
    </nav>
  );
}
