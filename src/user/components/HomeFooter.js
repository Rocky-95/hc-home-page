import React from "react";
import FooterLogo from "../../shared/assets/images/Logo White.png"; // Your white logo path
import { Link } from "react-router-dom";

const HomeFooter = () => {
  return (
    <footer
      id="site-footer"
      className="text-light py-5"
      style={{ backgroundColor: "#000000" }}
    >
      <div className="container">
        <div className="row">
          {/* Brand & About */}
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold">HC</h4>
            <p className="small">
              Empowering innovation with quality and trust. Join us in our
              journey towards excellence.
            </p>
            <p className="mb-1 small">Follow us on:</p>
            <div className="d-flex">
              <a
                href="https://www.facebook.com/yourpage"
                className="text-light me-3"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-facebook fs-5"></i>
              </a>
              <a
                href="https://twitter.com/yourhandle"
                className="text-light me-3"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-twitter fs-5"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/yourhandle"
                className="text-light me-3"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-linkedin fs-5"></i>
              </a>
              <a
                href="https://www.instagram.com/username/"
                className="text-light"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-instagram fs-5"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 mb-4">
            <h6 className="fw-bold text-uppercase">Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/about-us" className="text-white text-decoration-none">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="text-white text-decoration-none">
                  Contact Us
                </Link>
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
                <Link to="/contact-us" className="text-white text-decoration-none">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-white text-decoration-none">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/policies" className="text-white text-decoration-none">
                  Shipping, Returns & Cancellation
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="text-white text-decoration-none">
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

      {/* Inline CSS for responsiveness */}
      <style jsx>{`
        .footer-logo {
          width: 750px;
          max-width: 90%;
          height: auto;
        }

        @media (max-width: 768px) {
          .footer-logo {
            width: 280px;
            max-width: 80%;
          }
        }

        @media (max-width: 576px) {
          .footer-logo {
            width: 200px;
          }
        }

        @media (max-width: 480px) {
          .footer-logo {
            width: 160px;
          }
        }
      `}</style>
    </footer>
  );
};

export default HomeFooter;
