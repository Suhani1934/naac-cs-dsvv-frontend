import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CriterionPage from "./pages/CriterionPage";
import Navbar from "./components/Navbar";
import AdminDashboard from "./admin/AdminDashboard";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Criterion details page */}
        <Route path="/criterion/:number" element={<CriterionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
