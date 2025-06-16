// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ArtGenerator from "./components/ArtGenerator";
import StyleGallery from "./components/StyleGallery";
import StyledCalendar from "./components/StyledCalendar";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ArtGenerator />} />
        <Route path="/ca" element={<StyledCalendar />} />

      </Routes>
    </Router>
  );
}

export default App;
