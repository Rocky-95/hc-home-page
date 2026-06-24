import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/PageAccordions.css";

const faqData = [
  { question: "1) What is your shipping timeline?", answer: "All orders are dispatched within 3-5 business days." },
  { question: "2) Is there any option for express delivery within Chennai?", answer: "Yes, we offer same-day express delivery on selected products within Chennai." },
  { question: "3) Is my order confirmed?", answer: "You will receive an order confirmation via email. If not, contact our support at connect@harryclinton.com." },
  { question: "4) How can I keep track of my package?", answer: "We share shipping confirmation and tracking details via your registered email after dispatch." },
  { question: "5) I think I got the sizing wrong on my order. Can I exchange it for a different size?", answer: "Yes, we offer size exchanges. Please initiate the exchange within 5 days of receiving your order. Ensure the item is unused, unwashed, and not damaged. Products should be in resalable condition with all original tags intact." },
  { question: "6) What's the minimum duration required to stitch a bespoke suit?", answer: "We usually take 2 weeks for customizing a bespoke suit." },
  { question: "7) What are the steps to place a custom order online?", answer: "To place a custom order online, contact us via WhatsApp or email. We'll guide you through fabric selection, sizing, and payment." },
  { question: "8) What should I do if I received a wrong or defective product?", answer: "Please contact our support team within 5 days of order delivery." },
  { question: "9) How to cancel my order?", answer: "Cancellation requests are accepted before the product is shipped. Please go to your order page or contact customer support to cancel your order." },
  { question: "10) Any other questions?", answer: "You can contact us at 7094 094 194 or email connect@harryclinton.com. We'll be happy to assist you!" }
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div className="container my-5">
        <h2 className="text-center mb-4">Frequently Asked Questions</h2>
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
