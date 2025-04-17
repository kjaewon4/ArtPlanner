import { useState } from "react";
import StyleGallery from "./components/StyleGallery";
import UploadForm from "./components/UploadForm";

export default function App() {
  const [selectedStyle, setSelectedStyle] = useState(null);

  return (
    <div>
      <h1>🎨 PicArt - 명화 스타일 변환</h1>
      <StyleGallery onStyleClick={setSelectedStyle} />
      {selectedStyle && (
        <UploadForm selectedStyle={selectedStyle} />
      )}
    </div>
  );
}
