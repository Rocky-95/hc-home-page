import React from "react";
import { Link } from "react-router-dom";

const FAQs = () => (
  <div className="container py-5">
    <h1 className="mb-4">FAQs</h1>
    <p className="text-muted">Frequently asked questions will appear here.</p>
    <Link to="/" className="btn btn-dark mt-3">Back to Home</Link>
  </div>
);

export default FAQs;
