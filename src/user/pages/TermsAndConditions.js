import React from "react";
import { Link } from "react-router-dom";

const TermsAndConditions = () => (
  <div className="container py-5">
    <h1 className="mb-4">Terms &amp; Conditions</h1>
    <p className="text-muted">Our terms and conditions will appear here.</p>
    <Link to="/" className="btn btn-dark mt-3">Back to Home</Link>
  </div>
);

export default TermsAndConditions;
