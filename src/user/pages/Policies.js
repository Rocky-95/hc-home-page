import React from "react";
import { Link } from "react-router-dom";

const Policies = () => (
  <div className="container py-5">
    <h1 className="mb-4">Shipping, Returns &amp; Cancellation</h1>
    <p className="text-muted">Our shipping and returns policies will appear here.</p>
    <Link to="/" className="btn btn-dark mt-3">Back to Home</Link>
  </div>
);

export default Policies;
