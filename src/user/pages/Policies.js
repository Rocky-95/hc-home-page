import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import contentService from "../../services/contentService";

const defaultTabs = [
  {
    id: "shipping",
    label: "Shipping",
    title: "Shipping Policy",
    content: [
      "All orders are dispatched within 3-5 business days of order placement. Business days exclude public holidays and Sundays.",
      "Orders with customization might take slightly longer depending on the nature of the work.",
      "Once the dispatch happens, delivery may take up to 3 to 5 business days depending on the location.",
      "The dispatch details with tracking number are sent to the registered email id.",
      "If the customer is unavailable during delivery, the courier partner will attempt delivery again. Multiple failed attempts may result in return of the package.",
      "Outfits purchased during Sale Events will be shipped as per the timelines mentioned on the sale page.",
      "We deliver for almost all PIN codes across India except certain restricted areas.",
      "Shipping is currently free for all orders over Rs. 1500 within India.",
    ],
  },
  {
    id: "exchange",
    label: "Exchange",
    title: "Exchange, Return and Refund Policy",
    paragraphs: [
      "We have a 5-day window for exchanges and returns from the date of delivery. Items not eligible for exchange or return include: damaged, used or washed outfits; original packaging not provided; outfits that have been already exchanged once.",
      "Products should be in resalable condition with all original tags attached. Any signs of wear, alteration or use will lead to rejection of the request.",
    ],
    content: [
      "All our products are specially made to order, hence size exchanges are subject to availability.",
      "The exchange / replacement outfit will be dispatched once the original product is received and quality checked.",
      "In case of a reverse pick up, please keep the product packed and ready for collection.",
      "If reverse pick up is not available, self-ship the product to our warehouse address and we will reimburse the shipping cost against the store credit.",
    ],
  },
  {
    id: "return",
    label: "Return",
    title: "Return Policy",
    content: [
      "Orders for which packaging is damaged or tampered at the time of delivery are eligible for return.",
      "Kindly ensure the product reaches us within 10 days from the date of delivery.",
      "We will try our best to pick up from your address through our courier partner.",
      "If reverse pick up is unavailable, self-ship the product to our warehouse address and we will reimburse the shipping cost.",
      "The product will be inspected before refund is initiated.",
    ],
    footer: "All returns are subject to discretion of Label Harry Clinton.",
  },
  {
    id: "refund",
    label: "Refund",
    title: "Refund Policy",
    content: [
      "Once item passes quality check, we notify you via email and initiate the refund.",
      "Refund may take 4 to 7 business days to reflect in your original payment method.",
    ],
  },
  {
    id: "cancel",
    label: "Cancellation",
    title: "Cancellation Policy",
    content: [
      "Cancellation requests are accepted before shipping.",
      "Once shipped, we cannot cancel the order.",
      "For prepaid orders, refund is processed via bank transfer or original payment method.",
    ],
    sections: [{ title: "Cancellation by Label Harry Clinton", text: "Label Harry Clinton reserves the right to cancel any order due to unforeseen circumstances, stock unavailability, or fraudulent activity. In such cases, a full refund will be initiated." }],
  },
];

const Policies = () => {
  const [tabs, setTabs] = useState(defaultTabs);
  const [activeTab, setActiveTab] = useState("shipping");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const [headersRes, sectionsRes] = await Promise.all([
          contentService.getLegalPageHeaders(),
          contentService.getLegalPageSections(),
        ]);
        const headers = headersRes.data?.data || headersRes.data || [];
        const sections = sectionsRes.data?.data || sectionsRes.data || [];

        const policyHeaders = headers.filter(
          (h) => h.page_type?.toLowerCase().includes("policies") || h.page_type?.toLowerCase().includes("shipping") || h.page_type?.toLowerCase().includes("exchange") || h.page_type?.toLowerCase().includes("return") || h.page_type?.toLowerCase().includes("refund") || h.page_type?.toLowerCase().includes("cancellation")
        );
        const policySections = sections.filter(
          (s) => s.page_type?.toLowerCase().includes("policies") || s.page_type?.toLowerCase().includes("shipping") || s.page_type?.toLowerCase().includes("exchange") || s.page_type?.toLowerCase().includes("return") || s.page_type?.toLowerCase().includes("refund") || s.page_type?.toLowerCase().includes("cancellation")
        );

        if (policyHeaders.length === 0 && policySections.length === 0) {
          setLoading(false);
          return;
        }

        const merged = defaultTabs.map((tab) => {
          const header = policyHeaders.find(
            (h) => h.page_type?.toLowerCase().includes(tab.id) || tab.id.includes(h.page_type?.toLowerCase() || "")
          ) || {};
          const tabSections = policySections
            .filter((s) => s.page_type?.toLowerCase().includes(tab.id) || tab.id.includes(s.page_type?.toLowerCase() || ""))
            .sort((a, b) => (a.section_order || 0) - (b.section_order || 0));

          const mainSection = tabSections.find((s) => !s.section_title || s.section_title?.toLowerCase() === tab.title.toLowerCase());
          const extraSections = tabSections.filter((s) => s.section_title && s.section_title?.toLowerCase() !== tab.title.toLowerCase());

          const contentLines = mainSection?.content
            ? mainSection.content.split("\n").filter(Boolean)
            : tab.content;

          return {
            ...tab,
            title: header.page_title || tab.title,
            content: contentLines,
            paragraphs: mainSection?.content ? [] : tab.paragraphs,
            footer: mainSection?.content ? "" : tab.footer,
            sections: extraSections.map((s) => ({ title: s.section_title, text: s.content })),
          };
        });

        setTabs(merged);
      } catch {
        // keep defaults
      } finally {
        setLoading(false);
      }
    };
    fetchPolicies();
  }, []);

  return (
    <div className="bg-light min-vh-100">
      <div className="container py-5">
        <h1 className="text-center mb-4">Our Policies</h1>

        {loading ? (
          <div className="text-center py-4"><div className="spinner-border" role="status"><span className="visually-hidden">Loading policies...</span></div></div>
        ) : (
          <>
            <ul className="nav nav-tabs justify-content-center" id="policyTabs" role="tablist">
              {tabs.map((tab) => (
                <li className="nav-item" role="presentation" key={tab.id}>
                  <button
                    className={`nav-link${activeTab === tab.id ? " active" : ""}`}
                    id={`${tab.id}-tab`}
                    type="button"
                    role="tab"
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="tab-content card shadow p-4 mt-3" id="policyTabsContent">
              {tabs.map((tab) => (
                <div className={`tab-pane fade${activeTab === tab.id ? " show active" : ""}`} id={tab.id} role="tabpanel" key={tab.id}>
                  <h4>{tab.title}</h4>
                  {tab.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
                  <ul>
                    {tab.content.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                  {tab.footer && <p>{tab.footer}</p>}
                  {tab.sections?.map((s, i) => (
                    <div key={i}>
                      <h5 className="mt-4">{s.title}</h5>
                      <p>{s.text}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Policies;

