import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FaUser, FaTachometerAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    setIsAdminLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAdminLoggedIn(false);
    navigate("/");
  };

  return (
    <header>
      {/* First Row: University Logo */}
      <div className="bg-light text-center py-3">
        <img
          src="/DSVV_LOGO_BLACK.png"
          alt="University Logo"
          className="university-logo"
        />
      </div>

      {/* Second Row: Navbar Links */}
      <nav className="navbar navbar-expand-lg navbar-dark navbar-fullwidth">
        <div className="container-fluid">
          <Link className="navbar-brand d-lg-none" to="/">
            CS NAAC Criteria
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
            <ul className="navbar-nav text-center">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  NAAC
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  IQAC
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Special Status
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  NAAC Cycle 2
                </Link>
              </li>
            </ul>
            {isAdminLoggedIn ? (
              <div className="d-flex gap-2">
                <Button
                  as={Link}
                  to="/admin/dashboard"
                  variant="outline-light"
                  size="sm"
                  className="d-flex align-items-center"
                >
                  <FaTachometerAlt className="me-1" /> Dashboard
                </Button>

                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={handleLogout}
                  className="d-flex align-items-center"
                >
                  <FaUser className="me-1" /> Logout
                </Button>
              </div>
            ) : (
              <Button
                as={Link}
                to="/admin/signin"
                variant="outline-light"
                size="sm"
                className="d-flex align-items-center"
              >
                <FaUser className="me-1" /> Signin
              </Button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
