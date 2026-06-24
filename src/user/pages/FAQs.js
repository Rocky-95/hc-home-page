import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/PageAccordions.css";
import contentService from "../../services/contentService";

const FAQs = () => {
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await contentService.getFaqs();
        const data = res.data?.data || res.data || [];
        setFaqData(
          data.map((item) => ({
            question: item.question || item.title || "",
            answer: item.answer || item.description || "",
          }))
        );
      } catch (err) {
        setError("Unable to load FAQs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading FAQs...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container my-5">
        <h2 className="text-center mb-4">Frequently Asked Questions</h2>
        {error && <div className="alert alert-danger text-center">{error}</div>}
        <div className="accordion page-accordion">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header">
                  <button
                    className={`accordion-button${isOpen ? "" : " collapsed"}`}
                    type="button"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                  >
                    {faq.question}
                  </button>
                </h2>
                <div className={`accordion-collapse collapse${isOpen ? " show" : ""}`}>
                  <div className="accordion-body">{faq.answer}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <footer className="text-center" style={{ backgroundColor: "#343a40", color: "#fff", padding: "1rem 0" }}>
        <div className="container">
          <p className="mb-1">© 2025 Harry Clinton. All rights reserved.</p>
          <p className="mb-0">
            <Link to="/" style={{ color: "#ffc107" }}>Home</Link> |{" "}
            <Link to="/FAQs" style={{ color: "#ffc107" }}>FAQs</Link> |{" "}
            <Link to="/contact-us" style={{ color: "#ffc107" }}>Contact</Link>
          </p>
        </div>
      </footer>
    </>
  );
};

export default FAQs;
