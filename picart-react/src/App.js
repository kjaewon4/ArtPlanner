// import { useState } from "react";
// import StyleGallery from "./components/StyleGallery";
// import UploadForm from "./components/UploadForm";

// export default function App() {
//   const [selectedStyle, setSelectedStyle] = useState(null);

//   return (
//     <div>
//       <h1>🎨 PicArt - 명화 스타일 변환</h1>
//       <StyleGallery onStyleClick={setSelectedStyle} />
//       {selectedStyle && (
//         <UploadForm selectedStyle={selectedStyle} />
//       )}
//     </div>
//   );
// }
// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GalleryPage from "./components/GalleryPage";
import ProjectList from "./components/ProjectList";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ProjectList />} />
        <Route path="/projects/1" element={<GalleryPage/>}/>
        {/* <Route path="/projects/2" element={<이미지 스케치로 변경경/>}/> */}
        {/* <Route path="/projects/3" element={<이미지 배경 제거/>}/> */}

      </Routes>
    </Router>
  );
}

export default App;
