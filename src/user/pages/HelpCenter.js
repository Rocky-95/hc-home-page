import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/PageAccordions.css";
import { Link } from "react-router-dom";
import contentService from "../../services/contentService";

const topics = [
  { icon: "bi-truck", title: "Shipping", desc: "Learn about dispatch timelines, delivery options, tracking your order, and express delivery within Chennai.", link: "/Policies" },
  { icon: "bi-arrow-return-left", title: "Returns & Exchanges", desc: "Find out how to return or exchange an item, our 5-day window policy, and refund timelines.", link: "/Policies" },
  { icon: "bi-x-circle", title: "Cancellation", desc: "Understand how to cancel an order before shipping, cancellation for bespoke orders, and our right to cancel orders.", link: "/Policies" },
  { icon: "bi-rulers", title: "Sizing & Custom Orders", desc: "How to choose the right size, book a bespoke consultation, and what to expect from a custom garment.", link: "/FAQs" },
  { icon: "bi-shield-check", title: "Privacy & Security", desc: "How we collect, use, and protect your personal information and payment details.", link: "/privacy-policy" },
  { icon: "bi-file-text", title: "Terms & Conditions", desc: "Everything about using our website, eligibility, payments, bespoke orders, and intellectual property.", link: "/terms-and-conditions" },
];

const defaultGuides = [
  { faq_id: 1, question: "How do I place an order?", answer: "Browse collections, add products to cart, and proceed to checkout. For bespoke orders, contact us via WhatsApp or email." },
  { faq_id: 2, question: "How long does a bespoke suit take?", answer: "A bespoke suit is typically ready within 2 weeks after measurements and design confirmation." },
  { faq_id: 3, question: "Can I track my order?", answer: "Yes. Once dispatched, we send tracking details to your registered email and phone number." },
  { faq_id: 4, question: "What payment methods do you accept?", answer: "We accept cards, UPI, net banking, and select wallets via secure payment gateways." },
  { faq_id: 5, question: "Do you offer international shipping?", answer: "We currently ship across India. International shipping is available on request for select countries." },
  { faq_id: 6, question: "How do I contact customer support?", answer: "Email us at connect@harryclinton.com or call +91 7094 094 194, Monday to Saturday, 10am–7pm IST." },
];

const HelpCenter = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [faqs, setFaqs] = useState(defaultGuides);
  const [supportContacts, setSupportContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHelpData = async () => {
      try {
        const [faqsRes, contactsRes] = await Promise.all([
          contentService.getFaqs(),
          contentService.getSupportContacts().catch(() => ({ data: [] })),
        ]);
        const apiFaqs = faqsRes.data?.data || faqsRes.data || [];
        const activeFaqs = apiFaqs.filter((f) => f.isactive === 1 || f.isactive === true || f.isactive === undefined);
        if (activeFaqs.length > 0) {
          setFaqs(activeFaqs.sort((a, b) => (a.display_order || 0) - (b.display_order || 0)));
        }
        const contacts = contactsRes.data?.data || contactsRes.data || [];
        setSupportContacts(contacts);
      } catch {
        // keep defaults
      } finally {
        setLoading(false);
      }
    };
    fetchHelpData();
  }, []);

  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  const emailContact = supportContacts.find((c) => c.contact_type?.toLowerCase() === "email")?.contact_value || "connect@harryclinton.com";
  const phoneContact = supportContacts.find((c) => c.contact_type?.toLowerCase() === "phone")?.contact_value || "+91 7094 094 194";

  return (
    <div className="bg-light min-vh-100 pb-5">
      <div className="bg-dark text-white py-5 mb-5">
        <div className="container text-center">
          <h1 className="display-5 fw-bold mb-3">Help Center</h1>
          <p className="lead mb-0">Find answers, manage orders, and learn more about Harry Clinton.</p>
        </div>
      </div>

      <div className="container">
        <h2 className="h4 mb-4">Browse by Topic</h2>
        <div className="row g-4 mb-5">
          {topics.map((t, i) => (
            <div className="col-md-6 col-lg-4" key={i}>
              <Link to={t.link} className="text-decoration-none">
                <div className="card h-100 border-0 shadow-sm rounded-4 p-4 hover-shadow">
                  <div className="card-body">
                    <i className={`bi ${t.icon} fs-2 text-primary mb-3 d-block`}></i>
                    <h5 className="card-title text-dark">{t.title}</h5>
                    <p className="card-text text-muted">{t.desc}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <h2 className="h4 mb-4">Quick Guides</h2>
        {loading ? (
          <div className="text-center py-4"><div className="spinner-border" role="status"><span className="visually-hidden">Loading FAQs...</span></div></div>
        ) : (
          <div className="accordion page-accordion mb-5">
            {faqs.map((g) => {
              const key = g.faq_id || g.id || g.question;
              const isOpen = openIndex === key;
              return (
                <div className="accordion-item" key={key}>
                  <h2 className="accordion-header">
                    <button
                      className={`accordion-button${isOpen ? "" : " collapsed"}`}
                      type="button"
                      onClick={() => toggle(key)}
                      aria-expanded={isOpen}
                    >
                      {g.question || g.title}
                    </button>
                  </h2>
                  <div className={`accordion-collapse collapse${isOpen ? " show" : ""}`}>
                    <div className="accordion-body" dangerouslySetInnerHTML={{ __html: g.answer || g.description }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="card border-0 shadow-sm rounded-4 p-4 bg-dark text-white text-center">
          <h3 className="h5 mb-2">Still need help?</h3>
          <p className="mb-3">Our support team is available Monday to Saturday, 10am–7pm IST.</p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <a href={`mailto:${emailContact}`} className="btn btn-outline-light">
              <i className="bi bi-envelope me-2"></i>Email Us
            </a>
            <a href={`tel:${phoneContact}`} className="btn btn-outline-light">
              <i className="bi bi-telephone me-2"></i>Call Us
            </a>
            <Link to="/contact-us" className="btn btn-outline-light">
              <i className="bi bi-chat-dots me-2"></i>Contact Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
