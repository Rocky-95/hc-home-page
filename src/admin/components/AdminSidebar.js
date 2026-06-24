import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { adminNavItems } from "../config/modules";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside
      className="bg-dark text-white d-flex flex-column p-3"
      style={{ width: "260px", minHeight: "100vh", position: "sticky", top: 0 }}
    >
      <h4 className="mb-4 px-2">HC Admin</h4>
      <nav className="nav flex-column flex-grow-1">
        {adminNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `nav-link text-white ${isActive ? "active fw-bold bg-secondary" : ""}`
            }
            style={{ borderRadius: "6px" }}
          >
            {item.icon && <span className="me-2">{item.icon}</span>}
            {item.label}
          </NavLink>
        ))}
      </nav>
      <button className="btn btn-outline-light btn-sm mt-3" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
};

export default AdminSidebar;
