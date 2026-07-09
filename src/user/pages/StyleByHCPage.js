import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EditorialPage.css";
import "../styles/StyleByHCPage.css";

/* ── Mock assets from existing project images ── */
import heroImg    from "../../shared/assets/images/SuitsPage/LabelNew2.jpeg";
import look1Img   from "../../shared/assets/images/SuitsPage/WeddingNew.jpeg";
import look2Img   from "../../shared/assets/images/SuitsPage/DesignerNew.jpeg";
import look3Img   from "../../shared/assets/images/SuitsPage/TravelNew.jpeg";
import look4Img   from "../../shared/assets/images/SuitsPage/SmartCasualNew.jpeg";
import look5Img   from "../../shared/assets/images/SuitsPage/LabelNew.jpeg";
import look6Img   from "../../shared/assets/images/SuitsPage/SuitsCatImgNanoDemo.jpeg";
import feat1Img   from "../../shared/assets/images/Business.jpeg";
import feat2Img   from "../../shared/assets/images/Travel.jpeg";

/* ── Mock data ── */
const FILTERS = ["All", "Formal", "Smart Casual", "Wedding", "Travel"];

const LOOKS = [
  { id: 1, img: look1Img, title: "The Ivory Ceremony",   style: "Wedding",      tag: "Bridal Season", desc: "Ivory double-breasted suit with hand-stitched lapels.", to: "/collection/wedding" },
  { id: 2, img: look2Img, title: "The Designer Cut",     style: "Formal",       tag: "New Season",    desc: "Structured silhouette for the modern executive.", to: "/collection/designer" },
  { id: 3, img: look3Img, title: "Jet Set Traveller",    style: "Travel",       tag: "Essential",     desc: "Wrinkle-resistant linen blend, cabin-ready.", to: "/collection/travel" },
  { id: 4, img: look4Img, title: "Smart Weekend",        style: "Smart Casual", tag: "Weekend Edit",  desc: "Relaxed tailoring without compromising on elegance.", to: "/collection/smart-casual" },
  { id: 5, img: look5Img, title: "Label Edition",        style: "Formal",       tag: "Signature",     desc: "Our signature label cut — timeless, authoritative.", to: "/collection/business" },
  { id: 6, img: look6Img, title: "Nano Collection",      style: "Smart Casual", tag: "Limited",       desc: "Micro-textured fabric for a next-gen smart casual look.", to: "/collection/designer" },
];

const FEAT1 = {
  tag: "Style Guide",
  title: "How to Dress for the Boardroom",
  desc: "Power dressing is not about loudness. It is about precision — the right fit, the right fabric, the right cut. Our stylists break down the anatomy of a commanding business ensemble.",
  meta: "Style Guide · June 2025",
  img: feat1Img,
  to: "/collection/business",
};

const FEAT2 = {
  tag: "Travel Style",
  title: "Packing Light, Dressing Heavy",
  desc: "The seasoned traveller knows: one suit, infinite occasions. Our Travel edit ensures you look impeccable from take-off to keynote.",
  meta: "Style Guide · May 2025",
  img: feat2Img,
  to: "/collection/travel",
};

const TIPS = [
  { no: "01", title: "Fit First", desc: "No fabric compensates for poor fit. Always start with the silhouette." },
  { no: "02", title: "Fabric for Occasion", desc: "Wool for formal, linen for warm climates, blends for travel." },
  { no: "03", title: "Colour Confidence", desc: "Navy and charcoal are universals. Build from there." },
  { no: "04", title: "Detail Matters", desc: "Buttons, lapels and pocket squares are the punctuation of a suit." },
];

const MARQUEE = ["STYLE BY HC", "·", "THE LOOK", "·", "HOW TO WEAR IT", "·", "HARRY CLINTON", "·", "CURATED STYLE", "·"];

const StyleByHCPage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? LOOKS
    : LOOKS.filter((l) => l.style === activeFilter);

  return (
    <>
      {/* ── Hero ── */}
      <section className="ep-hero">
        <img src={heroImg} alt="Style by HC" className="ep-hero__bg" />
        <div className="ep-hero__content">
          <p className="ep-hero__eyebrow">Harry Clinton</p>
          <h1 className="ep-hero__title">Style by HC</h1>
          <p className="ep-hero__sub">
            Curated looks, style guides and outfit inspiration from our in-house stylists.
          </p>
          <button
            className="ep-btn"
            onClick={() => document.getElementById("style-content")?.scrollIntoView({ behavior: "smooth" })}
          >
            Explore Looks
          </button>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="ep-marquee">
        <div className="ep-marquee__track">
          {Array(4).fill(MARQUEE).flat().map((w, i) => (
            <span key={i} className={w === "·" ? "ep-marquee__dot" : "ep-marquee__word"}>{w}</span>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div id="style-content" className="container-fluid px-4 px-md-5 py-5">

        {/* ── Featured look ── */}
        <p className="ep-label mb-4">Style Guide</p>
        <div className="ep-feature mb-5" onClick={() => navigate(FEAT1.to)}>
          <div className="ep-feature__img-wrap">
            <img src={FEAT1.img} alt={FEAT1.title} className="ep-feature__img" />
          </div>
          <div className="ep-feature__body">
            <p className="ep-feature__tag">{FEAT1.tag}</p>
            <h2 className="ep-feature__title">{FEAT1.title}</h2>
            <p className="ep-feature__desc">{FEAT1.desc}</p>
            <p className="ep-feature__meta">{FEAT1.meta}</p>
          </div>
        </div>

        {/* ── Style tips strip ── */}
        <div className="sbhc-tips mb-5">
          {TIPS.map((t) => (
            <div className="sbhc-tip" key={t.no}>
              <span className="sbhc-tip__no">{t.no}</span>
              <p className="sbhc-tip__title">{t.title}</p>
              <p className="sbhc-tip__desc">{t.desc}</p>
            </div>
          ))}
        </div>

        {/* ── Quote ── */}
        <div className="ep-quote mb-5">
          <span className="ep-quote__mark">"</span>
          <p className="ep-quote__text">
            Style is not what you wear — it is how you carry what you wear.
          </p>
          <p className="ep-quote__author">— HC House of Style</p>
        </div>

        {/* ── Curated Looks grid with filter ── */}
        <div className="sbhc-toolbar mb-4">
          <p className="ep-label" style={{ margin: 0 }}>Curated Looks</p>
          <div className="sbhc-filters">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`sbhc-filter${activeFilter === f ? " sbhc-filter--active" : ""}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="ep-grid mb-5">
          {filtered.map((look) => (
            <div className="ep-card" key={look.id} onClick={() => navigate(look.to)}>
              <div className="ep-card__img-wrap">
                <img src={look.img} alt={look.title} className="ep-card__img" />
                <span className="ep-card__badge">{look.tag}</span>
                <div className="ep-card__overlay" />
              </div>
              <div className="ep-card__body">
                <p className="ep-card__title">{look.title}</p>
                <p className="ep-card__sub">{look.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Second featured — reversed ── */}
        <p className="ep-label mb-4">Travel Style</p>
        <div className="ep-feature ep-feature--reverse mb-5" onClick={() => navigate(FEAT2.to)}>
          <div className="ep-feature__img-wrap">
            <img src={FEAT2.img} alt={FEAT2.title} className="ep-feature__img" />
          </div>
          <div className="ep-feature__body">
            <p className="ep-feature__tag">{FEAT2.tag}</p>
            <h2 className="ep-feature__title">{FEAT2.title}</h2>
            <p className="ep-feature__desc">{FEAT2.desc}</p>
            <p className="ep-feature__meta">{FEAT2.meta}</p>
          </div>
        </div>

        {/* ── CTA strip ── */}
        <div className="sbhc-cta-strip">
          <p className="sbhc-cta-strip__label">Ready to build your look?</p>
          <h3 className="sbhc-cta-strip__title">Book a Personal Styling Session</h3>
          <p className="sbhc-cta-strip__sub">
            Sit with one of our in-house stylists and let us curate your wardrobe from scratch.
          </p>
          <button className="ep-btn" onClick={() => navigate("/book-appointment")}>
            Book Now
          </button>
        </div>

      </div>
    </>
  );
};

export default StyleByHCPage;
