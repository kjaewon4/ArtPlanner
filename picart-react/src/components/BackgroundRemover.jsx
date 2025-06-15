import React, { useState } from 'react';

export default function BackgroundRemover() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('content', file);

    try {
      const res = await fetch('http://localhost:8000/api/remove/background', {
        method: 'POST',
        body: formData,
      });

      const blob = await res.blob();
      const imageURL = URL.createObjectURL(blob);
      setResultUrl(imageURL);
    } catch (err) {
      console.error('배경 제거 실패', err);
      alert('배경 제거 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setResultUrl(null);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto gap-8 p-8 bg-[rgb(238,241,243)] rounded-xl mt-8">
      {/* 왼쪽: 업로드 영역 */}
      <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow p-6 space-y-6">
        <h2 className="text-xl font-bold text-center">배경 제거기</h2>

        {/* 업로드 박스 */}
        <div className="relative border-2 border-dashed border-gray-300 h-80 flex items-center justify-center rounded-lg overflow-hidden">
          {!preview && (
            <label
              htmlFor="upload"
              className="flex flex-col items-center text-gray-500 cursor-pointer"
            >
              <svg
                className="w-8 h-8 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>이곳에 이미지 업로드</span>
            </label>
          )}
          {preview && (
            <>
              <img
                src={preview}
                alt="미리보기"
                className="h-full object-cover"
              />
              <button
                onClick={handleReset}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
              >
                ✕
              </button>
            </>
          )}
          <input
            id="upload"
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => {
              const uploadFile = e.target.files[0];
              if (uploadFile) {
                setFile(uploadFile);
                setPreview(URL.createObjectURL(uploadFile));
                setResultUrl(null);
              }
            }}
          />
        </div>

        {/* 버튼 */}
        {preview && !resultUrl && (
          <button
            onClick={handleUpload}
            disabled={loading}
            className={`w-full py-2 rounded-md text-white font-semibold transition-colors ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {loading ? '처리 중...' : '배경 제거 시작'}
          </button>
        )}
      </div>

      {/* 오른쪽: 결과 출력 */}
      <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow p-6 flex flex-col items-center justify-center">
        {resultUrl ? (
          <>
            <h3 className="text-lg font-semibold mb-4">배경 제거 결과</h3>
            <img
              src={resultUrl}
              alt="결과 이미지"
              className="max-h-[400px] object-contain rounded-lg shadow mb-4"
            />
            <a
              href={resultUrl}
              download="transparent_image.png"
              className="px-5 py-2 rounded-md text-white font-semibold bg-indigo-600 hover:bg-indigo-700"
            >
              이미지 다운로드
            </a>
          </>
        ) : (
          <p className="text-gray-400">결과 이미지가 여기에 표시됩니다</p>
        )}
      </div>
    </div>
  );
}
