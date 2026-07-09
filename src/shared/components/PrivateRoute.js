import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("hc_token");
  const session = localStorage.getItem("hc_session");
  const stored = localStorage.getItem("hc_user");
  const roleCode = localStorage.getItem("hc_role") || "";
  const user = stored ? JSON.parse(stored) : null;

  if ((!token && !session) || !user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole) {
    const required = requiredRole.toUpperCase();
    const isAdmin = roleCode === "ADMIN";
    const matches = required === "ADMIN" ? isAdmin : roleCode === required;
    if (!matches) return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
