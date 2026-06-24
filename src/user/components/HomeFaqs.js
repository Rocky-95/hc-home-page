import React, { useState } from "react";
import "../styles/HomeFaqs.css"; // 👈 We'll add mobile styles here

const faqs = [
  {
    id: 1,
    question: "1) What's the minimum duration required to stitch a bespoke suit?",
    answer: "We usually take 2 weeks for customizing a bespoke suit.",
  },
  {
    id: 2,
    question: "2) What are the steps to place a custom order online?",
    answer: "You can contact us via WhatsApp or email. We'll guide you through fabric selection, sizing, and payment.",
  },
  {
    id: 3,
    question: "3) What should I do if I received the wrong or defect products?",
    answer: "Please contact our support team within 5 days of order delivery.",
  },
  {
    id: 4,
    question: "4) How to cancel my order?",
    answer: "Cancellation requests are accepted before the product is shipped. Please go to your order page or contact customer support to cancel your order.",
  },
  {
    id: 5,
    question: "5) I got the sizing wrong, can I exchange it?",
    answer: "Yes, we offer size exchanges. Please initiate the process within 5 days of receiving your order. Ensure the item is unused, unwashed, not damaged, and in resalable condition with all original tags intact.",
  },
];

const HomeFaqs = () => {
  const [openId, setOpenId] = useState(1);

  const toggle = (id) => setOpenId(openId === id ? null : id);

  return (
    <div className="container my-5 home-faqs">
      <h2 className="mb-4 text-center">FAQs</h2>
      <div className="accordion" id="faqAccordion">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div className="accordion-item" key={faq.id}>
              <h2 className="accordion-header" id={`heading${faq.id}`}>
                <button
                  className={`accordion-button ${isOpen ? "" : "collapsed"}`}
                  type="button"
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                >
                  {faq.question}
                </button>
              </h2>
              <div
                id={`collapse${faq.id}`}
                className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
              >
                <div className="accordion-body">{faq.answer}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomeFaqs;
