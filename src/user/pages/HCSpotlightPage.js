import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EditorialPage.css";

/* ── Mock assets from existing project images ── */
import heroImg     from "../../shared/assets/images/SuitsPage/LabelNew1.jpeg";
import feat1Img    from "../../shared/assets/images/SuitsPage/DesignerNew.jpeg";
import feat2Img    from "../../shared/assets/images/SuitsPage/TravelNew.jpeg";
import card1Img    from "../../shared/assets/images/SuitsPage/WeddingNew.jpeg";
import card2Img    from "../../shared/assets/images/SuitsPage/SmartCasualNew.jpeg";
import card3Img    from "../../shared/assets/images/SuitsPage/SuitsCatImgNanoDemo.jpeg";
import twoup1Img   from "../../shared/assets/images/Business.jpeg";
import twoup2Img   from "../../shared/assets/images/Wedding.jpeg";

/* ── Mock data (replace with API data later) ── */
const FEATURED = {
  tag: "Cover Story",
  title: "The Art of the Perfect Suit",
  desc: "From the first drape of fabric to the final stitch, every Harry Clinton suit is a study in restraint and precision. We go behind the seams of our most celebrated silhouette.",
  meta: "Editorial · June 2025",
  img: feat1Img,
  to: "/collection/designer",
};

const FEATURE2 = {
  tag: "In Focus",
  title: "Travel Ready, Always Refined",
  desc: "Our Travel Collection is engineered for the man who moves between boardrooms and airports without losing a single crease. Wrinkle-resistant, breathable, impeccable.",
  meta: "Collection Feature · May 2025",
  img: feat2Img,
  to: "/collection/travel",
};

const CARDS = [
  {
    id: 1,
    img: card1Img,
    badge: "Spotlight",
    title: "The Wedding Edit",
    sub: "Ceremonial Tailoring · 2025",
    to: "/collection/wedding",
  },
  {
    id: 2,
    img: card2Img,
    badge: "Spotlight",
    title: "Smart Casual Redefined",
    sub: "Everyday Luxury · 2025",
    to: "/collection/smart-casual",
  },
  {
    id: 3,
    img: card3Img,
    badge: "New",
    title: "Nano Collection Preview",
    sub: "Designer Series · 2025",
    to: "/collection/designer",
  },
];

const TWOUP = [
  {
    id: 1,
    img: twoup1Img,
    tag: "Business",
    title: "Power Dressing, Perfected",
    cta: "Explore",
    to: "/suits",
  },
  {
    id: 2,
    img: twoup2Img,
    tag: "Occasion",
    title: "Celebrations in Style",
    cta: "Explore",
    to: "/suits",
  },
];

const MARQUEE = ["HC SPOTLIGHT", "·", "EDITORIAL", "·", "BEHIND THE SEAMS", "·", "HARRY CLINTON", "·", "THE CRAFT", "·"];

const HCSpotlightPage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* ── Hero ── */}
      <section className="ep-hero">
        <img src={heroImg} alt="HC Spotlight" className="ep-hero__bg" />
        <div className="ep-hero__content">
          <p className="ep-hero__eyebrow">Harry Clinton</p>
          <h1 className="ep-hero__title">HC Spotlight</h1>
          <p className="ep-hero__sub">
            Editorials, stories and craft features from the world of Harry Clinton.
          </p>
          <button className="ep-btn" onClick={() => document.getElementById("spotlight-content")?.scrollIntoView({ behavior: "smooth" })}>
            Read Now
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
      <div id="spotlight-content" className="container-fluid px-4 px-md-5 py-5">

        {/* Section label */}
        <p className="ep-label mb-4">Cover Story</p>

        {/* Featured editorial — image left */}
        <div className="ep-feature mb-5" onClick={() => navigate(FEATURED.to)}>
          <div className="ep-feature__img-wrap">
            <img src={FEATURED.img} alt={FEATURED.title} className="ep-feature__img" />
          </div>
          <div className="ep-feature__body">
            <p className="ep-feature__tag">{FEATURED.tag}</p>
            <h2 className="ep-feature__title">{FEATURED.title}</h2>
            <p className="ep-feature__desc">{FEATURED.desc}</p>
            <p className="ep-feature__meta">{FEATURED.meta}</p>
          </div>
        </div>

        {/* Quote */}
        <div className="ep-quote">
          <span className="ep-quote__mark">"</span>
          <p className="ep-quote__text">
            A suit is not merely clothing — it is the architecture of a man's presence.
          </p>
          <p className="ep-quote__author">— Harry Clinton, Founder</p>
        </div>

        {/* Section label */}
        <p className="ep-label mb-4">More Spotlights</p>

        {/* Cards */}
        <div className="ep-grid mb-5">
          {CARDS.map((c) => (
            <div className="ep-card" key={c.id} onClick={() => navigate(c.to)}>
              <div className="ep-card__img-wrap">
                <img src={c.img} alt={c.title} className="ep-card__img" />
                <span className="ep-card__badge">{c.badge}</span>
                <div className="ep-card__overlay" />
              </div>
              <div className="ep-card__body">
                <p className="ep-card__title">{c.title}</p>
                <p className="ep-card__sub">{c.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Second featured — image right */}
        <p className="ep-label mb-4">In Focus</p>
        <div className="ep-feature ep-feature--reverse mb-5" onClick={() => navigate(FEATURE2.to)}>
          <div className="ep-feature__img-wrap">
            <img src={FEATURE2.img} alt={FEATURE2.title} className="ep-feature__img" />
          </div>
          <div className="ep-feature__body">
            <p className="ep-feature__tag">{FEATURE2.tag}</p>
            <h2 className="ep-feature__title">{FEATURE2.title}</h2>
            <p className="ep-feature__desc">{FEATURE2.desc}</p>
            <p className="ep-feature__meta">{FEATURE2.meta}</p>
          </div>
        </div>

        {/* Two-up banner */}
        <p className="ep-label mb-4">Shop the Story</p>
        <div className="ep-twoup">
          {TWOUP.map((t) => (
            <div className="ep-twoup__item" key={t.id} onClick={() => navigate(t.to)}>
              <img src={t.img} alt={t.title} className="ep-twoup__img" />
              <div className="ep-twoup__body">
                <p className="ep-twoup__tag">{t.tag}</p>
                <p className="ep-twoup__title">{t.title}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default HCSpotlightPage;
