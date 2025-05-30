import React, { useState } from 'react';
import axios from 'axios';

function SdImage() {
  const [styledImage, setStyledImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleUpload = async () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("prompt", "portrait in the style of Van Gogh");
    formData.append("strength", 0.7);
    formData.append("guidance_scale", 7.5);
    formData.append("content", imageFile);

    //  디버깅 출력
    for (let pair of formData.entries()) {
      console.log(pair[0] + ':', pair[1]);
    }

    try {
      const res = await axios.post(
        "https://38b1-34-87-155-94.ngrok-free.app/api/sd-style-transfer", // ngrok URL
        formData,
        { responseType: "blob" }
      );
      const url = URL.createObjectURL(res.data);
      setStyledImage(url);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="p-4">
      <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
      <button onClick={handleUpload} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
        스타일 변환
      </button>

      {styledImage && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">변환된 이미지</h3>
          <img src={styledImage} alt="styled result" className="max-w-full rounded-lg shadow" />
        </div>
      )}
    </div>
  );
}

export default SdImage;
