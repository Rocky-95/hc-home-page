import React, { useState } from "react";
import FooterLogo from "../../shared/assets/images/Logo White.png";
import HCWhite from "../../shared/assets/images/HC White.png";
import { Link } from "react-router-dom";
import "../styles/HomeFooter.css";

const HomeFooter = () => {
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      setShowModal(false);
    }, 3000);
  };

  const closeModal = () => {
    setShowModal(false);
    setSubmitted(false);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <>
      <footer
        id="site-footer"
        className="text-light py-5"
        style={{ backgroundColor: "#000000" }}
      >
        <div className="container">
          <div className="row">
            {/* Brand & About */}
            <div className="col-md-4 mb-4">
              <h4 className="fw-bold">
                <img
                  src={HCWhite}
                  alt="HC"
                  style={{ height: "40px", width: "auto" }}
                />
              </h4>
              <p className="small">
                Empowering innovation with quality and trust. Join us in our
                journey towards excellence.
              </p>
              <p className="mb-1 small">Follow us on:</p>
              <div className="d-flex">
                <a
                  href="https://www.facebook.com/harry.clinton.829484"
                  className="text-light me-3"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="bi bi-facebook fs-5"></i>
                </a>
                <a
                  href="https://www.instagram.com/harryclinton_official/"
                  className="text-light me-3"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="bi bi-instagram fs-5"></i>
                </a>
                <a
                  href="https://www.youtube.com/@HarryClintonHC"
                  className="text-light"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="bi bi-youtube fs-5"></i>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-md-2 mb-4">
              <h6 className="fw-bold text-uppercase">Quick Links</h6>
              <ul className="list-unstyled">
                <li>
                  <Link to="/aboutUs" className="text-white text-decoration-none">
                    About Us
                  </Link>
                </li>
                <li>
                  <button
                    className="btn btn-link text-white text-decoration-none p-0 m-0"
                    onClick={() => setShowModal(true)}
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <Link to="/privacy-policy" className="text-white text-decoration-none">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-and-conditions" className="text-white text-decoration-none">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="col-md-2 mb-4">
              <h6 className="fw-bold text-uppercase">Support</h6>
              <ul className="list-unstyled">
                <li>
                  <Link to="/help-center" className="text-white text-decoration-none">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/FAQs" className="text-white text-decoration-none">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link to="/Policies" className="text-light text-decoration-none">
                    Shipping, Returns &amp; Cancellation
                  </Link>
                </li>
                <li>
                  <Link to="/FAQs" className="text-white text-decoration-none">
                    Track Order
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="col-md-4 mb-4">
              <h6 className="fw-bold text-uppercase">Stay Updated</h6>
              <p className="small">
                Subscribe to our newsletter for the latest updates and promotions.
              </p>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control bg-transparent text-light border-light"
                  placeholder="Your email"
                />
                <button className="btn btn-outline-light">Subscribe</button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-light my-4" />
        </div>

        {/* Bigger White Logo */}
        <div className="text-center mb-4">
          <img src={FooterLogo} alt="Logo-footer" className="footer-logo" />
        </div>
      </footer>

      {/* Contact Us Modal */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.75)" }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 rounded-4 shadow">
              <div className="modal-header border-0 pb-0">
                <div>
                  <h5 className="modal-title fw-bold">Contact Us</h5>
                  <p className="text-muted mb-0 small">We will get back to you within 24 hours.</p>
                </div>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body pt-3">
                {submitted ? (
                  <div className="alert alert-success text-center rounded-3">
                    <i className="bi bi-check-circle fs-4 d-block mb-2"></i>
                    Thank you for reaching out. We will get back to you soon.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Phone</label>
                        <input
                          type="tel"
                          className="form-control"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Subject</label>
                        <select
                          className="form-select"
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select a subject</option>
                          <option value="Bespoke Consultation">Bespoke Consultation</option>
                          <option value="Order Enquiry">Order Enquiry</option>
                          <option value="Returns & Exchanges">Returns & Exchanges</option>
                          <option value="Feedback">Feedback</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="col-12">
                        <label className="form-label small fw-semibold">Message</label>
                        <textarea
                          className="form-control"
                          name="message"
                          rows="4"
                          value={form.message}
                          onChange={handleChange}
                          placeholder="How can we help you?"
                          required
                        />
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-dark w-100 py-2">
                          Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeFooter;
