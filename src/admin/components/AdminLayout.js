import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("hc_token");
  const session = localStorage.getItem("hc_session");
  const isAuthenticated = token || session;
  const user = JSON.parse(localStorage.getItem("hc_user") || "null");
  const isAdmin =
    user &&
    (user.role?.toLowerCase() === "admin" ||
      user.role_code === "ADMIN" ||
      user.role?.toLowerCase().includes("admin") ||
      user.role_code?.toLowerCase().includes("admin"));

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to logout?")) return;
    ["hc_token", "hc_user", "hc_role", "hc_session"].forEach((k) => localStorage.removeItem(k));
    navigate("/login");
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <header
        className="bg-dark text-white d-flex justify-content-between align-items-center px-4"
        style={{ height: "50px" }}
      >
        <span className="fw-bold">HC Admin</span>
        <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
          🚪 Logout
        </button>
      </header>
      <div className="d-flex flex-grow-1">
        <AdminSidebar />
        <main
          className="flex-grow-1 p-4"
          style={{ backgroundColor: "#f8f9fa", minHeight: "calc(100vh - 50px)" }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
