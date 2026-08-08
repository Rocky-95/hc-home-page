import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const token = localStorage.getItem("hc_token");
  const user = JSON.parse(localStorage.getItem("hc_user") || "null");
  const isAdmin =
    user &&
    (user.role?.toLowerCase() === "admin" ||
      user.role_code === "ADMIN" ||
      user.role?.toLowerCase().includes("admin"));

  if (!token || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="d-flex">
      <AdminSidebar />
      <main className="flex-grow-1 p-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
