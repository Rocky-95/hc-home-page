import React, { useState } from "react";
import { Link } from "react-router-dom";
import authService from "../../services/authService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await authService.forgotPassword({ email_id: email, rcu: "website" });
      const payload = res.data || {};
      const isSuccess =
        payload.Status === "1" ||
        payload.Status === "true" ||
        payload.Status === true ||
        payload.success === true;

      if (isSuccess) {
        setMessage({
          text: payload.Message || "Reset instructions sent. Please check your email.",
          type: "success",
        });
      } else {
        setMessage({
          text: payload.Message || "Could not send reset instructions. Please try again.",
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
        <h3 className="text-center mb-4">Forgot Password</h3>
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
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-dark w-100" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
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

export default ForgotPassword;
