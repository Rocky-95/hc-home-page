import React, { useEffect, useState } from "react";
import "../styles/HomeFaqs.css";
import { useContentData, getSetting } from "../../utils/contentHelpers";
import contentService from "../../services/contentService";

const defaultFaqs = [
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
  const [faqs, setFaqs] = useState(defaultFaqs);
  const [openId, setOpenId] = useState(1);
  const { settings } = useContentData();
  const sectionTitle = getSetting(settings, "home_faqs_title") || "FAQs";

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await contentService.getFaqs();
        const data = res.data?.data || res.data || [];
        if (data.length > 0) {
          setFaqs(
            data.slice(0, 5).map((item, index) => ({
              id: item.faq_id || item.id || index + 1,
              question: item.question || item.title || "",
              answer: item.answer || item.description || "",
            }))
          );
        }
      } catch {
        // keep defaults
      }
    };
    fetchFaqs();
  }, []);

  const toggle = (id) => setOpenId(openId === id ? null : id);

  return (
    <div className="container my-5 home-faqs">
      <h2 className="mb-4 text-center">{sectionTitle}</h2>
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
                <div className="accordion-body" dangerouslySetInnerHTML={{ __html: faq.answer }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomeFaqs;
