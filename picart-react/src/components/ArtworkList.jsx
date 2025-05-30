// src/components/ArtworkList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArtworkList({ styleId }) {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    axios.get(`/api/artworks?style=${encodeURIComponent(styleId)}`)
      .then(res => setArtworks(res.data))
      .catch(console.error);
  }, [styleId]);

  return (
    <div className="overflow-x-auto">
      <div className="flex space-x-4">
        {artworks.map(item => (
          <div key={item.file_name} className="flex-shrink-0 w-32">
            <img
              src={`/assets/artworks/${item.file_name}`}
              alt={item.name_ko}
              className="w-full h-24 rounded-lg object-cover"
            />
            <p className="text-xs mt-1 text-center">{item.name_ko}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
