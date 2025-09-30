import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CriterionPage from "./pages/CriterionPage";
import Navbar from "./components/Navbar";
import AdminSignup from "./pages/AdminSignup";
import AdminSignin from "./pages/AdminSignin";
import PrivateRoute from "./components/PrivateRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCriterionDetail from "./pages/AdminCriterionDetail";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Admin signin & signup */}
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/signin" element={<AdminSignin />} />

        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/criterion/:number/details"
          element={<AdminCriterionDetail />}
        />

        {/* Criterion details page */}
        <Route path="/criterion/:number" element={<CriterionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
