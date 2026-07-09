import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EmbroideryPage.css";

import heroImg    from "../../shared/assets/images/vision1.jpeg";
import aboutImg   from "../../shared/assets/images/vision_title.jpeg";
import compImg    from "../../shared/assets/images/SuitsPage/LabelNew2.jpeg";
import handImg    from "../../shared/assets/images/SuitsPage/WeddingNew.jpeg";
import ctaImg     from "../../shared/assets/images/SuitsPage/DesignerNew.jpeg";
import avatarImg  from "../../shared/assets/images/HC-Logo-Golden.PNG";

import gallery1   from "../../shared/assets/images/Wedding.jpeg";
import gallery2   from "../../shared/assets/images/SuitsPage/TravelNew.jpeg";
import gallery3   from "../../shared/assets/images/SmartCasual.jpeg";
import gallery4   from "../../shared/assets/images/SuitsPage/LabelNew.jpeg";
import gallery5   from "../../shared/assets/images/Business.jpeg";
import gallery6   from "../../shared/assets/images/Designer.jpeg";

const SERVICES = [
  {
    title: "Computer Embroidery",
    label: "Precision Technology",
    img: compImg,
    points: [
      "High precision embroidery",
      "Large production capacity",
      "Premium thread finish",
      "Corporate uniforms",
      "Fashion brands",
      "Custom logo embroidery",
    ],
    cta: "Explore Computer Embroidery",
  },
  {
    title: "Hand Embroidery",
    label: "Artisan Craft",
    img: handImg,
    points: [
      "Zardozi",
      "Aari Work",
      "Beadwork",
      "Sequin embroidery",
      "Bridal couture",
      "Luxury bespoke designs",
    ],
    cta: "Explore Hand Embroidery",
  },
];

const WHY_CARDS = [
  { icon: "✦", title: "Premium Quality", desc: "Only the finest threads, fabrics, and finishes leave our studio." },
  { icon: "✦", title: "Master Craftsmen", desc: "Decades of inherited skill passed through artisan families." },
  { icon: "✦", title: "Custom Design Solutions", desc: "Bespoke embroidery tailored to your unique vision." },
  { icon: "✦", title: "Fast Turnaround", desc: "Efficient production without compromising on luxury." },
];

const EXPERIENCE_CARDS = [
  { icon: "✦", stat: "3000+", label: "Embroidery Projects Completed" },
  { icon: "✦", stat: "20+", label: "Years of Hand & Computer Embroidery" },
  { icon: "✦", stat: "150+", label: "Fashion Brands & Designers Trust Us" },
  { icon: "✦", stat: "∞", label: "Premium Quality in Every Stitch" },
];

const PROCESS_STEPS = [
  { no: "1", label: "Consultation" },
  { no: "2", label: "Design Digitization" },
  { no: "3", label: "Embroidery Production" },
  { no: "4", label: "Quality Inspection" },
  { no: "5", label: "Delivery" },
];

const TESTIMONIALS = [
  {
    quote: "The precision of their computer embroidery is unmatched. Our brand logos have never looked better.",
    name: "Rohit Mehra",
    role: "Fashion Brand Director",
  },
  {
    quote: "HC brought my bridal lehenga to life with zardozi work that felt like heirloom craftsmanship.",
    name: "Ananya Sharma",
    role: "Bride, Delhi",
  },
  {
    quote: "From concept to stitch, the entire process felt premium, professional, and deeply personal.",
    name: "Vikram Rao",
    role: "Couture Designer",
  },
];

const GALLERY = [
  { img: gallery1, caption: "Bridal Lehenga Embroidery", wide: true },
  { img: gallery2, caption: "Couture Jacket Embroidery", tall: true },
  { img: gallery3, caption: "Floral Hand Embroidery" },
  { img: gallery4, caption: "Computer Logo Embroidery", wide: true },
  { img: gallery5, caption: "Gold Thread Details" },
  { img: gallery6, caption: "Artisan Hands at Work" },
];

const EmbroideryPage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* ── Hero ── */}
      <section className="ep-hero-landing">
        <img src={heroImg} alt="Embroidery" className="ep-hero-landing__bg" />
        <div className="ep-hero-landing__overlay" />
        <div className="ep-hero-landing__content">
          <p className="ep-hero-landing__eyebrow">HC Atelier Services</p>
          <h1 className="ep-hero-landing__title">Embroidery</h1>
          <p className="ep-hero-landing__subtitle">Crafted with Precision. Stitched with Passion.</p>
          <p className="ep-hero-landing__body">
            From timeless hand embroidery to precision computer embroidery, we transform every design into a masterpiece.
          </p>
          <button className="ep-hero-landing__btn" onClick={() => navigate("/book-appointment")}>
            Get a Quote
          </button>
        </div>
      </section>

      {/* ── About ── */}
      <section className="ep-about-split">
        <div className="ep-about-split__img-wrap">
          <img src={aboutImg} alt="The Art of Embroidery" className="ep-about-split__img" />
        </div>
        <div className="ep-about-split__body">
          <p className="ep-section__label">Heritage</p>
          <h2 className="ep-section__title">The Art of Embroidery</h2>
          <div className="ep-about-divider" />
          <p className="ep-about-split__desc">
            Embroidery is where craftsmanship meets storytelling. At HC, we combine modern embroidery technology with traditional artistry to create garments that celebrate luxury, precision, and individuality.
          </p>
        </div>
      </section>

      {/* ── Our Experience ── */}
      <section className="ep-experience">
        <p className="ep-section__label">Our Experience</p>
        <h2 className="ep-section__title" style={{ color: "#fff" }}>A Legacy of Stitched Excellence</h2>
        <div className="ep-experience__grid">
          {EXPERIENCE_CARDS.map((c) => (
            <div className="ep-experience__card" key={c.label}>
              <span className="ep-experience__icon">{c.icon}</span>
              <p className="ep-experience__stat">{c.stat}</p>
              <p className="ep-experience__label">{c.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services ── */}
      <section className="ep-section" style={{ paddingBottom: "1rem" }}>
        <p className="ep-section__label">Services</p>
        <h2 className="ep-section__title">Two Disciplines. One Standard.</h2>
      </section>
      <section className="ep-services">
        {SERVICES.map((s) => (
          <div className="ep-service-card" key={s.title}>
            <img src={s.img} alt={s.title} className="ep-service-card__img" />
            <div className="ep-service-card__overlay" />
            <div className="ep-service-card__content">
              <p className="ep-service-card__label">{s.label}</p>
              <h3 className="ep-service-card__title">{s.title}</h3>
              <ul className="ep-service-card__list">
                {s.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <button className="ep-service-card__btn" onClick={() => navigate("/book-appointment")}>
                {s.cta}
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* ── Why Choose HC ── */}
      <section className="ep-why">
        <p className="ep-section__label">Why Choose HC</p>
        <h2 className="ep-section__title">The HC Difference</h2>
        <div className="ep-why__grid">
          {WHY_CARDS.map((w) => (
            <div className="ep-why__card" key={w.title}>
              <span className="ep-why__icon">{w.icon}</span>
              <p className="ep-why__title">{w.title}</p>
              <p className="ep-why__desc">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="ep-section" style={{ paddingBottom: "1rem" }}>
        <p className="ep-section__label">Portfolio</p>
        <h2 className="ep-section__title">Editorial Gallery</h2>
      </section>
      <section className="ep-gallery">
        {GALLERY.map((g, i) => (
          <div
            className={`ep-gallery__item${g.wide ? " ep-gallery__item--wide" : ""}${g.tall ? " ep-gallery__item--tall" : ""}`}
            key={i}
          >
            <img src={g.img} alt={g.caption} className="ep-gallery__img" />
            <div className="ep-gallery__overlay">
              <p className="ep-gallery__caption">{g.caption}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── Process ── */}
      <section className="ep-process">
        <p className="ep-section__label">Process</p>
        <h2 className="ep-section__title">From Thread to Treasure</h2>
        <div className="ep-process__timeline">
          {PROCESS_STEPS.map((step, idx) => (
            <React.Fragment key={step.label}>
              <div className="ep-process__step">
                <div className="ep-process__circle">{step.no}</div>
                <p className="ep-process__label">{step.label}</p>
              </div>
              {idx < PROCESS_STEPS.length - 1 && (
                <span className="ep-process__arrow">↓</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="ep-testimonials">
        <p className="ep-section__label">Testimonials</p>
        <h2 className="ep-section__title">Client Words</h2>
        <div className="ep-testimonials__grid">
          {TESTIMONIALS.map((t) => (
            <div className="ep-testimonial" key={t.name}>
              <p className="ep-testimonial__quote">"{t.quote}"</p>
              <div className="ep-testimonial__author">
                <img src={avatarImg} alt={t.name} className="ep-testimonial__avatar" />
                <div>
                  <p className="ep-testimonial__name">{t.name}</p>
                  <p className="ep-testimonial__role">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="ep-cta-banner">
        <img src={ctaImg} alt="Artisan" className="ep-cta-banner__bg" />
        <div className="ep-cta-banner__overlay" />
        <div className="ep-cta-banner__content">
          <h2 className="ep-cta-banner__title">Ready to Stitch Your Vision?</h2>
          <p className="ep-cta-banner__sub">
            Whether you need precision machine embroidery or handcrafted luxury detailing, HC brings your ideas to life with exceptional craftsmanship.
          </p>
          <button className="ep-hero-landing__btn" onClick={() => navigate("/book-appointment")}>
            Get a Quote
          </button>
        </div>
      </section>
    </>
  );
};

export default EmbroideryPage;
