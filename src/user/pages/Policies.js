import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Policies = () => {
  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", backgroundColor: "#f8f9fa" }}>
      <div className="container py-5">
        <h1 className="text-center mb-4">Our Policies</h1>

        {/* Tabs Navigation */}
        <ul className="nav nav-tabs justify-content-center" id="policyTabs" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="shipping-tab"
              data-bs-toggle="tab"
              data-bs-target="#shipping"
              type="button"
              role="tab"
            >
              Shipping
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="exchange-tab"
              data-bs-toggle="tab"
              data-bs-target="#exchange"
              type="button"
              role="tab"
            >
              Exchange
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="return-tab"
              data-bs-toggle="tab"
              data-bs-target="#return"
              type="button"
              role="tab"
            >
              Return
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="refund-tab"
              data-bs-toggle="tab"
              data-bs-target="#refund"
              type="button"
              role="tab"
            >
              Refund
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="cancel-tab"
              data-bs-toggle="tab"
              data-bs-target="#cancel"
              type="button"
              role="tab"
            >
              Cancellation
            </button>
          </li>
        </ul>

        {/* Tab Contents */}
        <div className="tab-content" id="policyTabsContent" style={{
          padding: "30px 20px",
          backgroundColor: "#fff",
          borderRadius: "6px",
          marginTop: "20px",
          boxShadow: "0 0 10px rgba(0,0,0,0.05)"
        }}>

          {/* Shipping */}
          <div className="tab-pane fade show active" id="shipping" role="tabpanel">
            <h4>Shipping Policy</h4>
            <ul>
              <li>All orders are dispatched within 3-5 business days of order placement. Business days exclude public holidays and Sundays.</li>
              <li>Orders with customization might take slightly longer depending on the nature of the work.</li>
              <li>Once the dispatch happens, delivery may take up to 3 to 5 business days depending on the location.</li>
              <li>The dispatch details with tracking number are sent to the registered email id.</li>
              <li>If the customer is unavailable during delivery, the courier partner will attempt delivery again. Multiple failed attempts may result in return of the package.</li>
              <li>Outfits purchased during Sale Events will be shipped as per the timelines mentioned on the sale page.</li>
              <li>We deliver for almost all PIN codes across India except certain restricted areas.</li>
              <li>We do not charge for delivery on orders above Rs. 999.</li>
              <li>Shipping is currently free for all orders over Rs. 1500 within India.</li>
            </ul>
          </div>

          {/* Exchange */}
          <div className="tab-pane fade" id="exchange" role="tabpanel">
            <h4>Exchange, Return and Refund Policy</h4>
            <p>We have a 5-day window for exchanges and returns from the date of delivery. Items not eligible for exchange or return include:</p>
            <ul>
              <li>Damaged, used or washed outfits</li>
              <li>Original packaging not provided</li>
              <li>Outfits that have been already exchanged once</li>
            </ul>
            <p>Products should be in resalable condition with all original tags attached. Any signs of wear, alteration or use will lead to rejection of the request.</p>
            <h4>Exchanges</h4>
            <ul>
              <li>All our products are specially made to order, hence size exchanges are subject to availability.</li>
              <li>The exchange / replacement outfit will be dispatched once the original product is received and quality checked.</li>
              <li>In case of a reverse pick up, please keep the product packed and ready for collection.</li>
              <li>If reverse pick up is not available, self-ship the product to our warehouse address and we will reimburse the shipping cost against the store credit.</li>
            </ul>
          </div>

          {/* Return */}
          <div className="tab-pane fade" id="return" role="tabpanel">
            <h4>Return Policy</h4>
            <ul>
              <li>Orders for which packaging is damaged or tampered at the time of delivery are eligible for return.</li>
              <li>Kindly ensure the product reaches us within 10 days from the date of delivery.</li>
              <li>We will try our best to pick up from your address through our courier partner.</li>
              <li>If reverse pick up is unavailable, self-ship the product to our warehouse address and we will reimburse the shipping cost.</li>
              <li>The product will be inspected before refund is initiated.</li>
            </ul>
            <p>All returns are subject to discretion of Label Harry Clinton.</p>
          </div>

          {/* Refund */}
          <div className="tab-pane fade" id="refund" role="tabpanel">
            <h4>Refund Policy</h4>
            <ul>
              <li>Once item passes quality check, we notify you via email and initiate the refund.</li>
              <li>Refund may take 4 to 7 business days to reflect in your original payment method.</li>
            </ul>
          </div>

          {/* Cancellation */}
          <div className="tab-pane fade" id="cancel" role="tabpanel">
            <h4>Cancellation Policy</h4>
            <ul>
              <li>Cancellation requests are accepted before shipping.</li>
              <li>Once shipped, we cannot cancel the order.</li>
              <li>For prepaid orders, refund is processed via bank transfer or original payment method.</li>
            </ul>
            <h5 className="mt-4">Cancellation by Label Harry Clinton</h5>
            <p>Label Harry Clinton reserves the right to cancel any order due to unforeseen circumstances, stock unavailability, or fraudulent activity. In such cases, a full refund will be initiated.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policies;

