import React, { useState } from 'react'
import "./BackgroundRemover.css";

function BackgroundRemover() {
    const [file, setFile]  = useState(null);
    const [preview, setPreview] = useState(null);
    const [resultUrl, setResultUrl] = useState(null);
    const [loading, setLoading] = useState(null);

    const handleUpload = async () =>{
        if (!file) return;
        setLoading(true);

        const formData = new FormData();
        formData.append("content", file);

        try {
            const res = await fetch("http://localhost:8000/api/remove/background", {
                method: "POST",
                body: formData,
            });

            const blob = await res.blob();
            const imageURL = URL.createObjectURL(blob);
            setResultUrl(imageURL);            
        } catch (err) {
            console.log("배경 제거 실패", err);
        } finally {
            setLoading(false);
        }
    };


      
  return (
    <div className='background-remover'>
        <h2>배경 제거</h2>

        <input
        type="file"
        accept='image/*'
        onChange={(e) => {
            const uploadFile = e.target.files[0];
            setFile(uploadFile);
            setPreview(URL.createObjectURL(uploadFile));
            setResultUrl(null);
        }} />
        {preview && (
            <div className='preview-section'>
                <img src={preview} alt='미리보기' className='preview' />
                <button onClick={handleUpload}  disabled={loading}>
                    {loading ? "처리 중..." : "배경 제거 시작"}
                </button>
            </div>
        )}

        {resultUrl && (
            <div className='result-section'>
                <h3>결과 이미지</h3>
                <img src={resultUrl} alt='결과 이미지' className='result' />
                <a href={resultUrl} download="투명배경_완료.png">이미지 다운로드</a>
            </div>
        )}
    </div>
  )
}

export default BackgroundRemover
