import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/TopNav.css";
import hcBlack from "../../shared/assets/images/HC Black.png";

const TopNav = () => {
  const navigate = useNavigate();

  return (
    <nav className="top-nav">
      <button className="top-nav-back" onClick={() => navigate(-1)} aria-label="Go back">
        <i className="bi bi-arrow-left"></i>
        <span className="top-nav-back-text">Back</span>
      </button>

      <Link to="/" className="top-nav-logo-link">
        <img src={hcBlack} alt="Harry Clinton" className="top-nav-logo" />
      </Link>

      <Link to="/" className="top-nav-home" aria-label="Home">
        <i className="bi bi-house-door"></i>
      </Link>
    </nav>
  );
};

export default TopNav;
