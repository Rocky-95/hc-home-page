import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import contentService from "../../services/contentService";

const fallbackContent = {
  title: "Terms and Conditions",
  effectiveDate: "[Insert Date]",
  intro:
    "Welcome to Harry Clinton, a bespoke fashion brand committed to premium craftsmanship and personalized style. These Terms and Conditions govern your use of our website and services. By accessing or purchasing from our site, you agree to these Terms in full.",
  sections: [
    {
      section_title: "1. Acceptance of Terms",
      content:
        "<p>By using our website, you acknowledge that you have read, understood, and agree to be bound by these Terms, as well as our Privacy Policy.</p>",
    },
    {
      section_title: "2. Eligibility",
      content:
        "<p>You must be at least 18 years of age to make a purchase. By using our services, you confirm that you are legally able to enter into a binding contract.</p>",
    },
    {
      section_title: "3. Account Registration",
      content:
        "<ul><li>Provide accurate, current, and complete information</li><li>Maintain the security of your password and account</li><li>Notify us immediately of any unauthorized use</li></ul>",
    },
    {
      section_title: "4. Orders and Payments",
      content:
        "<ul><li>All orders are subject to acceptance and availability.</li><li>Prices are listed in INR and may be subject to taxes and shipping charges.</li><li>Payments are processed securely via third-party payment gateways.</li></ul>",
    },
    {
      section_title: "5. Shipping & Delivery",
      content:
        "<ul><li>Estimated delivery timelines will be shared during checkout.</li><li>Delays caused by shipping providers or unforeseen events are not our liability.</li><li>Please ensure that shipping addresses are correct; we are not responsible for lost shipments due to incorrect details.</li></ul>",
    },
    {
      section_title: "6. Custom & Bespoke Orders",
      content:
        "<ul><li>Due to the personalized nature of bespoke products, such items are non-returnable and non-refundable unless defective or damaged upon arrival.</li><li>Minor variations in fabric color or stitching are part of bespoke craftsmanship and not considered defects.</li></ul>",
    },
    {
      section_title: "7. Returns & Refunds",
      content:
        "<p>Please refer to our <a href='/Policies'>Returns & Refunds Policy</a> for more details.</p>",
    },
    {
      section_title: "8. Intellectual Property",
      content:
        "<p>All content on this site, including logos, images, designs, and text, are the intellectual property of Harry Clinton and protected by copyright and trademark laws.</p>",
    },
    {
      section_title: "9. Promotions & Discounts",
      content:
        "<ul><li>Promotional offers may be subject to specific terms.</li><li>We reserve the right to cancel or modify promotions at any time.</li></ul>",
    },
    {
      section_title: "10. Limitation of Liability",
      content:
        "<p>We are not liable for indirect, incidental, or consequential damages, or any loss due to misuse of the website or products.</p>",
    },
    {
      section_title: "11. Termination",
      content:
        "<p>We may suspend or terminate access to our services for any user who violates these Terms.</p>",
    },
    {
      section_title: "12. Governing Law",
      content:
        "<p>These Terms are governed by the laws of India, with disputes subject to the courts in Chennai, Tamil Nadu.</p>",
    },
    {
      section_title: "13. Changes to Terms",
      content:
        "<p>We may revise these Terms from time to time. Updated versions will be posted with a new effective date.</p>",
    },
    {
      section_title: "14. Contact Us",
      content:
        "<p><strong>Harry Clinton – Bespoke Fashion</strong></p><p>Email: <a href='mailto:support@harryclinton.com'>support@harryclinton.com</a></p><p>Phone: +91-XXXXXXXXXX</p><p>Website: <a href='https://www.harryclinton.com' target='_blank' rel='noreferrer'>www.harryclinton.com</a></p>",
    },
  ],
};

function TermsAndConditions() {
  const [content, setContent] = useState(fallbackContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTerms = async () => {
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
              h.page_type?.toLowerCase().includes("terms") ||
              h.page_title?.toLowerCase().includes("terms")
          ) || {};
        const pageSections = sections
          .filter(
            (s) =>
              s.page_type?.toLowerCase().includes("terms") ||
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
        setError("Unable to load the latest terms and conditions.");
      } finally {
        setLoading(false);
      }
    };
    fetchTerms();
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
    <div className="container py-5 bg-light">
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
            <h5 className="mt-4">{section.section_title}</h5>
            <div
              dangerouslySetInnerHTML={{
                __html: section.content,
              }}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default TermsAndConditions;

