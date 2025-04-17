// src/components/UploadForm.jsx
import { useState } from "react";
import "./UploadForm.css";

export default function UploadForm({ selectedStyle }) {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("style_filename", selectedStyle.fileName || selectedStyle.file_name);
    formData.append("content", file);

    const response = await fetch("http://localhost:8000/api/style-transfer", {
      method: "POST",
      body: formData,
    });

    const blob = await response.blob();
    const imageObjectURL = URL.createObjectURL(blob);
    setResultUrl(imageObjectURL);
  };

  return (
    <div className="upload-container">
      <h2>{selectedStyle.nameKo} 스타일로 변환</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setFile(e.target.files[0]);
          setPreview(URL.createObjectURL(e.target.files[0]));
        }}
      />

      {preview && (
        <div className="preview-section">
          <h4>업로드한 이미지</h4>
          <img src={preview} alt="preview" className="preview-image" />
          <button onClick={handleUpload}>스타일 변환 시작</button>
        </div>
      )}

      {resultUrl && (
        <div className="result-section">
          <h4>변환된 이미지</h4>
          <img src={resultUrl} alt="result" className="result-image" />
          <a href={resultUrl} download="stylized.png">
            이미지 다운로드
          </a>
        </div>
      )}
    </div>
  );
}
