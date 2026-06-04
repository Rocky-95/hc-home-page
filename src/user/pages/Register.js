import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
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
      alert("Please accept Privacy Policy & Terms");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
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
        style={{ width: "400px", borderRadius: "12px" }}
      >
        <h3 className="text-center mb-4">Register</h3>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="username"
              className="form-control border-dark"
              placeholder="Enter your full name"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control border-dark"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Mobile */}
          <div className="mb-3">
            <label className="form-label">Mobile</label>
            <input
              type="tel"
              name="mobile"
              className="form-control border-dark"
              placeholder="Enter your mobile number"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control border-dark"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              required
            />
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
              <Link to="/privacy" target="_blank">
                Privacy 
              </Link>{" "}
              &{" "}
              <Link to="/terms" target="_blank">
                Terms
              </Link>
            </label>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="btn w-100"
            style={{ backgroundColor: "black", color: "white" }}
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
