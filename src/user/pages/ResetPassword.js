import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import authService from "../../services/authService";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [token, setToken] = useState(searchParams.get("token") || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage({ text: "Passwords do not match", type: "danger" });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await authService.forgotPasswordConfirm({
        email_id: email,
        reset_token: token,
        new_password: password,
        rcu: "website",
      });
      const payload = res.data || {};
      const isSuccess =
        payload.Status === "1" ||
        payload.Status === "true" ||
        payload.Status === true ||
        payload.success === true;

      if (isSuccess) {
        setMessage({
          text: payload.Message || "Password reset successful. Please login.",
          type: "success",
        });
        setPassword("");
        setConfirmPassword("");
      } else {
        setMessage({
          text: payload.Message || "Could not reset password. Please try again.",
          type: "danger",
        });
      }
    } catch (err) {
      setMessage({
        text: err.response?.data?.Message || err.response?.data?.message || "Something went wrong.",
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "12px" }}>
        <h3 className="text-center mb-4">Reset Password</h3>
        {message.text && (
          <div className={`alert alert-${message.type} py-2`} role="alert">
            {message.text}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control border-dark"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Reset Token / Code</label>
            <input
              type="text"
              className="form-control border-dark"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control border-dark"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm New Password</label>
            <input
              type="password"
              className="form-control border-dark"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-dark w-100" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
        <div className="text-center mt-3">
          <Link to="/login" className="text-dark">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
