import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/authService";

const Register = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState({ text: "", type: "" });
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email_id: "",
    mobile_number: "",
    password: "",
    acceptPolicy: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.acceptPolicy) {
      setMessage({ text: "Please accept Privacy Policy & Terms", type: "danger" });
      return;
    }

    try {
      const res = await authService.register({
        full_name: formData.full_name.trim(),
        email_id: formData.email_id.trim(),
        password: formData.password,
        mobile_number: formData.mobile_number.trim() || undefined,
        isactive: 1,
        rcu: "website",
      });
      const payload = res.data || {};
      const isSuccess =
        payload.Status === "1" ||
        payload.Status === "true" ||
        payload.Status === true ||
        payload.success === true;

      if (isSuccess) {
        setMessage({ text: payload.Message || "Registration successful!", type: "success" });
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMessage({ text: payload.Message || "Registration failed", type: "danger" });
      }
    } catch (err) {
      setMessage({
        text: err.response?.data?.Message || err.response?.data?.message || "Registration failed",
        type: "danger",
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light position-relative">
      {/* Home Icon */}
      <Link
        to="/"
        className="position-absolute"
        style={{ top: "20px", left: "20px", color: "black" }}
      >
        <i className="bi bi-house-door-fill fs-3"></i>
      </Link>

      <div
        className="card shadow-lg p-4"
        style={{ width: "100%", maxWidth: "400px", borderRadius: "12px" }}
      >
        <h3 className="text-center mb-4">Register</h3>

        {message.text && (
          <div className={`alert alert-${message.type} py-2`} role="alert">
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="full_name"
              className="form-control border-dark"
              placeholder="Enter your full name"
              value={formData.full_name}
              onChange={handleChange}
              required
              autoComplete="name"
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email_id"
              className="form-control border-dark"
              placeholder="Enter your email address"
              value={formData.email_id}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>

          {/* Mobile */}
          <div className="mb-3">
            <label className="form-label">Mobile</label>
            <input
              type="tel"
              name="mobile_number"
              className="form-control border-dark"
              placeholder="Enter your mobile number"
              value={formData.mobile_number}
              onChange={handleChange}
              required
              autoComplete="tel"
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="form-control border-dark"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#555",
                  padding: 0,
                }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
              </button>
            </div>
          </div>

          {/* Privacy & Terms – Inline */}
          <div className="mb-3 form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="acceptPolicy"
              id="policy"
              checked={formData.acceptPolicy}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="policy">
              Accept{" "}
              <Link to="/privacy-policy" target="_blank">
                Privacy 
              </Link>{" "}
              &{" "}
              <Link to="/terms-and-conditions" target="_blank">
                Terms
              </Link>
            </label>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="btn w-100"
            style={{ backgroundColor: "black", color: "white" }}
            disabled={!formData.full_name.trim() || !formData.email_id.trim() || !formData.mobile_number.trim() || !formData.password.trim() || !formData.acceptPolicy}
          >
            Register
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/login" style={{ fontWeight: "bold", color: "black" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
