import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import contentService from "../../services/contentService";

const fallbackContent = {
  title: "Privacy Policy",
  effectiveDate: "[Insert Date]",
  intro:
    "Welcome to Harry Clinton, a bespoke fashion brand dedicated to providing you with premium, personalized style experiences. This Privacy Policy outlines how we collect, use, and protect your personal information when you interact with our website and services.",
  sections: [
    {
      section_title: "1. Information We Collect",
      content:
        "<p>We collect the following types of information to provide and improve our services:</p><p class='fw-semibold'>a. Personal Information</p><ul class='list-unstyled ps-3'><li>• Full Name</li><li>• Email Address</li><li>• Phone Number</li><li>• Billing and Shipping Address</li><li>• Payment Details (processed via secure third-party gateways)</li></ul><p class='fw-semibold'>b. Non-Personal Information</p><ul class='list-unstyled ps-3'><li>• Browser type, IP address, device type</li><li>• Website usage data (via cookies and analytics tools)</li></ul>",
    },
    {
      section_title: "2. How We Use Your Information",
      content:
        "<ul class='list-unstyled ps-3'><li>• Processing and fulfilling orders</li><li>• Personalizing your shopping experience</li><li>• Sending updates, order confirmations, and promotional content</li><li>• Improving our website, services, and customer experience</li><li>• Legal and security compliance</li></ul>",
    },
    {
      section_title: "3. Cookies and Tracking Technologies",
      content:
        "<p>We use cookies to:</p><ul class='list-unstyled ps-3'><li>• Remember user preferences</li><li>• Understand site usage</li><li>• Provide relevant ads through retargeting platforms</li></ul><p>You can manage cookie preferences through your browser settings.</p>",
    },
    {
      section_title: "4. Sharing Your Information",
      content:
        "<p>We do not sell your personal data. However, we may share data with:</p><ul class='list-unstyled ps-3'><li>• Trusted third-party service providers (e.g., payment gateways, courier services)</li><li>• Legal authorities if required by law</li><li>• Analytics and marketing tools (e.g., Google Analytics, Meta Pixel)</li></ul>",
    },
    {
      section_title: "5. Data Security",
      content:
        "<p>We implement industry-standard security measures including SSL encryption, secure servers, and limited access protocols to protect your information.</p>",
    },
    {
      section_title: "6. Your Rights",
      content:
        "<p>Depending on your location, you may have the right to:</p><ul class='list-unstyled ps-3'><li>• Access, update, or delete your data</li><li>• Opt-out of marketing communications</li><li>• Request a copy of your personal data</li></ul><p>To make a request, contact us at <a href='mailto:support@harryclinton.com'>support@harryclinton.com</a>.</p>",
    },
    {
      section_title: "7. Third-Party Links",
      content:
        "<p>Our website may contain links to third-party websites. We are not responsible for their privacy practices. Please review their policies independently.</p>",
    },
    {
      section_title: "8. Children’s Privacy",
      content:
        "<p>Our services are not intended for users under the age of 13. We do not knowingly collect data from children.</p>",
    },
    {
      section_title: "9. Changes to This Policy",
      content:
        "<p>We may update this Privacy Policy from time to time. Changes will be posted on this page with a revised “Effective Date.”</p>",
    },
    {
      section_title: "10. Contact Us",
      content:
        "<p class='mb-1'><strong>Harry Clinton – Bespoke Fashion</strong></p><p class='mb-1'>Email: <a href='mailto:support@harryclinton.com'>support@harryclinton.com</a></p><p class='mb-1'>Phone: +91-XXXXXXXXXX</p><p>Website: <a href='https://www.harryclinton.com' target='_blank' rel='noreferrer'>www.harryclinton.com</a></p>",
    },
  ],
};

const PrivacyPolicy = () => {
  const [content, setContent] = useState(fallbackContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPrivacy = async () => {
      try {
        const [headersRes, sectionsRes] = await Promise.all([
          contentService.getLegalPageHeaders(),
          contentService.getLegalPageSections(),
        ]);
        const headers = headersRes.data?.data || headersRes.data || [];
        const sections = sectionsRes.data?.data || sectionsRes.data || [];
        const header =
          headers.find(
            (h) =>
              h.page_type?.toLowerCase().includes("privacy") ||
              h.page_title?.toLowerCase().includes("privacy")
          ) || {};
        const pageSections = sections
          .filter(
            (s) =>
              s.page_type?.toLowerCase().includes("privacy") ||
              header.page_type?.toLowerCase() === s.page_type?.toLowerCase()
          )
          .sort((a, b) => (a.section_order || 0) - (b.section_order || 0));
        if (header.page_title || pageSections.length > 0) {
          setContent({
            title: header.page_title || fallbackContent.title,
            effectiveDate: header.effective_date || fallbackContent.effectiveDate,
            intro: header.intro_text || fallbackContent.intro,
            sections:
              pageSections.length > 0
                ? pageSections.map((s) => ({
                    section_title: s.section_title,
                    content: s.content,
                  }))
                : fallbackContent.sections,
          });
        }
      } catch (err) {
        setError("Unable to load the latest privacy policy.");
      } finally {
        setLoading(false);
      }
    };
    fetchPrivacy();
  }, []);

  if (loading) {
    return (
      <div className="bg-light py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light py-5">
      <div className="container">
        <div className="card shadow-sm border-0 rounded-4 p-4">
          <h1 className="mb-4 text-primary">{content.title}</h1>
          <p>
            <strong>Effective Date:</strong>{" "}
            <span className="text-muted">{content.effectiveDate}</span>
          </p>
          <p>{content.intro}</p>
          {error && <div className="alert alert-danger">{error}</div>}
          {content.sections.map((section, index) => (
            <React.Fragment key={index}>
              <h5 className="mt-4 text-dark">{section.section_title}</h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: section.content,
                }}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

