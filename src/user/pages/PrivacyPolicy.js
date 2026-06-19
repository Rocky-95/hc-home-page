import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => (
  <div className="container py-5">
    <h1 className="mb-4">Privacy Policy</h1>
    <p className="text-muted">Our privacy policy details will appear here.</p>
    <Link to="/" className="btn btn-dark mt-3">Back to Home</Link>
  </div>
);

export default PrivacyPolicy;
