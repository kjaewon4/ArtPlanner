// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ArtGenerator from "./components/ArtGenerator";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ArtGenerator />} />
      </Routes>
    </Router>
  );
}

export default App;
