import React from "react";
import "../styles/HomeFaqs.css"; // 👈 We'll add mobile styles here

const HomeFaqs = () => {
  return (
    <div className="container my-5 home-faqs">
      <h2 className="mb-4 text-center">FAQs</h2>
      <div className="accordion" id="faqAccordion">

        {/* FAQ 1 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="heading1">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse1"
            >
              1) What's the minimum duration required to stitch a bespoke suit?
            </button>
          </h2>
          <div
            id="collapse1"
            className="accordion-collapse collapse show"
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body">
              We usually take 2 weeks for customizing a bespoke suit.
            </div>
          </div>
        </div>

        {/* FAQ 2 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="heading2">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse2"
            >
              2) What are the steps to place a custom order online?
            </button>
          </h2>
          <div
            id="collapse2"
            className="accordion-collapse collapse"
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body">
              You can contact us via WhatsApp or email. We'll guide you through fabric selection, sizing, and payment.
            </div>
          </div>
        </div>

        {/* FAQ 3 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="heading3">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse3"
            >
              3) What should I do if I received the wrong or defect products?
            </button>
          </h2>
          <div
            id="collapse3"
            className="accordion-collapse collapse"
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body">
              Please contact our support team within 5 days of order delivery.
            </div>
          </div>
        </div>

        {/* FAQ 4 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="heading4">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse4"
            >
              4) How to cancel my order?
            </button>
          </h2>
          <div
            id="collapse4"
            className="accordion-collapse collapse"
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body">
              Cancellation requests are accepted before the product is shipped. Please go to your order page or contact customer support to cancel your order.
            </div>
          </div>
        </div>

        {/* FAQ 5 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="heading5">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse5"
            >
              5) I got the sizing wrong, can I exchange it?
            </button>
          </h2>
          <div
            id="collapse5"
            className="accordion-collapse collapse"
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body">
              Yes, we offer size exchanges. Please initiate the process within 5 days of receiving your order. Ensure the item is unused, unwashed, not damaged, and in resalable condition with all original tags intact.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomeFaqs;
