import React from "react";
import { Link } from "react-router-dom";

const ContactUs = () => (
  <div className="container py-5 text-center">
    <h1 className="mb-3">Contact Us</h1>
    <p className="text-muted">Reach out to us at <a href="mailto:info@houseof-cavani.com">info@houseof-cavani.com</a></p>
    <Link to="/" className="btn btn-dark mt-3">Back to Home</Link>
  </div>
);

export default ContactUs;
