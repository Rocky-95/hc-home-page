import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => (
  <main className="container py-5">
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <h1 className="mb-4">Privacy Policy</h1>
        <p className="lead">
          At HC, we respect your privacy and are committed to protecting the personal information you share with us.
          This policy explains how we collect, use, store, and protect customer and visitor data.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          We collect information you provide directly when you place an order, request an appointment, sign up for updates, or contact us.
          This may include your name, email address, phone number, city, delivery preferences, appointment details, and order information.
        </p>
        <p>
          We also collect technical data automatically through your browser and device when you visit our website,
          such as IP address, device type, browser type, pages viewed, and referral source.
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>
          We use personal data to:
        </p>
        <ul>
          <li>process and fulfill orders, including custom tailoring requests;</li>
          <li>book and confirm appointment requests;</li>
          <li>provide customer service and respond to inquiries;</li>
          <li>send order updates, promotional offers, and service notifications when you opt in;</li>
          <li>improve our website, products, and marketing communications;</li>
          <li>protect our site from fraud and maintain a secure environment.</li>
        </ul>

        <h2>3. Sharing and Disclosure</h2>
        <p>
          We do not sell your personal information. We may share it with trusted service providers who help us operate the website,
          process payments, fulfill orders, or support marketing and analytics.
        </p>
        <p>
          These providers are required to keep your data confidential and use it only for the services they provide to us.
        </p>

        <h2>4. Cookies and Tracking</h2>
        <p>
          Our website uses cookies and similar technologies to remember preferences, collect usage information, and improve the browsing experience.
          You can control cookie settings through your browser, but disabling cookies may affect some website features.
        </p>

        <h2>5. Data Security</h2>
        <p>
          We use industry-standard security measures to protect customer information, including encrypted data transmission and secure servers.
          While we work to safeguard your data, no online method is completely secure, so we cannot guarantee absolute protection.
        </p>

        <h2>6. Your Rights</h2>
        <p>
          You may request access to, correction of, or deletion of your personal information. You can also opt out of marketing communications at any time.
          Please contact us using the details below to manage your preferences or review the data we store about you.
        </p>

        <h2>7. Children’s Privacy</h2>
        <p>
          Our website is not intended for children under 16. We do not knowingly collect personal information from minors.
        </p>

        <h2>8. Changes to This Policy</h2>
        <p>
          We may update this policy occasionally to reflect changes in our practices or legal requirements.
          When we do, we will post the revised policy here with an updated effective date.
        </p>

        <h2>9. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy or how we handle your information,
          please <Link to="/contact-us">contact us</Link>.
        </p>
      </div>
    </div>
  </main>
);

export default PrivacyPolicy;
