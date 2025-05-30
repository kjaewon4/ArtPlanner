// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GalleryPage from "./components/GalleryPage";
import ProjectList from "./components/ProjectList";
import Header from "./components/Header";
import BackgroundRemover from "./components/BackgroundRemover";
import SdImage from "./components/SdImage";
import ArtGenerator from "./components/ArtGenerator";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* <Route path="/" element={<ProjectList />} /> */}
        <Route path="/" element={<ArtGenerator />} />

        <Route path="/projects/1" element={<GalleryPage />} />
        {/* <Route path="/projects/2" element={<이미지 스케치로 변경경/>}/> */}
        <Route path="/projects/3" element={<BackgroundRemover />} />
      </Routes>
    </Router>
  );
}

export default App;
