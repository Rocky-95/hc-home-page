import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/HC Black.png";
import Hamburger from "../../user/components/Hamburger";
import ProfileDropdown from "../../user/components/ProfileDropdown";
import "../../user/styles/Header.css";

const PageHeader = ({ breadcrumbs = [] }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const profileRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* ── Main Header (identical to Home page) ── */}
      <header className="header d-flex align-items-center justify-content-between px-3 bg-white">
        {/* LEFT */}
        <div className="left-icons d-flex align-items-center gap-3">
          <Hamburger />
          <div className="search d-flex align-items-center">
            <i className="bi bi-search fs-4"></i>
            <input type="text" placeholder="Search..." className="search-input ms-2" />
          </div>
        </div>

        {/* CENTER – logo navigates home */}
        <div className="logo mx-auto text-center" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          <img src={logo} alt="HC Logo" style={{ height: "40px" }} />
        </div>

        {/* RIGHT */}
        <div className="right-icons d-flex align-items-center gap-3">
          <i className="bi bi-heart fs-4"></i>
          <i className="bi bi-bag fs-4"></i>
          <div ref={profileRef} style={{ position: "relative" }}>
            <i
              className="bi bi-person-circle fs-4"
              style={{ cursor: "pointer" }}
              onClick={() => setOpen((p) => !p)}
            />
            {open && <ProfileDropdown />}
          </div>
        </div>
      </header>

      {/* ── Breadcrumb bar ── */}
      {breadcrumbs.length > 0 && (
        <nav
          aria-label="breadcrumb"
          className="bg-white border-bottom px-3 py-2"
          style={{ fontSize: "13px" }}
        >
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <Link to="/" className="text-dark text-decoration-none">Home</Link>
            </li>
            {breadcrumbs.map((crumb, i) => {
              const isLast = i === breadcrumbs.length - 1;
              return isLast ? (
                <li key={i} className="breadcrumb-item active text-muted" aria-current="page">
                  {crumb.label}
                </li>
              ) : (
                <li key={i} className="breadcrumb-item">
                  <Link to={crumb.to} className="text-dark text-decoration-none">
                    {crumb.label}
                  </Link>
                </li>
              );
            })}
          </ol>
        </nav>
      )}
    </>
  );
};

export default PageHeader;
