// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GalleryPage from "./components/GalleryPage";
import ProjectList from "./components/ProjectList";
import Header from "./components/Header";
import BackgroundRemover from "./components/BackgroundRemover";
import SdImage from "./components/SdImage";
import ArtGenerator from "./components/ArtGenerator";
import StyledCalendar from "./components/StyledCalendar";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* <Route path="/" element={<ProjectList />} /> */}
        <Route path="/" element={<ArtGenerator />} />

        <Route path="/calendar" element={<StyledCalendar />} />
      </Routes>
    </Router>
  );
}

export default App;
