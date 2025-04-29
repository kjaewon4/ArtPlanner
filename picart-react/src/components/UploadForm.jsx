// src/components/UploadForm.jsx
import { useState } from "react";
import "./UploadForm.css";

export default function UploadForm({ selectedStyle }) {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [mode, setMode] = useState("full");
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState(null);

  const handleUpload = async () => {
    if (!file || !selectedStyle) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("style_filename", selectedStyle.fileName || selectedStyle.file_name);
    formData.append("content", file);
    formData.append("mode", mode);

    try {
      const res = await fetch("http://localhost:8000/api/style-transfer", {
        method: "POST",
        body: formData,
      });

      const blob = await res.blob();
      const downloadFileName = `PicArt_${selectedStyle?.nameKo}_스타일변환완료.png`;
      const imageObjectURL = URL.createObjectURL(blob);
      setResultUrl(imageObjectURL);


      const a = document.createElement("a");
      a.href = imageObjectURL;
      a.download = downloadFileName;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (e) {
      console.error("업로드 실패", e);
    } finally {
      setLoading(false);
    }
  };

  if (!selectedStyle) return null;

  return (
    <div className="upload-container" id="upload">
      <h2>{selectedStyle?.nameKo} 스타일로 변환</h2>

      <div className="mode-toggle">
        <button className={mode === "full" ? "active" : ""} onClick={() => setMode("full")}>
          전체 스타일 변경
        </button>
        <button className={mode === "background" ? "active" : ""} onClick={() => setMode("background")}>
          배경만 스타일 변경
        </button>
      </div>

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
          <img src={preview} alt="업로드 이미지" className="preview" />
          <button onClick={handleUpload} disabled={loading}>
            {loading ? "변환 중..." : "스타일 변환 시작"}
          </button>
        </div>
      )}

      {resultUrl && (
        <div className="result-container"> 
          <h3>변환된 이미지</h3>
          <img src={resultUrl} alt="결과 이미지" className="result" />
          <a href={resultUrl} download>이미지 다운로드</a>
        </div>
      )}
    </div>
  );
}
