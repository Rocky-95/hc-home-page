import React, { useState, useRef, useEffect } from "react";

import "../styles/Header.css";
import Hamburger from "./Hamburger";
import ProfileDropdown from "./ProfileDropdown";
import logo from "../../shared/assets/images/HC Black.png";

const Header = ({ onCIconClick }) => {
  const [open, setOpen] = useState(false);

  const profileRef = useRef(); // 🔥 wrapper ref

  // 🔥 HANDLE OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header d-flex align-items-center justify-content-between px-3 bg-white">
      
      {/* LEFT */}
      <div className="left-icons d-flex align-items-center gap-3">
        <Hamburger />

        <div className="c-home">
          <button
            type="button"
            className="c-icon"
            aria-label="Book a custom appointment"
            onClick={onCIconClick}
          ></button>
        </div>

        <div className="search d-flex align-items-center">
          <i className="bi bi-search fs-4"></i>
          <input
            type="text"
            placeholder="Search..."
            className="search-input ms-2"
          />
        </div>
      </div>

      {/* CENTER */}
      <div className="logo mx-auto text-center">
        <img src={logo} alt="Logo" style={{ height: "40px" }} />
      </div>

      {/* RIGHT */}
      <div className="right-icons d-flex align-items-center gap-3">
        <i className="bi bi-heart fs-4"></i>
        <i className="bi bi-bag fs-4"></i>

        {/* 🔥 WRAPPER (IMPORTANT) */}
        <div ref={profileRef} style={{ position: "relative" }}>
          
          {/* PROFILE ICON */}
          <i
            className="bi bi-person-circle fs-4"
            style={{ cursor: "pointer" }}
            onClick={() => setOpen((prev) => !prev)} // toggle works now ✅
          ></i>

          {/* DROPDOWN */}
          {open && <ProfileDropdown />}
        </div>
      </div>
    </header>
  );
};

export default Header;
