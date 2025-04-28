// src/components/UploadForm.jsx
import { useState } from "react";
import "./UploadForm.css";

export default function UploadForm({ selectedStyle }) {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file || !selectedStyle) return;
    setLoading(true);

    const formData = new FormData();
    formData.append(
      "style_filename",
      selectedStyle.fileName || selectedStyle.file_name
    );
    formData.append("content", file);

    try {
      const res = await fetch("http://localhost:8000/api/style-transfer", {
        method: "POST",
        body: formData,
      });

      const blob = await res.blob();
      const imageObjectURL = URL.createObjectURL(blob);
      setResultUrl(imageObjectURL);
    } catch (e) {
      console.error("업로드 실패", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>{selectedStyle?.nameKo} 스타일로 변환</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setFile(e.target.files[0]);
          setPreview(URL.createObjectURL(e.target.files[0]));
        }}
      />

      {preview && (
        <>
          <img src={preview} alt="업로드 이미지" className="preview" />
          <button onClick={handleUpload} disabled={loading}>
            {loading ? "변환 중..." : "스타일 변환 시작"}
          </button>
        </>
      )}

      {resultUrl && (
        <div className="result-container">
          <h3>변환된 이미지</h3>
          <img src={resultUrl} alt="결과 이미지" className="result" />
          <a href={resultUrl} download>
            이미지 다운로드
          </a>
        </div>
      )}
    </div>
  );
}
