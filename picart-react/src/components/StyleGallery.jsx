// // src/components/StyleGallery.jsx
// import { useEffect, useState } from "react";
// import "./StyleGallery.css";

// export default function StyleGallery({ onStyleClick }) {
//   const [styles, setStyles] = useState([]);

//   useEffect(() => {
//     fetch("/api/styles")
//       .then((res) => res.json())
//       .then(setStyles);
//   }, []);

//   return (
//     <div className="gallery-grid" id="gallery">
//       {styles.map((style) => (
//         <div key={style.id} className="style-card" onClick={() => onStyleClick(style)}>
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
// src/components/StyleGallery.jsx
import "./StyleGallery.css";

export default function StyleGallery({ styles, onStyleClick }) {
  return (
    <div className="gallery-grid">
      {styles.map((style) => (
        <div
          key={style.id}
          className="style-card"
          onClick={() => onStyleClick(style)}
        >
          <img src={`/assets/${style.fileName}`} alt={style.nameKo} />
          <div className="style-info">
            <p className="style-title">{style.nameKo}</p>
            <p className="style-author">{style.author}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
