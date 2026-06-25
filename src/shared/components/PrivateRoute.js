import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("hc_token");
  const stored = localStorage.getItem("hc_user");
  const user = stored ? JSON.parse(stored) : null;

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  const role = user.role || user.role_name || user.user_type;
  if (requiredRole && role?.toLowerCase() !== requiredRole.toLowerCase()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
