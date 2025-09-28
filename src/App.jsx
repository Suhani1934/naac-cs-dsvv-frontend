import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CriterionPage from "./pages/CriterionPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/criterion/:number" element={<CriterionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
