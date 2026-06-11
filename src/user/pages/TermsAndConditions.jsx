import React from "react";
import { Link } from "react-router-dom";

const TermsAndConditions = () => (
  <main className="container py-5">
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <h1 className="mb-4">Terms & Conditions</h1>
        <p className="lead">
          These terms and conditions govern your use of the HC website and the purchase of our bespoke designer collections,
          tailoring services, and appointments.
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By using our website, placing an order, or booking an appointment, you agree to these terms.
          If you do not agree, please do not use the site or make a purchase.
        </p>

        <h2>2. Services and Products</h2>
        <p>
          We offer custom-made designer apparel, curated collections, and consultation/appointment services.
          All product descriptions and pricing are provided in good faith, but we reserve the right to correct errors or update availability.
        </p>

        <h2>3. Orders and Payment</h2>
        <p>
          Orders are confirmed after payment is processed. We accept only the payment methods displayed on the checkout page.
          Incomplete or fraudulent orders may be cancelled at our discretion.
        </p>

        <h2>4. Shipping and Delivery</h2>
        <p>
          Delivery estimates are provided for convenience and are not guaranteed. Shipping charges apply as shown during checkout.
          We are not responsible for delays caused by carriers, customs, or force majeure events.
        </p>

        <h2>5. Returns and Cancellations</h2>
        <p>
          Custom-made garments and bespoke orders may have limited return eligibility. If you wish to cancel or modify an order,
          please contact us immediately. Approval of cancellations, returns, or adjustments is at our discretion.
        </p>

        <h2>6. Appointment Bookings</h2>
        <p>
          Appointment bookings are subject to availability. We may reschedule appointments due to unforeseen circumstances.
          Please arrive on time and provide accurate details when booking.
        </p>

        <h2>7. Intellectual Property</h2>
        <p>
          All content on the website, including text, images, designs, and branding, is owned by HC or its licensors.
          You may not copy, reproduce, or use this content without our written permission.
        </p>

        <h2>8. User Conduct</h2>
        <p>
          You agree not to use our website for unlawful activities, to submit false information, or to interfere with the site’s operation.
        </p>

        <h2>9. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, HC is not liable for indirect, incidental, or consequential damages arising from your use of the website.
        </p>

        <h2>10. Governing Law</h2>
        <p>
          These terms are governed by the laws of the state or jurisdiction where HC operates.
          Any disputes will be resolved in the courts of that jurisdiction.
        </p>

        <h2>11. Changes to Terms</h2>
        <p>
          We may update these terms from time to time. Continued use of the website after changes means you accept the revised terms.
        </p>

        <h2>12. Contact Information</h2>
        <p>
          For questions about these terms, please <Link to="/contact-us">contact us</Link>.
        </p>
      </div>
    </div>
  </main>
);

export default TermsAndConditions;
