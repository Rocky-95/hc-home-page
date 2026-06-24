import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const PrivacyPolicy = () => {
  return (
    <div className="bg-light py-5">
      <div className="container">
        <div className="card shadow-sm border-0 rounded-4 p-4">
          <h1 className="mb-4 text-primary">Privacy Policy</h1>
          <p>
            <strong>Effective Date:</strong>{" "}
            <span className="text-muted">[Insert Date]</span>
          </p>

          <p>
            Welcome to <strong>Harry Clinton</strong>, a bespoke fashion brand
            dedicated to providing you with premium, personalized style
            experiences. This Privacy Policy outlines how we collect, use, and
            protect your personal information when you interact with our
            website and services.
          </p>

          <h5 className="mt-4 text-dark">1. Information We Collect</h5>
          <p>We collect the following types of information to provide and improve our services:</p>

          <p className="fw-semibold">a. Personal Information</p>
          <ul className="list-unstyled ps-3">
            <li>• Full Name</li>
            <li>• Email Address</li>
            <li>• Phone Number</li>
            <li>• Billing and Shipping Address</li>
            <li>• Payment Details (processed via secure third-party gateways)</li>
          </ul>

          <p className="fw-semibold">b. Non-Personal Information</p>
          <ul className="list-unstyled ps-3">
            <li>• Browser type, IP address, device type</li>
            <li>• Website usage data (via cookies and analytics tools)</li>
          </ul>

          <h5 className="mt-4 text-dark">2. How We Use Your Information</h5>
          <ul className="list-unstyled ps-3">
            <li>• Processing and fulfilling orders</li>
            <li>• Personalizing your shopping experience</li>
            <li>• Sending updates, order confirmations, and promotional content</li>
            <li>• Improving our website, services, and customer experience</li>
            <li>• Legal and security compliance</li>
          </ul>

          <h5 className="mt-4 text-dark">3. Cookies and Tracking Technologies</h5>
          <p>We use cookies to:</p>
          <ul className="list-unstyled ps-3">
            <li>• Remember user preferences</li>
            <li>• Understand site usage</li>
            <li>• Provide relevant ads through retargeting platforms</li>
          </ul>
          <p>You can manage cookie preferences through your browser settings.</p>

          <h5 className="mt-4 text-dark">4. Sharing Your Information</h5>
          <p>We do not sell your personal data. However, we may share data with:</p>
          <ul className="list-unstyled ps-3">
            <li>• Trusted third-party service providers (e.g., payment gateways, courier services)</li>
            <li>• Legal authorities if required by law</li>
            <li>• Analytics and marketing tools (e.g., Google Analytics, Meta Pixel)</li>
          </ul>

          <h5 className="mt-4 text-dark">5. Data Security</h5>
          <p>We implement industry-standard security measures including SSL encryption, secure servers, and limited access protocols to protect your information.</p>

          <h5 className="mt-4 text-dark">6. Your Rights</h5>
          <p>Depending on your location, you may have the right to:</p>
          <ul className="list-unstyled ps-3">
            <li>• Access, update, or delete your data</li>
            <li>• Opt-out of marketing communications</li>
            <li>• Request a copy of your personal data</li>
          </ul>
          <p>To make a request, contact us at <a href="mailto:support@harryclinton.com">support@harryclinton.com</a>.</p>

          <h5 className="mt-4 text-dark">7. Third-Party Links</h5>
          <p>Our website may contain links to third-party websites. We are not responsible for their privacy practices. Please review their policies independently.</p>

          <h5 className="mt-4 text-dark">8. Children’s Privacy</h5>
          <p>Our services are not intended for users under the age of 13. We do not knowingly collect data from children.</p>

          <h5 className="mt-4 text-dark">9. Changes to This Policy</h5>
          <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with a revised “Effective Date.”</p>

          <h5 className="mt-4 text-dark">10. Contact Us</h5>
          <p className="mb-1"><strong>Harry Clinton – Bespoke Fashion</strong></p>
          <p className="mb-1">
            Email:{" "}
            <a href="mailto:support@harryclinton.com">support@harryclinton.com</a>
          </p>
          <p className="mb-1">Phone: +91-XXXXXXXXXX</p>
          <p>
            Website:{" "}
            <a href="https://www.harryclinton.com" target="_blank" rel="noreferrer">
              www.harryclinton.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

