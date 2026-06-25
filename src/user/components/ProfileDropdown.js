import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProfileDropdown.css";

const ProfileDropdown = ({ onClose }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("hc_user"));

  const dropdownRef = useRef(); // 🔥 reference

  // 🔥 CLICK OUTSIDE LOGIC
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose && onClose(); // close dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleNavigate = (path) => {
    navigate(path);
    onClose && onClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("hc_user");
    localStorage.removeItem("hc_token");
    localStorage.removeItem("hc_cart");
    localStorage.removeItem("hc_wishlist");
    localStorage.removeItem("hc_coupon");
    navigate("/login");
    onClose && onClose();
  };

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      {/* Guest */}
      {!user && (
        <>
          <div className="dropdown-item" onClick={() => handleNavigate("/login")}>
            <i className="bi bi-box-arrow-in-right me-2"></i>
            Login
          </div>

          <div className="dropdown-item" onClick={() => handleNavigate("/register")}>
            <i className="bi bi-person-plus me-2"></i>
            Register
          </div>
        </>
      )}

      {/* Logged-in */}
      {user && (
        <>
          <div className="dropdown-header">
            <strong>{user.full_name || user.fullname || user.name || user.email_id || user.email || "User"}</strong>
            {user.role && <p className="dropdown-role">{user.role}</p>}
          </div>

          <div className="dropdown-divider"></div>

          <div className="dropdown-item" onClick={() => handleNavigate("/profile")}>
            <i className="bi bi-person me-2"></i>
            My Profile
          </div>

          <div className="dropdown-item" onClick={() => handleNavigate("/addresses")}>
            <i className="bi bi-geo-alt me-2"></i>
            My Addresses
          </div>

          <div className="dropdown-item" onClick={() => handleNavigate("/appointments")}>
            <i className="bi bi-calendar me-2"></i>
            My Appointments
          </div>

          <div className="dropdown-item" onClick={() => handleNavigate("/orders")}>
            <i className="bi bi-bag me-2"></i>
            My Orders
          </div>

          {user.role?.toLowerCase() === "admin" && (
            <div
              className="dropdown-item"
              onClick={() => handleNavigate("/admin")}
            >
              <i className="bi bi-speedometer2 me-2"></i>
              Admin Dashboard
            </div>
          )}

          <div className="dropdown-divider"></div>

          <div className="dropdown-item logout" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-2"></i>
            Logout
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDropdown;