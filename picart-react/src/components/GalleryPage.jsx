// src/components/GalleryPage.jsx
import { useState, useEffect } from "react";
import StyleGallery from "./StyleGallery";
import UploadForm from "./UploadForm";
import "./GalleryPage.css";

export default function GalleryPage() {
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [styles, setStyles] = useState([]);

  useEffect(() => {
    fetch("/api/styles")
      .then((res) => res.json())
      .then(setStyles)
      .catch((err) => console.error("스타일 불러오기 실패", err));
  }, []);

  return (
    <div className="gallery-page">
      <div className="gallery-left">
        <h1>스타일 선택</h1>
        <StyleGallery styles={styles} onStyleClick={setSelectedStyle} />
      </div>
      <div className="gallery-right">
        {selectedStyle ? (
          <UploadForm selectedStyle={selectedStyle} />
        ) : (
          <div className="placeholder">명화를 선택하세요</div>
        )}
      </div>
    </div>
  );
}
