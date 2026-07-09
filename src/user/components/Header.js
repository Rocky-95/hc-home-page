import React, { useState, useRef, useEffect } from "react";

import "../styles/Header.css";
import Hamburger from "./Hamburger";
import ProfileDropdown from "./ProfileDropdown";
import SearchDropdown from "./SearchDropdown";
import logo from "../../shared/assets/images/HC Black.png";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

const Header = ({ onCIconClick }) => {
  const { cartCount, wishlistItems } = useCart();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const profileRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* ── Search overlay ── */}
      {searchOpen && (
        <SearchDropdown onClose={() => setSearchOpen(false)} />
      )}

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

          {/* Search icon — opens overlay */}
          <div className="search">
            <i
              className="bi bi-search fs-4"
              style={{ cursor: "pointer" }}
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
            />
          </div>
        </div>

        {/* CENTER */}
        <div className="logo mx-auto text-center">
          <img src={logo} alt="Logo" style={{ height: "40px" }} />
        </div>

        {/* RIGHT */}
        <div className="right-icons d-flex align-items-center gap-3">
          <Link to="/wishlist" className="text-dark position-relative">
            <i className="bi bi-heart fs-4"></i>
            {wishlistItems.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {wishlistItems.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="text-dark position-relative">
            <i className="bi bi-bag fs-4"></i>
            {cartCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartCount}
              </span>
            )}
          </Link>

          {/* 🔥 WRAPPER (IMPORTANT) */}
          <div ref={profileRef} style={{ position: "relative" }}>
            
            {/* PROFILE ICON */}
            <i
              className="bi bi-person-circle fs-4"
              style={{ cursor: "pointer" }}
              onClick={() => setOpen((prev) => !prev)}
            ></i>

            {/* DROPDOWN */}
            {open && <ProfileDropdown />}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
