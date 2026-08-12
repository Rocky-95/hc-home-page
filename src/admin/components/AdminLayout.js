import React, { useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { FiMenu, FiLogOut } from "react-icons/fi";
import { isAdminUser, safeJsonParse } from "../../shared/utils";
import AdminSidebar from "./AdminSidebar";
import { ToastProvider } from "./ToastProvider";
import { ConfirmProvider, useConfirm } from "./ConfirmProvider";
import "../styles/admin.css";

const AdminShell = ({ user }) => {
  const navigate = useNavigate();
  const confirm = useConfirm();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    const ok = await confirm({
      title: "Log out?",
      message: "You'll need to sign in again to access the admin panel.",
      confirmLabel: "Log Out",
      danger: true,
    });
    if (!ok) return;
    ["hc_token", "hc_user", "hc_role", "hc_session"].forEach((k) => localStorage.removeItem(k));
    navigate("/login");
  };

  const displayName = user?.full_name || user?.email || "Admin";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="admin-shell d-flex flex-column min-vh-100">
      <header className="admin-topbar">
        <div className="d-flex align-items-center gap-3">
          <button
            className="btn btn-sm d-lg-none"
            style={{ color: "#fff", border: "1px solid rgba(255,255,255,0.3)" }}
            onClick={() => setSidebarOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <FiMenu size={16} />
          </button>
          <div className="admin-topbar-brand">
            <span className="mark">HC</span>
            <span>Harry Clinton Admin</span>
          </div>
        </div>
        <div className="admin-topbar-right">
          <div className="admin-topbar-user">
            <span className="admin-avatar">{initial}</span>
            <span>{displayName}</span>
          </div>
          <button className="admin-logout-btn" onClick={handleLogout}>
            <FiLogOut size={13} className="me-1" />
            Logout
          </button>
        </div>
      </header>
      <div className="d-flex flex-grow-1">
        <AdminSidebar mobileOpen={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />
        <main className="admin-content flex-grow-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const AdminLayout = () => {
  const token = localStorage.getItem("hc_token");
  const session = localStorage.getItem("hc_session");
  const isAuthenticated = token || session;
  const user = safeJsonParse(localStorage.getItem("hc_user"), null);
  const isAdmin = isAdminUser(user);

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <ToastProvider>
      <ConfirmProvider>
        <AdminShell user={user} />
      </ConfirmProvider>
    </ToastProvider>
  );
};

export default AdminLayout;
