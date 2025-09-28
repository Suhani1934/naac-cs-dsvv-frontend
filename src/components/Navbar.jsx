import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
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
          <Link className="navbar-brand d-lg-none" to="/">NAAC Portal</Link>
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

          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav text-center">
              <li className="nav-item">
                <Link className="nav-link" to="/">NAAC</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">College Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">IQAC</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">Special Status</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">NAAC Cycle 4</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
