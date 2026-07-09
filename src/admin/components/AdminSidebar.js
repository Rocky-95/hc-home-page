import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { adminNavItems } from "../config/modules";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to logout?")) return;
    ["hc_token", "hc_user", "hc_role", "hc_session"].forEach((k) => localStorage.removeItem(k));
    navigate("/login");
  };

  return (
    <aside
      className="bg-dark text-white d-flex flex-column p-3"
      style={{ width: "240px", minHeight: "100vh", position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}
    >
      <h5 className="mb-3 px-2 fw-bold">⚙️ HC Admin</h5>
      <nav className="nav flex-column flex-grow-1" style={{ gap: "2px" }}>
        {adminNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              `nav-link text-white py-2 px-2 ${isActive ? "fw-bold bg-secondary rounded" : ""}`
            }
            style={{ fontSize: "0.85rem" }}
          >
            {item.icon && <span className="me-2">{item.icon}</span>}
            {item.label}
          </NavLink>
        ))}
      </nav>
      <button className="btn btn-outline-light btn-sm mt-3" onClick={handleLogout}>
        🚪 Logout
      </button>
    </aside>
  );
};

export default AdminSidebar;
