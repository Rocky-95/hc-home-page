import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import hcBlack from "../../shared/assets/images/HC Black.png";
import contentService from "../../services/contentService";

const contactInfo = [
  {
    icon: "bi-telephone",
    title: "Phone",
    detail: "+91 7094 094 194",
    link: "tel:+917094094194",
  },
  {
    icon: "bi-envelope",
    title: "Email",
    detail: "connect@harryclinton.com",
    link: "mailto:connect@harryclinton.com",
  },
  {
    icon: "bi-geo-alt",
    title: "Atelier",
    detail: "Chennai, Tamil Nadu, India",
    link: "#",
  },
  {
    icon: "bi-clock",
    title: "Working Hours",
    detail: "Mon – Sat, 10am – 7pm IST",
    link: "#",
  },
];

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    try {
      await contentService.sendMail({
        to: "connect@harryclinton.com",
        subject: `Contact Form: ${form.subject}`,
        html: `
          <p><strong>Name:</strong> ${form.name}</p>
          <p><strong>Email:</strong> ${form.email}</p>
          <p><strong>Phone:</strong> ${form.phone || "Not provided"}</p>
          <p><strong>Subject:</strong> ${form.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${form.message.replace(/\n/g, "<br/>")}</p>
        `,
        text: `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nSubject: ${form.subject}\nMessage: ${form.message}`,
      });
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      setSubmitError(err.response?.data?.message || "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-light min-vh-100 pb-5">
      {/* Hero */}
      <div className="bg-dark text-white py-5 mb-5">
        <div className="container text-center">
          <img src={hcBlack} alt="Harry Clinton" style={{ height: "50px", marginBottom: "20px" }} />
          <h1 className="display-5 fw-bold mb-3">Contact Us</h1>
          <p className="lead mb-0">
            We would love to hear from you. Reach out for bespoke consultations, orders, or any questions.
          </p>
        </div>
      </div>

      <div className="container">
        {/* Contact Info Cards */}
        <div className="row g-4 mb-5">
          {contactInfo.map((info, i) => (
            <div className="col-md-6 col-lg-3" key={i}>
              <a href={info.link} className="text-decoration-none">
                <div className="card h-100 border-0 shadow-sm rounded-4 p-4 text-center hover-shadow">
                  <div className="card-body">
                    <i className={`bi ${info.icon} fs-1 text-primary mb-3 d-block`}></i>
                    <h5 className="card-title text-dark">{info.title}</h5>
                    <p className="card-text text-muted">{info.detail}</p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        <div className="row g-5">
          {/* Contact Form */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm rounded-4 p-4">
              <div className="card-body">
                <h3 className="h4 mb-4">Send us a Message</h3>
                {submitted ? (
                  <div className="alert alert-success text-center">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {submitError && (
                      <div className="alert alert-danger text-center">{submitError}</div>
                    )}
                    <div className="row g-3">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Full Name</label>
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
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Email Address</label>
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
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Phone Number</label>
                        <input
                          type="tel"
                          className="form-control"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Subject</label>
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
                      <div className="col-12 mb-3">
                        <label className="form-label">Message</label>
                        <textarea
                          className="form-control"
                          name="message"
                          rows="5"
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Tell us how we can help..."
                          required
                        />
                      </div>
                      <div className="col-12">
                        <button
                          type="submit"
                          className="btn btn-dark w-100 py-2"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Visit Us */}
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
              <div className="card-body">
                <h3 className="h4 mb-4">Visit Our Atelier</h3>
                <p className="text-muted">
                  Experience the world of Harry Clinton in person. Schedule a bespoke consultation
                  with our master tailors and explore fabrics, fits, and finishes tailored to you.
                </p>
                <ul className="list-unstyled mt-4">
                  <li className="mb-3">
                    <i className="bi bi-geo-alt text-primary me-2"></i>
                    Harry Clinton Atelier, Chennai, Tamil Nadu, India
                  </li>
                  <li className="mb-3">
                    <i className="bi bi-envelope text-primary me-2"></i>
                    connect@harryclinton.com
                  </li>
                  <li className="mb-3">
                    <i className="bi bi-telephone text-primary me-2"></i>
                    +91 7094 094 194
                  </li>
                  <li className="mb-3">
                    <i className="bi bi-clock text-primary me-2"></i>
                    Mon – Sat, 10am – 7pm IST
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-light rounded-3 text-center">
                  <i className="bi bi-calendar-check fs-2 text-primary mb-2 d-block"></i>
                  <p className="mb-2">Prefer a face-to-face consultation?</p>
                  <Link to="/help-center" className="btn btn-outline-dark btn-sm">
                    Visit Help Center
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-5">
          <Link to="/" className="btn btn-outline-dark">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
