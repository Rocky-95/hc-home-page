import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function TermsAndConditions() {
  return (
    <div className="container py-5 bg-light">
      <div className="card shadow-sm border-0 rounded-4 p-4">
        <h1 className="mb-4 text-primary">Terms and Conditions</h1>
        <p><strong>Effective Date:</strong> <span className="text-muted">[Insert Date]</span></p>

        <p>
          Welcome to <strong>Harry Clinton</strong>, a bespoke fashion brand committed to premium craftsmanship and personalized style. These Terms and Conditions ("Terms") govern your use of our website and services. By accessing or purchasing from our site, you agree to these Terms in full.
        </p>

        <h5 className="mt-4">1. Acceptance of Terms</h5>
        <p>By using our website, you acknowledge that you have read, understood, and agree to be bound by these Terms, as well as our Privacy Policy.</p>

        <h5 className="mt-4">2. Eligibility</h5>
        <p>You must be at least 18 years of age to make a purchase. By using our services, you confirm that you are legally able to enter into a binding contract.</p>

        <h5 className="mt-4">3. Account Registration</h5>
        <ul>
          <li>Provide accurate, current, and complete information</li>
          <li>Maintain the security of your password and account</li>
          <li>Notify us immediately of any unauthorized use</li>
        </ul>

        <h5 className="mt-4">4. Orders and Payments</h5>
        <ul>
          <li>All orders are subject to acceptance and availability.</li>
          <li>Prices are listed in INR and may be subject to taxes and shipping charges.</li>
          <li>Payments are processed securely via third-party payment gateways.</li>
        </ul>

        <h5 className="mt-4">5. Shipping & Delivery</h5>
        <ul>
          <li>Estimated delivery timelines will be shared during checkout.</li>
          <li>Delays caused by shipping providers or unforeseen events are not our liability.</li>
          <li>Please ensure that shipping addresses are correct; we are not responsible for lost shipments due to incorrect details.</li>
        </ul>

        <h5 className="mt-4">6. Custom & Bespoke Orders</h5>
        <ul>
          <li>Due to the personalized nature of bespoke products, such items are non-returnable and non-refundable unless defective or damaged upon arrival.</li>
          <li>Minor variations in fabric color or stitching are part of bespoke craftsmanship and not considered defects.</li>
        </ul>

        <h5 className="mt-4">7. Returns & Refunds</h5>
        <p>Please refer to our <a href="/Policies">Returns & Refunds Policy</a> for more details.</p>

        <h5 className="mt-4">8. Intellectual Property</h5>
        <p>All content on this site, including logos, images, designs, and text, are the intellectual property of Harry Clinton and protected by copyright and trademark laws.</p>

        <h5 className="mt-4">9. Promotions & Discounts</h5>
        <ul>
          <li>Promotional offers may be subject to specific terms.</li>
          <li>We reserve the right to cancel or modify promotions at any time.</li>
        </ul>

        <h5 className="mt-4">10. Limitation of Liability</h5>
        <p>We are not liable for indirect, incidental, or consequential damages, or any loss due to misuse of the website or products.</p>

        <h5 className="mt-4">11. Termination</h5>
        <p>We may suspend or terminate access to our services for any user who violates these Terms.</p>

        <h5 className="mt-4">12. Governing Law</h5>
        <p>These Terms are governed by the laws of India, with disputes subject to the courts in Chennai, Tamil Nadu.</p>

        <h5 className="mt-4">13. Changes to Terms</h5>
        <p>We may revise these Terms from time to time. Updated versions will be posted with a new effective date.</p>

        <h5 className="mt-4">14. Contact Us</h5>
        <p><strong>Harry Clinton – Bespoke Fashion</strong></p>
        <p>Email: <a href="mailto:support@harryclinton.com">support@harryclinton.com</a></p>
        <p>Phone: +91-XXXXXXXXXX</p>
        <p>Website: <a href="https://www.harryclinton.com" target="_blank" rel="noreferrer">www.harryclinton.com</a></p>
      </div>
    </div>
  );
}

export default TermsAndConditions;

