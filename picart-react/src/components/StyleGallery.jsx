import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function StyleGallery({ onStyleClick }) {
  const [styles, setStyles] = useState([]);

  useEffect(() => {
    axios.get('/api/styles')
      .then(res => setStyles(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {styles.map(style => (
        <button
          key={style.id}
          onClick={() => onStyleClick(style.name_ko)}
          className="flex flex-col items-center p-2 bg-white rounded-lg shadow hover:ring-2 hover:ring-indigo-400"
        >
          <img src={`/assets/styles/${style.file_name}`} alt={style.name_ko}
               className="w-20 h-20 rounded-md object-cover" />
          <span className="mt-1 text-sm">{style.name_ko}</span>
        </button>
      ))}
    </div>
  );
}

// import "./StyleGallery.css";

// export default function StyleGallery({ styles, onStyleClick }) {
//   return (
//     <div className="gallery-grid">
//       {styles.map((style) => (
//         <div
//           key={style.id}
//           className="style-card"
//           onClick={() => onStyleClick(style)}
//         >
//           <img src={`/assets/${style.fileName}`} alt={style.nameKo} />
//           <div className="style-info">
//             <p className="style-title">{style.nameKo}</p>
//             <p className="style-author">{style.author}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
